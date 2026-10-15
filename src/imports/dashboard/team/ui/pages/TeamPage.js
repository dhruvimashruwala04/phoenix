"use client";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import MembersView from "../components/MembersView";
import FilterStrip from "../components/FilterStrip";
import TeamHeader from "../components/TeamHeader";
import TeamStats from "../components/TeamStats";
import ViewToolbar from "../components/ViewToolbar";
import InvitationsView from "../components/InvitationsView";
import RequestView from "../components/RequestView";
import PermissionsView from "../components/PermissionsView";
import NewInviteModal from "../components/NewInviteModal";
import BulkStrip from "../components/BulkStrip";
import useTeam from "../../hooks/useTeam";
import { useState } from "react";
import { initialRequests } from "../../api/constant";

const TeamPage = () => {
  const {
    showInvite,
    setShowInvite,
    selected,
    setSelected,
    pendingInvites,
    active,
    teamCount,
    teamFilter,
    showBulkStrip,
    setShowBulkStrip,
    selectedView,
    toggleSelected,
    toggleAll,
    changeInviteeRole,
    bulkDelete,
    bulkChangeRole,
    bulkDeactivate,
    roleCount,
  } = useTeam();

  const [requests, setRequests] = useState(initialRequests);

  const roles = [
    { label: "Admin", count: roleCount.admin },
    { label: "Member", count: roleCount.member },
    { label: "Viewer", count: roleCount.viewer },
  ];

  return (
    <Page direction="column">
      <TeamHeader />
      <Content direction="column" gap="20px">
        <TeamStats
          active={active.length}
          pendingInvites={pendingInvites.length}
          requests={requests.length}
        />
        <ViewToolbar
          active={active.length}
          pendingInvites={pendingInvites.length}
          requests={requests.length}
          setShowInvite={setShowInvite}
        />

        {selectedView === "Members" ? (
          <MembersTable direction="column" gap="20px">
            <FilterStrip
              active={active.length}
              design={teamCount.design}
              engineering={teamCount.engineering}
              product={teamCount.product}
              marketing={teamCount.marketing}
            />

            {showBulkStrip && (
              <BulkStrip
                selected={selected}
                setSelected={setSelected}
                setShowBulkStrip={setShowBulkStrip}
                bulkChangeRole={bulkChangeRole}
                bulkDeactivate={bulkDeactivate}
                bulkDelete={bulkDelete}
              />
            )}

            <MembersView
              teamFilter={teamFilter}
              showBulkStrip={showBulkStrip}
              setShowBulkStrip={setShowBulkStrip}
              selected={selected}
              setSelected={setSelected}
              toggleSelected={toggleSelected}
              toggleAll={toggleAll}
              changeInviteeRole={changeInviteeRole}
            />
          </MembersTable>
        ) : selectedView === "Invitations" ? (
          <InvitationsView pendingInvites={pendingInvites} />
        ) : selectedView === "Access requests" ? (
          <RequestView requests={requests} setRequests={setRequests} />
        ) : (
          <PermissionsView roles={roles} />
        )}
      </Content>
      {showInvite && <NewInviteModal setShowInvite={setShowInvite} />}
    </Page>
  );
};

export default TeamPage;

const Page = styled(Flex)`
  width: 100%;
  height: 100vh;
  overflow: auto;
`;
const Content = styled(Flex)`
  width: 100%;
  height: 100vh;
  overflow: auto;
  padding: 24px;
`;
const MembersTable = styled(Flex)`
  width: 100%;
  height: 100vh;
  overflow: auto;
`;
