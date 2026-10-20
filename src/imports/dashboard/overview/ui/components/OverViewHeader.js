import { Flex } from "@/imports/core/components/Flex";
import NotificationBox from "@/imports/dashboard/ui/components/NotificationBox";
import SearchBox from "@/imports/dashboard/ui/components/SearchBox";
import styled from "styled-components";

const OverViewHeader = () => {
  return (
    <Header gap="12px 16px" wrap="wrap" align="center">
      <TextWrapper direction="column">
        <Title>Overview</Title>
        <Content>Your workspace at a glance</Content>
      </TextWrapper>
      <SearchBox placeholder="Search overview..." />
      <NotificationBox />
    </Header>
  );
};

export default OverViewHeader;
const Header = styled(Flex)`
  min-height: 64px;
  background: var(--white);
  border-bottom: 1px solid var(--slate-100);
  padding: 12px 24px;
  position: sticky;
  top: 0px;
  z-index: var(--z-header);
  width: 100%;
`;
const TextWrapper = styled(Flex)`
  min-width: 160px;
  flex: 1 1 160px;
`;
const Title = styled.span`
  font-weight: var(--fw-700);
  font-size: var(--fs-18);
  line-height: var(--lh-24);
`;
const Content = styled.span`
  font-size: var(--fs-12);
  color: var(--text-muted);
  line-height: var(--lh-16);
`;
