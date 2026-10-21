"use client";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { initialsColors } from "../../api/constant";
import { Tick } from "../assets/Icons";
import useOnboardingStore from "../../store/onboardingStore";
import Input from "@/imports/core/components/Input";

const WorkspaceForm = () => {
  const {
    workspaceName,
    setWorkspaceName,
    workspaceUrl,
    setWorkspaceUrl,
    selectedColor,
    setSelectedColor,
  } = useOnboardingStore();

  return (
    <Form direction="column" gap="22px">
      {/* <Section direction="column" gap="8px"> */}
      {/* <Label>Workspace name</Label> */}
      <Input
        label="Workspace name"
        value={workspaceName}
        onChange={(e) => setWorkspaceName(e.target.value)}
        placeholder="Acme Inc."
      />
      {/* </Section> */}

      <Section direction="column" gap="6px">
        <Label>Workspace URL</Label>
        <UrlInput align="center">
          <UrlPrefix align="center">phoenix.app/</UrlPrefix>
          <input
            value={workspaceUrl}
            onChange={(e) => setWorkspaceUrl(e.target.value)}
          />
        </UrlInput>
        {workspaceUrl && (
          <Available align="center" gap="5px">
            <Tick />
            phoenix.app/{workspaceUrl} is available
          </Available>
        )}
      </Section>

      <Section direction="column" gap="10px">
        <Label>Workspace icon</Label>

        <IconRow align="center" gap="10px">
          <InitialIcon align="center" justify="center" $color={selectedColor}>
            {workspaceName.charAt(0).toUpperCase() || "A"}
          </InitialIcon>

          {initialsColors.map((color) => (
            <ColorButton
              key={color}
              type="button"
              $color={color}
              $active={selectedColor === color}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </IconRow>
      </Section>
    </Form>
  );
};

export default WorkspaceForm;

const Form = styled(Flex)`
  width: 100%;
`;
const Section = styled(Flex)`
  width: 100%;
`;
const Label = styled.label`
  font-size: var(--fs-12);
  font-weight: var(--fw-600);
  color: var(--slate-600);
`;
const UrlInput = styled(Flex)`
  width: 100%;
  height: 40px;
  border: 1px solid var(--border-input);
  border-radius: var(--radius-7);
  overflow: hidden;
  background-color: var(--white);
  > input {
    height: 100%;
    width: 100%;
    padding: 0 12px;
    border: 0px;
    border-radius: var(--radius-7);
    &:focus {
      outline: none;
      box-shadow: 0px 0px 0px 1px var(--blue-accent) inset;
    }
  }
`;
const UrlPrefix = styled(Flex)`
  height: 100%;
  padding: 0 12px;
  background-color: var(--slate-50);
  border-right: 1px solid var(--border-input);
  color: var(--gray-500);
  font-size: var(--fs-13);
`;
const Available = styled(Flex)`
  color: #00a878;
  font-size: var(--fs-12);
  font-weight: var(--fw-500);
`;
const IconRow = styled(Flex)``;
const InitialIcon = styled(Flex)`
  width: 48px;
  height: 48px;
  border-radius: var(--radius-9);
  background-color: ${({ $color }) => $color};
  color: var(--white);
  font-size: var(--fs-20);
  font-weight: var(--fw-600);
`;
const ColorButton = styled.button`
  width: 38px;
  height: 38px;
  padding: 0;
  border: ${({ $active }) => ($active ? "2px solid white" : "none")};
  border-radius: var(--radius-full);
  background-color: ${({ $color }) => $color};
  cursor: pointer;
  box-shadow: ${({ $active, $color }) =>
    $active ? `0 0 0 2px ${$color}` : "none"};
  transition: transform 0.15s ease;
  &:hover {
    transform: scale(1.05);
  }
`;
