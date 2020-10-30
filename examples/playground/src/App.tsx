import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './routes/Home'

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return (
    <div>
      <header>
        <p>AdMob Plus</p>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
