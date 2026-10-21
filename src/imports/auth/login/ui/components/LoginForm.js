"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { CloseEye, GitHub, Google } from "../assets/Icons";
import { OpenEye } from "@/imports/core/assets/Icons";
import useLoginForm from "../../hooks/useLoginForm";
import Link from "next/link";
import ErrorBox from "@/imports/core/components/ErrorBox";
import PrimaryButton from "@/imports/core/components/PrimaryButton";
import Input from "@/imports/core/components/Input";

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
      <Input
        label="Work email"
        type="email"
        placeholder="you@company.com"
        value={email}
        $error={emailError}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError(false);
        }}
      />

      <PasswordWrapper>
        <Input
          label="Password"
          action={<Forgot href="/forgot-password">Forgot password?</Forgot>}
          type={showPass ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          $error={passwordError}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(false);
          }}
        />
        <Eye onClick={togglePass}>{showPass ? <CloseEye /> : <OpenEye />}</Eye>
      </PasswordWrapper>

      <Remember align="center" gap="8px">
        <Checkbox type="checkbox" defaultChecked />
        <RememberText>Keep me signed in for 30 days</RememberText>
      </Remember>
      {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
      <PrimaryButton onClick={handleLogin}>Log in</PrimaryButton>
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
const Forgot = styled(Link)`
  font-size: var(--fs-11);
  font-weight: var(--fw-400);
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
  top: 40px;
  transform: translateY(-50%);
  color: var(--text-muted-2);
  font-size: var(--fs-13);
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
  font-size: var(--fs-12);
  color: var(--text-muted);
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
const Demo = styled(Flex)`
  width: 100%;
  font-size: var(--fs-10);
  color: var(--text-muted-2);
`;
