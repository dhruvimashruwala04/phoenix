import styled from "styled-components";

const days = ["MON", "TUE", "WED", "THU", "FRI"];

const timesheetData = [
  {
    task: "UI/UX Design",
    color: "#a78bfa",
    hours: [3.0, 4.0, 2.5, 3.0, 2.4],
    total: 14.9,
  },
  {
    task: "Design System",
    color: "#7c3aed",
    hours: [1.0, null, 2.0, 1.5, null],
    total: 4.5,
  },
  {
    task: "Frontend Development",
    color: "#3b82f6",
    hours: [2.0, 2.0, 1.5, 2.0, null],
    total: 7.5,
  },
  {
    task: "Backend Development",
    color: "#075bea",
    hours: [null, 1.0, null, null, null],
    total: 1.0,
  },
  {
    task: "API Integration",
    color: "#60a5fa",
    hours: [null, null, 1.0, 0.5, null],
    total: 1.5,
  },
  {
    task: "Meetings",
    color: "#9ca3af",
    hours: [1.5, 1.0, 1.0, 1.0, null],
    total: 4.5,
  },
];

const Timesheet = () => {
  return (
    <Container>
      <Header>Timesheet · week of May 18</Header>

      <GridRow $header>
        <TaskHeading>TASK</TaskHeading>

        {days.map((day) => (
          <DayHeading key={day}>{day}</DayHeading>
        ))}

        <TotalHeading>TOTAL</TotalHeading>
      </GridRow>

      {timesheetData.map((item) => (
        <GridRow key={item.task}>
          <TaskName>
            <Dot $color={item.color} />
            {item.task}
          </TaskName>

          {item.hours.map((hour, index) => (
            <HourCell key={index}>
              {hour !== null ? (
                <HourBox>{hour.toFixed(1)}</HourBox>
              ) : (
                <Empty>—</Empty>
              )}
            </HourCell>
          ))}

          <Total>{item.total.toFixed(1)}h</Total>
        </GridRow>
      ))}
    </Container>
  );
};

export default Timesheet;

const Container = styled.div`
  width: 100%;
  background: var(--background);
  border: 1px solid var(--border-soft);
  border-radius: 12px;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 16px 20px;
  font-size: var(--fs-14);
  font-weight: var(--fw-600);
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-soft);
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 2.2fr) repeat(5, minmax(75px, 1fr)) 70px;
  align-items: center;
  gap: 8px;
  padding: ${({ $header }) => ($header ? "10px 18px" : "10px 18px")};
  min-height: ${({ $header }) => ($header ? "34px" : "48px")};
  border-bottom: 1px solid var(--border-soft);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 700px) {
    grid-template-columns: minmax(160px, 2fr) repeat(5, minmax(65px, 1fr)) 55px;
    min-width: 700px;
  }
`;

const TaskHeading = styled.div`
  font-size: var(--fs-10);
  color: var(--text-muted);
  font-weight: var(--fw-600);
`;

const DayHeading = styled.div`
  text-align: center;
  font-size: var(--fs-10);
  color: var(--text-muted);
  font-weight: var(--fw-600);
`;

const TotalHeading = styled(DayHeading)`
  text-align: right;
`;

const TaskName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--fs-13);
  font-weight: var(--fw-500);
  color: var(--text-primary);
  white-space: nowrap;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

const HourCell = styled.div`
  display: flex;
  justify-content: center;
`;

const HourBox = styled.div`
  width: 100%;
  padding: 6px 4px;
  border-radius: 7px;
  background: #f4f1fc;
  color: #7c3aed;
  text-align: center;
  font-size: var(--fs-12);
  font-weight: var(--fw-500);
`;

const Empty = styled.div`
  color: #c4cbd5;
  font-size: var(--fs-13);
`;

const Total = styled.div`
  text-align: right;
  font-size: var(--fs-12);
  font-weight: var(--fw-700);
  color: var(--text-primary);
  white-space: nowrap;
`;
