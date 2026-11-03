"use client";
import useMilestonesStore from "@/imports/dashboard/milestones/store/milestonesStore";
import { useState } from "react";

const useDependencies = () => {
  const { milestones } = useMilestonesStore();
  const [showModal, setShowModal] = useState(false);
  const [blockingTask, setBlockingTask] = useState("");
  const [blockedTask, setBlockedTask] = useState("");
  const [dependencies, setDependencies] = useState([]);
  const [blockedOnly, setBlockedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const tasks = milestones.map((m) => ({
    label: m.title,
    value: m.title,
  }));

  const getStatus = (name) => {
    const found = milestones?.find((m) => m.title === name);
    if (found?.status === "Completed") {
      return "Clear";
    } else {
      return "Blocked";
    }
  };

  const handleLink = () => {
    setShowModal(false);
    const status = getStatus(blockingTask);
    setDependencies((prev) => [
      ...prev,
      {
        blocking: blockingTask,
        blocked: blockedTask,
        status: status,
      },
    ]);
  };

  const handleUnlink = (blocking, blocked) => {
    setDependencies((prev) =>
      prev.filter(
        (item) => item.blocking !== blocking || item.blocked !== blocked,
      ),
    );
  };

  return {
    showModal,
    setShowModal,
    tasks,
    getStatus,
    blockedTask,
    setBlockedTask,
    blockingTask,
    setBlockingTask,
    handleLink,
    dependencies,
    blockedOnly,
    setBlockedOnly,
    handleUnlink,
    searchQuery,
    setSearchQuery,
  };
};

export default useDependencies;
