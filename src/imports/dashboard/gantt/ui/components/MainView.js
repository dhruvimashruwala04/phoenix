"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Gantt } from "dhtmlx-gantt";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import useKanbanStore from "@/imports/dashboard/kanban/store/kanbanStore";
import getInitials from "@/imports/core/utils/getInitials";
import { Chevron } from "@/imports/dashboard/calendar/ui/assets/Icons";
import formatDate from "@/imports/core/utils/formatDate";
import useGantt from "../../hooks/useGantt";
import { ChevronDown } from "@/imports/core/assets/Icons";

const MainView = ({ setSelectedId, searchQuery }) => {
  const { tasks, updateTask } = useKanbanStore();
  const { addDays, DAY, toDateString, getScales } = useGantt();

  const containerRef = useRef(null);
  const ganttRef = useRef(null);
  const updateTaskRef = useRef(null);

  const [scaleView, setScaleView] = useState("day");
  const [viewDate, setViewDate] = useState(() => new Date());

  updateTaskRef.current = updateTask;

  const query = searchQuery.trim().toLowerCase();

  const ganttData = useMemo(() => {
    return tasks
      .filter((task) => (task.title || "").toLowerCase().includes(query))
      .map((task) => {
        const startDate = new Date(`${task.startDate}T00:00:00`);
        const dueDate = new Date(`${task.dueDate}T00:00:00`);

        if (!startDate || !dueDate) return null;

        const inclusiveEndDate = dueDate < startDate ? startDate : dueDate;
        const endDate = addDays(inclusiveEndDate, 1);

        return {
          id: String(task.id),
          text: task.title || "Untitled task",
          start_date: `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`,
          end_date: `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`,
          duration: Math.max(1, Math.round((endDate - startDate) / DAY)),
          progress: task.status === "done" ? 1 : Math.random(),
          assignee: getInitials(task.assignee) || "N/A",
          status: task.status || "backlog",
          priority: task.priority || "medium",
          projName: task.projName || "",
        };
      })
      .filter(Boolean);
  }, [tasks]);

  useEffect(() => {
    const gantt = ganttRef.current;
    if (!gantt) return;

    gantt.config.scales = getScales(scaleView);
    gantt.render();
  }, [scaleView]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const gantt = Gantt.getGanttInstance();
    ganttRef.current = gantt;

    gantt.config.date_format = "%Y-%m-%d";
    gantt.config.grid_width = 360;
    gantt.config.row_height = 62;
    gantt.config.bar_height = 27;
    gantt.config.scale_height = 58;

    gantt.config.drag_move = true;
    gantt.config.drag_resize = true;
    gantt.config.drag_progress = true;

    gantt.config.show_progress = true;
    gantt.config.show_links = false;
    gantt.config.fit_tasks = true;
    gantt.config.row_height = 50;
    gantt.config.bar_height = 30;

    gantt.config.columns = [
      {
        name: "text",
        label: "Task name",
        tree: true,
        width: 240,
        resize: true,
      },
      {
        name: "assignee",
        label: "Assignee",
        width: 95,
        template: (task) =>
          `<div class="gantt-avatar">${task.assignee || "N/A"}</div>`,
      },
      {
        name: "start_date",
        label: "Start date",
        width: 95,
        template: (task) => formatDate(task.start_date),
      },
    ];

    gantt.config.scales = [
      { unit: "month", step: 1, format: "%F %Y" },
      { unit: "day", step: 1, format: "%d" },
    ];

    gantt.templates.task_class = (start, end, task) => {
      return `gantt-status-${task.status}`;
    };

    gantt.templates.task_text = (start, end, task) => {
      const startDate = formatDate(start, "short");
      const endDate = formatDate(addDays(end, -1), "short");
      const progress = Math.round((task.progress || 0) * 100);

      return `
    <div style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      gap: 10px;
      padding: 0 8px;
      font-size: 11px;
      position: relative;
      z-index: 1;
    ">
      <span>${startDate} - ${endDate}</span>
      <span>${progress}%</span>
    </div>
  `;
    };

    gantt.templates.tooltip_text = (start, end, task) => {
      const startLabel = formatDate(start, "long");
      const dueLabel = formatDate(addDays(end, -1), "long");

      return `
        <b>${task.text}</b><br/>
        Assignee: ${task.assignee || "Unassigned"}<br/>
        Start: ${startLabel}<br/>
        Due: ${dueLabel}<br/>
        Status: ${task.status || "Backlog"}<br/>
        Priority: ${task.priority || "Medium"}
      `;
    };

    gantt.templates.scale_cell_class = (date) => {
      const today = new Date();

      if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        return "today-cell";
      }

      return "";
    };

    gantt.attachEvent("onTaskClick", (id) => {
      setSelectedId(id);
      return true;
    });

    // Initialize the chart.
    gantt.init(container);

    // Save dragged/resized dates back into Zustand.
    const syncTaskToStore = (id) => {
      const task = gantt.getTask(id);
      if (!task || !updateTaskRef.current) return;

      const startDate = new Date(task.start_date);
      const endDate = new Date(task.end_date);

      if (!startDate || !endDate) return;

      const dueDate = addDays(endDate, -1);

      updateTaskRef.current(id, {
        startDate: toDateString(startDate),
        dueDate: toDateString(dueDate),
      });
    };

    gantt.attachEvent("onAfterTaskDrag", (id) => {
      syncTaskToStore(id);
    });

    gantt.attachEvent("onAfterTaskUpdate", (id) => {
      syncTaskToStore(id);
    });

    // Clean up this specific instance.
    return () => {
      if (ganttRef.current === gantt) {
        ganttRef.current = null;
      }

      gantt.destructor();
      container.innerHTML = "";
    };
  }, []);

  // Load data only after the instance has been initialized.
  useEffect(() => {
    const gantt = ganttRef.current;

    if (!gantt) return;

    gantt.clearAll();
    gantt.parse({
      data: ganttData,
      links: [],
    });

    gantt.showDate(viewDate);
  }, [ganttData, viewDate]);

  const changeMonth = (amount) => {
    setViewDate((previous) => {
      const next = new Date(previous);
      next.setMonth(next.getMonth() + amount);
      return next;
    });
  };

  const showToday = () => {
    setViewDate(new Date());
  };

  return (
    <Wrapper>
      <Toolbar align="center" justify="space-between" wrap="wrap" gap="12px">
        <Flex align="center" gap="10px">
          <Heading>Project timeline</Heading>
          <Count>{ganttData.length} tasks</Count>
        </Flex>

        <Flex align="center" gap="8px" wrap="wrap">
          <ToolbarButton onClick={() => changeMonth(-1)}>
            <Chevron direction="left" /> Previous
          </ToolbarButton>

          <ToolbarButton onClick={showToday}>Today</ToolbarButton>

          <ToolbarButton onClick={() => changeMonth(1)}>
            Next <Chevron direction="right" />
          </ToolbarButton>
        </Flex>

        <SortButton
          gap="6px"
          align="center"
          justify="space-between"
          onClick={() => {
            if (scaleView === "day") {
              setScaleView("week");
            } else if (scaleView === "week") {
              setScaleView("month");
            } else {
              setScaleView("day");
            }
          }}
        >
          <span>
            {scaleView === "day"
              ? "Days"
              : scaleView === "week"
                ? "Weeks"
                : "Months"}
          </span>
          <ChevronDown />
        </SortButton>
      </Toolbar>

      {ganttData.length === 0 && (
        <EmptyState>
          No tasks with valid start and due dates were found for this project.
        </EmptyState>
      )}

      <GanttContainer ref={containerRef} />
    </Wrapper>
  );
};

