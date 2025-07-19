import React, { createContext, useState } from "react";

export const AppContext = createContext();

const dummyUsers = [
  { id: 1, name: "Alice", role: "Admin" },
  { id: 2, name: "Rito", role: "Developer" },
  { id: 3, name: "Bob", role: "Tester" },
];

const dummyBoard = {
  columns: [
    {
      id: 1,
      title: "To Do",
      cards: [
        {
          id: 1,
          name: "Setup project",
          priority: 1,
          owner: "Rito",
          description: "Initialize React app and configure dependencies.",
          status: "todo",
          createdAt: "2025-07-15",
          dueDate: "2025-07-20",
          completedAt: null
        },
        {
          id: 2,
          name: "UI Design",
          priority: 2,
          owner: "Alice",
          description: "Create wireframes for the dashboard and admin pages.",
          status: "todo",
          createdAt: "2025-07-16",
          dueDate: "2025-07-22",
          completedAt: null
        }
      ]
    },
    {
      id: 2,
      title: "In Progress",
      cards: [
        {
          id: 3,
          name: "Implement Kanban",
          priority: 1,
          owner: "Bob",
          description: "Integrate @asseinfo/react-kanban and set up board state.",
          status: "in-progress",
          createdAt: "2025-07-14",
          dueDate: "2025-07-19",
          completedAt: null
        }
      ]
    },
    {
      id: 3,
      title: "Done",
      cards: [
        {
          id: 4,
          name: "Research Components",
          priority: 3,
          owner: "Charlie",
          description: "Analyze which libraries to use for UI and state.",
          status: "done",
          createdAt: "2025-07-10",
          completedAt: "2025-07-16" // No dueDate
        }
      ]
    }
  ]
};


export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState(dummyUsers);
  const [board, setBoard] = useState(dummyBoard);

  return (
    <AppContext.Provider value={{ users, setUsers, board, setBoard }}>
      {children}
    </AppContext.Provider>
  );
};
