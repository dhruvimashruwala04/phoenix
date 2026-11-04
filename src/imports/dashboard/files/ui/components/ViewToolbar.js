"use client";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import {
  GridView,
  ListView,
  Upload,
} from "@/imports/dashboard/ui/assets/Icons";

import useFilesStore from "../../store/filesStore";
import { categories } from "../../api/constants";
import ActionButton from "@/imports/dashboard/ui/components/ActionButton";
import { useRef } from "react";

const ViewToolbar = ({}) => {
  const { category, setCategory, view, setView, addFile, files } =
    useFilesStore();
  const inputRef = useRef(null);

  const categoryCounts = {
    all: files.length,
    design: files.filter((file) => file.category === "design").length,
    research: files.filter((file) => file.category === "research").length,
    engineering: files.filter((file) => file.category === "engineering").length,
    marketing: files.filter((file) => file.category === "marketing").length,
    starred: files.filter((file) => file.starred).length,
  };

  const handleUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    selectedFiles.forEach((file) => {
      addFile(file);
    });
    e.target.value = "";
  };

  return (
    <Toolbar align="center" justify="space-between" gap="12px">
      <Categories align="center" gap="8px">
        {categories.map(({ label, value, icon: Icon }) => (
          <CategoryButton
            key={label}
            $active={category === value}
            align="center"
            gap="8px"
            onClick={() => setCategory(value)}
          >
            <Icon size={14} color="currentColor" />
            <span>{label}</span>
            <Count>{categoryCounts[value]}</Count>
          </CategoryButton>
        ))}
      </Categories>

      <Actions align="center" gap="8px">
        <ViewToggle align="center" gap="2px">
          <ViewButton $active={view === "grid"} onClick={() => setView("grid")}>
            {<GridView />}
          </ViewButton>

          <ViewButton $active={view === "list"} onClick={() => setView("list")}>
            <ListView />
          </ViewButton>
        </ViewToggle>

        <input
          ref={inputRef}
          type="file"
          // multiple
          hidden
          onChange={handleUpload}
        />
        <ActionButton
          text="Upload"
          icon={<Upload />}
          onClick={() => inputRef.current.click()}
        />
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
  color: ${({ $active }) => ($active ? "#4f46e5" : "var(--text-primary)")};
  background: ${({ $active }) => ($active ? "#ffffff" : "transparent")};
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
