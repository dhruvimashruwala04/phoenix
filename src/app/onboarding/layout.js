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
      router.push("/");
    }
  };

  return (
    <Page direction="column" align="stretch">
      <OnboardingProgress />

      <Content>
        {isLastStep ? (
          <DoneContent>{children}</DoneContent>
        ) : (
          <>
            <Header>
              <StepText>Step {currentStep.stepNum} of 5</StepText>
              <Title>{currentStep.title}</Title>
              <SubText>{currentStep.subText}</SubText>
            </Header>

            <Card>{children}</Card>
          </>
        )}

        <Footer align="center" justify="space-between">
          {isFirstStep || isLastStep ? (
            <div />
          ) : (
            <BackButton onClick={handleBack}>
              <LeftArrow /> Back
            </BackButton>
          )}

          <FooterRight align="center" gap="28px">
            {currentStep.stepNum === 3 && (
              <SkipButton
                onClick={() => router.push("/onboarding/first-project")}
              >
                Skip for now
              </SkipButton>
            )}

            <ContinueButton onClick={handleContinue}>
              {currentStep.stepNum === 4
                ? "Create Project "
                : currentStep.stepNum === 5
                  ? "Go to Workspace "
                  : "Continue "}

              <RightArrow />
            </ContinueButton>
          </FooterRight>
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
const DoneContent = styled.div`
  width: 100%;
`;
const Header = styled.div`
  margin-bottom: 26px;
`;
const StepText = styled.div`
  margin-bottom: 8px;
  color: var(--blue-accent);
  font-size: var(--fs-13);
  font-weight: var(--fw-600);
`;
const Title = styled.h1`
  margin: 0 0 8px;
  color: var(--gray-900);
  font-size: 29px;
  line-height: var(--lh-tight);
  font-weight: var(--fw-700);
`;
const SubText = styled.p`
  margin: 0;
  color: var(--text-muted);
  font-size: var(--fs-15);
  line-height: var(--lh-normal);
`;
const Card = styled.div`
  width: 100%;
  padding: 28px 26px;
  background: var(--white);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-14);
  box-shadow: 0 2px 6px var(--shadow-sm);
`;
const Footer = styled(Flex)`
  width: 100%;
  margin-top: 30px;
`;
const BackButton = styled.button`
  height: 46px;
  padding: 0 18px;
  border: 1px solid var(--border-input);
  border-radius: var(--radius-8);
  background: var(--white);
  font-size: var(--fs-14);
  font-weight: var(--fw-500);
  cursor: pointer;
  &:hover {
    background-color: var(--slate-50);
  }
`;
const ContinueButton = styled.button`
  height: 46px;
  padding: 0 24px;
  border: none;
  border-radius: var(--radius-8);
  background-color: var(--blue-accent);
  color: var(--white);
  font-size: var(--fs-14);
  font-weight: var(--fw-600);
  cursor: pointer;
  &:hover {
    background-color: var(--blue-accent-hover);
  }
`;
const FooterRight = styled(Flex)`
`;
const SkipButton = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: var(--fs-14);
  cursor: pointer;
  &:hover {
    color: var(--text-heading);
  }
`;
