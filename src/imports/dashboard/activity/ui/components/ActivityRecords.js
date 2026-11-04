import styled from "styled-components";
import { activities, categoryColors } from "../../api/constants";
import { Flex } from "@/imports/core/components/Flex";

const ActivityRecords = ({ activeFilter, searchQuery }) => {
  const query = searchQuery.trim().toLowerCase() || "";

  const filteredActivities = activities.filter((item) => {
    const matchesQuery =
      item.name.toLowerCase().includes(query) ||
      item.target.toLowerCase().includes(query);
    const matchesFilter =
      activeFilter === "all" ? true : item.category === activeFilter;
    return matchesFilter && matchesQuery;
  });

  const groups = ["Today", "Yesterday"];

  return (
    <RecordsContainer direction="column" gap="22px">
      {groups.map((group) => {
        const groupActivities = filteredActivities.filter(
          (item) => item.group === group,
        );

        if (!groupActivities.length) return null;

        return (
          <ActivityGroup key={group} direction="column" gap="11px">
            <GroupTitle>{group}</GroupTitle>

            <RecordsCard>
              {groupActivities.map((item) => (
                <RecordRow key={item.id} gap="15px">
                  <Avatar $color={item.color} justify="center" align="center">
                    {item.initials}
                  </Avatar>

                  <RecordContent direction="column" gap="8px">
                    <Description>
                      <strong>{item.name}</strong> {item.action}{" "}
                      <Target>{item.target}</Target>
                    </Description>

                    {item.detail && <Detail>{item.detail}</Detail>}

                    <Metadata align="center" gap="9px">
                      <CategoryIcon>
                        <item.icon
                          size={12}
                          color={categoryColors[item.category]}
                        />
                      </CategoryIcon>

                      <span>{item.categoryLabel}</span>
                      <Dot />
                      <span>{item.time}</span>
                    </Metadata>
                  </RecordContent>
                </RecordRow>
              ))}
            </RecordsCard>
          </ActivityGroup>
        );
      })}

      {filteredActivities.length === 0 && (
        <EmptyState>No activity records found.</EmptyState>
      )}
    </RecordsContainer>
  );
};

export default ActivityRecords;

const RecordsContainer = styled(Flex)`
  width: 100%;
`;
const ActivityGroup = styled(Flex)`
  width: 100%;
`;
const GroupTitle = styled.div`
  color: #8b9bb1;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;
const RecordsCard = styled.div`
  width: 100%;
  background: var(--background, #fff);
  border: 1px solid #edf0f5;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.025);
`;
const RecordRow = styled(Flex)`
  padding: 14px 20px;
  min-height: 74px;
  border-bottom: 1px solid #f0f2f6;
  &:last-child {
    border-bottom: none;
  }
`;
const Avatar = styled(Flex)`
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  color: white;
  font-size: 11px;
  font-weight: 600;
`;
const RecordContent = styled(Flex)`
  flex: 1;
  min-width: 0;
`;
const Description = styled.div`
  color: var(--text-primary, #1e293b);
  font-size: 14px;
  line-height: 20px;
  strong {
    font-weight: 600;
  }
`;
const Target = styled.span`
  color: #5145e5;
  font-weight: 600;
`;
const Detail = styled.div`
  background: #f7f9fc;
  border-radius: 9px;
  padding: 9px 13px;
  color: #52647d;
  font-size: 13px;
  line-height: 19px;
`;
const Metadata = styled(Flex)`
  color: #8b9bb1;
  font-size: 12px;
`;
const CategoryIcon = styled.span`
  display: flex;
  align-items: center;
  color: ${({ $color }) => $color};
`;
const Dot = styled.span`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #a8b4c5;
`;
const EmptyState = styled.div`
  padding: 35px;
  text-align: center;
  color: var(--text-muted);
  font-size: 14px;
`;
