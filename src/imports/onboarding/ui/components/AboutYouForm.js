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

          <NameField direction="column" gap="7px">
            <Label>Your name</Label>
            <Input
              value={user?.name || "John Smith"}
              onChange={(e) => updateUser({ name: e.target.value })}
              placeholder="John Smith"
            />
          </NameField>
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
  border-radius: 50%;
  background-color: var(--blue-accent);
  color: var(--white);
  font-size: 18px;
  font-weight: 600;
`;
const NameField = styled(Flex)`
  flex: 1;
`;
const Label = styled.label`
  color: var(--text-heading);
  font-size: 13px;
  font-weight: 600;
`;
const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--border-input);
  border-radius: 7px;
  outline: none;
  color: var(--text-heading);
  background-color: var(--white);
  font-size: 13px;
  &::placeholder {
    color: var(--text-muted-2);
  }
  &:focus {
    border-color: var(--blue-accent);
  }
`;
const Section = styled(Flex)`
  width: 100%;
`;
const RoleContainer = styled(Flex)`
  flex-wrap: wrap;
`;
const RoleButton = styled.button`
  height: 39px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 13px;
  border: 1px solid
    ${({ $active }) => ($active ? "var(--blue-accent)" : "var(--border-input)")};
  border-radius: 20px;
  background-color: ${({ $active }) => ($active ? "#f0efff" : "white")};
  color: ${({ $active }) => ($active ? "var(--blue-accent)" : "var(--text-heading)")};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
`;
const RoleIcon = styled.span`
  font-size: 12px;
`;
const TeamContainer = styled(Flex)`
  width: 100%;
  height: 43px;
  padding: 4px;
  border-radius: 9px;
  background-color: var(--slate-100);
`;
const TeamButton = styled.button`
  flex: 1;
  height: 35px;
  border: none;
  border-radius: 8px;
  background-color: ${({ $active }) => ($active ? "white" : "transparent")};
  color: ${({ $active }) => ($active ? "var(--blue-accent)" : "var(--text-secondary)")};
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? "500" : "400")};
  cursor: pointer;
  box-shadow: ${({ $active }) =>
    $active ? "0 1px 3px rgba(15, 23, 42, 0.08)" : "none"};
`;
