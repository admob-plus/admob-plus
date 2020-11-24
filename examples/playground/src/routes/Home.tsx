import { Button } from '@chakra-ui/react'
import React from 'react'

const Home: React.FC = () => {
  return (
    <div>
      <Button
        onClick={() => {
          window.location.reload()
        }}
      >
        reload
      </Button>
    </div>
  )
}

export default Home
