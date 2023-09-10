

import DesktopHero from '@/components/home/Hero/DesktopHero';
import MobileHero from '@/components/home/Hero/MobileHero';
import { useMediaQuery } from '@chakra-ui/react';
import React from 'react';

const Hero = () => {
  const [isMobile] = useMediaQuery('(max-width: 750px)');

  return <>{isMobile ? <MobileHero /> : <DesktopHero />}</>;
};

export default Hero;
