import styled from "styled-components";
import MilestonesCard from "./MilestonesCard";
import useMilestones from "../../store/milestonesStore";
import FallBackText from "@/imports/core/components/FallBackText";

const MilestonesView = () => {
  const { milestones, selectedView, searchQuery } = useMilestones();

  const query = (searchQuery || "").trim().toLowerCase();

  const filteredMilestones = milestones.filter((milestone) => {
    const matchesView =
      selectedView === "all"
        ? true
        : selectedView === "completed"
          ? milestone.status === "Completed"
          : selectedView === "upcoming"
            ? milestone.status === "Upcoming"
            : milestone.status === "Due soon";

    const matchesSearch = milestone.title?.toLowerCase().includes(query);

    return matchesView && matchesSearch;
  });

  return (
    <>
      {filteredMilestones.length === 0 ? (
        <FallBackText text="Add new milestones and get started" />
      ) : (
        <ViewGrid>
          {filteredMilestones.map((milestone) => (
            <MilestonesCard key={milestone.id} milestone={milestone} />
          ))}
        </ViewGrid>
      )}
    </>
  );
};

export default MilestonesView;

const ViewGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;
