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
  badge,
}) => {
  return (
    <Header gap="12px 16px" wrap="wrap" align="center">
      <TextWrapper direction="column">
        <TitleWrapper gap="8px" align="center">
          <Title>{title}</Title>
          {badge && (
            <Badge $color={badge?.color} $bg={badge?.value}>
              {badge?.label}
            </Badge>
          )}
        </TitleWrapper>
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
const TitleWrapper = styled(Flex)``;
const Title = styled.span`
  font-weight: var(--fw-700);
  font-size: var(--fs-18);
  line-height: var(--lh-24);
`;
const Badge = styled.span`
  padding: 3px 8px;
  border-radius: var(--radius-4);
  font-size: var(--fs-10);
  font-weight: var(--fw-600);
  white-space: nowrap;
  color: ${({ $color }) => $color};
  background: ${({ $bg }) => {
    switch ($bg) {
      case "marketing":
        return "rgba(248, 250, 227, 1)";

      case "phoenix":
        return "rgba(221, 234, 250, 1)";

      case "mobile":
        return "rgba(239, 228, 250, 1)";

      case "launch":
        return "rgba(221, 244, 234, 1)";

      default:
        return "rgba(255, 241, 232, 1)";
    }
  }};
`;
const Content = styled.span`
  font-size: var(--fs-12);
  color: var(--text-muted);
  line-height: var(--lh-16);
`;
