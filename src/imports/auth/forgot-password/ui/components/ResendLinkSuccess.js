import { Flex } from "@/imports/core/components/Flex";
import { EnvelopeOpen } from "@/imports/auth/login/ui/assets/Icons";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import styled from "styled-components";

const ResendLinkSuccess = ({ email }) => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Wrapper direction="column" gap="14px">
      <IconHolder>
        <EnvelopeOpen />
      </IconHolder>
      <Text>Check your inbox</Text>
      <SubText>
        We sent a reset link to <Bold>{email}</Bold>. It expires in 30 minutes.
      </SubText>
      <ResendBtn align="center" justify="center">
        Resend
      </ResendBtn>
    </Wrapper>
  );
};

export default ResendLinkSuccess;
const Wrapper = styled(Flex)``;
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
  text-align: left;
`;
const ResendBtn = styled(Flex)`
  height: 40px;
  padding: 0px 16px;
  border-radius: 8px;
  border: 0px;
  background: var(--white);
  box-shadow: var(--border-muted) 0px 0px 0px 1px inset;
  font-size: 13px;
  cursor: pointer;
`;
const IconHolder = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--emerald-50);
  color: var(--emerald-500);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;
const Bold = styled.span`
  font-weight: bolder;
  color: black;
`;
