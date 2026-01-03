# WOGD JUCE Template - React GUI

Modern React + TypeScript + Vite GUI template for JUCE plugins using WebView2.

## Features

- **React 18** - Latest React with hooks and functional components
- **TypeScript** - Full type safety
- **WebView2 Integration** - Direct communication with JUCE plugin
- **Hot Module Replacement** - Fast development with Vite
- **Custom Hooks** - Clean API for plugin communication with `usePluginService`

## Project Structure

```
wogd-juce-template-gui-react/
├── src/
│   ├── main.tsx             # React entry point
│   ├── App.tsx              # Root component
│   ├── App.css              # Component styles
│   ├── index.css            # Global styles
│   ├── hooks/
│   │   └── usePluginService.ts  # Plugin communication hook
│   └── services/
│       └── plugin.service.ts    # WebView2 communication
├── public/                  # Static assets
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Dev Server

```bash
npm run dev
```

The dev server will start on http://localhost:5173

### 3. Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Plugin Communication

### Using the Hook

```tsx
import { usePluginService } from './hooks/usePluginService'

function MyComponent() {
  const { pluginService, isConnected } = usePluginService()

  const handleClick = () => {
    pluginService.sendMessage({
      type: 'test',
      data: { message: 'Hello from React!' }
    })
  }

  return (
    <div>
      <p>Status: {isConnected ? 'Connected' : 'Dev Mode'}</p>
      <button onClick={handleClick}>Send Message</button>
    </div>
  )
}
```

### Sending Messages to Plugin

```tsx
// Send a test message
pluginService.sendMessage({
  type: 'test',
  data: { message: 'Hello from React!' }
})

// Set a parameter
pluginService.setParameter('volume', 0.75)

// Request all parameters
pluginService.requestParameters()
```

### Receiving Messages from Plugin

The `usePluginService` hook automatically handles incoming messages and logs them to the console. You can extend the hook to provide custom message handling:

```tsx
useEffect(() => {
  const handleMessage = (message: any) => {
    if (message.type === 'parameterUpdate') {
      // Handle parameter update
      console.log('Parameter updated:', message.data)
    }
  }

  pluginService.onMessage(handleMessage)
}, [pluginService])
```

## Development

### Environment Detection

The plugin service automatically detects if running in WebView2:

```tsx
const { isConnected } = usePluginService()

if (isConnected) {
  console.log('Running in plugin')
} else {
  console.log('Running in dev mode')
}
```

### Console Debugging

- **Dev Mode**: Open browser DevTools (F12)
- **Plugin Mode**: Open plugin window and press F12

## Integration with JUCE Plugin

This GUI template is designed to work with the WOGD JUCE Template:

1. Clone this repository as a git submodule in your JUCE project
2. Start the dev server: `npm run dev`
3. Build your plugin
4. The plugin will load the GUI from http://localhost:5173

See the main template repository for full integration instructions.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## License

MIT
