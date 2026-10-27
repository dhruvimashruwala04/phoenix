import styled from "styled-components";
import { resources } from "../../api/constants";
import { Flex } from "@/imports/core/components/Flex";

const HelpResources = () => {
  return (
    <Grid>
      {resources.map((item) => (
        <ResourceCard key={item.title} role="button" tabIndex={0}>
          <Icon align="center" justify="center">
            {<item.icon />}
          </Icon>
          <Title>{item.title}</Title>
          <Description>{item.description}</Description>
        </ResourceCard>
      ))}
    </Grid>
  );
};

export default HelpResources;

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  width: 100%;
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
const ResourceCard = styled.div`
  min-height: 116px;
  padding: 15px;
  background: #fff;
  border: 1px solid #edf0f5;
  border-radius: 13px;
  box-shadow: 0 1px 2px rgba(20, 30, 50, 0.04);
  cursor: pointer;
  &:hover {
    border-color: #d9ccff;
    transform: translateY(-1px);
  }
`;
const Icon = styled(Flex)`
  width: 36px;
  height: 36px;
  margin-bottom: 11px;
  border-radius: var(--radius-13);
  background: #f3efff;
  color: #7625e8;
  font-size: 19px;
`;
const Title = styled.div`
  color: var(--gray-700);
  font-size: var(--fs-13);
  font-weight: var(--fw-600);
`;
const Description = styled.span`
  color: var(--gray-500);
  font-size: var(--fs-12);
  line-height: var(--lh-normal);
`;
