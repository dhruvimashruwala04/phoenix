"use client";
import { Flex } from "@/imports/core/components/Flex";
import ActionButton from "@/imports/dashboard/ui/components/ActionButton";
import styled from "styled-components";
import { Document, Edit, Preview, Spec, Trash } from "../assets/Icons";
import useDocsStore from "../../store/docsStore";
import useAuthStore from "@/imports/auth/store/authStore";
import getInitials from "@/imports/core/utils/getInitials";
import { useRef } from "react";
import FallBackText from "@/imports/core/components/FallBackText";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const DocsView = () => {
  const {
    documents,
    title,
    editorVal,
    setEditorVal,
    selectedDocId,
    setSelectedDoc,
    addDocument,
    setTitle,
    viewState,
    setViewState,
    setText,
    text,
    deleteDocument,
  } = useDocsStore();

  const savingText = "Saving...";
  const savedText = "All changes saved";

  const user = useAuthStore((s) => s.user);
  const saveTimeout = useRef(null);

  const handleChange = (callback, value) => {
    callback(value);
    setText(savingText);

    clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      setText(savedText);
    }, 1000);
  };

  return (
    <Container gap="20px">
      <ListWrapper direction="column">
        <ListHeader justify="space-between" align="center">
          <Text>All docs</Text>
          <ActionButton
            text="New"
            height="28px"
            variant="secondary"
            onClick={addDocument}
          />
        </ListHeader>

        <List>
          {documents
            ?.slice()
            .reverse()
            .map((doc) => (
              <Item
                key={doc.id}
                gap="10px"
                onClick={() => setSelectedDoc(doc.id)}
              >
                <Icon>
                  <Document />
                </Icon>
                <Content direction="column">
                  <Subject>{doc.title}</Subject>
                  <Meta>Drafts · just now</Meta>
                </Content>
              </Item>
            ))}
        </List>

        {documents.length === 0 && (
          <FallBackText text="Create a new document to get started." />
        )}
      </ListWrapper>

      {selectedDocId && (
        <DocumentWrapper direction="column">
          <Toolbar align="center" justify="space-between">
            <FileName align="center" gap="7px">
              <Spec />
              <span>Specs</span>
            </FileName>
            <ToolbarActions align="center" gap="10px">
              <SavedText>{text}</SavedText>
              <PreviewButton
                type="button"
                onClick={() =>
                  setViewState(viewState === "edit" ? "preview" : "edit")
                }
              >
                {viewState === "edit" ? (
                  <>
                    <Preview /> Preview
                  </>
                ) : (
                  <>
                    <Edit /> Edit
                  </>
                )}
              </PreviewButton>
              <DeleteButton
                type="button"
                onClick={() => deleteDocument(selectedDocId)}
              >
                <Trash />
              </DeleteButton>
            </ToolbarActions>
          </Toolbar>

          <MarkdownWrapper direction="column" align="stretch" gap="14px">
            <Title
              value={title}
              onChange={(e) => handleChange(setTitle, e.target.value)}
              name="title"
              disabled={viewState === "preview"}
            />
            <EditDetails gap="10px" align="center">
              <Initials align="center" justify="center">{getInitials(user.name)}</Initials>
              {user.name} · edited just now
            </EditDetails>
            {viewState === "edit" ? (
              <Editor
                value={editorVal}
                onChange={(e) => handleChange(setEditorVal, e.target.value)}
                spellCheck={false}
              />
            ) : (
              <Markdown remarkPlugins={[remarkGfm]}>{editorVal}</Markdown>
            )}
          </MarkdownWrapper>
        </DocumentWrapper>
      )}
    </Container>
  );
};

export default DocsView;

const Container = styled(Flex)`
  width: 100%;
`;
const ListWrapper = styled(Flex)`
  flex: 1 1 240px;
  background: var(--white);
  border-radius: 12px;
  box-shadow:
    rgb(243, 244, 246) 0px 0px 0px 1px inset,
    rgba(0, 0, 0, 0.05) 0px 1px 2px;
`;
const ListHeader = styled(Flex)`
  padding: 14px 16px;
  width: 100%;
  border-bottom: 1px solid var(--slate-100);
`;
const Text = styled.span`
  font-size: 13px;
  font-weight: 600;
`;
const List = styled.div`
  width: 100%;
  min-width: 0;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: 1px solid var(--border-muted);
  border-radius: 0 0 12px 12px;
`;
const Item = styled(Flex)`
  width: 100%;
  padding: 14px 16px;
  border-bottom: 1px solid var(--slate-100);
  background: var(--white);
  cursor: pointer;
  &:hover {
    background: var(--slate-50);
  }
  &:last-child {
    border-bottom: none;
    border-radius: 0 0 12px 12px;
  }
`;
const Icon = styled.div`
  color: rgb(156, 163, 175);
`;
const Content = styled(Flex)`
  min-width: 0;
  flex: 1;
`;
const Subject = styled.span`
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Meta = styled.span`
  font-size: 10px;
  color: rgb(156, 163, 175);
`;
const DocumentWrapper = styled.div`
  max-width: 70%;
  width: 100%;
  background: var(--white);
  border-radius: 12px;
  box-shadow:
    rgb(243, 244, 246) 0px 0px 0px 1px inset,
    rgba(0, 0, 0, 0.05) 0px 1px 2px;
`;
const Toolbar = styled(Flex)`
  width: 100%;
  min-height: 49px;
  padding: 0 16px;
  border-bottom: 1px solid var(--slate-100);
  flex-shrink: 0;
`;
const FileName = styled(Flex)`
  font-size: 12px;
  color: var(--slate-600);
  svg {
    width: 13px;
    height: 13px;
  }
`;
const ToolbarActions = styled(Flex)`
  flex-shrink: 0;
`;
const SavedText = styled.span`
  font-size: 11px;
  color: var(--emerald-600);
  white-space: nowrap;
`;
const PreviewButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 30px;
  padding: 0 11px;
  border: 1px solid var(--border-muted);
  border-radius: 6px;
  background: var(--white);
  color: var(--slate-900);
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background: var(--slate-50);
  }
`;
const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 27px;
  height: 30px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--text-muted-2);
  cursor: pointer;
  &:hover {
    color: #ef4444;
  }
`;
const Editor = styled.textarea`
  border: 0px;
  outline: 0px;
  resize: vertical;
  min-height: 420px;
  font-size: 14px;
  line-height: 24px;
  color: rgb(55, 65, 81);
  font-family: inherit;
  padding: 0px;
`;
const MarkdownWrapper = styled(Flex)`
  padding: 24px clamp(16px, 4vw, 36px);
  max-width: 820px;
`;
const Title = styled.input`
  width: 100%;
  min-width: 0px;
  border: 0px;
  outline: 0px;
  font-size: 24px;
  font-weight: 700;
  color: var(--gray-900);
  padding: 0px;
  background: transparent;
  text-overflow: ellipsis;
`;
const EditDetails = styled(Flex)`
  font-size: 11px;
  color: var(--text-muted);
`;
const Initials = styled(Flex)`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--violet-600);
  color: var(--white);
  font-size: 10px;
`;
