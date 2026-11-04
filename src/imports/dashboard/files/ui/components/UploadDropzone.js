"use client";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { Upload } from "@/imports/dashboard/ui/assets/Icons";
import useFilesStore from "../../store/filesStore";
import { categories } from "../../api/constants";
import { useRef, useState } from "react";

const UploadDropzone = () => {
  const { category, addFile } = useFilesStore();

  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const categoryLabel = categories.map((c) =>
    c.value == category ? c.label : "",
  );

  const handleDragEnter = (e) => {
    e.preventDefault();
    dragCounter.current += 1;
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach((file) => addFile(file));
  };

  return (
    <Dropzone
      align="center"
      justify="center"
      gap="10px"
      $isDragging={isDragging}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Upload size={18} />
      <UploadText>Drag files here to upload to</UploadText>
      <CategoryName>
        {category === "all" ? "Design" : categoryLabel}
      </CategoryName>
    </Dropzone>
  );
};

export default UploadDropzone;

const Dropzone = styled(Flex)`
  width: 100%;
  min-height: 56px;
  border: 1.5px dashed
    ${({ $isDragging }) =>
      $isDragging ? "var(--blue-accent)" : "var(--border-muted)"};
  border-radius: 12px;
  background: var(--background);
  cursor: pointer;
  transition: 0.2s ease;
`;

const UploadText = styled.span`
  font-size: var(--fs-13);
  color: var(--text-muted);
  font-weight: var(--fw-500);
`;

const CategoryName = styled.span`
  font-size: var(--fs-13);
  font-weight: var(--fw-600);
  color: var(--text-primary);
`;
