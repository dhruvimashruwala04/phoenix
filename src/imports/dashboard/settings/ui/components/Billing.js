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
      <Header>
        <div>
          <Title>Current plan</Title>
          <Subtitle> Billed {billing} · renews Jul 1, 2026 </Subtitle>{" "}
        </div>
        <BillingToggle>
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
  background: #ffffff;
  border: 1px solid #edf1f6;
  border-radius: 13px;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.035);
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 17px;
  @media (max-width: 520px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;
const Title = styled.h3`
  margin: 0;
  color: #111827;
  font-size: 16px;
  font-weight: 650;
`;
const Subtitle = styled.p`
  margin: 4px 0 0;
  color: #64748b;
  font-size: 12px;
`;
const BillingToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 4px;
  border-radius: 9px;
  background: #f1f5f9;
`;
const BillingOption = styled.button`
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  background: ${({ $active }) => ($active ? "#ffffff" : "transparent")};
  color: ${({ $active }) => ($active ? "#4f46e5" : "#64748b")};
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
`;
const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
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
  background: ${({ $current }) => ($current ? "#f8faff" : "#ffffff")};
`;
const PlanName = styled.h4`
  margin: 0 0 8px;
  color: #111827;
  font-size: 14px;
  font-weight: 650;
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
  color: #64748b;
  font-size: 12px;
`;
const Description = styled.p`
  margin: 0 0 10px;
  color: #64748b;
  font-size: 12px;
  line-height: 17px;
`;
const PlanButton = styled.button`
  width: 100%;
  min-height: 35px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: ${({ $current }) => ($current ? "#edf2ff" : "#4f46e5")};
  color: ${({ $current }) => ($current ? "#4f46e5" : "#ffffff")};
  font-size: 12px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  transition: background 150ms ease;
  &:not(:disabled):hover {
    background: #4338ca;
  }
`;
