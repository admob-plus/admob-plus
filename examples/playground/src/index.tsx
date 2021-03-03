import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'wouter'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import useHashLocation from './useHashLocation'

if (typeof admob === 'undefined') {
  class Dummy {}

  // @ts-ignore
  window.admob = { BannerAd: Dummy }
}

ReactDOM.render(
  <React.StrictMode>
    <Router hook={useHashLocation}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
