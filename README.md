# YouTube Watch History Delete Shortcut

Delete YouTube watch history items by pressing Delete key while hovering over them on `youtube.com/feed/history` page.

## Features

- Hover over any video item in watch history
- Press `Delete` or `Backspace` key to remove it
- Works with both Shorts and regular videos
- Visual highlight in development mode (red outline on hover)

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
make install
```

### Commands

| Command | Description |
|---------|-------------|
| `make install` | Install dependencies |
| `make build` | Production build + ZIP for Web Store |
| `make build-dev` | Development build (with debug highlight) |
| `make lint` | TypeScript + ESLint check |
| `make clean` | Remove build artifacts |

## Installation

### Development Build

```bash
make build-dev
```

Load in Chrome:
1. Open `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select `.output/chrome-mv3-dev`

### Manual Testing

After loading the extension:
1. Go to `youtube.com/feed/history`
2. Hover over a video - red outline appears (dev mode only)
3. Press `Delete` key - video is removed
4. Test in search box - typing `Delete` should not remove videos

### Production Build

```bash
make build
```

This creates:
- `.output/chrome-mv3/` - Unpacked extension
- `.output/*.zip` - Ready for Chrome Web Store

Upload the ZIP to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)

## Project Structure

```
src/
├── entrypoints/
│   ├── content.ts      # Main content script
│   └── background.ts   # Service worker
└── lib/
    └── types.ts        # Type definitions
```

## License

MIT
