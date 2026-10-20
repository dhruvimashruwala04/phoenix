import { Flex } from "@/imports/core/components/Flex";
import { plans } from "@/imports/dashboard/team/api/constant";
import React, { useState } from "react";
import styled from "styled-components";

const Billing = () => {
  const [billing, setBilling] = useState("monthly");
  const [currentPlan, setCurrentPlan] = useState("Starter");

  const handlePlanChange = (planName) => {
    setCurrentPlan(planName);
  };

  return (
    <Card>
      <Header justify="space-between" align="center" gap="16px">
        <TitleWrapper direction="column">
          <Title>Current plan</Title>
          <Subtitle> Billed {billing} · renews Jul 1, 2026 </Subtitle>{" "}
        </TitleWrapper>
        <BillingToggle gap="3px">
          <BillingOption
            type="button"
            $active={billing === "monthly"}
            onClick={() => setBilling("monthly")}
          >
            Monthly
          </BillingOption>
          <BillingOption
            type="button"
            $active={billing === "yearly"}
            onClick={() => setBilling("yearly")}
          >
            Yearly -20%
          </BillingOption>
        </BillingToggle>
      </Header>

      <PlanGrid>
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.name;
          const price =
            billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
          return (
            <PlanCard key={plan.name} $current={isCurrent}>
              <PlanName>{plan.name}</PlanName>
              <PriceRow>
                <Price>
                  $
                  {Number.isInteger(price)
                    ? price
                    : price.toFixed(2).replace(/0$/, "")}
                </Price>
                <PriceUnit>/ seat / mo</PriceUnit>
              </PriceRow>
              <Description>{plan.description}</Description>
              <PlanButton
                type="button"
                $current={isCurrent}
                disabled={isCurrent}
                onClick={() => handlePlanChange(plan.name)}
              >
                {isCurrent ? "Current plan" : `Switch to ${plan.name}`}
              </PlanButton>
            </PlanCard>
          );
        })}
      </PlanGrid>
    </Card>
  );
};

export default Billing;

const Card = styled.section`
  width: 100%;
  padding: 24px;
  box-sizing: border-box;
  background: var(--white);
  border: 1px solid var(--border-soft);
  border-radius: 13px;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.035);
`;
const Header = styled(Flex)`
  margin-bottom: 17px;
`;
const TitleWrapper = styled(Flex)``;
const Title = styled.span`
  font-size: 16px;
  font-weight: 700;
`;
const Subtitle = styled.span`
  color: var(--text-muted);
  font-size: 12px;
`;
const BillingToggle = styled(Flex)`
  padding: 4px;
  border-radius: 9px;
  background: var(--slate-100);
`;
const BillingOption = styled.button`
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  background: ${({ $active }) => ($active ? "var(--white)" : "transparent")};
  color: ${({ $active }) => ($active ? "var(--blue-accent)" : "var(--text-muted)")};
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
`;
const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;
const PlanCard = styled.div`
  min-width: 0;
  padding: 16px;
  border: ${({ $current }) =>
    $current ? "2px solid #5146ff" : "1px solid #dce5f0"};
  border-radius: 12px;
  background: ${({ $current }) => ($current ? "#f8faff" : "var(--white)")};
`;
const PlanName = styled.span`
  font-size: 14px;
  font-weight: 700;
`;
const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 5px;
  margin-bottom: 8px;
`;
const Price = styled.span`
  font-size: 26px;
  font-weight: 700;
`;
const PriceUnit = styled.span`
  color: var(--text-muted);
  font-size: 12px;
`;
const Description = styled.span`
  font-size: 12px;
  color: var(--text-muted);
`;
const PlanButton = styled.button`
  width: 100%;
  min-height: 35px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: ${({ $current }) => ($current ? "#edf2ff" : "var(--blue-accent)")};
  color: ${({ $current }) => ($current ? "var(--blue-accent)" : "var(--white)")};
  font-size: 12px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  transition: background 150ms ease;
  &:not(:disabled):hover {
    background: var(--indigo-700);
  }
`;
