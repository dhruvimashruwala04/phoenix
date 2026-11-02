"use client";
import { useEffect, useRef, useState } from "react";
import { projects } from "../../kanban/api/constants";

const useTimeTracking = () => {
  const [title, setTitle] = useState("");
  const [proj, setProj] = useState(projects[0].value);
  const [isRunning, setIsRunning] = useState(false);
  const [records, setRecords] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
      .map((time) => String(time).padStart(2, "0"))
      .join(":");
  };

  const handleStart = () => {
    startTimeRef.current = Date.now();
    setIsRunning(true);
  };

  const handleStop = () => {
    const endTime = Date.now();
    const duration = Math.floor((endTime - startTimeRef.current) / 1000);

    clearInterval(intervalRef.current);
    const newRecord = {
      id: Date.now(),
      title,
      project: proj,
      startTime: new Date(startTimeRef.current).toISOString(),
      endTime: new Date(endTime).toISOString(),
      duration,
    };
    setRecords((prev) => [newRecord, ...prev]);

    setIsRunning(false);
    setElapsed(0);
    setTitle("");
    startTimeRef.current = null;
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        const seconds = Math.floor((Date.now() - startTimeRef.current) / 1000);

        setElapsed(seconds);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleDelete = (id) => {
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };

  return {
    title,
    setTitle,
    proj,
    setProj,
    isRunning,
    setIsRunning,
    records,
    setRecords,
    elapsed,
    setElapsed,
    formatTime,
    handleStart,
    handleStop,
    startTimeRef,
    intervalRef,
    handleDelete,
    searchQuery,
    setSearchQuery,
  };
};

export default useTimeTracking;
