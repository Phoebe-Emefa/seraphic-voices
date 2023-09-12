import { Flex, Text, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface ISingleMenu {
  menu: {
    label: string;
    path?: string;
    subMenus?: { label: string; path: string }[];
  };
  fontSize?: string;
  color?: string;
  onClose?: () => void;
}

const SingleMenu: React.FC<ISingleMenu> = ({
  menu,
  color,
  fontSize,
  onClose,
}) => {
  const pathname = usePathname();
  const isActive = pathname === menu?.path;
  const [showSubmenu, setShowSubmenu] = useState(false);

  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  return (
    <Box position="relative">
      {menu?.path && (
        <Link
          href={menu?.path && (menu?.path as string)}
          onClick={onClose ? () => onClose() : undefined}
        >
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
