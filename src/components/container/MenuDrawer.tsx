import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import CustomButton from "@/components/shared/CustomButton";
import { menus } from "@/utils/misc";
import SingleMenu from "@/components/container/SingleMenu";

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
           <Box height={40} width={60}>
               <Image
                src="/images/seraphic-voices.png"
                alt="Seraphic Voices of Torontp"
                height="100%"
                width="100%"
                objectFit="cover"
               
              />
           </Box>
            <Icon as={IoCloseSharp} boxSize={8} onClick={() => onClose()} />
          </Flex>
        </DrawerHeader>

        <DrawerBody>
          <Box >
            {menus?.map((menu) => (
              <SingleMenu
                key={menu?.path}
                menu={menu}
                fontSize="3xl"
                color="secondary.500"
                onClose={onClose}
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
