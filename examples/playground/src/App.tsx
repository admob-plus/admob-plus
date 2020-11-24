import {
  Box,
  Container,
  Heading,
  HStack,
  Link,
  SimpleGrid
} from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink, Route, Routes } from 'react-router-dom'
import Logs from './components/Logs'
import Banner from './routes/Banner'
import Home from './routes/Home'
import Interstitial from './routes/Interstitial'
import RewardVideo from './routes/RewardVideo'

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
              Banner
            </Link>
            <Link as={RouterLink} to="/interstitial">
              Interstitial
            </Link>
            <Link as={RouterLink} to="/reward-video">
              Reward Video
            </Link>
          </HStack>
        </Box>
        <Box>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="banner" element={<Banner />} />
            <Route path="interstitial" element={<Interstitial />} />
            <Route path="reward-video" element={<RewardVideo />} />
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
