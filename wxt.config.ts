import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  manifest: {
    name: 'YouTube Watch History Delete Shortcut',
    description: 'On youtube.com/feed/history page, hover mouse over a video item and press keyboard Delete key to remove it from watch history',
    version: '1.0.0',
    permissions: ['cookies'],
    host_permissions: ['*://*.youtube.com/*', '*://*.google.com/*'],
  },
});
