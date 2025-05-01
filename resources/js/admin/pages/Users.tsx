import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { User, UserForm } from "../components/UserForm";
import { UserTable } from "../components/UserTable";
import { Modal } from "@/shared/components/Modal";
import axios from "axios";
import { useAuth } from "@/shared/contexts/AuthContext";

export const Users: React.FC = () => {
    const { token } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentUser, setCurrentUser] = useState<User>({
        id: "",
        name: "",
        email: "",
        password: "",
        role: "client",
    });
    const [searchTerm, setSearchTerm] = useState("");

    const fetchUsers = async () => {
        try {
            const response = await axios.get("/api/v1/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data);
        } catch (error) {}
    };

    useEffect(() => {
        fetchUsers();
    }, [token]);

    const handleOpenAdd = () => {
        setCurrentUser({
            id: "",
            name: "",
            email: "",
            password: "",
            role: "client",
        });
        setEditMode(false);
        setOpenDialog(true);
    };

    const handleOpenEdit = (user: User) => {
        setCurrentUser(user);
        setEditMode(true);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/v1/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(users.filter((user) => user.id !== id));
        } catch (error) {}
    };

    const handleSubmit = async () => {
        try {
            if (editMode) {
                const response = await axios.put(
                    `/api/v1/users/${currentUser.id}`,
                    currentUser,
                    { headers: { Authorization: `Bearer ${token}` } },
                );
                setUsers(
                    users.map((u) =>
                        u.id === currentUser.id ? response.data : u,
                    ),
                );
            } else {
                const { id, ...userToCreate } = currentUser;
                const response = await axios.post(
                    "/api/v1/users",
                    userToCreate,
                    { headers: { Authorization: `Bearer ${token}` } },
                );
                setUsers([...users, response.data]);
            }
            setOpenDialog(false);
        } catch (error) {
            console.error(error);
        }
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="p-4 bg-[#16161a] text-[#fffffe] min-h-screen">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <h2 className="text-2xl font-bold mb-4 md:mb-0">Usuários</h2>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Pesquisar usuários"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-[#24242a] bg-[#24242a] text-[#fffffe] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#7f5af0] placeholder-[#94a1b2]"
                    />
                    <button
                        onClick={handleOpenAdd}
                        className="bg-[#7f5af0] text-[#fffffe] px-4 py-2 rounded hover:bg-[#5f3dc4] flex items-center gap-2"
                    >
                        <Icon icon="mdi:plus" className="w-5 h-5" />
                        Adicionar Usuário
                    </button>
                </div>
            </div>
            <UserTable
                users={filteredUsers}
                onEdit={handleOpenEdit}
                onDelete={handleDelete}
            />
            {openDialog && (
                <Modal
                    title={editMode ? "Editar Usuário" : "Novo Usuário"}
                    onClose={handleCloseDialog}
                >
                    <UserForm user={currentUser} onChange={setCurrentUser} />
                    <div className="flex justify-end mt-6 space-x-4">
                        <button
                            onClick={handleCloseDialog}
                            className="px-4 py-2 border border-[#24242a] text-[#fffffe] rounded hover:bg-[#24242a]"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={
                                !currentUser.name ||
                                !currentUser.email ||
                                (!editMode && !currentUser.password)
                            }
                            className="bg-[#7f5af0] text-[#fffffe] px-4 py-2 rounded hover:bg-[#5f3dc4] disabled:opacity-50"
                        >
                            {editMode ? "Salvar Alterações" : "Adicionar"}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};
