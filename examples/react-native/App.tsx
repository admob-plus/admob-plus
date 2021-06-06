import AdMob, {
  InterstitialAd,
  RewardedAd,
  RewardedInterstitialAd
} from '@admob-plus/react-native'
import React from 'react'
import {
  Alert, Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from 'react-native'
import { Colors, Header } from 'react-native/Libraries/NewAppScreen'


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

const showInterstitialAd = async () => {
  try {
    const ad = new InterstitialAd({
      adUnitId: 'ca-app-pub-3940256099942544/4411468910',
    })
    ad.on('load', (evt) => {
      console.log('InterstitialAd loaded', evt)
    })
    await ad.load()
    await ad.show()
  } catch (err) {
    Alert.alert('Error in ad', JSON.stringify(err))
  }
}

const showRewardedAd = async () => {
  try {
    const ad = new RewardedAd({
      adUnitId: 'ca-app-pub-3940256099942544/5224354917',
    })
    await ad.load()
    await ad.show()
  } catch (err) {
    Alert.alert('Error in ad', JSON.stringify(err))
  }
}

const showRewardedInterstitialAd = async () => {
  try {
    const ad = new RewardedInterstitialAd({
      adUnitId: 'ca-app-pub-3940256099942544/6978759866',
    })
    await ad.load()
    await ad.show()
  } catch (err) {
    Alert.alert('Error in ad', JSON.stringify(err))
  }
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
          <Button onPress={showInterstitialAd} title="Interstitial Ad" />
          <Button onPress={showRewardedAd} title="Rewarded Ad" />
          <Button
            onPress={showRewardedInterstitialAd}
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
