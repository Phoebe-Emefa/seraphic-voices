import { teamTabs } from "@/utils/misc";
import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";

const TeamMembers = () => {
  return (
    <Container maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }} py={20}>
      <Tabs isFitted>
        <TabList overflow={{base: "auto", md: "visible "}}> 
          {teamTabs?.map((teamTab) => (
            <Tab
              key={teamTab?.label}
              _selected={{ color: "white", bg: "primary", borderRadius: "sm" }}
              fontSize="xl"
              fontWeight={500}
            >
              {teamTab?.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels >
          {teamTabs?.map((teamTab) => (
            <TabPanel
              px={0}
              key={teamTab?.label}
              _selected={{ color: "white", bg: "primary", borderRadius: "sm" }}
              fontSize="xl"
              fontWeight={500}
            >
              {teamTab?.comp}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default TeamMembers;
