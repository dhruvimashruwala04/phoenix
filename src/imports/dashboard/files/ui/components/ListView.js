import styled from "styled-components";
import useFilesStore from "../../store/filesStore";
import { previewLogo } from "../../api/constants";
import useFiles from "../../hooks/useFiles";
import { Flex } from "@/imports/core/components/Flex";

const ListView = ({ filteredFiles }) => {
  const { files, selectedId, setSelectedId } = useFilesStore();
  const { formatSize, formatDate, getFileColor } = useFiles();

  if (!files.length) return null;

  return (
    <List>
      {filteredFiles.map((file) => {
        const PreviewIcon = previewLogo[file.type] || previewLogo.pdf;
        const { color, bg } = getFileColor(file.type);

        return (
          <FileRow
            key={file.id}
            $selected={selectedId === file.id}
            onClick={() => setSelectedId(file.id)}
          >
            <FileInfo align="center" gap="13px">
              <IconBox $bg={bg} justify="center" align="center">
                <PreviewIcon size={17} color={color} />
              </IconBox>

              <FileName title={file.name}>{file.name}</FileName>
            </FileInfo>

            <FileMeta>{file.owner || "You"}</FileMeta>
            <FileMeta>{formatSize(file.size)}</FileMeta>
            <FileMeta>{formatDate(file.modified)}</FileMeta>
          </FileRow>
        );
      })}
    </List>
  );
};

export default ListView;

const List = styled.div`
  width: 100%;
  min-width: 0;
  background: var(--background);
  border: 1px solid var(--border-muted);
  border-radius: 10px;
  overflow: hidden;
`;
const FileRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 120px 110px 100px;
  align-items: center;
  gap: 20px;
  min-height: 64px;
  padding: 10px 18px;
  background: ${({ $selected }) =>
    $selected ? "var(--blue-light)" : "var(--background)"};
  border-bottom: 1px solid var(--border-muted);
  cursor: pointer;
  transition: background 0.2s ease;
  &:last-child {
    border-bottom: none;
  }
  @media (max-width: 700px) {
    grid-template-columns: minmax(0, 1fr) 75px 75px;
    gap: 10px;
    & > :last-child {
      display: none;
    }
  }
`;
const FileInfo = styled(Flex)`
  min-width: 0;
`;
const IconBox = styled(Flex)`
  width: 38px;
  height: 38px;
  min-width: 38px;
  background: ${({ $bg }) => $bg};
  border-radius: 10px;
`;
const FileName = styled.span`
  font-size: var(--fs-14);
  font-weight: var(--fw-500);
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const FileMeta = styled.span`
  font-size: var(--fs-12);
  color: var(--text-muted);
  white-space: nowrap;
  text-align: left;
`;
