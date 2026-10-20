"use client";
import { Flex } from "@/imports/core/components/Flex";
import { BackArrow } from "@/imports/auth/login/ui/assets/Icons";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import useForgotPasswordForm from "../../hooks/useForgotPasswordForm";
import ResendLinkSuccess from "./ResendLinkSuccess";
import PrimaryButton from "@/imports/core/components/PrimaryButton";
import ErrorBox from "@/imports/core/components/ErrorBox";

const ForgotPasswordForm = () => {
  const {
    email,
    setEmail,
    emailError,
    setEmailError,
    handleResendLink,
    errorMessage,
    success,
  } = useForgotPasswordForm();

  return (
    <FormBox direction="column" gap="24px">
      <BackText href="/login">
        <BackArrow />
        Back to log in
      </BackText>
      {success ? (
        <ResendLinkSuccess email={email} />
      ) : (
        <>
          <Header direction="column" gap="5px">
            <Text>Reset your password</Text>
            <SubText>Enter your email and we'll send a reset link.</SubText>
          </Header>

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

          {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
          <PrimaryButton
            align="center"
            justify="center"
            onClick={handleResendLink}
          >
            Send reset link
          </PrimaryButton>
        </>
      )}
    </FormBox>
  );
};

export default ForgotPasswordForm;
const FormBox = styled(Flex)`
  max-width: 400px;
  width: 100%;
`;
const BackText = styled(Link)`
  font-size: 13px;
  font-weight: 500;
  display: flex;
  gap: 8px;
  align-items: center;
  color: var(--text-muted);
`;
const Header = styled(Flex)``;
const Text = styled.span`
  font-size: 28px;
  line-height: 34px;
  letter-spacing: -0.6px;
  font-weight: 700;
  color: var(--text-heading);
`;
const SubText = styled.span`
  color: var(--text-muted);
  font-size: 13px;
`;
const Field = styled(Flex)`
  width: 100%;
`;
const Label = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: var(--slate-700);
`;
const Input = styled.input`
  width: 100%;
  height: 37px;
  border: 1px solid ${({ $error }) => ($error ? "var(--rose-600)" : "var(--border-input)")};
  border-radius: 7px;
  padding: 0 12px;
  outline: none;
  font-size: 13px;
  color: var(--text-heading);
  background-color: var(--background);
  &::placeholder {
    color: var(--text-subtle);
  }
  &:focus {
    border-color: var(--blue-accent);
  }
`;
