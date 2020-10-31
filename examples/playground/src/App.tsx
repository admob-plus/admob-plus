import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Banner from './routes/Banner'
import Home from './routes/Home'

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return (
    <div>
      <header>
        <p>AdMob Plus</p>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/banner">Banner</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="banner" element={<Banner />} />
      </Routes>
    </div>
  )
}

export default App
