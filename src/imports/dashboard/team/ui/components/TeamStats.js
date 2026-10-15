"use client";
import { Flex } from "@/imports/core/components/Flex";
import useOnboardingStore from "@/imports/onboarding/store/onboardingStore";
import { useState } from "react";
import styled from "styled-components";

const TeamStats = ({ active, pendingInvites, requests }) => {
  const { invites } = useOnboardingStore();
  const [seats, setSeats] = useState(15);

  const stats = [
    {
      title: "Seats used",
      value: `${invites.length + 1} of ${seats}`,
      buttonText: `+ Add 5 seats`,
      type: "seats",
    },
    {
      title: "Active members",
      value: active,
      type: "members",
    },
    {
      title: "Pending invites",
      value: pendingInvites,
      type: "pending",
    },
    {
      title: "Access requests",
      value: requests,
      type: "requests",
    },
  ];

  return (
    <Container>
      {stats.map((stat) => (
        <Card key={stat.title} direction="column">
          {stat.type === "seats" ? (
            <>
              <SeatsHeader align="center" justify="space-between">
                <Title>{stat.title}</Title>
                <SeatsValue>{stat.value}</SeatsValue>
              </SeatsHeader>

              <ProgressTrack>
                <ProgressFill
                  $progress={((invites.length + 1) / seats) * 100}
                />
              </ProgressTrack>

              <Button
                type="button"
                onClick={() => setSeats((prev) => prev + 5)}
              >
                {stat.buttonText}
              </Button>
            </>
          ) : (
            <>
              <Title>{stat.title}</Title>
              <Value $type={stat.type}>{stat.value}</Value>
            </>
          )}
        </Card>
      ))}
    </Container>
  );
};

export default TeamStats;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(Flex)`
  min-width: 0;
  min-height: 88px;
  padding: 16px 20px;
  gap: 5px;
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
`;

const SeatsHeader = styled(Flex)`
  width: 100%;
  gap: 8px;
`;

const Title = styled.span`
  color: #94a3b8;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
`;

const SeatsValue = styled.span`
  color: #0f172a;
  font-size: 12px;
  line-height: 18px;
  font-weight: 700;
  white-space: nowrap;
`;

const Value = styled.span`
  color: ${({ $type }) =>
    $type === "pending"
      ? "#5145ed"
      : $type === "requests"
        ? "#ff941f"
        : "#0f172a"};
  font-size: 22px;
  font-weight: 700;
  line-height: 26px;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 6px;
  margin-top: 1px;
  overflow: hidden;
  border-radius: 20px;
  background: #edf1f7;
`;

const ProgressFill = styled.div`
  width: ${({ $progress }) => $progress}%;
  height: 100%;
  border-radius: inherit;
  background: #5145ed;
`;

const Button = styled.button`
  align-self: flex-start;
  border: 0;
  background: transparent;
  padding: 0;
  margin-top: 3px;
  color: #5145ed;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: #3730a3;
  }
`;
