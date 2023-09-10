import {
  Flex,
  Text,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";

interface ISingleMenu {
  menu: {
    label: string;
    path?: string;
    subMenus?: { label: string; path: string }[];
  };
  fontSize?: string;
  color?: string;
}

const SingleMenu: React.FC<ISingleMenu> = ({ menu, color, fontSize }) => {
  const pathname = usePathname();
  const isActive = pathname === menu?.path;
  const [showSubmenu, setShowSubmenu] = useState(false);

  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  return (
    <Box
      position="relative"
    >
      {menu?.subMenus && (
        <Menu>
          <MenuButton as={Button} rightIcon={<Icon as={FiChevronDown} />}>
            {menu?.label}
          </MenuButton>
          <MenuList>
            {menu?.subMenus?.map((subMenu) => (
              <Link key={subMenu?.label} href={subMenu?.path}>
                <MenuItem>{subMenu?.label} </MenuItem>
              </Link>
            ))}
          </MenuList>
        </Menu>
      )}
      {menu?.path && (
        <Link href={menu?.path && (menu?.path as string)}>
          <Flex
            direction="column"
            justify="center"
            cursor="pointer"
            onMouseEnter={toggleSubmenu}
          >
            <Text
              fontWeight={isActive ? 700 : 500}
              fontSize={fontSize || "lg"}
              color={isActive ? "secondary.700" : color || "black"}
              borderBottom={isActive ? "4px solid #244983" : "none"}
              py={4}
              width="fit-content"
            >
              {menu?.label}
            </Text>
          </Flex>
        </Link>
      )}
    </Box>
  );
};

export default SingleMenu;
