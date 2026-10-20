"use client";
import { Flex } from "@/imports/core/components/Flex";
import { CloseEye, GitHub, Google } from "@/imports/auth/login/ui/assets/Icons";
import { OpenEye } from "@/imports/core/assets/Icons";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import useSignupForm from "../../hooks/useSignupForm";
import ErrorBox from "@/imports/core/components/ErrorBox";
import PrimaryButton from "@/imports/core/components/PrimaryButton";
import Input from "@/imports/core/components/Input";

const SignupForm = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    nameError,
    setNameError,
    emailError,
    setEmailError,
    passwordError,
    handlePasswordChange,
    passwordStrength,
    errorMessage,
    handleSignup,
  } = useSignupForm();
  const [showPass, setShowPass] = useState(false);
  const togglePass = () => {
    setShowPass(!showPass);
  };

  return (
    <FormBox direction="column" gap="24px">
      <Header direction="column" gap="5px">
        <Text>Create your account</Text>
        <SubText>Free for teams up to 5. No credit card needed.</SubText>
      </Header>
      <Buttons gap="10px">
        <Btn gap="10px" align="center" justify="center">
          <Icon>
            <Google />
          </Icon>
          <Name>Google</Name>
        </Btn>
        <Btn gap="10px" align="center" justify="center">
          <Icon>
            <GitHub />
          </Icon>
          <Name>GitHub</Name>
        </Btn>
      </Buttons>
      <Line align="center" gap="10px">
        <HLine />
        <DividerText>or </DividerText>
        <HLine />
      </Line>
      <Field direction="column" gap="7px">
        <Label>Full Name</Label>
        <Input
          type="text"
          placeholder="John Smith"
          value={name}
          $error={nameError}
          onChange={(e) => {
            setName(e.target.value);
            setNameError(false);
          }}
        />
      </Field>
      <Field direction="column" gap="7px">
        <Label>Work email</Label>
        <Input
          type="email"
          placeholder="you@company.com"
          value={email}
          $error={emailError}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
          }}
        />
      </Field>
      <Field direction="column" gap="7px">
        <Label>Password</Label>
        <PasswordWrapper>
          <Input
            type={showPass ? "text" : "password"}
            placeholder="At least 8 characters"
            value={password}
            $error={passwordError}
            onChange={handlePasswordChange}
          />
          <Eye onClick={togglePass}>
            {showPass ? <CloseEye /> : <OpenEye />}
          </Eye>
        </PasswordWrapper>
        <StrengthContainer>
          <StrengthBars align="stretch" gap="4px">
            {[1, 2, 3, 4, 5].map((bar) => (
              <StrengthBar key={bar} $active={bar <= passwordStrength} />
            ))}
          </StrengthBars>

          {passwordStrength > 0 && (
            <StrengthText>
              {passwordStrength < 3 ? "Weak password" : "Strong password"}
            </StrengthText>
          )}
        </StrengthContainer>
        <PasswordText>Use 8+ characters with a number and symbol</PasswordText>
      </Field>
      <Remember align="center" gap="8px">
        <Checkbox type="checkbox" />
        <IAgree>
          I agree to the <AgreeLink href="/terms">Terms </AgreeLink>
          and <AgreeLink href="/privacy-policy"> Privacy Policy</AgreeLink>
        </IAgree>
      </Remember>
      {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
      <PrimaryButton onClick={handleSignup}>Create account</PrimaryButton>
      <CreateAccount gap="4px" align="center" justify="center">
        <CreateText>Already have an account?</CreateText>
        <CreateLink href="/login">Log in</CreateLink>
      </CreateAccount>
    </FormBox>
  );
};

export default SignupForm;
const FormBox = styled(Flex)`
  max-width: 400px;
  width: 100%;
`;
const Header = styled(Flex)``;
const Text = styled.span`
  font-size: var(--fs-28);
  line-height: var(--lh-34);
  letter-spacing: var(--ls-tight);
  font-weight: var(--fw-700);
  color: var(--text-heading);
`;
const SubText = styled.span`
  color: var(--text-muted);
  font-size: var(--fs-13);
`;
const Buttons = styled(Flex)`
  width: 100%;
`;
const Btn = styled(Flex)`
  width: 50%;
  height: 38px;
  border: 1px solid var(--border-muted);
  border-radius: var(--radius-7);
  background-color: var(--background);
  font-size: var(--fs-13);
  color: var(--text-heading);
  &:hover {
    cursor: pointer;
    background-color: var(--slate-50);
  }
`;
const Icon = styled(Flex)`
  height: 14px;
  width: 14px;
`;
const Name = styled.span`
  font-size: var(--fs-13);
  font-weight: var(--fw-500);
`;
const Line = styled(Flex)`
  color: var(--border-muted);
  width: 100%;
`;
const HLine = styled.span`
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--border-muted);
`;
const DividerText = styled.span`
  flex-shrink: 0;
  font-size: var(--fs-11);
  color: var(--text-muted-2);
`;
const Field = styled(Flex)`
  width: 100%;
`;
const Label = styled.span`
  font-size: var(--fs-12);
  font-weight: var(--fw-600);
  color: var(--slate-700);
`;
const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;
const Eye = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted-2);
  font-size: var(--fs-13);
  cursor: pointer;
`;
const Remember = styled(Flex)`
  width: 100%;
`;
const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  border-radius: var(--radius-4);
  accent-color: var(--blue-accent);
  cursor: pointer;
`;
const IAgree = styled.span`
  font-size: var(--fs-12);
  color: var(--text-muted);
`;
const AgreeLink = styled(Link)`
  color: var(--blue-accent);
  &:hover {
    cursor: pointer;
  }
`;
const CreateAccount = styled(Flex)`
  width: 100%;
`;
const CreateText = styled.span`
  font-size: var(--fs-11);
  color: var(--text-muted);
`;
const CreateLink = styled(Link)`
  font-size: var(--fs-11);
  font-weight: var(--fw-600);
  color: var(--blue-accent);
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const PasswordText = styled(Flex)`
  width: 100%;
  font-size: var(--fs-10);
  color: var(--text-muted-2);
`;
const StrengthContainer = styled.div`
  width: 100%;
  margin-top: -2px;
`;
const StrengthBars = styled(Flex)`
  width: 100%;
`;
const StrengthBar = styled.span`
  flex: 1;
  height: 3px;
  border-radius: var(--radius-4);
  background-color: ${({ $active }) =>
    $active ? "var(--emerald-500)" : "var(--border-muted)"};
`;
const StrengthText = styled.span`
  display: block;
  margin-top: 5px;
  font-size: var(--fs-10);
  color: var(--emerald-500);
  justify-self: flex-start;
`;
