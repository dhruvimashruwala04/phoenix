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
        <Card gap="5px" key={stat.title} direction="column">
          {stat.type === "seats" ? (
            <>
              <SeatsHeader gap="8px" align="center" justify="space-between">
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
  background: var(--white);
  border: 1px solid var(--slate-100);
  border-radius: var(--radius-12);
  box-shadow: 0 1px 2px var(--shadow-sm);
`;

const SeatsHeader = styled(Flex)`
  width: 100%;
`;

const Title = styled.span`
  color: var(--text-muted-2);
  font-size: var(--fs-12);
  line-height: var(--lh-18);
  font-weight: var(--fw-400);
`;

const SeatsValue = styled.span`
  color: var(--slate-900);
  font-size: var(--fs-12);
  line-height: var(--lh-18);
  font-weight: var(--fw-700);
  white-space: nowrap;
`;

const Value = styled.span`
  color: ${({ $type }) =>
    $type === "pending"
      ? "var(--blue-accent)"
      : $type === "requests"
        ? "#ff941f"
        : "var(--slate-900)"};
  font-size: var(--fs-22);
  font-weight: var(--fw-700);
  line-height: var(--lh-26);
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 6px;
  margin-top: 1px;
  overflow: hidden;
  border-radius: var(--radius-20);
  background: #edf1f7;
`;

const ProgressFill = styled.div`
  width: ${({ $progress }) => $progress}%;
  height: 100%;
  border-radius: inherit;
  background: var(--blue-accent);
`;

const Button = styled.button`
  align-self: flex-start;
  border: 0;
  background: transparent;
  padding: 0;
  margin-top: 3px;
  color: var(--blue-accent);
  font-size: var(--fs-12);
  font-weight: var(--fw-600);
  cursor: pointer;

  &:hover {
    color: var(--indigo-800);
  }
`;
