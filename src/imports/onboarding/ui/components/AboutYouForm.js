"use client";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { roles, teamSizes } from "../../api/constant";
import {
  Design,
  Engineering,
  Marketing,
  Operations,
  Other,
  Product,
} from "../assets/Icons";
import useOnboardingStore from "../../store/onboardingStore";
import useAuthStore from "@/imports/auth/store/authStore";
import getInitials from "@/imports/core/utils/getInitials";
import Input from "@/imports/core/components/Input";

const AboutYouForm = () => {
  const { user, updateUser } = useAuthStore();
  const { role, setRole, teamSize, setTeamSize } = useOnboardingStore();

  return (
    <>
      <Form direction="column" gap="22px">
        <NameRow align="center" gap="16px">
          <Avatar align="center" justify="center">
            {getInitials(user?.name)}
          </Avatar>

          <Input
            label="Your name"
            value={user?.name || "John Smith"}
            onChange={(e) => updateUser({ name: e.target.value })}
            placeholder="John Smith"
          />
        </NameRow>

        <Section direction="column" gap="10px">
          <Label>What's your role?</Label>

          <RoleContainer align="stretch" gap="8px">
            {roles.map((item) => (
              <RoleButton
                key={item}
                type="button"
                $active={role === item}
                onClick={() => setRole(item)}
              >
                <RoleIcon>
                  {item === "Product" && <Product />}
                  {item === "Design" && <Design />}
                  {item === "Engineering" && <Engineering />}
                  {item === "Marketing" && <Marketing />}
                  {item === "Operations" && <Operations />}
                  {item === "Other" && <Other />}
                </RoleIcon>
                {item}
              </RoleButton>
            ))}
          </RoleContainer>
        </Section>

        <Section direction="column" gap="10px">
          <Label>How big is your team?</Label>

          <TeamContainer align="center">
            {teamSizes.map((size) => (
              <TeamButton
                key={size}
                type="button"
                $active={teamSize === size}
                onClick={() => setTeamSize(size)}
              >
                {size}
              </TeamButton>
            ))}
          </TeamContainer>
        </Section>
      </Form>
    </>
  );
};

export default AboutYouForm;
const Form = styled(Flex)`
  width: 100%;
`;
const NameRow = styled(Flex)`
  width: 100%;
`;
const Avatar = styled(Flex)`
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: var(--radius-full);
  background-color: var(--blue-accent);
  color: var(--white);
  font-size: var(--fs-18);
  font-weight: var(--fw-600);
`;
const Label = styled.label`
  font-size: var(--fs-12);
  font-weight: var(--fw-600);
  color: var(--slate-600);
`;
const Section = styled(Flex)`
  width: 100%;
`;
const RoleContainer = styled(Flex)`
  flex-wrap: wrap;
`;
const RoleButton = styled.button`
  height: 38px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 13px;
  border: 1px solid
    ${({ $active }) => ($active ? "var(--blue-accent)" : "var(--border-input)")};
  border-radius: var(--radius-20);
  background-color: ${({ $active }) =>
    $active ? "var(--indigo-50)" : "white"};
  color: ${({ $active }) =>
    $active ? "var(--blue-accent)" : "var(--text-heading)"};
  font-size: var(--fs-13);
  font-weight: var(--fw-500);
  cursor: pointer;
`;
const RoleIcon = styled.span`
  font-size: var(--fs-12);
`;
const TeamContainer = styled(Flex)`
  width: 100%;
  height: 43px;
  padding: 4px;
  border-radius: var(--radius-9);
  background-color: var(--slate-100);
`;
const TeamButton = styled.button`
  flex: 1;
  height: 35px;
  border: none;
  border-radius: var(--radius-8);
  background-color: ${({ $active }) => ($active ? "white" : "transparent")};
  color: ${({ $active }) =>
    $active ? "var(--blue-accent)" : "var(--text-secondary)"};
  font-size: var(--fs-13);
  font-weight: ${({ $active }) => ($active ? "500" : "400")};
  cursor: pointer;
  box-shadow: ${({ $active }) =>
    $active ? "0 1px 3px var(--shadow-md)" : "none"};
`;
