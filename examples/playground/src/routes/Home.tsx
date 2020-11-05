import React from 'react'

const Home: React.FC = () => {
  return (
    <div>
      <button
        onClick={() => {
          window.location.reload()
        }}
      >
        reload
      </button>
    </div>
  )
}

export default Home
