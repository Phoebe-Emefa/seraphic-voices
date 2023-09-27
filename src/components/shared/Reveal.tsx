import { Box } from '@chakra-ui/react';
import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: string;
  height?: any;
  isLoading?: boolean;
}

const Reveal = ({ children, width, height, isLoading }: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView || isLoading) {
      slideControls.start('visible');
      mainControls.start('visible');
    } else {
      slideControls.start('hidden');
      mainControls.start('hidden');
    }
  }, [isInView, isLoading, mainControls, slideControls]);

  return (
    <Box
      ref={ref}
      position="relative"
      width={width || 'fit-content'}
      overflow="hidden"
      height={height}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75, scale: 0.8 },
          visible: { opacity: 1, y: 0, scale: 1 }
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          variants={{
            hidden: { scale: 0 },
            visible: { scale: 1 }
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 1 }}
        >
          {children}
        </motion.div>
      </motion.div>

      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: '100%' }
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 1, ease: 'easeIn' }}
        style={{
          position: 'absolute',
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          background: '#F7F7F7',
          zIndex: 20
        }}
      />
    </Box>
  );
};

export default Reveal;
