"use client";
import { Flex } from "@/imports/core/components/Flex";
import React from "react";
import styled from "styled-components";
import AddModal from "../components/AddModal";
import DView from "../components/DView";
import useDependencies from "../../hooks/useDependencies";
import CommonHeader from "@/imports/core/components/CommonHeader";

const DependenciesPage = () => {
  const {
    showModal,
    setShowModal,
    tasks,
    blockedTask,
    setBlockedTask,
    blockingTask,
    setBlockingTask,
    handleLink,
    dependencies,
    blockedOnly,
    setBlockedOnly,
    handleUnlink,
    searchQuery,
    setSearchQuery,
  } = useDependencies();

  return (
    <Page direction="column">
      <CommonHeader
        title="Dependencies"
        description="What blocks what"
        placeholder="Search dependencies..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Content direction="column" gap="24px">
        <AddModal
          dependencies={dependencies}
          setShowModal={setShowModal}
          showModal={showModal}
          tasks={tasks}
          blockedTask={blockedTask}
          setBlockedTask={setBlockedTask}
          blockingTask={blockingTask}
          setBlockingTask={setBlockingTask}
          handleLink={handleLink}
          blockedOnly={blockedOnly}
          setBlockedOnly={setBlockedOnly}
        />
        <DView
          dependencies={dependencies}
          blockedOnly={blockedOnly}
          handleUnlink={handleUnlink}
          searchQuery={searchQuery}
        />
      </Content>
    </Page>
  );
};

export default DependenciesPage;

const Page = styled(Flex)`
  width: 100%;
  height: 100vh;
  overflow: auto;
`;
const Content = styled(Flex)`
  width: 100%;
  padding: 24px;
`;
