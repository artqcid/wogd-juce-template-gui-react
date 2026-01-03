/**
 * WebView2 Service for Plugin Communication
 * Uses native WebView2 Message-Passing API
 * 
 * No WebSockets needed - direct communication between C++ and JavaScript!
 */

type MessageCallback = (message: any) => void

export class PluginService {
  private messageCallbacks: MessageCallback[] = []

  constructor() {
    this.initializeMessageListener()
  }

  /**
   * Checks if running in WebView2 environment
   */
  isInWebView2(): boolean {
    return !!((window as any).__JUCE__?.backend)
  }

  /**
   * Initializes the message listener for incoming plugin messages
   */
  private initializeMessageListener(): void {
    if (this.isInWebView2()) {
      const juce = (window as any).__JUCE__
      if (juce && juce.backend && juce.backend.addEventListener) {
        juce.backend.addEventListener('plugin_update', (data: any) => {
          try {
            const message = typeof data === 'string' ? JSON.parse(data) : data
            this.messageCallbacks.forEach(callback => callback(message))
          } catch (e) {
            console.error('Failed to parse message from plugin:', e)
          }
        })
      }
    }
  }

  /**
   * Sends a message to the plugin
   */
  sendMessage(message: any): void {
    if (this.isInWebView2()) {
      const juce = (window as any).__JUCE__
      if (juce && juce.backend && juce.backend.emitEvent) {
        juce.backend.emitEvent('juce_message', JSON.stringify(message))
      }
    } else {
      console.log('[Dev Mode] Would send to plugin:', message)
    }
  }

  /**
   * Sends parameter change to plugin
   */
  setParameter(paramId: string, value: number): void {
    this.sendMessage({
      type: 'setParameter',
      data: { id: paramId, value }
    })
  }

  /**
   * Requests all parameters from plugin
   */
  requestParameters(): void {
    this.sendMessage({
      type: 'getParameters'
    })
  }

  /**
   * Sets the plugin window size
   */
  setWindowSize(width: number, height: number): void {
    this.sendMessage({
      type: 'setWindowSize',
      data: { width, height }
    })
  }

  /**
   * Register callback for plugin messages
   */
  onMessage(callback: MessageCallback): void {
    this.messageCallbacks.push(callback)
  }
}
