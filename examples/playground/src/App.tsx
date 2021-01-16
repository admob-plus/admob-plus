import {
  Box,
  Container,
  Heading,
  HStack,
  Link,
  SimpleGrid,
} from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink, Route, Routes } from 'react-router-dom'
import Logs from './components/Logs'
import BannerAd from './routes/BannerAd'
import Home from './routes/Home'
import InterstitialAd from './routes/InterstitialAd'
import RewardedAd from './routes/RewardedAd'

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return (
    <Container>
      <SimpleGrid height="100vh" spacingY="20px" templateRows="auto 1fr 1fr">
        <Box as="header">
          <Heading>
            <Link as={RouterLink} to="/">
              AdMob Plus
            </Link>
          </Heading>
          <HStack as="nav">
            <Link as={RouterLink} to="/banner">
              Banner Ad
            </Link>
            <Link as={RouterLink} to="/interstitial">
              Interstitial Ad
            </Link>
            <Link as={RouterLink} to="/rewarded">
              Rewarded Ad
            </Link>
          </HStack>
        </Box>
        <Box>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="banner" element={<BannerAd />} />
            <Route path="interstitial" element={<InterstitialAd />} />
            <Route path="rewarded" element={<RewardedAd />} />
          </Routes>
        </Box>
        <Box bg="#F5F5F5">
          <Logs />
        </Box>
      </SimpleGrid>
    </Container>
  )
}

export default App
