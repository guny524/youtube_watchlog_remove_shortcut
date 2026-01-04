/**
 * Type for YouTube video item in history page
 * Represents both shorts and regular videos
 */
export type VideoItemType = 'shorts' | 'regular';

/**
 * Extracted video item data from DOM
 */
export type VideoItemData = {
  element: HTMLElement;
  type: VideoItemType;
  videoId: string | null;
}

/**
 * DOM selectors for video items
 */
export const VIDEO_ITEM_SELECTORS = {
  // Shorts video item
  shorts: 'ytm-shorts-lockup-view-model-v2, ytm-shorts-lockup-view-model',
  // Regular video items (multiple possible components)
  regular: 'yt-lockup-view-model, ytd-video-renderer, ytd-compact-video-renderer, ytd-grid-video-renderer',
  // Menu button - multiple patterns for different video types
  menuButton: [
    'button[aria-label="추가 작업"]',
    'button[aria-label="More actions"]',
    'button[aria-label="Action menu"]',
    'ytd-menu-renderer yt-icon-button button',
    'yt-icon-button#button button',
  ].join(', '),
  // Delete menu item text patterns (Korean and English)
  deleteMenuTexts: ['시청 기록에서 삭제', 'Remove from Watch history', 'Remove from watch history'],
} as const;
