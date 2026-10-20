import React from "react";
import OverViewHeader from "../components/OverViewHeader";
import StatsCards from "../components/StatsCards";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import OverviewCards from "../components/OverviewCards";
import useKanbanStore from "@/imports/dashboard/kanban/store/kanbanStore";
import { useSearchParams } from "next/navigation";
import { projects } from "@/imports/dashboard/kanban/api/constants";

const OverviewPage = () => {
  const { tasks } = useKanbanStore();

  const searchParams = useSearchParams();
  const projName = searchParams.get("project") || null;

  const projByFilter = projName
    ? projects.filter((proj) => proj.value === projName)
    : projects;

  const tasksByProj = projName
    ? tasks.filter((task) => task.projName === projName)
    : tasks;

  return (
    <Page direction="column">
      <OverViewHeader />
      <Content direction="column" gap="24px">
        <StatsCards />
        <OverviewCards tasksByProj={tasksByProj} projByFilter={projByFilter} />
      </Content>
    </Page>
  );
};

export default OverviewPage;
const Page = styled(Flex)`
  width: 100%;
`;
const Content = styled(Flex)`
  width: 100%;
  padding: 24px;
`;
