"use client";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { MagicWand } from "../assets/Icons";
import { views, tasks } from "../../api/constant";
import useOnboardingStore from "../../store/onboardingStore";
import Input from "@/imports/core/components/Input";

const FirstProjectForm = () => {
  const { projectName, setProjectName, view, setView, aiTasks, setAiTasks } =
    useOnboardingStore();

  return (
    <Form direction="column" gap="22px">
      <Section direction="column" gap="8px">
        <Label>Project name</Label>
        <Input
          height="40px"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Website Redesign"
        />
      </Section>

      <ViewContainer>
        {views.map((item) => {
          const active = view === item.name;
          return (
            <ViewCard
              key={item.name}
              $active={active}
              onClick={() => setView(item.name)}
            >
              <ViewIcon align="center" justify="center" $active={active}>
                {item.icon}
              </ViewIcon>
              <ViewTitle>{item.name}</ViewTitle>
              <ViewDescription>{item.description}</ViewDescription>
            </ViewCard>
          );
        })}
      </ViewContainer>

      <AiBox align="center">
        <AiIcon align="center" justify="center">
          <MagicWand />
        </AiIcon>
        <AiText>
          <AiTitle>Let AI draft starter tasks</AiTitle>
          <AiDescription>
            Generates a first backlog from your project name
          </AiDescription>
        </AiText>

        <Toggle
          type="button"
          $active={aiTasks}
          onClick={() => setAiTasks((prev) => !prev)}
        >
          <ToggleCircle $active={aiTasks} />
        </Toggle>
      </AiBox>

      {aiTasks && (
        <SuggestedSection direction="column" gap="8px">
          <SuggestedTitle>SUGGESTED TASKS</SuggestedTitle>

          {tasks.map((task) => (
            <Task align="center" gap="8px" key={task}>
              <TaskCheckbox align="center" justify="center">
                ✓
              </TaskCheckbox>
              <TaskText>{task}</TaskText>
            </Task>
          ))}
        </SuggestedSection>
      )}
    </Form>
  );
};

export default FirstProjectForm;

const Form = styled(Flex)`
  width: 100%;
`;
const Section = styled(Flex)`
  width: 100%;
`;
const Label = styled.label`
  color: var(--slate-700);
  font-size: var(--fs-13);
  font-weight: var(--fw-600);
`;
const ViewContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;
const ViewCard = styled.button`
  min-height: 155px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  border: 1px solid
    ${({ $active }) => ($active ? "var(--blue-accent)" : "var(--border-input)")};
  border-radius: var(--radius-12);
  background: ${({ $active }) => ($active ? "#f5f4ff" : "white")};
  box-shadow: ${({ $active }) =>
    $active ? "0 0 0 1px var(--blue-accent)" : "none"};
  text-align: left;
  cursor: pointer;
`;
const ViewIcon = styled(Flex)`
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
  border-radius: var(--radius-9);
  background-color: ${({ $active }) =>
    $active ? "var(--blue-accent)" : "var(--indigo-50)"};
  color: ${({ $active }) => ($active ? "white" : "var(--blue-accent)")};
  font-size: var(--fs-18);
  font-weight: var(--fw-600);
`;
const ViewTitle = styled.div`
  margin-bottom: 7px;
  color: var(--text-heading);
  font-size: var(--fs-15);
  font-weight: var(--fw-600);
`;
const ViewDescription = styled.div`
  color: var(--text-muted);
  font-size: var(--fs-12);
  line-height: var(--lh-normal);
`;
const AiBox = styled(Flex)`
  width: 100%;
  min-height: 68px;

  padding: 10px 14px;

  border-radius: var(--radius-10);

  background-color: var(--indigo-50);
`;

const AiIcon = styled(Flex)`
  width: 38px;
  height: 38px;
  margin-right: 12px;
  border-radius: var(--radius-8);
  background-color: var(--white);
  color: var(--blue-accent);
  font-size: var(--fs-18);
`;
const AiText = styled.div`
  flex: 1;
`;
const AiTitle = styled.div`
  margin-bottom: 2px;
  color: var(--text-heading);
  font-size: var(--fs-13);
  font-weight: var(--fw-600);
`;
const AiDescription = styled.div`
  color: var(--text-secondary);
  font-size: var(--fs-12);
`;
const Toggle = styled.button`
  width: 44px;
  height: 24px;
  position: relative;
  padding: 0;
  border: none;
  border-radius: var(--radius-20);
  background-color: ${({ $active }) =>
    $active ? "var(--blue-accent)" : "var(--slate-300)"};
  cursor: pointer;
`;
const ToggleCircle = styled.span`
  width: 18px;
  height: 18px;
  position: absolute;
  top: 3px;
  left: ${({ $active }) => ($active ? "23px" : "3px")};
  border-radius: var(--radius-full);
  background-color: var(--white);
  transition: left 0.2s ease;
`;
const SuggestedSection = styled(Flex)`
  width: 100%;
`;
const SuggestedTitle = styled.div`
  margin-bottom: 1px;
  color: var(--text-muted-2);
  font-size: var(--fs-11);
  font-weight: var(--fw-700);
  letter-spacing: 0.5px;
`;
const Task = styled(Flex)``;
const TaskCheckbox = styled(Flex)`
  width: 13px;
  height: 13px;
  border: 1px solid #8b9cff;
  border-radius: 2px;
  color: #647cff;
  font-size: var(--fs-9);
  font-weight: var(--fw-700);
`;
const TaskText = styled.span`
  color: var(--slate-700);
  font-size: var(--fs-13);
`;
