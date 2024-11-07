import React from 'react'
import  TypeWriter from '../components/TypeWriter'
import { FloatingDockDemo } from '../components/FloatingDock'
import ImageUpload from '../components/ImageUpload'
//import Footer from '../components/Footer'

function Home() {
  return (
    <>
        <TypeWriter speed={200}/>
        <ImageUpload />
        
  
        <FloatingDockDemo />
    </>
  )
}

export default Home