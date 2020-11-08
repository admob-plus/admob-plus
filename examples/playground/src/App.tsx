import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Logs from './components/Logs'
import Banner from './routes/Banner'
import Home from './routes/Home'
import Interstitial from './routes/Interstitial'
import RewardVideo from './routes/RewardVideo'

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return (
    <div>
      <header>
        <p>AdMob Plus</p>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/banner">Banner</Link>
          <Link to="/interstitial">Interstitial</Link>
          <Link to="/reward-video">Reward Video</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="banner" element={<Banner />} />
        <Route path="interstitial" element={<Interstitial />} />
        <Route path="reward-video" element={<RewardVideo />} />
      </Routes>
      <Logs />
    </div>
  )
}

export default App
