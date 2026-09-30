"use client";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { steps } from "@/imports/onboarding/api/constant";

const OnboardingProgress = () => {
  const pathname = usePathname();
  const currentStep =
    steps.find((step) => pathname.startsWith(step.path))?.number || 1;

  return (
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

          return (
            <Step key={step.stepNum}>
              <StepNumber $active={active} $completed={completed}>
                {step.stepNum}
              </StepNumber>

              <StepName $active={active}>{step.name}</StepName>
            </Step>
          );
        })}
      </Steps>
      <Skip href="/dashboard">Skip setup</Skip>
    </Header>
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
const Step = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
`;
const StepNumber = styled.div`
  width: 23px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? "#eef0ff" : "white")};
  border: 1px solid ${({ $active }) => ($active ? "#eef0ff" : "#dce3ed")};
  color: ${({ $active }) => ($active ? "var(--blue-accent)" : "#8a9aad")};
  font-size: 12px;
`;
const StepName = styled.span`
  font-size: 13px;
  color: ${({ $active }) => ($active ? "#172033" : "#8a9aad")};
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
`;
const Skip = styled(Link)`
  color: #526174;
  font-size: 13px;
  text-decoration: none;
`;
