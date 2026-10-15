import styled from "styled-components";
import useOnboardingStore from "@/imports/onboarding/store/onboardingStore";

const FilterStrip = ({ active, design, engineering, product, marketing }) => {
  const { activeFilter, setActiveFilter } = useOnboardingStore();

  const filters = [
    { label: "All", count: active },
    { label: "Design", count: design },
    { label: "Engineering", count: engineering },
    { label: "Product", count: product },
    { label: "Marketing", count: marketing },
  ];

  return (
    <Container>
      {filters.map((filter) => (
        <FilterButton
          key={filter.label}
          type="button"
          $active={activeFilter === filter.label}
          onClick={() => setActiveFilter(filter.label)}
        >
          {filter.label} · {filter.count}
        </FilterButton>
      ))}
    </Container>
  );
};

export default FilterStrip;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
`;

const FilterButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 31px;
  padding: 0 12px;
  border: 1px solid ${({ $active }) => ($active ? "#c7d2fe" : "#dfe6ef")};
  border-radius: 999px;
  background: ${({ $active }) => ($active ? "#eef2ff" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#5145ed" : "#334155")};
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background 150ms ease,
    border-color 150ms ease;

  &:hover {
    background: #eef2ff;
    border-color: #c7d2fe;
  }
`;
