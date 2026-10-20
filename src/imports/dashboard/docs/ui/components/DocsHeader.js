import { Flex } from "@/imports/core/components/Flex";
import NotificationBox from "@/imports/dashboard/ui/components/NotificationBox";
import SearchBox from "@/imports/dashboard/ui/components/SearchBox";
import styled from "styled-components";

const DocsHeader = () => {
  return (
    <Header gap="12px 16px" wrap="wrap" align="center">
      <TextWrapper direction="column">
        <Title>Docs</Title>
        <Content>Specs, notes and meeting minutes</Content>
      </TextWrapper>

      <SearchBox placeholder="Search documents..." />
      <NotificationBox />
    </Header>
  );
};

export default DocsHeader;

const Header = styled(Flex)`
  min-height: 64px;
  background: var(--white);
  border-bottom: 1px solid var(--slate-100);
  padding: 12px 24px;
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
  color: var(--text-muted);
  line-height: 16px;
  text-align: left;
`;
