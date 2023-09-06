import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { usePathname } from "next/navigation";

interface IMenuItem {
 menu: {
  label: string;
  path: string;
 }
 fontSize?: string
 color?: string
}

const MenuItem: React.FC<IMenuItem> = ({
menu,
color,
fontSize
}) => {
    const pathname = usePathname();

  const isActive = pathname === menu?.path;


  return (
    <Flex direction="column" justify="center" cursor="pointer">
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
  );
};

export default MenuItem;
