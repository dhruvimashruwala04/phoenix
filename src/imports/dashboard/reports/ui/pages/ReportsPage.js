"use client";
import { Flex } from "@/imports/core/components/Flex";
import React from "react";
import styled from "styled-components";
import Stats from "../components/Stats";
import Charts from "../components/Charts";
import Members from "../components/Members";
import ViewToolbar from "../components/ViewToolbar";
import useReports from "../../hooks/useReports";
import CommonHeader from "@/imports/core/components/CommonHeader";

const ReportsPage = () => {
  const {
    searchQuery,
    setSearchQuery,
    data,
    projOptions,
    selectedProj,
    setSelectedProj,
    view,
    setView,
    sortedMembers,
    sortBy,
    setSortBy,
  } = useReports();

  return (
    <Page direction="column">
      <CommonHeader
        title="Reports"
        description="Delivery analytics across projects"
        placeholder="Search reports..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Content direction="column" gap="24px">
        <ViewToolbar
          projOptions={projOptions}
          selectedProj={selectedProj}
          setSelectedProj={setSelectedProj}
          view={view}
          setView={setView}
        />
        <Stats data={data} />
        <Charts data={data} />
        <Members
          sortedMembers={sortedMembers}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </Content>
    </Page>
  );
};

export default ReportsPage;

const Page = styled(Flex)`
  width: 100%;
  height: 100vh;
  overflow: auto;
`;
const Content = styled(Flex)`
  width: 100%;
  padding: 24px;
`;
