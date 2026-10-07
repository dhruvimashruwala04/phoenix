"use client";
import AiPanel from "../components/AiPanel";
import styled from "styled-components";
import KanbanHeader from "../components/KanbanHeader";
import { Flex } from "@/imports/core/components/Flex";
import NewTaskModal from "../components/NewTaskModal";
import useKanbanStore from "../../store/kanbanStore";
import KanbanStats from "../components/KanbanStats";
import ViewToolbar from "../components/ViewToolbar";
import BoardView from "../components/BoardView";
import TableView from "../components/TableView";
import AllTaskView from "../components/AllTaskView";
import useKanbanView from "../../hooks/useKanbanView";

const KanbanPage = () => {
  const { aiPanel, showTask, view } = useKanbanStore();
  const { columns, getSortedTasks, sortedTasks } = useKanbanView();

  return (
    <Page $aiOpen={aiPanel}>
      <LeftSection direction="column">
        <KanbanHeader />

        {showTask && <NewTaskModal />}

        <Content direction="column" gap="24px">
          <KanbanStats />

          <ViewToolbar />

          {view === "board" ? (
            <BoardView columns={columns} getSortedTasks={getSortedTasks} />
          ) : view === "table" ? (
            <TableView tasks={sortedTasks} />
          ) : (
            <AllTaskView tasks={sortedTasks} />
          )}
        </Content>
      </LeftSection>

      {aiPanel && <AiPanel />}
    </Page>
  );
};

export default KanbanPage;

const Page = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: ${({ $aiOpen }) =>
    $aiOpen ? "minmax(0, 1fr) 335px" : "1fr"};
`;
const LeftSection = styled(Flex)`
  min-width: 0;
  min-height: 0;
  height: 100%;
`;
const Content = styled(Flex)`
  flex: 1 1 0%;
  min-height: 0;
  padding: 24px 24px 110px;
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;
  scrollbar-width: thin;
`;
