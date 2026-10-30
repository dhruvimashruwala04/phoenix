"use client";
import React from "react";
import GanttHeader from "../components/GanttHeader";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import Stats from "../components/Stats";
import Cards from "../components/Cards";
import GanttView from "../components/GanttView";
import { useState } from "react";

const GanttPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Page direction="column">
      <GanttHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Content gap="24px" direction="column">
        <Stats />
        <GanttView searchQuery={searchQuery} />
        <Cards />
      </Content>
    </Page>
  );
};

export default GanttPage;

const Page = styled(Flex)`
  width: 100%;
  height: 100vh;
  overflow: auto;
`;
const Content = styled(Flex)`
  width: 100%;
  padding: 24px;
  min-width: 0;
  min-height: 0;
  flex-shrink: 0;
`;
