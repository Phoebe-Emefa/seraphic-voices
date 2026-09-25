"use client";

import { NavPendingBar, NavPendingText } from "@/components/shared/NavLinkStatus";
import { Flex, Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface ISingleMenu {
  menu: {
    label: string;
    path?: string;
  };
  fontSize?: string;
  color?: string;
  activeBorderColor?: string;
  onClose?: () => void;
}

const SingleMenu: React.FC<ISingleMenu> = ({
  menu,
  color,
  fontSize,
  activeBorderColor,
  onClose,
}) => {
  const pathname = usePathname();
  const isActive = pathname === menu.path;
  const resolvedActiveColor = activeBorderColor || "#244983";

  if (!menu.path) return null;

  return (
    <Box position="relative">
      <Link href={menu.path} onClick={onClose} style={{ display: "block" }}>
        <Flex direction="column" justify="center">
          <NavPendingText
            isActive={isActive}
            fontWeight={isActive ? 700 : 500}
            fontSize={fontSize || "lg"}
            color={isActive ? resolvedActiveColor : color || "black"}
            borderBottom={
              isActive
                ? `3px solid ${resolvedActiveColor}`
                : "3px solid transparent"
            }
            py={4}
            width="fit-content"
            transition="border-color 160ms cubic-bezier(0.23, 1, 0.32, 1), opacity 120ms ease-out"
          >
            {menu.label}
          </NavPendingText>
        </Flex>
        <NavPendingBar
          variant="underline"
          color={isActive ? resolvedActiveColor : "secondary.500"}
        />
      </Link>
    </Box>
  );
};

export default SingleMenu;
