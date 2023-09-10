import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import logo from "../../../public/images/seraphic-voices.png";
import MenuItem from "@/components/container/SingleMenu";
import CustomButton from "@/components/shared/CustomButton";
import { menus } from "@/utils/misc";

const MenuDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="full">
      <DrawerOverlay />
      <DrawerContent px={{ base: 2, md: 8 }} bg="secondary.100">
        <DrawerHeader>
          <Flex justify="space-between" align="center">
            <Link href="/" rel="noreferrer">
              <Image
                src={logo}
                alt="The Talent Empowerment Foundation Logo"
                height={30}
              />
            </Link>
            <Icon as={IoCloseSharp} boxSize={8} onClick={() => onClose()} />
          </Flex>
        </DrawerHeader>

        <DrawerBody>
          <Box mt={10}>
            {menus?.map((menu) => (
              <MenuItem
                key={menu?.path}
                menu={menu}
                fontSize="3xl"
                color="secondary.500"
              />
            ))}
            <Box mt={8}>
              <CustomButton
                title="Donate"
                width="100%"
                height={16}
                fontSize="2xl"
                onClick={() => {
                  onClose();
                }}
              />
            </Box>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MenuDrawer;
