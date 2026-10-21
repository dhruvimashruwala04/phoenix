"use client";
import { Flex } from "@/imports/core/components/Flex";
import { ArrowLeft } from "@/imports/core/assets/Icons";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import useForgotPasswordForm from "../../hooks/useForgotPasswordForm";
import ResendLinkSuccess from "./ResendLinkSuccess";
import PrimaryButton from "@/imports/core/components/PrimaryButton";
import ErrorBox from "@/imports/core/components/ErrorBox";
import Input from "@/imports/core/components/Input";

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
        <ArrowLeft />
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
  font-size: var(--fs-13);
  font-weight: var(--fw-500);
  display: flex;
  gap: 8px;
  align-items: center;
  color: var(--text-muted);
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
