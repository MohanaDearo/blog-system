<?php

namespace App\Http\Controllers;
use App\Services\UserService;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userService;
    public function __construct(UserService $userService){
        $this->userService = $userService;
    }

    public function index(){
        $users = $this->userService->getAllUsers();
        return response()->json([
            'success'=>true,
            'data'=>$users
        ],200);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'name'=>'required|string|max:255',
            'email'=>'required|email',
            'password'=>'required|string|min:6',
            'role'=>'required|string|in:user,admin',
        ]);

        $user = $this->userService->createUser($validated);
        return response()->json([
            'success'=>true,
            'message'=>'User registered successfully'
        ],200);
    }

    public function updateUser(Request $request, $id){
        $validated = $request->validate([
            'name'=>'required|string|max:255',
            'email'=>'required|string|email',
            'password'=>'required|string|min:6',
            'role'=>'required|string|in:user,admin',
        ]);
        $user = $this->userService->updateUser($id, $validated);

        return response()->json([
            'success'=>true,
            'message'=>'User updated successfully'
        ],201);
    }

    public function destroy($id){
        $user = $this->userService->deleteUser($id);
        return response()->json([
            'success'=>true,
            'message'=>'User removed successfully',
        ]);
    }

    public function allowUpdate(Request $request, $id){
        $validated = $request->validate([
            'can_update'=>'required|boolean'
        ]);
        $this->userService->allowUpdate($id, $validated);
        return response()->json([
            'success'=>true,
            'message'=>'Permission updated successfully',
        ],201);
    }
     public function canUpdate(Request $request){
        $user = auth()->user();
        $data = $this->userService->canUpdate($user->id);
        return response()->json([
            'success'=>true,
            'message'=>'Permission fetched successfully',
            'data'=> $data
        ],200);
    }
}
