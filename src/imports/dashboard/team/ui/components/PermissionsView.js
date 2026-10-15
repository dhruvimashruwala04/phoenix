"use client";
import { useState } from "react";
import styled from "styled-components";
import { initialPermissions } from "../../api/constant";
import { Flex } from "@/imports/core/components/Flex";

const PermissionsView = ({ roles }) => {
  const [permissions, setPermissions] = useState(initialPermissions);

  const togglePermission = (index, roleKey) => {
    if (roleKey === "admin") return;
    setPermissions((prev) =>
      prev.map((permission, i) =>
        i === index
          ? { ...permission, [roleKey]: !permission[roleKey] }
          : permission,
      ),
    );
  };

  return (
    <Wrapper>
      <PermissionCard>
        <Grid>
          <HeaderCell align="center">Permissions</HeaderCell>
          {roles.map((role) => (
            <RoleHeader key={role.label} direction="column" justify="center">
              <RoleName>{role.label}</RoleName>
              <RoleCount>
                {role.count} {role.count === 1 ? "person" : "people"}
              </RoleCount>
            </RoleHeader>
          ))}
          {permissions.map((permission, index) => (
            <PermissionRow key={permission.name}>
              <PermissionInfo direction="column" justify="center">
                <PermissionName>{permission.name}</PermissionName>
                <PermissionDescription>
                  {permission.description}
                </PermissionDescription>
              </PermissionInfo>
              {roles.map((role) => {
                const roleKey = role.label.toLowerCase();
                return (
                  <PermissionCheckboxCell key={role.label} align="center">
                    <Checkbox
                      type="checkbox"
                      checked={Boolean(permission[roleKey])}
                      disabled={roleKey === "admin"}
                      aria-label={`${permission.name}: ${role.label}`}
                      onChange={() => togglePermission(index, roleKey)}
                    />
                  </PermissionCheckboxCell>
                );
              })}
            </PermissionRow>
          ))}
        </Grid>
      </PermissionCard>
      <FooterNote>
        Admins always have every permission. Changes apply immediately to
        everyone with that role.
      </FooterNote>
    </Wrapper>
  );
};

export default PermissionsView;

const Wrapper = styled.div`
  width: 100%;
  min-width: 0;
`;
const PermissionCard = styled.div`
  width: 100%;
  overflow: hidden;
  background: #fff;
  border: 1px solid #edf0f5;
  border-radius: 13px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 43%) repeat(3, minmax(0, 1fr));
  width: 100%;
`;
const HeaderCell = styled(Flex)`
  min-height: 57px;
  padding: 12px 20px;
  border-bottom: 1px solid #edf0f5;
  font-size: 14px;
  font-weight: 650;
  color: #111827;
`;
const RoleHeader = styled.div`
  min-height: 57px;
  padding: 10px 12px;
  border-bottom: 1px solid #edf0f5;
`;
const RoleName = styled.div`
  font-size: 13px;
  font-weight: 650;
  line-height: 18px;
  color: #111827;
`;
const RoleCount = styled.div`
  margin-top: 1px;
  font-size: 10px;
  line-height: 14px;
  color: #94a3b8;
`;
const PermissionRow = styled.div`
  display: contents;
  &:hover > div {
    background: #fcfcff;
  }
`;
const PermissionInfo = styled(Flex)`
  min-height: 57px;
  padding: 9px 20px;
  border-bottom: 1px solid #f1f3f7;
`;
const PermissionName = styled.div`
  font-size: 12px;
  font-weight: 550;
  line-height: 17px;
  color: #111827;
`;
const PermissionDescription = styled.div`
  margin-top: 1px;
  font-size: 11px;
  line-height: 15px;
  color: #718096;
`;
const PermissionCheckboxCell = styled(Flex)`
  min-height: 57px;
  padding: 8px 12px;
  border-bottom: 1px solid #f1f3f7;
`;
const Checkbox = styled.input`
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  margin: 0;
  border: 1.5px solid #cbd8e8;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  &:checked {
    background: #5145ed;
    border-color: #5145ed;
  }
  &:checked::after {
    content: "";
    position: absolute;
    left: 6px;
    top: 2px;
    width: 6px;
    height: 11px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  &:disabled {
    background: #a5b4fc;
    border-color: #a5b4fc;
    cursor: not-allowed;
  }
  &:focus-visible {
    outline: 2px solid #818cf8;
    outline-offset: 3px;
  }
`;
const FooterNote = styled.p`
  margin: 18px 0 0;
  font-size: 11px;
  line-height: 17px;
  color: #94a3b8;
`;
