import styled from "styled-components";
import MilestonesCard from "./MilestonesCard";
import useMilestones from "../../store/milestonesStore";
import FallBackText from "@/imports/core/components/FallBackText";

const MilestonesView = () => {
  const { milestones, selectedView } = useMilestones();

  const filteredMilestones =
    selectedView === "all"
      ? milestones
      : selectedView === "completed"
        ? milestones.filter((m) => m.status === "Completed")
        : selectedView === "upcoming"
          ? milestones.filter((m) => m.status === "Upcoming")
          : milestones.filter((m) => m.status === "Due soon");

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
