/**
 * YouTube Watch History Delete Shortcut - Content Script
 *
 * Allows users to delete watch history items by hovering over them
 * and pressing the Delete key on youtube.com/feed/history page.
 */

import { VIDEO_ITEM_SELECTORS } from '@/lib/types';
import type { VideoItemData, VideoItemType } from '@/lib/types';

// Constants for timeouts and delays (ms)
const MENU_WAIT_TIMEOUT = 100;
const ANIMATION_DELAY = 30;

export default defineContentScript({
  matches: ['*://www.youtube.com/*'],
  runAt: 'document_idle',

  main() {
    console.log('[YT History Shortcut] Content script loaded');

    // Only run on history page
    if (!isHistoryPage()) {
      console.log('[YT History Shortcut] Not on history page, waiting for navigation...');
      setupNavigationObserver();
      return;
    }

    initExtension();
  },
});

let hoveredItem: VideoItemData | null = null;
let isInitialized = false;
const deleteQueue: HTMLElement[] = [];
let isProcessingQueue = false;

/**
 * Check if current page is YouTube history page
 */
function isHistoryPage(): boolean {
  return window.location.pathname === '/feed/history';
}

/**
 * Initialize the extension on history page
 */
function initExtension(): void {
  if (isInitialized) return;

  console.log('[YT History Shortcut] Initializing on history page...');

  // Setup event listeners
  setupHoverTracking();
  setupKeyboardListener();

  isInitialized = true;
  console.log('[YT History Shortcut] Extension initialized successfully');
}

/**
 * Find video item element from any child element
 */
function findVideoItemElement(element: HTMLElement): HTMLElement | null {
  return (
    element.closest<HTMLElement>(VIDEO_ITEM_SELECTORS.shorts) ??
    element.closest<HTMLElement>(VIDEO_ITEM_SELECTORS.regular)
  );
}

/**
 * Get video item type
 */
function getVideoItemType(element: HTMLElement): VideoItemType | null {
  if (element.closest(VIDEO_ITEM_SELECTORS.shorts)) return 'shorts';
  if (element.closest(VIDEO_ITEM_SELECTORS.regular)) return 'regular';
  return null;
}

/**
 * Extract video ID from element
 */
function extractVideoId(element: HTMLElement): string | null {
  const link = element.querySelector<HTMLAnchorElement>('a[href*="/watch?v="], a[href*="/shorts/"]');
  if (!link) return null;

  const href = link.href;
  const watchMatch = /[?&]v=([^&]+)/.exec(href);
  if (watchMatch) return watchMatch[1];

  const shortsMatch = /\/shorts\/([^/?]+)/.exec(href);
  if (shortsMatch) return shortsMatch[1];

  return null;
}

/**
 * Get video item data from element
 */
function getVideoItemData(element: HTMLElement): VideoItemData | null {
  const videoElement = findVideoItemElement(element);
  if (!videoElement) return null;

  const type = getVideoItemType(videoElement);
  if (!type) return null;

  return {
    element: videoElement,
    type,
    videoId: extractVideoId(videoElement),
  };
}

/**
 * Setup hover tracking for video items
 */
function setupHoverTracking(): void {
  document.addEventListener('mouseover', (event) => {
    const target = event.target as HTMLElement;
    const videoElement = findVideoItemElement(target);

    if (videoElement) {
      const itemData = getVideoItemData(videoElement);
      if (itemData) {
        hoveredItem = itemData;
        highlightItem(videoElement, true);
      }
    }
  });

  document.addEventListener('mouseout', (event) => {
    const target = event.target as HTMLElement;
    const videoElement = findVideoItemElement(target);

    if (videoElement && hoveredItem?.element === videoElement) {
      highlightItem(videoElement, false);
      hoveredItem = null;
    }
  });
}

/**
 * Add/remove visual highlight to indicate delete-ready state
 * Only visible in development mode for testing purposes
 */
function highlightItem(element: HTMLElement, highlight: boolean): void {
  if (import.meta.env.MODE !== 'development') return;

  if (highlight) {
    element.style.outline = '2px solid rgba(255, 0, 0, 0.5)';
    element.style.outlineOffset = '-2px';
  } else {
    element.style.outline = '';
    element.style.outlineOffset = '';
  }
}

/**
 * Setup keyboard listener for Delete key
 */