export default MainView;

const Wrapper = styled.div`
  width: 100%;
  min-width: 0;
  overflow: hidden;
  height: 100%;
  background: var(--background, #fff);
  color: var(--foreground, #1e293b);
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 12px;
  display: flex;
  flex-direction: column;

  .gantt_row.gantt_selected,
  .gantt_task_row.gantt_selected {
    background: #eef2ff !important;
  }

  .gantt_task_line {
    border: none;
    border-radius: 6px;
  }
  //bg
  .gantt_task_line.gantt-status-done {
    overflow: hidden;
  }
  .gantt_task_line.gantt-status-in_progress {
    background: rgb(219, 234, 254);
  }
  .gantt_task_line.gantt-status-review {
    background: rgba(253, 247, 224);
  }
  .gantt_task_line.gantt-status-backlog {
    background: rgba(255, 225, 225);
  }

  //progress color
  .gantt_task_line.gantt-status-done .gantt_task_progress {
  }

  .gantt_task_line.gantt-status-in_progress .gantt_task_progress {
    background: rgb(191, 219, 254);
  }

  .gantt_task_line.gantt-status-review .gantt_task_progress {
    background: #ffe7a9ff;
  }

  .gantt_task_line.gantt-status-backlog .gantt_task_progress {
    background: #f5c8cfff;
  }

  //border
  .gantt_task_line.gantt-status-done.gantt_selected {
    box-shadow:
      rgb(52, 211, 153) 0 0 0 2px,
      rgba(0, 0, 0, 0.08) 0 2px 6px;
  }
  .gantt_task_line.gantt-status-in_progress.gantt_selected {
    box-shadow:
      rgb(96, 165, 250) 0 0 0 2px,
      rgba(0, 0, 0, 0.08) 0 2px 6px;
  }
  .gantt_task_line.gantt-status-review.gantt_selected {
    box-shadow:
      rgba(255, 184, 19, 1) 0 0 0 2px,
      rgba(0, 0, 0, 0.08) 0 2px 6px;
  }
  .gantt_task_line.gantt-status-backlog.gantt_selected {
    box-shadow:
      rgba(255, 104, 122, 1) 0 0 0 2px,
      rgba(0, 0, 0, 0.08) 0 2px 6px;
  }

  .gantt_task_content {
    font-size: 11px;
    font-weight: 500;
  }

  //text color
  .gantt_task_line.gantt-status-done .gantt_task_content {
    color: rgba(39, 158, 114, 1);
    background: #acf1d8ff !important;
  }
  .gantt_task_line.gantt-status-in_progress .gantt_task_content {
    color: rgb(29, 78, 216);
  }
  .gantt_task_line.gantt-status-review .gantt_task_content {
    color: rgba(230, 167, 20, 1);
  }
  .gantt_task_line.gantt-status-backlog .gantt_task_content {
    color: rgb(215, 43, 64);
  }

  //remove vertical line from timeline grid
  .gantt_task_cell {
    border-right: none !important;
  }
  .gantt_scale_cell {
    border-right: none !important;
  }

  .gantt_grid_head_cell,
  .gantt_scale_cell {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: rgb(107, 114, 128);
    text-transform: uppercase;
  }

  .gantt_row,
  .gantt_task_row {
    border-bottom: 1px solid #f1f5f9;
  }

  .gantt_grid_data .gantt_row:hover,
  .gantt_task_row:hover {
    background: #f8fafc;
  }

  .gantt_tree_content {
    font-size: 13px;
    font-weight: 400;
    color: rgb(55, 65, 81);
    display: flex;
    align-items: center;
    &:nth-child(1) {
      justify-content: center;
    }
  }

  .today-cell {
    background-color: #eef2ff !important;
    border-left: 2px solid #6366f1 !important;
  }

  .gantt-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: var(--indigo-500);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 9px;
    font-weight: 700;
    line-height: 1;
  }

  .gantt_layout_cell_border_bottom,
  .gantt_layout_cell_border_top {
    border: none !important;
  }
`;

const Toolbar = styled(Flex)`
  padding: 16px 18px;
  border-bottom: 1px solid var(--border, #e2e8f0);
`;
const Heading = styled.span`
  font-size: 18px;
  font-weight: 650;
`;
const Count = styled.span`
  padding: 4px 8px;
  border-radius: 6px;
  background: var(--muted, #f1f5f9);
  color: var(--muted-foreground, #64748b);
  font-size: 11px;
`;
const ToolbarButton = styled.button`
  padding: 8px 11px;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 7px;
  background: var(--card, #fff);
  color: rgb(55, 65, 81);
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 2px;
  &:hover {
    background: var(--muted, #f1f5f9);
  }
`;
const GanttContainer = styled.div`
  width: 100%;
  flex: 1;
  min-width: 0;
  border: none !important;
`;
const EmptyState = styled.div`
  padding: 20px;
  color: var(--muted-foreground, #64748b);
  font-size: 13px;
`;
const SortButton = styled(Flex)`
  width: fit-content;
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--border-muted);
  border-radius: var(--radius-8);
  background: var(--white);
  font-size: var(--fs-12);
  cursor: pointer;
  strong {
    color: var(--slate-800);
    font-weight: var(--fw-600);
  }
`;
