"use client";
import ErrorBox from "@/imports/core/components/ErrorBox";
import { Flex } from "@/imports/core/components/Flex";
import PrimaryButton from "@/imports/core/components/PrimaryButton";
import { EnvelopeClose } from "@/imports/auth/login/ui/assets/Icons";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const VerifyOtpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [otpError, setOtpError] = useState("");

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const verifyOtp = () => {
    if (otp.join("") == "123456") {
      router.push("/");
    } else {
      setOtpError("Invalid OTP. Try again.");
    }
  };

  return (
    <Wrapper direction="column" gap="14px">
      <IconHolder>
        <EnvelopeClose />
      </IconHolder>
      <Text>Verify your email</Text>
      <SubText>
        Enter the 6-digit code we sent to <Bold>{email}</Bold>.
      </SubText>
      <OtpContainer gap="8px">
        {otp.map((value, index) => (
          <OtpInput
            key={index}
            value={value}
            maxLength={1}
            inputMode="numeric"
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            onChange={(e) => handleOtpChange(e, index)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !otp[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
              }
            }}
          />
        ))}
      </OtpContainer>
      <PrimaryButton onClick={verifyOtp}>Verify & continue</PrimaryButton>
      {otpError && <ErrorBox>{otpError}</ErrorBox>}

      <ResendOtp align="center" justify="center" gap="4px">
        <ResendText>Didn't get it?</ResendText>
        <ResendLink href="/">Resend</ResendLink>
      </ResendOtp>
      <Demo align="center" justify="center">
        Demo: any 6 digit works
      </Demo>
    </Wrapper>
  );
};

export default VerifyOtpForm;
const Wrapper = styled(Flex)``;
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
  text-align: left;
`;
const IconHolder = styled.span`
  width: 48px;
  height: 48px;
  border-radius: var(--radius-12);
  background: var(--indigo-50);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--fs-20);
`;
const Bold = styled.span`
  font-weight: bolder;
  color: var(--black);
`;
const ResendOtp = styled(Flex)`
  width: 100%;
`;
const ResendText = styled.span`
  font-size: var(--fs-13);
  color: var(--text-muted);
`;
const ResendLink = styled(Link)`
  font-size: var(--fs-13);
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
const OtpContainer = styled(Flex)`
  width: 100%;
`;
const OtpInput = styled.input`
  width: 60px;
  height: 52px;
  border: 1px solid var(--border-input);
  border-radius: var(--radius-8);
  outline: none;
  text-align: center;
  font-size: var(--fs-22);
  font-weight: var(--fw-600);
  color: var(--text-heading);
  background: var(--background);
  &:focus {
    border: 2px solid var(--blue-accent);
  }
  &:hover {
    border-color: var(--blue-accent);
  }
`;
