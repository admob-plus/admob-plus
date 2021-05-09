import React from 'react'
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'

import { Colors, Header } from 'react-native/Libraries/NewAppScreen'
import AdMob, {
  InterstitialAd,
  RewardedAd,
  RewardedInterstitialAd,
} from '@admob-plus/react-native'

const Section: React.FC<{
  title: string
}> = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark'
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  )
}

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark'

  React.useEffect(() => {
    AdMob.start().catch((err) => console.error(err))
  }, [])

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <Button
            onPress={async () => {
              const ad = new InterstitialAd({
                adUnitId: 'ca-app-pub-3940256099942544/4411468910',
              })
              await ad.load()
              await ad.show()
            }}
            title="Interstitial Ad"
          />
          <Button
            onPress={async () => {
              const ad = new RewardedAd({
                adUnitId: 'ca-app-pub-3940256099942544/5224354917',
              })
              await ad.load()
              await ad.show()
            }}
            title="Rewarded Ad"
          />
          <Button
            onPress={async () => {
              const ad = new RewardedInterstitialAd({
                adUnitId: 'ca-app-pub-3940256099942544/6978759866',
              })
              await ad.load()
              await ad.show()
            }}
            title="Rewarded Interstitial Ad"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
})

export default App
