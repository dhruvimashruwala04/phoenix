"use client";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { MagicWand } from "../assets/Icons";
import { views, tasks } from "../../api/constant";
import useOnboardingStore from "../../store/onboardingStore";

const FirstProjectForm = () => {
  const { projectName, setProjectName, view, setView, aiTasks, setAiTasks } =
    useOnboardingStore();

  return (
    <Form direction="column" gap="22px">
      <Section direction="column" gap="8px">
        <Label>Project name</Label>
        <Input
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
              <ViewIcon align="center" justify="center" $active={active}>{item.icon}</ViewIcon>
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
              <TaskCheckbox align="center" justify="center">✓</TaskCheckbox>
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
  color: #334155;
  font-size: 13px;
  font-weight: 600;
`;
const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #dce3ed;
  border-radius: 7px;
  outline: none;
  color: #172033;
  background: white;
  font-size: 13px;
  &:focus {
    border-color: var(--blue-accent);
  }
  &::placeholder {
    color: #94a3b8;
  }
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
    ${({ $active }) => ($active ? "var(--blue-accent)" : "#dce3ed")};
  border-radius: 12px;
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
  border-radius: 9px;
  background-color: ${({ $active }) =>
    $active ? "var(--blue-accent)" : "#eef2ff"};
  color: ${({ $active }) => ($active ? "white" : "var(--blue-accent)")};
  font-size: 18px;
  font-weight: 600;
`;
const ViewTitle = styled.div`
  margin-bottom: 7px;
  color: #172033;
  font-size: 15px;
  font-weight: 600;
`;
const ViewDescription = styled.div`
  color: #64748b;
  font-size: 12px;
  line-height: 1.5;
`;
const AiBox = styled(Flex)`
  width: 100%;
  min-height: 68px;


  padding: 10px 14px;

  border-radius: 10px;

  background-color: #eef2ff;
`;

const AiIcon = styled(Flex)`
  width: 38px;
  height: 38px;
  margin-right: 12px;
  border-radius: 8px;
  background-color: white;
  color: var(--blue-accent);
  font-size: 18px;
`;
const AiText = styled.div`
  flex: 1;
`;
const AiTitle = styled.div`
  margin-bottom: 2px;
  color: #172033;
  font-size: 13px;
  font-weight: 600;
`;
const AiDescription = styled.div`
  color: #526174;
  font-size: 12px;
`;
const Toggle = styled.button`
  width: 44px;
  height: 24px;
  position: relative;
  padding: 0;
  border: none;
  border-radius: 20px;
  background-color: ${({ $active }) =>
    $active ? "var(--blue-accent)" : "#cbd5e1"};
  cursor: pointer;
`;
const ToggleCircle = styled.span`
  width: 18px;
  height: 18px;
  position: absolute;
  top: 3px;
  left: ${({ $active }) => ($active ? "23px" : "3px")};
  border-radius: 50%;
  background-color: white;
  transition: left 0.2s ease;
`;
const SuggestedSection = styled(Flex)`
  width: 100%;
`;
const SuggestedTitle = styled.div`
  margin-bottom: 1px;
  color: #94a3b8;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;
const Task = styled(Flex)`
`;
const TaskCheckbox = styled(Flex)`
  width: 13px;
  height: 13px;
  border: 1px solid #8b9cff;
  border-radius: 2px;
  color: #647cff;
  font-size: 9px;
  font-weight: 700;
`;
const TaskText = styled.span`
  color: #334155;
  font-size: 13px;
`;
