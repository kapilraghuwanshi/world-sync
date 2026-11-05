import React, { ReactNode } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeft, Globe2 } from 'lucide-react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types'

interface InfoPageLayoutProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Privacy' | 'Support'>
  title: string
  intro: string
  children: ReactNode
  updated?: string
}

export function InfoPageLayout({
  navigation,
  title,
  intro,
  children,
  updated,
}: InfoPageLayoutProps) {
  const returnToGlobe = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigation.navigate('Home')
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.page}>
          <View style={styles.topBar}>
            <View style={styles.brand}>
              <Globe2 size={19} color="#f4b52b" />
              <Text style={styles.brandName}>World Sync</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back to the globe"
              onPress={returnToGlobe}
              style={styles.backButton}
            >
              <ArrowLeft size={16} color="#c6d9e7" />
              <Text style={styles.backText}>Back to globe</Text>
            </Pressable>
          </View>

          <View style={styles.hero}>
            <Text accessibilityRole="header" style={styles.title}>{title}</Text>
            <Text style={styles.intro}>{intro}</Text>
            {updated ? <Text style={styles.updated}>Last updated {updated}</Text> : null}
          </View>

          <View style={styles.sections}>{children}</View>

          <Text style={styles.footer}>World Sync · Tech monk-Kapil</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

interface InfoSectionProps {
  title: string
  children: ReactNode
}

export function InfoSection({ title, children }: InfoSectionProps) {
  return (
    <View style={styles.section}>
      <Text accessibilityRole="header" style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  )
}

export function InfoParagraph({ children }: { children: ReactNode }) {
  return <Text style={styles.paragraph}>{children}</Text>
}

export function InfoBullet({ children }: { children: ReactNode }) {
  return (
    <View style={styles.bulletRow}>
      <View style={styles.bullet} />
      <Text style={styles.paragraph}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#081321',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingVertical: 16,
  },
  page: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
  },
  topBar: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(190, 213, 232, 0.22)',
    paddingBottom: 13,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandName: {
    color: '#edf4f8',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingVertical: 8,
    paddingLeft: 8,
  },
  backText: {
    color: '#c6d9e7',
    fontSize: 13,
  },
  hero: {
    paddingTop: 38,
    paddingBottom: 26,
    maxWidth: 620,
  },
  title: {
    color: '#f4f7fb',
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.7,
    lineHeight: 41,
  },
  intro: {
    color: '#c4d2df',
    fontSize: 16,
    lineHeight: 25,
    marginTop: 15,
  },
  updated: {
    color: '#8fa7ba',
    fontSize: 12,
    marginTop: 17,
  },
  sections: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(190, 213, 232, 0.22)',
  },
  section: {
    paddingVertical: 21,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(190, 213, 232, 0.18)',
  },
  sectionTitle: {
    color: '#f4b52b',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
  },
  paragraph: {
    flex: 1,
    color: '#d3dee8',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 11,
    marginTop: 6,
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginTop: 13,
    backgroundColor: '#79b8d5',
  },
  footer: {
    color: '#839bad',
    fontSize: 12,
    paddingTop: 22,
    paddingBottom: 10,
  },
})
