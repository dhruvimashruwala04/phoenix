"use client";

import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import useOnboardingStore from "../../store/onboardingStore";
import { UserEmpty, UserFilled, Workspace } from "../assets/Icons";
import { Folder } from "@/imports/core/assets/Icons";
import { useRouter } from "next/navigation";
import useAuthStore from "@/imports/auth/store/authStore";

const Done = () => {
  const { role, workspaceName, workspaceUrl, invites, projectName, view } =
    useOnboardingStore();
  const { user } = useAuthStore();

  const firstName = user?.name?.split(" ")[0];
  const router = useRouter();

  const summary = [
    {
      label: "You",
      value: user?.name + " · " + role,
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
  border-radius: var(--radius-full);
  background-color: #e8faf4;
  color: var(--emerald-500);
  font-size: var(--fs-32);
  font-weight: var(--fw-600);
`;

const Title = styled.h1`
  margin: 0 0 8px;
  color: var(--gray-900);
  font-size: var(--fs-32);
  line-height: var(--lh-tight);
  font-weight: var(--fw-700);
  text-align: center;
`;

const SubText = styled.p`
  margin: 0 0 30px;
  color: var(--text-muted);
  font-size: var(--fs-15);
  line-height: var(--lh-normal);
  text-align: center;
`;

const SummaryCard = styled.div`
  width: 100%;
  overflow: hidden;
  background: var(--white);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-14);
  box-shadow: 0 2px 6px var(--shadow-sm);
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
  border-radius: var(--radius-10);
  background-color: var(--indigo-50);
  color: var(--blue-accent);
  font-size: var(--fs-18);
`;

const SummaryText = styled.div`
  flex: 1;
  text-align: left;
`;

const Label = styled.div`
  margin-bottom: 3px;
  color: var(--text-muted);
  font-size: var(--fs-12);
`;

const Value = styled.div`
  color: var(--text-heading);
  font-size: var(--fs-14);
  font-weight: var(--fw-600);
`;

const EditButton = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  color: var(--blue-accent);
  font-size: var(--fs-12);
  font-weight: var(--fw-600);
  cursor: pointer;
`;
