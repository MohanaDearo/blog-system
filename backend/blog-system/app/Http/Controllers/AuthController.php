<?php

namespace App\Http\Controllers;
use App\Services\AuthService;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $authService;
    public function __construct(AuthService $authService){
        $this->authService = $authService;
    }
    public function login(Request $request){
        $validated = $request->validate([
            'email'=>'required|string|email',
            'password'=>'required|string|min:6'
        ]);

        $token = $this->authService->adminLogin($validated);
        if(! $token){
            return response()->json([
                'error'=>true,
                'message'=>'Invalid credentials or not an admin user'
            ],401);
        }

        return response()->json([
            'success'=>true,
            'message'=>'Login successfull',
            'token'=> $token
        ],201);

    }

    public function userLogin(Request $request){
        $validated = $request->validate([
            'email'=>'required|string|email',
            'password'=>'required|string|min:6'
        ]);

        $token = $this->authService->userLogin($validated);
        if(! $token){
            return response()->json([
                'error'=>true,
                'message'=>'Invalid credentials'
            ],401);
        }

        return response()->json([
            'success'=>true,
            'message'=>'Login successfull',
            'token'=> $token
        ],201);

    }
}
