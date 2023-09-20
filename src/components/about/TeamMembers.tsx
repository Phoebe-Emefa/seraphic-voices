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
import { useQuery } from "react-query";
import { groq } from "next-sanity";
import { client } from "../../../sanity/sanity-client";

const TeamMembers = () => {
    const {  data } = useQuery("team", async () => {
    return client.fetch(groq`*[_type == "team" ]`);
  });

  const sopranoMembers =  data?.filter((item: any) => item?.category === "Soprano")
  const altoMembers =  data?.filter((item: any) => item?.category === "Alto")
  const tenorMembers =  data?.filter((item: any) => item?.category === "Tenor")
  const bassMembers =  data?.filter((item: any) => item?.category === "Bass")
  const organistMembers =  data?.filter((item: any) => item?.category === "Organists")
  const trumpetersMembers =  data?.filter((item: any) => item?.category === "Trumpeters")


  return (
    <Container maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }} py={20}>
      <Tabs isFitted>
        <TabList overflow={{base: "auto", md: "visible "}}> 
          {teamTabs(sopranoMembers,altoMembers,tenorMembers,bassMembers,organistMembers,trumpetersMembers)?.map((teamTab) => (
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
          {teamTabs(sopranoMembers,altoMembers,tenorMembers,bassMembers,organistMembers,trumpetersMembers )?.map((teamTab) => (
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
