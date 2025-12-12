<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    
    public function signup(SignUpRequest $request) {
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create(
            [
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
            ]
        );
        $token = $user->createToken('main')->plainTextToken;
        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }
    public function login(LoginRequest $request) {
        $credentials = $request->validated();
        if(!Auth::attempt($credentials)) {
            return response()->json(
                [
                    'message' => 'The provided credentials are incorrect.'
                ],
                422
            );
        }
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }
    public function logout(Request $request) {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response(
            '', 204
        );

    }
}
