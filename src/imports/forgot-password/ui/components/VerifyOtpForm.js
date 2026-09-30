"use client";
import ErrorBox from "@/imports/core/components/ErrorBox";
import { Flex } from "@/imports/core/components/Flex";
import PrimaryButton from "@/imports/core/components/PrimaryButton";
import { EnvelopeClose } from "@/imports/login/ui/assets/Icons";
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
      <OtpContainer>
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
      <PrimaryButton align="center" justify="center" onClick={verifyOtp}>
        Verify & continue
      </PrimaryButton>
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
  font-size: 28px;
  line-height: 34px;
  letter-spacing: -0.6px;
  font-weight: 700;
  color: #172033;
`;
const SubText = styled.span`
  color: var(--text-muted);
  font-size: 13px;
  text-align: left;
`;
const IconHolder = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #eef2ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;
const Bold = styled.span`
  font-weight: bolder;
  color: black;
`;
const ResendOtp = styled(Flex)`
  width: 100%;
`;
const ResendText = styled.span`
  font-size: 13px;
  color: var(--text-muted);
`;
const ResendLink = styled(Link)`
  font-size: 13px;
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
const OtpContainer = styled(Flex)`
  width: 100%;
  gap: 8px;
`;

const OtpInput = styled.input`
  width: 60px;
  height: 52px;
  border: 1px solid #dce3ed;
  border-radius: 8px;
  outline: none;
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  color: #172033;
  background: var(--background);
  &:focus {
    border: 2px solid var(--blue-accent);
  }
  &:hover {
    border-color: var(--blue-accent);
  }
`;
