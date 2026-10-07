import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { Flex } from "@/imports/core/components/Flex";
import useKanbanStore from "@/imports/dashboard/kanban/store/kanbanStore";
import { statusConfig } from "@/imports/dashboard/kanban/api/constants";

const Projects = () => {
  const { tasks } = useKanbanStore();
  return (
    <Card
      title="Projects"
      showLink={true}
      linkText="Open board →"
      linkHref={"/kanban"}
    >
      <ProjectList>
        {tasks.map((task, i) => {
          const status = statusConfig[task.status];
          return (
            <ProjectRow href="/kanban" key={i}>
              <ProjectInfo>
                <ProjectName align="center" gap="8px">
                  <Dot $color={status?.color} />
                  {task.title}
                </ProjectName>

                <Meta>128 · 6 members · due Aug 24</Meta>
              </ProjectInfo>

              <ProgressSection>
                <ProgressLabel>
                  <span>Progress</span>
                  <span>{Math.floor(Math.random() * 100) + 1}%</span>
                </ProgressLabel>

                <ProgressTrack>
                  <ProgressBar
                    $progress={Math.floor(Math.random() * 100) + 1}
                    $color={status?.color}
                  />
                </ProgressTrack>
              </ProgressSection>

              <Status $color={status?.color} $type={task.status}>
                {status?.label}
              </Status>
            </ProjectRow>
          );
        })}
      </ProjectList>
    </Card>
  );
};

export default Projects;

const ProjectList = styled.div`
  width: 100%;
`;
const ProjectRow = styled.a`
  display: grid;
  grid-template-columns: minmax(0px, 1fr) 120px 70px;
  gap: 16px;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid rgb(248, 250, 252);
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: rgb(248, 250, 252);
    cursor: pointer;
  }
`;
const ProjectInfo = styled.div`
  width: 185px;
  min-width: 185px;
`;
const ProjectName = styled(Flex)`
  font-size: 14px;
  font-weight: 600;
  color: rgb(15, 23, 42);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Dot = styled.span`
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;
const Meta = styled.div`
  margin-top: 3px;
  font-size: 11px;
  line-height: 14px;
  color: rgb(100, 116, 139);
  white-space: nowrap;
`;
const ProgressSection = styled.div`
  width: 120px;
  flex-shrink: 0;
`;
const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 10px;
  color: rgb(148, 163, 184);
`;
const ProgressTrack = styled.div`
  width: 100%;
  height: 4px;
  overflow: hidden;
  border-radius: 4px;
  background: rgb(241, 245, 249);
`;
const ProgressBar = styled.div`
  width: ${({ $progress }) => `${$progress}%`};
  height: 100%;
  border-radius: 4px;
  background: ${({ $color }) => $color};
`;
const Status = styled.span`
  margin-left: auto;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  white-space: nowrap;
  color: ${({ $color }) => $color};
  background: ${({ $type }) => {
    switch ($type) {
      case "backlog":
        return "rgba(250, 248, 227, 1)";

      case "in_progress":
        return "rgba(221, 234, 250, 1)";

      case "review":
        return "rgba(239, 228, 250, 1)";

      case "done":
        return "rgba(221, 244, 234, 1)";

      default:
        return "rgb(241, 245, 249)";
    }
  }};
`;
