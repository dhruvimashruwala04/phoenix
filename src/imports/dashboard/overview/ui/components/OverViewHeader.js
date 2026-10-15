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
  background: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(241, 245, 249);
  padding: 12px 24px;
  position: sticky;
  top: 0px;
  z-index: 5;
  width: 100%;
`;
const TextWrapper = styled(Flex)`
  min-width: 160px;
  flex: 1 1 160px;
`;
const Title = styled.span`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
`;
const Content = styled.span`
  font-size: 12px;
  color: rgb(100, 116, 139);
  line-height: 16px;
`;
