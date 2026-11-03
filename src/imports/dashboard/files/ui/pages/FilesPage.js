"use client";
import React, { useState } from "react";
import FilesHeader from "../components/FilesHeader";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import ViewToolbar from "../components/ViewToolbar";
import UploadDropzone from "../components/UploadDropzone";

const FilesPage = () => {
  return (
    <Page direction="column">
      <FilesHeader />
      <Content gap="24px" direction="column">
        <ViewToolbar />
        <UploadDropzone />
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
