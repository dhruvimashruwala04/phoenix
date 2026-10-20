"use client";

import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import useOnboardingStore from "../../store/onboardingStore";
import { Folder, UserEmpty, UserFilled, Workspace } from "../assets/Icons";
import { useRouter } from "next/navigation";

const Done = () => {
  const {
    name,
    role,
    workspaceName,
    workspaceUrl,
    invites,
    projectName,
    view,
  } = useOnboardingStore();

  const firstName = name.split(" ")[0];
  const router = useRouter();

  const summary = [
    {
      label: "You",
      value: name + " · " + role,
      icon: <UserEmpty />,
      href: "/onboarding/about-you",
    },
    {
      label: "Workspace",
      value: workspaceName + " · " + "phoenix.app/" + workspaceUrl,
      icon: <Workspace />,
      href: "/onboarding/workspace",
    },
    {
      label: "Invitations",
      value:
        invites.length > 0
          ? invites.length === 1
            ? "1 teammate invited"
            : invites.length + " teammates invited"
          : "No invites yet",
      icon: <UserFilled />,
      href: "/onboarding/invite-team",
    },
    {
      label: "First project",
      value: projectName + " · " + view,
      icon: <Folder />,
      href: "/onboarding/first-project",
    },
  ];

  return (
    <Wrapper direction="column" align="center">
      <SuccessIcon align="center" justify="center">
        ✓
      </SuccessIcon>

      <Title>You're all set, {firstName}</Title>

      <SubText>Your workspace is ready. Here's what we set up:</SubText>

      <SummaryCard>
        {summary.map((item) => (
          <SummaryRow align="center" key={item.label}>
            <IconBox align="center" justify="center">
              {item.icon}
            </IconBox>

            <SummaryText>
              <Label>{item.label}</Label>
              <Value>{item.value}</Value>
            </SummaryText>

            <EditButton type="button" onClick={() => router.push(item.href)}>
              Edit
            </EditButton>
          </SummaryRow>
        ))}
      </SummaryCard>
    </Wrapper>
  );
};

export default Done;

const Wrapper = styled(Flex)`
  width: 100%;
`;

const SuccessIcon = styled(Flex)`
  width: 70px;
  height: 70px;
  margin-bottom: 18px;
  border-radius: 50%;
  background-color: #e8faf4;
  color: var(--emerald-500);
  font-size: 32px;
  font-weight: 600;
`;

const Title = styled.h1`
  margin: 0 0 8px;
  color: var(--gray-900);
  font-size: 32px;
  line-height: 1.2;
  font-weight: 700;
  text-align: center;
`;

const SubText = styled.p`
  margin: 0 0 30px;
  color: var(--text-muted);
  font-size: 15px;
  line-height: 1.5;
  text-align: center;
`;

const SummaryCard = styled.div`
  width: 100%;
  overflow: hidden;
  background: var(--white);
  border: 1px solid var(--border-soft);
  border-radius: 14px;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
`;

const SummaryRow = styled(Flex)`
  min-height: 75px;
  padding: 12px 20px;
  border-bottom: 1px solid var(--border-soft);

  &:last-child {
    border-bottom: none;
  }
`;

const IconBox = styled(Flex)`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  margin-right: 15px;
  border-radius: 10px;
  background-color: var(--indigo-50);
  color: var(--blue-accent);
  font-size: 18px;
`;

const SummaryText = styled.div`
  flex: 1;
  text-align: left;
`;

const Label = styled.div`
  margin-bottom: 3px;
  color: var(--text-muted);
  font-size: 12px;
`;

const Value = styled.div`
  color: var(--text-heading);
  font-size: 14px;
  font-weight: 600;
`;

const EditButton = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  color: var(--blue-accent);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;
