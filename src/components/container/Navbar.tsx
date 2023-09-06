import {
  Box,
  Container,
  Flex,
  Icon,
  useDisclosure,
  useMediaQuery
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CgMenuRight } from 'react-icons/cg';

import logo from '../../../public/images/seraphic-voices.png';
import { menus } from '@/utils/misc';
import CustomButton from '@/components/shared/CustomButton';
import MenuItem from '@/components/container/MenuItem';
import MenuDrawer from '@/components/container/MenuDrawer';



const NavBar = () => {
  const [isMobileOrTablet] = useMediaQuery('(max-width: 1250px)');
  const [currentPath, setCurrentPath] = React.useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      h={20}
      top={0}
      as="nav"
      w="full"
      zIndex={60}
      pos="fixed"
      bg="secondary.100"
      shadow={1000}
    >
      <Container
        display="flex"
        h="full"
        alignItems="center"
        justifyContent="space-between"
        maxW={{ md: '2xl', lg: '4xl', xl: '6xl', '3xl': '7xl' }}
      >
        <Link href="/" rel="noreferrer" onClick={() => setCurrentPath('')}>
          <Image
            src={logo}
            alt="Seraphic Voices of Toronto"
            // height={isMobileOrTablet ? 20 : 40}
            height={96}
          />
        </Link>
        {isMobileOrTablet ? (
          <Flex align="center">
            <CustomButton
              title="Donate"
              width="6rem"
              height={10}
            />
            <Icon
              as={CgMenuRight}
              boxSize={{ base: 6, xl: 10 }}
              ml={6}
              onClick={onOpen}
            />
          </Flex>
        ) : (
          <Flex align="center" justify="space-between" width="60%">
            {menus?.map(menu => (
              <MenuItem
                key={menu?.path}
               menu={menu}
              />
            ))}
            <CustomButton title="Donate"  />
          </Flex>
        )}
      </Container>
      <MenuDrawer
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default NavBar;
