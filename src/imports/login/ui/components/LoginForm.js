"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { CloseEye, GitHub, Google, OpenEye } from "../assets/Icons";
import useLoginForm from "../../hooks/useLoginForm";
import Link from "next/link";

const LoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
    errorMessage,
    handleLogin,
  } = useLoginForm();
  const [showPass, setShowPass] = useState(false);
  const togglePass = () => {
    setShowPass(!showPass);
  };

  return (
    <FormBox direction="column" gap="24px">
      <Header direction="column" gap="5px">
        <Text>Welcome back</Text>
        <SubText>Log in to your Phoenix workspace.</SubText>
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
        <DividerText>or with email</DividerText>
        <HLine />
      </Line>
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
        <PasswordHeader align="center" justify="space-between">
          <Label>Password</Label>
          <Forgot href="/forgot-password">Forgot password?</Forgot>
        </PasswordHeader>
        <PasswordWrapper>
          <Input
            type={showPass ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            $error={passwordError}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
            }}
          />
          <Eye onClick={togglePass}>
            {showPass ? <CloseEye /> : <OpenEye />}
          </Eye>
        </PasswordWrapper>
      </Field>
      <Remember align="center" gap="8px">
        <Checkbox type="checkbox" defaultChecked />
        <RememberText>Keep me signed in for 30 days</RememberText>
      </Remember>
      {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
      <LoginBtn align="center" justify="center" onClick={handleLogin}>
        Log in
      </LoginBtn>
      <CreateAccount align="center" justify="center" gap="4px">
        <CreateText>New to Phoenix?</CreateText>
        <CreateLink href="/signup">Create an account</CreateLink>
      </CreateAccount>
      <Demo align="center" justify="center">
        Demo: any email + a password of 8+ characters
      </Demo>
    </FormBox>
  );
};

export default LoginForm;
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
const PasswordHeader = styled(Flex)`
  width: 100%;
`;
const Forgot = styled(Link)`
  font-size: 11px;
  color: var(--blue-accent);
  &:hover {
    cursor: pointer;
    text-decoration: underline;
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
  width: 14px;
  height: 14px;
  accent-color: var(--blue-accent);
  cursor: pointer;
`;
const RememberText = styled.span`
  font-size: 12px;
  color: #64748b;
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
const Demo = styled(Flex)`
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
