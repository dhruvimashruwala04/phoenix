import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { Upload } from "@/imports/dashboard/ui/assets/Icons";

const UploadDropzone = ({ activeCategory }) => {
  return (
    <Dropzone align="center" justify="center" gap="10px">
      <Upload size={18} />
      <UploadText>Drag files here to upload to</UploadText>
      <CategoryName>
        {activeCategory === "All files" ? "Design" : activeCategory}
      </CategoryName>
    </Dropzone>
  );
};

export default UploadDropzone;

const Dropzone = styled(Flex)`
  width: 100%;
  min-height: 56px;
  border: 1.5px dashed var(--border-muted);
  border-radius: 12px;
  background: var(--background);
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    border-color: var(--blue-accent);
    background: var(--background-hover);
  }
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
