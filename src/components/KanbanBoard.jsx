import React, { useContext, useState } from "react";
import Board from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
import { AppContext } from "../context/AppContext";
import { Card, Tag, Collapse, Select, DatePicker, Button } from "antd";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore); 

const { Panel } = Collapse;
const { Option } = Select;

const priorityColors = {
  1: "red",
  2: "orange",
  3: "green",
};

const KanbanBoard = () => {
  const { board, setBoard, users } = useContext(AppContext);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [selectedDueFilter, setSelectedDueFilter] = useState(null);
  const [specificDate, setSpecificDate] = useState(null);

  const handleCardMove = (newBoard, card, source, destination) => {
    // If moved to Done, set completed date
    if (destination.toColumnId === 3) {
      const doneColumn = newBoard.columns.find(
        (col) => col.id === destination.toColumnId
      );
      const movedCard = doneColumn.cards.find((c) => c.id === card.id);

      if (movedCard) {
        movedCard.completedAt = dayjs().format("YYYY-MM-DD");
        delete movedCard.dueDate;
      }
    }
    setBoard(newBoard);
  };

  const matchesDueDateFilter = (task) => {
    if (!selectedDueFilter || !task.dueDate) return true;
    const due = dayjs(task.dueDate);
    const today = dayjs();

    switch (selectedDueFilter) {
      case "today":
        return due.isSame(today, "day");

      case "this_week":
        return due.isSameOrBefore(today.endOf("week"));

      case "this_month":
        return due.isSameOrBefore(today.endOf("month"));

      case "specific_date":
        return specificDate ? due.isSameOrBefore(dayjs(specificDate), "day") : true;

      default:
        return true;
    }
  };

  const renderCard = (task) => {
    // Apply filters
    if (selectedOwner && task.owner !== selectedOwner) return null;
    if (selectedPriority && task.priority !== selectedPriority) return null;
    if (!matchesDueDateFilter(task)) return null;

    const today = dayjs();
    const overdue = task.dueDate && today.isAfter(dayjs(task.dueDate));
    const dueSoon = task.dueDate && dayjs(task.dueDate).diff(today, "days") <= 2;

    return (
      <Card size="small" style={{ marginBottom: "8px", minWidth: "255px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>{task.name}</strong>
          <Tag color={priorityColors[task.priority]}>P{task.priority}</Tag>
        </div>
        <p style={{ margin: "4px 0", fontSize: "0.85rem" }}>
          Owner: <strong>{task.owner}</strong>
        </p>

        {task.completedAt ? (
          <Tag color="green">
            Completed At: {dayjs(task.completedAt).format("DD MMM YYYY")}
          </Tag>
        ) : (
          <Tag color={overdue ? "red" : dueSoon ? "orange" : "blue"}>
            Due: {dayjs(task.dueDate).format("DD MMM YYYY")} (
            {overdue
              ? `${today.diff(dayjs(task.dueDate), "days")} days overdue`
              : `${dayjs(task.dueDate).diff(today, "days")} days left`}
            )
          </Tag>
        )}

        <Collapse ghost>
          <Panel header="Description" key="1">
            <p>{task.description}</p>
          </Panel>
        </Collapse>
      </Card>
    );
  };

  const clearAllFilters = () => {
    setSelectedOwner(null);
    setSelectedPriority(null);
    setSelectedDueFilter(null);
    setSpecificDate(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Task Tracker</h2>

      {/* Filter Dropdowns */}
      <div style={{ marginBottom: 20, display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {/* Owner Filter */}
        <Select
          allowClear
          style={{ width: 200 }}
          placeholder="Filter by owner"
          value={selectedOwner}
          onChange={(value) => setSelectedOwner(value)}
        >
          {users.map((user) => (
            <Option key={user.id} value={user.name}>
              {user.name}
            </Option>
          ))}
        </Select>

        {/* Priority Filter */}
        <Select
          allowClear
          style={{ width: 200 }}
          placeholder="Filter by priority"
          value={selectedPriority}
          onChange={(value) => setSelectedPriority(value)}
        >
          {[1, 2, 3].map((p) => (
            <Option key={p} value={p}>
              Priority {p}
            </Option>
          ))}
        </Select>

        {/* Due Date Filter */}
        <Select
          allowClear
          style={{ width: 200 }}
          placeholder="Filter by due date"
          value={selectedDueFilter}
          onChange={(value) => {
            setSelectedDueFilter(value);
            if (value !== "specific_date") setSpecificDate(null);
          }}
        >
          <Option value="today">Today</Option>
          <Option value="this_week">This Week</Option>
          <Option value="this_month">This Month</Option>
          <Option value="specific_date">Select Date...</Option>
        </Select>

        {selectedDueFilter === "specific_date" && (
          <DatePicker
            style={{ width: 200 }}
            value={specificDate ? dayjs(specificDate) : null}
            onChange={(date) => setSpecificDate(date)}
            placeholder="Select a date"
          />
        )}

        {/* Clear Filters Button */}
        <Button onClick={clearAllFilters}>Clear All Filters</Button>
      </div>

      <Board disableColumnDrag onCardDragEnd={handleCardMove} renderCard={renderCard}>
        {board}
      </Board>
    </div>
  );
};

export default KanbanBoard;
