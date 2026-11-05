import React from 'react'
import { Linking, Platform, Pressable, StyleSheet, Text } from 'react-native'
import { Helmet } from 'react-helmet-async'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
  InfoBullet,
  InfoPageLayout,
  InfoParagraph,
  InfoSection,
} from '../components/InfoPageLayout'
import { RootStackParamList } from '../navigation/types'

type Props = NativeStackScreenProps<RootStackParamList, 'Support'>

export function SupportScreen({ navigation }: Props) {
  return (
    <>
      {Platform.OS === 'web' ? (
        <Helmet>
          <title>Help and Support | World Sync</title>
          <meta
            name="description"
            content="Get help using the World Sync globe and contact app support."
          />
        </Helmet>
      ) : null}
      <InfoPageLayout
        navigation={navigation}
        title="A hand, wherever you are."
        intro="A few quick answers for exploring time around the world."
      >
        <InfoSection title="Using the globe">
          <InfoBullet>Drag the globe to explore different parts of the world.</InfoBullet>
          <InfoBullet>Tap a place to see its city and time zone when available.</InfoBullet>
          <InfoBullet>Nearby clocks keep updating while you explore.</InfoBullet>
        </InfoSection>

        <InfoSection title="Location access">
          <InfoParagraph>
            Location is optional. Choose “Use my location” to center the globe and find nearby time
            zones, or continue without it. You can change the permission later in your device or
            browser settings.
          </InfoParagraph>
        </InfoSection>

        <InfoSection title="Contact support">
          <InfoParagraph>
            Tell us what happened and include your device model and Android version if you can.
            Please do not email your precise location or other sensitive information.
          </InfoParagraph>
          <Pressable
            accessibilityRole="link"
            onPress={() => Linking.openURL('mailto:kapil.raghuwanshi5@gmail.com?subject=World%20Sync%20support')}
            style={styles.contact}
          >
            <Text style={styles.contactText}>Email Tech monk-Kapil</Text>
          </Pressable>
        </InfoSection>

        <InfoSection title="Privacy">
          <InfoParagraph>
            Read what information World Sync uses and how optional location access works.
          </InfoParagraph>
          <Pressable
            accessibilityRole="link"
            onPress={() => navigation.navigate('Privacy')}
            style={styles.contact}
          >
            <Text style={styles.contactText}>Read the privacy policy</Text>
          </Pressable>
        </InfoSection>
      </InfoPageLayout>
    </>
  )
}

const styles = StyleSheet.create({
  contact: {
    alignSelf: 'flex-start',
    paddingVertical: 9,
  },
  contactText: {
    color: '#a8d7eb',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
})
