import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
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
    <Container align="center" gap="8px">
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

const Container = styled(Flex)`
  flex-wrap: wrap;
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
  background: ${({ $active }) => ($active ? "var(--indigo-50)" : "var(--white)")};
  color: ${({ $active }) => ($active ? "var(--blue-accent)" : "var(--slate-700)")};
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background 150ms ease,
    border-color 150ms ease;

  &:hover {
    background: var(--indigo-50);
    border-color: #c7d2fe;
  }
`;
