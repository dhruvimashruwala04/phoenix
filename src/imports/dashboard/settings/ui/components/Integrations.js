import CancelButton from "@/imports/core/components/CancelButton";
import { Flex } from "@/imports/core/components/Flex";
import PrimaryButton from "@/imports/core/components/PrimaryButton";
import { initialIntegration } from "@/imports/dashboard/team/api/constant";
import React, { useState } from "react";
import styled from "styled-components";

const Integrations = () => {
  const [integrations, setIntegrations] = useState(initialIntegration);

  const handleToggle = (idx) => {
    setIntegrations((prev) =>
      prev?.map((item, i) => {
        if (i === idx) {
          return {
            ...item,
            connected: !item?.connected,
          };
        }
        return item;
      }),
    );
  };

  return (
    <Grid>
      {integrations.map((item, idx) => (
        <Card key={idx}>
          <Info gap="12px" align="center">
            <Icon justify="center" align="center">
              <item.icon />
            </Icon>
            <Details direction="column">
              <Name>{item?.app}</Name>
              <Description>
                {item.connected && "Connected · "}
                {item.description}
              </Description>
            </Details>
          </Info>
          {item.connected ? (
            <CancelButton height="32px" onClick={() => handleToggle(idx)}>
              Disonnect
            </CancelButton>
          ) : (
            <PrimaryButton height="32px" onClick={() => handleToggle(idx)}>
              Connect
            </PrimaryButton>
          )}
        </Card>
      ))}
    </Grid>
  );
};

export default Integrations;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
`;
const Card = styled.div`
  background: var(--white);
  border-radius: var(--radius-12);
  box-shadow:
    var(--slate-100) 0px 0px 0px 1px inset,
    var(--shadow-black) 0px 1px 2px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Info = styled(Flex)``;
const Icon = styled(Flex)`
  height: 40px;
  width: 40px;
  border-radius: var(--radius-10);
  background: var(--slate-50);
  box-shadow: var(--slate-100) 0px 0px 0px 1px inset;
  font-size: var(--fs-18);
  color: var(--slate-700);
`;
const Details = styled(Flex)``;
const Name = styled.span`
  font-size: var(--fs-14);
  font-weight: var(--fw-600);
`;
const Description = styled.span`
  font-size: var(--fs-11);
  color: var(--text-muted);
  text-align: left;
`;
