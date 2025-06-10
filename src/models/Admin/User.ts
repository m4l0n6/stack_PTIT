import { useState } from "react";
import { users as mockUsers } from "@/mock/users";

export default () => {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState(
    mockUsers.filter((u: any) => u.role !== 'admin').map((u: any) => ({ ...u, is_activate: typeof u.is_activate === 'boolean' ? u.is_activate : true }))
  );

  const openModal = (user: any) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (id: number) => {
    const newUsers = users.filter((u: any) => u.id !== id);
    if (selectedUser && selectedUser.id === id) {
      closeModal();
    }
    setUsers(newUsers);
  };

  const handleToggleStatus = (id: number) => {
    setUsers(prev => prev.map(u =>
      u.id === id ? { ...u, is_activate: !u.is_activate } : u
    ));
    if (selectedUser && selectedUser.id === id) {
      setSelectedUser((prev: any) => prev ? { ...prev, is_activate: !prev.is_activate } : prev);
    }
  };

  return {
    users,
    selectedUser,
    modalVisible,
    openModal,
    closeModal,
    handleDeleteUser,
    handleToggleStatus,
    setSelectedUser,
    setUsers,
  };
}
