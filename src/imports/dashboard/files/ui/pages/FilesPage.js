"use client";
import React, { useState } from "react";
import FilesHeader from "../components/FilesHeader";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import ViewToolbar from "../components/ViewToolbar";
import UploadDropzone from "../components/UploadDropzone";
import useFilesStore from "../../store/filesStore";
import GridView from "../components/GridView";
import ListView from "../components/ListView";
import FileDetails from "../components/FileDetails";

const FilesPage = () => {
  const { view, selectedId, files, category } = useFilesStore();
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.trim().toLowerCase();

  const filteredFiles = files.filter((file) => {
    const matchesQuery = file.name.toLowerCase().includes(query) || "";

    const matchesCategory =
      category === "all"
        ? true
        : category === "starred"
          ? file.starred
          : file.category === category;

    return matchesQuery && matchesCategory;
  });

  return (
    <Page direction="column">
      <FilesHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Content gap="24px" direction="column">
        <ViewToolbar />
        <UploadDropzone />
        <View gap="20px">
          {view === "grid" ? (
            <GridView searchQuery={searchQuery} filteredFiles={filteredFiles} />
          ) : (
            <ListView searchQuery={searchQuery} filteredFiles={filteredFiles} />
          )}
          {selectedId && <FileDetails />}
        </View>
      </Content>
    </Page>
  );
};

export default FilesPage;

const Page = styled(Flex)`
  width: 100%;
  height: 100vh;
  overflow: auto;
`;
const Content = styled(Flex)`
  width: 100%;
  padding: 24px;
`;
const View = styled(Flex)`
  width: 100%;
`;
