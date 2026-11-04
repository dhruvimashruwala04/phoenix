import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import useFiles from "../../hooks/useFiles";
import { previewLogo } from "../../api/constants";
import useFilesStore from "../../store/filesStore";

const GridView = ({ filteredFiles }) => {
  const { files, setSelectedId, selectedId } = useFilesStore();
  const { formatSize, formatDate, getFileColor } = useFiles();

  if (files.length === 0) return null;

  return (
    <Grid>
      {filteredFiles.map((file) => {
        const PreviewIcon = previewLogo[file.type] || previewLogo.jpg;
        const { color, bg } = getFileColor(file.type);

        return (
          <Card
            key={file.id}
            $selected={selectedId === file.id}
            direction="column"
            gap="10px"
            onClick={() => setSelectedId(file.id)}
          >
            <Preview align="center" justify="center" $bg={bg}>
              <PreviewIcon size={32} color={color} />
            </Preview>

            <Details direction="column" gap="3px">
              <FileName title={file.name}>{file.name}</FileName>

              <FileMeta>
                {formatSize(file.size)} · {formatDate(file.modified)}
              </FileMeta>
            </Details>
          </Card>
        );
      })}
    </Grid>
  );
};

export default GridView;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;
const Card = styled(Flex)`
  min-width: 0;
  padding: 14px;
  background: var(--background);
  border: 1px solid
    ${({ $selected }) => ($selected ? "#818cf8" : "var(--border-muted)")};
  border-radius: 14px;
  cursor: pointer;
  transition: 0.2s ease;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
`;
const Preview = styled(Flex)`
  width: 100%;
  height: 105px;
  flex-shrink: 0;
  border-radius: 9px;
  background: ${({ $bg }) => $bg};
`;
const Details = styled(Flex)`
  width: 100%;
  min-width: 0;
`;
const FileName = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--fs-13);
  font-weight: var(--fw-600);
  color: var(--text-primary);
`;
const FileMeta = styled.div`
  font-size: var(--fs-11);
  color: var(--text-muted);
  white-space: nowrap;
`;
