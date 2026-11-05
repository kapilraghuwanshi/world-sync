import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import { HelmetProvider } from 'react-helmet-async'
import HomeScreen from './src/screens/HomeScreen'
import { TimezoneScreen } from './src/screens/TimezoneScreen'
import { SEOHead } from './src/components/SEOHead'
import { PrivacyScreen } from './src/screens/PrivacyScreen'
import { SupportScreen } from './src/screens/SupportScreen'
import { RootStackParamList } from './src/navigation/types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <HelmetProvider>
      <GestureHandlerRootView style={styles.container}>
        <SEOHead />
        <NavigationContainer
          linking={{
            prefixes: ['worldsync://', 'https://worldsync.com'],
            config: {
              screens: {
                Home: '',
                Timezone: 'tz/:timezone',
                Privacy: 'privacy',
                Support: 'support',
              },
            },
          }}
        >
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#000' },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Timezone" component={TimezoneScreen} />
            <Stack.Screen name="Privacy" component={PrivacyScreen} />
            <Stack.Screen name="Support" component={SupportScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="light" />
      </GestureHandlerRootView>
    </HelmetProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})