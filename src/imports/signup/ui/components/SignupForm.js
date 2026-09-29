"use client";
import { Flex } from "@/imports/core/components/Flex";
import {
  CloseEye,
  GitHub,
  Google,
  OpenEye,
} from "@/imports/login/ui/assets/Icons";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import useSignupForm from "../../hooks/useSignupForm";

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
          type="email"
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
          <StrengthBars>
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
      <LoginBtn align="center" justify="center" onClick={handleSignup}>
        Create account
      </LoginBtn>
      <CreateAccount align="center" justify="center">
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
  font-size: 28px;
  line-height: 34px;
  letter-spacing: -0.6px;
  font-weight: 700;
  color: #172033;
`;
const SubText = styled.span`
  color: var(--text-muted);
  font-size: 13px;
`;
const Buttons = styled(Flex)`
  width: 100%;
`;
const Btn = styled(Flex)`
  width: 50%;
  height: 38px;
  border: 1px solid var(--border-muted);
  border-radius: 7px;
  background-color: var(--background);
  font-size: 13px;
  color: #172033;
  &:hover {
    cursor: pointer;
    background-color: #f8fafc;
  }
`;
const Icon = styled(Flex)`
  height: 14px;
  width: 14px;
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
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
  font-size: 11px;
  color: rgb(148, 163, 184);
`;
const Field = styled(Flex)`
  width: 100%;
`;
const Label = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #334155;
`;
const Input = styled.input`
  width: 100%;
  height: 37px;

  border: 1px solid ${({ $error }) => ($error ? "rgb(225, 29, 72)" : "#dce3ed")};
  border-radius: 7px;
  padding: 0 12px;
  outline: none;
  font-size: 13px;
  color: #172033;
  background-color: var(--background);
  &::placeholder {
    color: #8a919b;
  }
  &:focus {
    border-color: var(--blue-accent);
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
  input {
    padding-right: 40px;
  }
`;
const Eye = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 13px;
  cursor: pointer;
`;
const Remember = styled(Flex)`
  width: 100%;
`;
const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  accent-color: var(--blue-accent);
  cursor: pointer;
`;
const IAgree = styled.span`
  font-size: 12px;
  color: #64748b;
`;
const AgreeLink = styled(Link)`
  color: var(--blue-accent);
  &:hover {
    cursor: pointer;
  }
`;
const LoginBtn = styled(Flex)`
  width: 100%;
  height: 38px;
  border-radius: 7px;
  background-color: var(--blue-accent);
  color: white;
  font-size: 13px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
    background-color: #463bd1;
  }
`;
const CreateAccount = styled(Flex)`
  width: 100%;
  gap: 4px;
`;
const CreateText = styled.span`
  font-size: 11px;
  color: var(--text-muted);
`;
const CreateLink = styled(Link)`
  font-size: 11px;
  font-weight: 600;
  color: var(--blue-accent);
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const PasswordText = styled(Flex)`
  width: 100%;
  font-size: 10px;
  color: var(--text-muted-2);
`;
const ErrorBox = styled(Flex)`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  background: rgb(255, 241, 242);
  color: rgb(225, 29, 72);
  font-size: 13px;
`;
const StrengthContainer = styled.div`
  width: 100%;
  margin-top: -2px;
`;

const StrengthBars = styled.div`
  display: flex;
  gap: 4px;
  width: 100%;
`;

const StrengthBar = styled.span`
  flex: 1;
  height: 3px;
  border-radius: 4px;
  background-color: ${({ $active }) => ($active ? "#10B981" : "#E2E8F0")};
`;

const StrengthText = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 10px;
  color: #10b981;
  justify-self: flex-start;
`;
