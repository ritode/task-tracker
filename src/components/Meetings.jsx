// src/pages/Meetings.jsx
import React from "react";
import { Table, Tag, Collapse, Card } from "antd";
import dayjs from "dayjs";

const { Panel } = Collapse;

// Static meeting data
const meetings = [
  {
    key: "1",
    dateTime: "2025-07-15 10:00 AM",
    tasks: [
      {
        id: 1,
        name: "Setup project",
        priority: 1,
        owner: "Rito De",
        description: "Initialize React app and configure dependencies.",
        status: "todo",
        dueDate: "2025-07-20"
      },
      {
        id: 2,
        name: "UI Design",
        priority: 2,
        owner: "Alice",
        description: "Create wireframes for the dashboard and admin pages.",
        status: "todo",
        dueDate: "2025-07-22"
      }
    ]
  },
  {
    key: "2",
    dateTime: "2025-07-18 03:00 PM",
    tasks: [
      {
        id: 3,
        name: "Implement Kanban",
        priority: 1,
        owner: "Bob",
        description: "Integrate @asseinfo/react-kanban and set up board state.",
        status: "in-progress",
        dueDate: "2025-07-19"
      },
      {
        id: 4,
        name: "Research Components",
        priority: 3,
        owner: "Charlie",
        description: "Analyze which libraries to use for UI and state.",
        status: "done",
        completedAt: "2025-07-16"
      }
    ]
  }
];

const priorityColors = {
  1: "red",
  2: "orange",
  3: "green"
};

const renderTasks = (tasks) => {
  return tasks.map((task) => (
    <Card key={task.id} size="small" style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>{task.name}</strong>
        <Tag color={priorityColors[task.priority]}>P{task.priority}</Tag>
      </div>
      <p style={{ margin: "4px 0" }}>Owner: <strong>{task.owner}</strong></p>
      {task.completedAt ? (
        <Tag color="green">Completed At: {dayjs(task.completedAt).format("DD MMM YYYY")}</Tag>
      ) : (
        <Tag color="blue">Due: {dayjs(task.dueDate).format("DD MMM YYYY")}</Tag>
      )}
      <Collapse ghost>
        <Panel header="Description" key="desc">
          <p>{task.description}</p>
        </Panel>
      </Collapse>
    </Card>
  ));
};

const Meetings = () => {
  const columns = [
    {
      title: "Meeting Date & Time",
      dataIndex: "dateTime",
      key: "dateTime",
      width: "30%"
    },
    {
      title: "Tasks Discussed",
      dataIndex: "tasks",
      key: "tasks",
      render: (tasks) => renderTasks(tasks)
    }
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Meetings</h2>
      <Table
        columns={columns}
        dataSource={meetings}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default Meetings;
