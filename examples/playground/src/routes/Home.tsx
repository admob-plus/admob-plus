import { Button } from '@chakra-ui/react'
import React from 'react'

const initialHref = window.location.href

const reload = () => {
  window.location.href = initialHref
}

const Home: React.FC = () => {
  return (
    <div>
      <Button onClick={reload}>reload</Button>
    </div>
  )
}

export default Home
