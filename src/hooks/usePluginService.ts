import { useState, useEffect, useRef } from 'react'
import { PluginService } from '../services/plugin.service'

/**
 * React Hook for Plugin Communication
 * Provides access to PluginService and connection status
 */
export function usePluginService() {
  const pluginServiceRef = useRef<PluginService | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Create service instance once
    if (!pluginServiceRef.current) {
      pluginServiceRef.current = new PluginService()
    }

    const service = pluginServiceRef.current
    setIsConnected(service.isInWebView2())

    // Register message listener
    const handleMessage = (message: any) => {
      console.log('Message from plugin:', message)
    }

    service.onMessage(handleMessage)
  }, [])

  return {
    pluginService: pluginServiceRef.current!,
    isConnected
  }
}
