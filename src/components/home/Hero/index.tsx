

import DesktopHero from '@/components/home/Hero/DesktopHero';
import MobileHero from '@/components/home/Hero/MobileHero';
import { useMediaQuery } from '@chakra-ui/react';
import React from 'react';

const Hero = ({content}: {content: any;}) => {
  const [isMobile] = useMediaQuery('(max-width: 750px)');

  return <>{isMobile ? <MobileHero content={content} /> : <DesktopHero content={content}  />}</>;
};

export default Hero;
