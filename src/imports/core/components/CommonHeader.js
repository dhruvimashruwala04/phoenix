import NotificationBox from "@/imports/dashboard/ui/components/NotificationBox";
import SearchBox from "@/imports/dashboard/ui/components/SearchBox";
import styled from "styled-components";
import { Flex } from "./Flex";

const CommonHeader = ({
  title,
  description,
  placeholder,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <Header gap="12px 16px" wrap="wrap" align="center">
      <TextWrapper direction="column">
        <Title>{title}</Title>
        <Content>{description}</Content>
      </TextWrapper>
      <SearchBox
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClear={() => setSearchQuery("")}
      />
      <NotificationBox />
    </Header>
  );
};

export default CommonHeader;

const Header = styled(Flex)`
  min-height: 64px;
  height: auto;
  background: var(--white);
  border-bottom: 1px solid var(--slate-100);
  padding: 12px 24px;
  position: sticky;
  top: 0;
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