function setupKeyboardListener(): void {
  document.addEventListener('keydown', (event) => {
    // Only respond to Delete or Backspace key
    if (event.key !== 'Delete' && event.key !== 'Backspace') return;

    // Don't trigger if user is typing in an input field
    const activeElement = document.activeElement;
    if (
      activeElement instanceof HTMLInputElement ||
      activeElement instanceof HTMLTextAreaElement ||
      activeElement?.getAttribute('contenteditable') === 'true'
    ) {
      return;
    }

    // Check if we have a hovered item
    if (!hoveredItem) {
      console.log('[YT History Shortcut] No item hovered');
      return;
    }

    event.preventDefault();
    queueDelete();
  });
}

/**
 * Add current hovered item to delete queue
 */
function queueDelete(): void {
  if (!hoveredItem) return;

  const { element } = hoveredItem;

  // Don't add if already in queue
  if (deleteQueue.includes(element)) return;

  deleteQueue.push(element);
  console.log(`[YT History Shortcut] Queued for deletion (queue size: ${deleteQueue.length})`);

  // Start processing if not already
  void processDeleteQueue();
}

/**
 * Process delete queue sequentially
 */
async function processDeleteQueue(): Promise<void> {
  if (isProcessingQueue || deleteQueue.length === 0) return;

  isProcessingQueue = true;

  while (deleteQueue.length > 0) {
    const element = deleteQueue.shift()!;

    // Skip if element was already removed
    if (!document.contains(element)) continue;

    const success = await deleteByClickSimulation(element);
    if (success) {
      console.log('[YT History Shortcut] Deleted successfully');
    } else {
      console.error('[YT History Shortcut] Failed to delete item');
      showErrorFeedback(element);
    }
  }

  isProcessingQueue = false;
}

/**
 * Find and click the delete button in the popup menu
 * Supports two menu structures: yt-list-item-view-model and ytd-menu-service-item-renderer
 */
function clickDeleteButton(): boolean {
  const menuSelectors = [
    'ytd-popup-container yt-list-item-view-model',        // shorts, yt-lockup-view-model
    'ytd-popup-container ytd-menu-service-item-renderer', // ytd-video-renderer
  ];

  for (const selector of menuSelectors) {
    const menuItems = document.querySelectorAll(selector);
    for (const item of menuItems) {
      const text = item.textContent ?? '';
      if (VIDEO_ITEM_SELECTORS.deleteMenuTexts.some((p) => text.includes(p))) {
        (item as HTMLElement).click();
        return true;
      }
    }
  }

  return false;
}

/**
 * Delete by simulating clicks on menu (hidden from user)
 */
async function deleteByClickSimulation(element: HTMLElement): Promise<boolean> {
  const menuButton = element.querySelector<HTMLElement>(VIDEO_ITEM_SELECTORS.menuButton);
  if (!menuButton) {
    console.error('[YT History Shortcut] Menu button not found');
    return false;
  }

  const popupContainer = document.querySelector<HTMLElement>('ytd-popup-container');
  if (popupContainer) popupContainer.style.visibility = 'hidden';

  try {
    menuButton.click();
    await waitForElement('tp-yt-iron-dropdown[aria-expanded="true"]', MENU_WAIT_TIMEOUT);

    if (clickDeleteButton()) {
      removeElementFromDOM(element);
      return true;
    }

    console.error('[YT History Shortcut] Delete button not found in menu');
    document.body.click();
    return false;
  } finally {
    if (popupContainer) popupContainer.style.visibility = '';
  }
}

/**
 * Remove element from DOM with animation
 */
function removeElementFromDOM(element: HTMLElement): void {
  // Add fade-out animation
  element.style.transition = 'opacity 0.3s, transform 0.3s';
  element.style.opacity = '0';
  element.style.transform = 'scale(0.95)';

  setTimeout(() => {
    element.remove();
  }, ANIMATION_DELAY);
}

/**
 * Show error feedback on element
 */
function showErrorFeedback(element: HTMLElement): void {
  const originalOutline = element.style.outline;
  element.style.outline = '2px solid red';

  setTimeout(() => {
    element.style.outline = originalOutline;
  }, 1000);
}

/**
 * Wait for an element to appear in DOM
 */
function waitForElement(selector: string, timeout = MENU_WAIT_TIMEOUT): Promise<Element | null> {
  return new Promise((resolve) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const foundElement = document.querySelector(selector);
      if (foundElement) {
        observer.disconnect();
        resolve(foundElement);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, timeout);
  });
}

/**
 * Setup observer for SPA navigation
 */
function setupNavigationObserver(): void {
  let lastUrl = location.href;

  const observer = new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      console.log('[YT History Shortcut] URL changed:', lastUrl);

      if (isHistoryPage()) {
        isInitialized = false;
        hoveredItem = null;
        initExtension();
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  window.addEventListener('popstate', () => {
    if (isHistoryPage() && !isInitialized) {
      initExtension();
    }
  });
}
