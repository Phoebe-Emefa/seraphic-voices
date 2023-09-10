"use client"
import About from '@/components/home/About'
import Contact from '@/components/home/Contact'
import Hero from '@/components/home/Hero'
import Repettoire from '@/components/home/Repettoire'
import UpcomingEvents from '@/components/home/UpcomingEvents'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Repettoire />
      <UpcomingEvents />
      <Contact />
      
    </div>
  )
}

export default Home
