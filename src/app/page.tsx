"use client"
import About from '@/components/home/About'
import Contact from '@/components/home/Contact'
import Hero from '@/components/home/Hero'
import Repettoire from '@/components/home/Repettoire'
import UpcomingEvents from '@/components/home/UpcomingEvents'
import React from 'react'
import { useQuery } from 'react-query';
import { groq } from 'next-sanity';
import { client } from '../../sanity/sanity-client'
import DataLoader from '@/components/shared/DataLoader'
import { SEO } from '@/components/shared/SEO'


 

const Home = () => {
    const { isLoading, data } = useQuery('home', async () => {
    return client.fetch(groq`*[_type == "home"]`);
  });

    const content = data?.[0];

  return (
 <>
    <SEO
      title="Home"
      description="Explore the fusion of Western and African music, fostering cross-cultural connections"
      path="/"
    />
 {
  isLoading ? (
    <DataLoader />
  ) : (
       <div>
      <Hero content={content}  />
      <About content={content} />
      <Repettoire />
      <UpcomingEvents />
      <Contact />
      
    </div>
  )
 }
 </>
  )
}

export default Home
