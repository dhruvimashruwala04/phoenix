import { Flex } from "@/imports/core/components/Flex";
import useCalendarStore from "../../store/calendarStore";
import styled from "styled-components";
import { categories } from "../../api/constants";
import { Close } from "@/imports/core/assets/Icons";
import PrimaryButton from "@/imports/core/components/PrimaryButton";
import CancelButton from "@/imports/core/components/CancelButton";
import Input from "@/imports/core/components/Input";

const NewEventModal = () => {
  const {
    setShowNewEvent,
    category,
    setCategory,
    title,
    setTitle,
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    saveEvent,
    selectedEventId,
    deleteEvent,
  } = useCalendarStore();

  return (
    <Overlay
      align="center"
      justify="center"
      onClick={() => setShowNewEvent(false)}
    >
      <Card onClick={(e) => e.stopPropagation()}>
        <Header align="center" justify="space-between">
          <Title>{selectedEventId ? "Edit Event" : "Create Event"}</Title>
          <CloseButton onClick={() => setShowNewEvent(false)}>
            <Close />
          </CloseButton>
        </Header>

        <TitleInput direction="column" gap="6px">
          Title
          <Input
            name="title"
            type="text"
            placeholder="e.g. Sprint Retro"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </TitleInput>

        <Details gap="12px">
          <DropdownInput direction="column" gap="6px">
            Date
            <Input
              name="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </DropdownInput>
          <DropdownInput direction="column" gap="6px">
            Start
            <Input
              name="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </DropdownInput>
          <DropdownInput direction="column" gap="6px">
            End
            <Input
              name="endTime"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </DropdownInput>
        </Details>

        <Section direction="column" gap="6px">
          <Label>Category</Label>
          <CategoryContainer align="stretch" gap="8px" wrap="wrap">
            {categories.map((c) => (
              <CategoryButton
                key={c.label}
                type="button"
                $active={category === c.label}
                $bg={c.bg}
                $color={c.color}
                onClick={() => setCategory(c.label)}
              >
                <Dot color={c.color}></Dot>
                {c.label}
              </CategoryButton>
            ))}
          </CategoryContainer>
        </Section>

        <Footer gap="8px" justify="space-between">
          {selectedEventId && (
            <DeleteButton
              type="button"
              onClick={() => deleteEvent(selectedEventId)}
            >
              Delete
            </DeleteButton>
          )}

          <div style={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
            <CancelButton onClick={() => setShowNewEvent(false)}>
              Cancel
            </CancelButton>

            <PrimaryButton width="fit-content" onClick={saveEvent}>
              Save
            </PrimaryButton>
          </div>
        </Footer>
      </Card>
    </Overlay>
  );
};

export default NewEventModal;

const Overlay = styled(Flex)`
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  background: var(--overlay);
`;
const Card = styled.form`
  width: 440px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--white);
  border-radius: var(--radius-14);
  box-shadow: var(--shadow-modal) 0px 20px 50px;
  padding: 24px;
  gap: 16px;
`;
const Header = styled(Flex)``;
const Title = styled.span`
  color: var(--slate-900);
  font-size: var(--fs-16);
  font-weight: var(--fw-600);
`;
const CloseButton = styled(Flex)`
  background: transparent;
  cursor: pointer;
`;
const TitleInput = styled(Flex)`
  font-size: var(--fs-12);
  font-weight: var(--fw-600);
  color: var(--slate-600);
`;
const Details = styled(Flex)``;
const DropdownInput = styled(Flex)`
  flex: 1 1 0%;
  font-size: var(--fs-12);
  font-weight: var(--fw-600);
  color: var(--slate-600);
  > select {
    width: 100%;
    height: 38px;
    border-radius: var(--radius-8);
    border: 1px solid var(--border-muted);
    padding: 0px 8px;
    font-size: var(--fs-13);
    color: var(--slate-600);
  }
`;
const Footer = styled(Flex)`
  margin-top: 4px;
`;
const CategoryContainer = styled(Flex)``;
const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border: 1px solid
    ${({ $active, $color }) => ($active ? $color : "var(--border-input)")};
  border-radius: var(--radius-20);
  background-color: ${({ $active, $bg }) => ($active ? $bg : "white")};
  color: ${({ $active, $color }) => ($active ? $color : "var(--text-heading)")};
  font-size: var(--fs-13);
  font-weight: var(--fw-500);
  cursor: pointer;
`;
const Dot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: var(--radius-full);
  background: ${({ color }) => color};
`;
const Label = styled.span`
  font-size: var(--fs-12);
  font-weight: var(--fw-600);
  color: var(--slate-600);
  align-self: flex-start;
`;
const Section = styled(Flex)`
  width: 100%;
`;
const DeleteButton = styled.button`
  height: 36px;
  padding: 0 16px;
  border: 1px solid rgb(254, 202, 202);
  border-radius: var(--radius-7);
  background: var(--red-50);
  color: rgb(220, 38, 38);
  font-size: var(--fs-14);
  font-weight: var(--fw-500);
  cursor: pointer;
  align-self: flex-start;
  &:hover {
    background: var(--red-100);
  }
`;
