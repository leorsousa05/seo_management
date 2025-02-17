<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Retorna todos os usuários.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Cria um novo usuário.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users',
            'password' => 'required|string|min:6'
        ]);

        $data['password'] = bcrypt($data['password']);

        $user = User::create($data);

        return response()->json($user, 201);
    }

    /**
     * Exibe um usuário específico.
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    /**
     * Atualiza os dados de um usuário.
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $data = $request->validate([
            'name'     => 'sometimes|required|string|max:255',
            'email'    => 'sometimes|required|email|unique:users,email,'.$user->id,
            'password' => 'sometimes|required|string|min:6'
        ]);

        if(isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        $user->update($data);

        return response()->json($user);
    }

    /**
     * Remove um usuário.
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null, 204);
    }
}

