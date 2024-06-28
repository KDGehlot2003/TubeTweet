import React from 'react'
import Header from './components/Header'
import Category from './components/Category'
import Card from './components/Card'

const App = () => {
  return (
    <div className=' z-50'>
      <Header />
      <div className=' z-10'>
        <Category />
        <Card />
      </div>
    </div>
  )
}

export default App