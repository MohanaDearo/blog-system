<?php

namespace App\Http\Controllers;
use App\Services\PostService;
use App\Services\UserService;
use App\Models\User;
use App\Models\roles_master;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;


use Illuminate\Http\Request;

class PostController extends Controller
{
    protected $postService;
    public function __construct(PostService $postService){
        $this->postService = $postService;
    }

    public function createPost(Request $request){
        $validated = $request->validate([
            'title'=>'required|string|max:50',
            'content'=>'required|string|max:255'
        ]);

        $post = $this->postService->createPost($request->user(), $validated);
        return response()->json([
            'success'=>true,
            'message'=>'Post created successfully',
            'data'=>$post
        ],201);
    }

    public function getAllPosts(){ //This is for admin to get all posts
        $post = $this->postService->getAllPosts();
         return response()->json([
            'success'=>true,
            'data'=>$post
        ],200);
    }

    public function getPosts(Request $request){ //this is for user to fetch the posts
        $post = $this->postService->getUserPosts($request->user());
        return response()->json([
            'success'=>true,
            'message'=>'Posts fetched successfully',
            'data'=>$post,
        ],201);
    }

    public function updatePost($id, Request $request){
        $validated = $request->validate([
            'title'=>'required|string|max:50',
            'content'=>'required|string|max:255'
        ]);

        $post = $this->postService->updatePost($request->user(), $id, $validated);
        return response()->json([
            'success'=>true,
            'message'=>'Post updated Successfully',
            'data'=>$post,
        ],201);
    }

    public function deletePost($id, Request $request){ // this is for user
        $post = $this->postService->deletePost($request->user(), $id);

        return response()->json([
            'success'=>true,
            'message'=>'Post deleted successfully'
        ]);
    }

    public function adminDeletePost($id){ // this is for admin to delete a post
        $this->postService->adminDeletePost($id);
        return response()->json([
            'success'=>true,
            'message'=>'Post deleted successfully'
        ],201);
    }

    public function approvePost($id){
        $admin = auth()->user();
        try{
            $post = $this->postService->approvePost($admin->id, $id);
            return response()->json([
                'success'=>true,
                'message'=>'Post approved successfully',
                'data'=>$post,
            ],201);

        }catch(Exception $e){
            return response()->json([
                'success'=>false,
                'message'=>$e->getMessage()
            ],400);
        }
    }
    public function rejectPost($id){
        $admin = auth()->user();
        try{
            $post = $this->postService->rejectPost($admin->id, $id);
            return response()->json([
                'success'=>true,
                'message'=>'Post rejected successfully',
                'data'=>$post,
            ],201);

        }catch(Exception $e){
            return response()->json([
                'success'=>false,
                'message'=>$e->getMessage()
            ],400);
        }
    }

    public function getPendingPost(){
        $post = $this->postService->getPendingPost();
        return response()->json([
            'success'=>true,
            'message'=>'Pending posts fetched successfully',
            'data'=>$post,
        ],201);
    }

    public function getRoles(){
        $roles = $this->postService->getRoles();
        return response()->json([
            'success'=>true,
            'message'=>'Roles fetched successfully',
            'data'=>$roles,
        ],201);
    }

}
