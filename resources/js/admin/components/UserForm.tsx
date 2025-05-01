import React from "react";

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    role: "admin" | "client";
}

interface UserFormProps {
    user: User;
    onChange: (user: User) => void;
}

export const UserForm: React.FC<UserFormProps> = ({ user, onChange }) => {
    const isCreating = !user.id;
    const passwordValue = user.password || "";
    const isPasswordValid = passwordValue.length >= 6;

    return (
        <div className="p-4 rounded space-y-4">
            <div>
                <label className="block text-sm font-medium text-[#94a1b2]">
                    Nome
                </label>
                <input
                    type="text"
                    value={user.name}
                    onChange={(e) =>
                        onChange({ ...user, name: e.target.value })
                    }
                    className="mt-1 block w-full text-black border border-[#24242a] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#7f5af0] placeholder-[#94a1b2]"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-[#94a1b2]">
                    Email
                </label>
                <input
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                        onChange({ ...user, email: e.target.value })
                    }
                    className="mt-1 block w-full text-black border border-[#24242a] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#7f5af0] placeholder-[#94a1b2]"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-[#94a1b2]">
                    Senha{" "}
                    {isCreating && (
                        <span className="text-xs text-red-500">
                            (mínimo 6 caracteres)
                        </span>
                    )}
                </label>
                <input
                    type="password"
                    value={passwordValue}
                    onChange={(e) =>
                        onChange({ ...user, password: e.target.value })
                    }
                    className="mt-1 block w-full text-black border border-[#24242a] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#7f5af0] placeholder-[#94a1b2]"
                    required={isCreating}
                    minLength={6}
                />
                {isCreating && !isPasswordValid && (
                    <p className="mt-1 text-xs text-red-500">
                        A senha deve ter pelo menos 6 caracteres.
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-[#94a1b2]">
                    Função
                </label>
                <select
                    value={user.role}
                    onChange={(e) =>
                        onChange({
                            ...user,
                            role: e.target.value as "admin" | "client",
                        })
                    }
                    className="mt-1 block w-full text-black border border-[#24242a] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
                    required
                >
                    <option value="admin">Administrador</option>
                    <option value="client">Cliente</option>
                </select>
            </div>
        </div>
    );
};
