// Polyfill DOM elements for Three.js / Expo GL in React Native (Hermes)
if (typeof global.document === 'undefined') {
  const dummyElement = {
    style: {},
    setAttribute: () => {},
    getAttribute: () => null,
    getElementsByTagName: () => [],
    addEventListener: () => {},
    removeEventListener: () => {},
    appendChild: () => {},
    removeChild: () => {},
  }
  global.document = {
    createElement(tagName: string) {
      return { ...dummyElement }
    },
    createElementNS(namespaceURI: string, qualifiedName: String) {
      return { ...dummyElement }
    },
    getElementsByTagName(tagName: string) {
      return []
    },
    body: { ...dummyElement },
    documentElement: { style: {} },
    addEventListener: () => {},
    removeEventListener: () => {},
  } as any
}

if (typeof global.window === 'undefined') {
  (global as any).window = global
}

import { registerRootComponent } from 'expo';
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
