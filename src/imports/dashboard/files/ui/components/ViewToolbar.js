"use client";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";

import {
  GridView,
  ListView,
  Search,
  Upload,
  Star,
} from "@/imports/dashboard/ui/assets/Icons";
import { Folder } from "@/imports/core/assets/Icons";
import {
  Design,
  Engineering,
  Marketing,
} from "@/imports/onboarding/ui/assets/Icons";
import useFilesStore from "../../store/filesStore";

const ViewToolbar = ({}) => {
  const { activeCategory, setActiveCategory, view, setView } = useFilesStore();

  const categories = [
    { label: "All files", value: "all", count: 10, icon: Folder },
    { label: "Design", value: "design", count: 3, icon: Design },
    { label: "Research", value: "research", count: 3, icon: Search },
    {
      label: "Engineering",
      value: "engineering",
      count: 2,
      icon: Engineering,
    },
    { label: "Marketing", value: "marketing", count: 2, icon: Marketing },
    { label: "Starred", value: "starred", count: 2, icon: Star },
  ];

  const handleCategory = (value) => {
    setActiveCategory(value);
  };

  const handleView = (value) => {
    setView(value);
  };

  return (
    <Toolbar align="center" justify="space-between" gap="12px">
      <Categories align="center" gap="8px">
        {categories.map(({ label, value, count, icon: Icon }) => (
          <CategoryButton
            key={label}
            $active={activeCategory === value}
            align="center"
            gap="8px"
            onClick={() => handleCategory(value)}
          >
            <Icon size={14} color="currentColor" />
            <span>{label}</span>
            <Count>{count}</Count>
          </CategoryButton>
        ))}
      </Categories>

      <Actions align="center" gap="8px">
        <ViewToggle align="center" gap="2px">
          <ViewButton
            $active={view === "grid"}
            onClick={() => handleView("grid")}
          >
            <GridView />
          </ViewButton>

          <ViewButton
            $active={view === "list"}
            onClick={() => handleView("list")}
          >
            <ListView />
          </ViewButton>
        </ViewToggle>

        <UploadButton
          align="center"
          justify="center"
          gap="8px"
          // onClick={onUpload}
        >
          <Upload />
          Upload
        </UploadButton>
      </Actions>
    </Toolbar>
  );
};

export default ViewToolbar;

const Toolbar = styled(Flex)`
  width: 100%;
  min-width: 0;
  flex-wrap: wrap;
`;

const Categories = styled(Flex)`
  flex-wrap: wrap;
  flex: 1;
`;

const CategoryButton = styled(Flex)`
  height: 35px;
  padding: 0 12px;
  border: 1px solid
    ${({ $active }) => ($active ? "#c7d2fe" : "var(--border-muted)")};
  border-radius: 9px;
  background: ${({ $active }) => ($active ? "#eef2ff" : "var(--background)")};
  color: ${({ $active }) => ($active ? "#4f46e5" : "var(--text-primary)")};
  font-size: var(--fs-12);
  font-weight: var(--fw-500);
  white-space: nowrap;
  cursor: pointer;
  transition: 0.2s;
`;

const Count = styled.span`
  color: var(--text-muted);
  font-size: var(--fs-11);
`;

const Actions = styled(Flex)`
  flex-shrink: 0;
`;

const ViewToggle = styled(Flex)`
  height: 35px;
  padding: 2px;
  border-radius: 9px;
  background: #eef2ff;
`;

const ViewButton = styled.button`
  width: 34px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 7px;
  background: ${({ $active }) => ($active ? "#ffffff" : "transparent")};
  color: #475569;
  cursor: pointer;
`;

const UploadButton = styled(Flex)`
  height: 35px;
  padding: 0 15px;
  border: none;
  border-radius: 9px;
  background: #4f46e5;
  color: white;
  font-size: var(--fs-13);
  font-weight: var(--fw-600);
  cursor: pointer;

  &:hover {
    background: #4338ca;
  }
`;
