import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'

interface AppProps {}

const Home: React.FC = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000)
    return () => clearTimeout(timer)
  }, [count, setCount])

  return (
    <p>
      Page has been open for <code>{count}</code> seconds.
    </p>
  )
}

const App: React.FC<AppProps> = ({}) => {
  return (
    <div className="App">
      <header className="App-header">
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
