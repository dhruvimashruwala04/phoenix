import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import useFilesStore from "../../store/filesStore";
import { Star } from "@/imports/dashboard/ui/assets/Icons";
import { Close, Trash } from "@/imports/core/assets/Icons";
import { categories, previewLogo } from "../../api/constants";
import useFiles from "../../hooks/useFiles";

const FileDetails = () => {
  const { files, selectedId, setSelectedId, deleteFile, toggleStar } =
    useFilesStore();
  const { formatSize, formatModified, getFileColor } = useFiles();

  const file = files.find((item) => item.id === selectedId);

  if (!file) return null;

  const PreviewIcon = previewLogo[file.type] || previewLogo.jpg;
  const { color, bg } = getFileColor(file.type);
  const label = categories.find((item) => item.value === file.category)?.label;

  return (
    <Container direction="column" gap="12px">
      <Header align="center" justify="space-between">
        <Title>Details</Title>

        <CloseButton onClick={() => setSelectedId("")}>
          <Close />
        </CloseButton>
      </Header>

      <Preview align="center" justify="center" $bg={bg}>
        {PreviewIcon && <PreviewIcon size={42} color={color} />}
      </Preview>

      <FileName>{file.name}</FileName>

      <Info>
        <InfoRow>
          <InfoLabel>Owner</InfoLabel>
          <InfoValue>{file.owner}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>Size</InfoLabel>
          <InfoValue>{formatSize(file.size)}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>Folder</InfoLabel>
          <InfoValue>{label}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>Modified</InfoLabel>
          <InfoValue>{formatModified(file.modified)}</InfoValue>
        </InfoRow>
      </Info>

      <Actions align="center" gap="8px">
        <StarButton
          align="center"
          justify="center"
          gap="6px"
          $starred={file.starred}
          onClick={() => toggleStar(file.id)}
        >
          <Star size={14} fill={file.starred ? "#4f46e5" : "none"} />
          {file.starred ? "Starred" : "Star"}
        </StarButton>

        <DeleteButton
          align="center"
          justify="center"
          onClick={() => deleteFile(file.id)}
        >
          <Trash size={20} />
        </DeleteButton>
      </Actions>
    </Container>
  );
};

export default FileDetails;

const Container = styled(Flex)`
  width: 308px;
  flex-shrink: 0;
  padding: 18px;
  background: var(--background);
  border: 1px solid var(--border-muted);
  border-radius: 14px;
  box-shadow: 0 2px 5px rgba(15, 23, 42, 0.04);
`;

const Header = styled(Flex)`
  width: 100%;
`;

const Title = styled.div`
  font-size: var(--fs-15);
  font-weight: var(--fw-700);
  color: var(--text-primary);
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
`;

const Preview = styled(Flex)`
  width: 100%;
  height: 132px;
  border-radius: 10px;
  background: ${({ $bg }) => $bg};
`;

const FileName = styled.div`
  font-size: var(--fs-15);
  font-weight: var(--fw-700);
  color: var(--text-primary);
  overflow-wrap: anywhere;
`;

const Info = styled(Flex)`
  flex-direction: column;
  gap: 9px;
`;

const InfoRow = styled(Flex)`
  align-items: center;
`;

const InfoLabel = styled.div`
  width: 68px;
  flex-shrink: 0;
  font-size: var(--fs-12);
  color: var(--text-muted);
`;

const InfoValue = styled.div`
  font-size: var(--fs-13);
  color: var(--text-primary);
`;

const Actions = styled(Flex)`
  width: 100%;
  margin-top: 2px;
`;

const StarButton = styled(Flex)`
  flex: 1;
  height: 37px;
  border: none;
  border-radius: 9px;
  background: #eef2ff;
  color: #4f46e5;
  font-size: var(--fs-13);
  font-weight: var(--fw-600);
  cursor: pointer;
`;

const DeleteButton = styled(Flex)`
  width: 38px;
  height: 37px;
  flex-shrink: 0;
  border: none;
  border-radius: 9px;
  background: #fff0f1;
  color: #f43f5e;
  cursor: pointer;
`;
