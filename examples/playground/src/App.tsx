import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Banner from './routes/Banner'
import Home from './routes/Home'
import Interstitial from './routes/Interstitial'

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
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="banner" element={<Banner />} />
        <Route path="interstitial" element={<Interstitial />} />
      </Routes>
    </div>
  )
}

export default App
