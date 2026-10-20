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
const ResendBtn = styled(Flex)`
  height: 40px;
  padding: 0px 16px;
  border-radius: var(--radius-8);
  border: 0px;
  background: var(--white);
  box-shadow: var(--border-muted) 0px 0px 0px 1px inset;
  font-size: var(--fs-13);
  cursor: pointer;
`;
const IconHolder = styled.span`
  width: 48px;
  height: 48px;
  border-radius: var(--radius-12);
  background: var(--emerald-50);
  color: var(--emerald-500);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--fs-20);
`;
const Bold = styled.span`
  font-weight: bolder;
  color: var(--black);
`;
