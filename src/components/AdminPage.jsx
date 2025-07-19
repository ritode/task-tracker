import React, { useContext, useState } from "react";
import { Table, Button, Modal, Input, Select } from "antd";
import { AppContext } from "../context/AppContext";

const { Option } = Select;

const AdminPage = () => {
  const { users, setUsers } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", role: "Developer" });

  const handleAddUser = () => {
    setUsers([...users, { ...newUser, id: Date.now() }]);
    setNewUser({ name: "", role: "Developer" });
    setIsModalOpen(false);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Role", dataIndex: "role", key: "role" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin - Manage Users</h2>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add User
      </Button>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        style={{ marginTop: 20 }}
      />
      <Modal
        title="Add User"
        visible={isModalOpen}
        onOk={handleAddUser}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input
          placeholder="User Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <Select
          style={{ width: "100%", marginTop: 10 }}
          value={newUser.role}
          onChange={(role) => setNewUser({ ...newUser, role })}
        >
          <Option value="Admin">Admin</Option>
          <Option value="Developer">Developer</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default AdminPage;
