import { useEffect } from 'react'
import './App.css'
import { usePluginService } from './hooks/usePluginService'

function App() {
  const { pluginService, isConnected } = usePluginService()

  useEffect(() => {
    console.log('React App mounted')
    console.log('Plugin connected:', isConnected)
  }, [isConnected])

  const handleTestConnection = () => {
    console.log('Test Connection button clicked')
    pluginService.sendMessage({
      type: 'test',
      data: { message: 'Hello from React GUI!' }
    })
  }

  return (
    <div className="container">
      <h1>WOGD JUCE Plugin - React GUI</h1>
      <div className={status +${isConnected ? 'connected' : 'disconnected'}}>
        Status: {isConnected ? 'Connected to Plugin' : 'Running in Dev Mode'}
      </div>
      <button onClick={handleTestConnection}>
        TEST CONNECTION
      </button>
    </div>
  )
}

export default App
