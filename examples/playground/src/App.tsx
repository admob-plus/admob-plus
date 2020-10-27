import React, { useEffect, useState } from 'react'
import './App.css'

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000)
    return () => clearTimeout(timer)
  }, [count, setCount])

  return (
    <div className="App">
      <header className="App-header">
        <p>AdMob Plus</p>
        <p>
          Page has been open for <code>{count}</code> seconds.
        </p>
      </header>
    </div>
  )
}

export default App
