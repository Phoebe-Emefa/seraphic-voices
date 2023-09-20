import { List, ListIcon, ListItem } from "@chakra-ui/react";
import React from "react";
import { MdFiberManualRecord } from "react-icons/md";

const CustomList = ({
  listItems,
  color,
}: {
  listItems: string[];
  color?: string;
}) => {
  return (
    <List spacing={3}>
      {listItems?.map((listItem) => (
        <ListItem
          key={listItem}
          color={color || "text"}
          pl={{ base: 0, md: 4, lg: 0 }}
          fontSize="lg"
        >
          <ListIcon
            as={MdFiberManualRecord}
            boxSize={3}
            color={"primary"}
            verticalAlign="middle"
          />
          {listItem}
        </ListItem>
      ))}
    </List>
  );
};

export default CustomList;
