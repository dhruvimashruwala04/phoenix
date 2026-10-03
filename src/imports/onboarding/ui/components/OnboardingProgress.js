"use client";

import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { steps } from "@/imports/onboarding/api/constant";

const OnboardingProgress = () => {
  const pathname = usePathname();
  const router = useRouter();

  const currentStep =
    steps.find((step) => pathname.startsWith(step.href))?.stepNum || 1;

  const progress = (currentStep / steps.length) * 100;

  const handleStepClick = (step) => {
    if (step.stepNum <= currentStep) {
      router.push(step.href);
    }
  };

  return (
    <>
      <Header>
        <Brand>
          <Logo>
            <img src="/logo.png" alt="logo" />
          </Logo>

          <BrandName>Phoenix</BrandName>
        </Brand>

        <Steps>
          {steps.map((step) => {
            const active = step.stepNum === currentStep;
            const completed = step.stepNum < currentStep;
            const visited = step.stepNum <= currentStep;

            return (
              <Step
                key={step.stepNum}
                type="button"
                $visited={visited}
                onClick={() => handleStepClick(step)}
              >
                <StepNumber $active={active} $completed={completed}>
                  {completed ? "✓" : step.stepNum}
                </StepNumber>

                <StepName $active={active} $completed={completed}>
                  {step.name}
                </StepName>
              </Step>
            );
          })}
        </Steps>

        <Skip href="/">Skip setup</Skip>
      </Header>

      <ProgressTrack>
        <ProgressBar $progress={progress} />
      </ProgressTrack>
    </>
  );
};

export default OnboardingProgress;

const Header = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  background: white;
  border-bottom: 1px solid #e8edf3;
  justify-content: space-between;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 270px;
`;

const Logo = styled.div`
  height: 28px;
  width: 28px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const BrandName = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #172033;
`;

const Steps = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
`;

const Step = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  padding: 0;
  border: none;
  background: transparent;

  cursor: ${({ $visited }) => ($visited ? "pointer" : "default")};
`;

const StepNumber = styled.div`
  width: 23px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  background-color: ${({ $active, $completed }) =>
    $active || $completed ? "var(--blue-accent)" : "white"};

  border: 1px solid
    ${({ $active, $completed }) =>
      $active || $completed ? "var(--blue-accent)" : "#dce3ed"};

  color: ${({ $active, $completed }) =>
    $active || $completed ? "white" : "#8a9aad"};

  font-size: 11px;
  font-weight: 600;
`;

const StepName = styled.span`
  font-size: 13px;

  color: ${({ $active, $completed }) =>
    $active ? "#172033" : $completed ? "#526174" : "#8a9aad"};

  font-weight: ${({ $active }) => ($active ? "600" : "400")};
`;

const Skip = styled(Link)`
  color: #526174;
  font-size: 13px;
  text-decoration: none;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 4px;
  background-color: #eef2f7;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${({ $progress }) => `${$progress}%`};
  background-color: var(--blue-accent);
  transition: width 0.3s ease;
`;
