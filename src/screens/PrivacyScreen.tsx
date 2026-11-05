import React from 'react'
import { Linking, Platform, Pressable, Text, StyleSheet } from 'react-native'
import { Helmet } from 'react-helmet-async'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
  InfoBullet,
  InfoPageLayout,
  InfoParagraph,
  InfoSection,
} from '../components/InfoPageLayout'
import { RootStackParamList } from '../navigation/types'

type Props = NativeStackScreenProps<RootStackParamList, 'Privacy'>

export function PrivacyScreen({ navigation }: Props) {
  return (
    <>
      {Platform.OS === 'web' ? (
        <Helmet>
          <title>Privacy Policy | World Sync</title>
          <meta
            name="description"
            content="Learn how World Sync uses optional location access and handles information."
          />
        </Helmet>
      ) : null}
      <InfoPageLayout
        navigation={navigation}
        title="Your place on the globe stays yours."
        intro="World Sync does not need an account. Location access is optional and is used only to center the globe and find nearby time zones."
        updated="November 5, 2026"
      >
        <InfoSection title="Location is optional">
          <InfoParagraph>
            If you choose “Use my location” and grant your device or browser permission, World Sync
            reads your location while the app is open. It uses those coordinates to orient the globe
            and select nearby time zones. You can decline permission and continue using the globe.
          </InfoParagraph>
          <InfoParagraph>
            The app does not send your coordinates to World Sync servers or save them between
            sessions. If permission is declined or unavailable, World Sync does not use IP-based
            geolocation.
          </InfoParagraph>
        </InfoSection>

        <InfoSection title="Information handled by other services">
          <InfoParagraph>
            The globe loads map textures from raw.githubusercontent.com and unpkg.com. When those
            images load, the providers may receive your IP address and standard request information,
            such as the time and requested image. The website host and app stores may also receive
            ordinary technical information when you visit or download the app.
          </InfoParagraph>
          <InfoParagraph>
            These providers handle information under their own privacy policies. World Sync does
            not use an advertising SDK or analytics service.
          </InfoParagraph>
        </InfoSection>

        <InfoSection title="Storage and deletion">
          <InfoParagraph>
            World Sync has no user accounts and does not keep a server-side location history.
            Location is held in app memory for the current session and is discarded when the app
            closes. There is no account or server-side location record to delete.
          </InfoParagraph>
        </InfoSection>

        <InfoSection title="Children">
          <InfoParagraph>
            World Sync is for a general audience and is not specifically designed for children.
          </InfoParagraph>
        </InfoSection>

        <InfoSection title="Contact">
          <InfoParagraph>
            For privacy questions, contact Tech monk-Kapil at
          </InfoParagraph>
          <Pressable
            accessibilityRole="link"
            onPress={() => Linking.openURL('mailto:kapil.raghuwanshi5@gmail.com')}
            style={styles.contact}
          >
            <Text style={styles.contactText}>kapil.raghuwanshi5@gmail.com</Text>
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
