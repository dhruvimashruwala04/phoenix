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
  background: rgb(255, 255, 255);
  border-radius: 12px;
  box-shadow:
    rgb(241, 245, 249) 0px 0px 0px 1px inset,
    rgba(0, 0, 0, 0.05) 0px 1px 2px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Info = styled(Flex)``;
const Icon = styled(Flex)`
  height: 40px;
  width: 40px;
  border-radius: 10px;
  background: rgb(248, 250, 252);
  box-shadow: rgb(241, 245, 249) 0px 0px 0px 1px inset;
  font-size: 18px;
  color: rgb(51, 65, 85);
`;
const Details = styled(Flex)``;
const Name = styled.span`
  font-size: 14px;
  font-weight: 600;
`;
const Description = styled.span`
  font-size: 11px;
  color: rgb(100, 116, 139);
  text-align: left;
`;
