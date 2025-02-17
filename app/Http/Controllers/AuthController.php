<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
           'name' => 'required|string|max:255',
           'email' => 'required|string|email|max:255|unique:users',
           'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
           'name' => $data['name'],
           'email' => $data['email'],
           'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
           'user' => $user,
           'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
       $data = $request->validate([
           'email' => 'required|string|email',
           'password' => 'required|string',
       ]);

       $user = User::where('email', $data['email'])->first();

       if (! $user || ! Hash::check($data['password'], $user->password)) {
           throw ValidationException::withMessages([
             'email' => ['Credenciais incorretas.'],
           ]);
       }

       $token = $user->createToken('authToken')->plainTextToken;

       return response()->json([
           'user' => $user,
           'token' => $token,
       ]);
    }

    public function logout(Request $request)
    {
       $request->user()->currentAccessToken()->delete();

       return response()->json(['message' => 'Logout efetuado com sucesso'], 200);
    }
}

