import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import { Router } from 'wouter'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import useHashLocation from './useHashLocation'

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Router hook={useHashLocation}>
      <ChakraProvider theme={theme}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
