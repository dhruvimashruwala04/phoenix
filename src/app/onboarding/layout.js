"use client";

import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";

import { Flex } from "@/imports/core/components/Flex";
import OnboardingProgress from "@/imports/onboarding/ui/components/OnboardingProgress";
import { steps } from "@/imports/onboarding/api/constant";
import { LeftArrow, RightArrow } from "@/imports/onboarding/ui/assets/Icons";

const OnboardingLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const currentStep =
    steps.find((step) => pathname.startsWith(step.href)) || steps[0];

  const isFirstStep = currentStep.stepNum === 1;
  const isLastStep = currentStep.stepNum === steps.length;

  const handleBack = () => {
    if (!isFirstStep) {
      router.push(steps[currentStep.stepNum - 2].href);
    }
  };

  const handleContinue = () => {
    if (!isLastStep) {
      router.push(steps[currentStep.stepNum].href);
    } else {
      router.push("/onboarding/dashboard");
    }
  };

  return (
    <Page direction="column" align="stretch">
      <OnboardingProgress />

      <Content>
        <Header>
          <StepText>Step {currentStep.stepNum} of 5</StepText>

          <Title>{currentStep.title}</Title>

          <SubText>{currentStep.subText}</SubText>
        </Header>

        <Card>{children}</Card>

        <Footer>
          {isFirstStep ? (
            <div />
          ) : (
            <BackButton onClick={handleBack}>
              <LeftArrow /> Back
            </BackButton>
          )}

          <ContinueButton onClick={handleContinue}>
            {isLastStep ? "Finish" : "Continue"} <RightArrow />
          </ContinueButton>
        </Footer>
      </Content>
    </Page>
  );
};

export default OnboardingLayout;
const Page = styled(Flex)`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #f7f9fc;
`;

const Content = styled.main`
  width: 100%;
  max-width: 660px;
  margin: 0 auto;
  padding: 48px 0;
`;

const Header = styled.div`
  margin-bottom: 26px;
`;

const StepText = styled.div`
  margin-bottom: 8px;
  color: var(--blue-accent);
  font-size: 13px;
  font-weight: 600;
`;

const Title = styled.h1`
  margin: 0 0 8px;
  color: #111827;
  font-size: 29px;
  line-height: 1.2;
  font-weight: 700;
`;

const SubText = styled.p`
  margin: 0;
  color: #64748b;
  font-size: 15px;
  line-height: 1.5;
`;

const Card = styled.div`
  width: 100%;
  padding: 28px 26px;
  background: white;
  border: 1px solid #edf0f4;
  border-radius: 14px;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;

const BackButton = styled.button`
  height: 46px;
  padding: 0 18px;

  border: 1px solid #dce3ed;
  border-radius: 8px;

  background: white;
  color: #172033;

  font-size: 14px;
  font-weight: 500;

  cursor: pointer;

  &:hover {
    background-color: #f8fafc;
  }
`;

const ContinueButton = styled.button`
  height: 46px;
  padding: 0 24px;

  border: none;
  border-radius: 8px;

  background-color: var(--blue-accent);
  color: white;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  &:hover {
    background-color: #463bd1;
  }
`;

const Arrow = styled.span`
  font-size: 17px;
  line-height: 1;
`;
