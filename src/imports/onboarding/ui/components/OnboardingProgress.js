"use client";

import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
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
        <Brand align="center" gap="10px">
          <Logo>
            <img src="/logo.png" alt="logo" />
          </Logo>

          <BrandName>Phoenix</BrandName>
        </Brand>

        <Steps align="center" gap="28px">
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
                <StepNumber align="center" justify="center" $active={active} $completed={completed}>
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
  background: var(--white);
  border-bottom: 1px solid #e8edf3;
  justify-content: space-between;
`;

const Brand = styled(Flex)`
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
  font-size: var(--fs-16);
  font-weight: var(--fw-700);
  color: var(--text-heading);
`;

const Steps = styled(Flex)`
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

const StepNumber = styled(Flex)`
  width: 23px;
  height: 23px;
  border-radius: var(--radius-full);

  background-color: ${({ $active, $completed }) =>
    $active || $completed ? "var(--blue-accent)" : "white"};

  border: 1px solid
    ${({ $active, $completed }) =>
      $active || $completed ? "var(--blue-accent)" : "var(--border-input)"};

  color: ${({ $active, $completed }) =>
    $active || $completed ? "white" : "var(--text-faint)"};

  font-size: var(--fs-11);
  font-weight: var(--fw-600);
`;

const StepName = styled.span`
  font-size: var(--fs-13);

  color: ${({ $active, $completed }) =>
    $active ? "var(--text-heading)" : $completed ? "var(--text-secondary)" : "var(--text-faint)"};

  font-weight: ${({ $active }) => ($active ? "600" : "400")};
`;

const Skip = styled(Link)`
  color: var(--text-secondary);
  font-size: var(--fs-13);
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
