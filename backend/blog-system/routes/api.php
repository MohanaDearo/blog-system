<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/admin/login',[AuthController::class, 'login']);
Route::middleware('auth:sanctum','is_admin')->prefix('admin')->group(function(){
    Route::get('/users',[UserController::class, 'index']);
});
Route::middleware('auth:sanctum','is_admin')->prefix('admin')->group(function(){
    Route::put('/allowupdate/{id}',[UserController::class, 'allowUpdate']);
});
Route::middleware('auth:sanctum','is_admin')->prefix('admin')->group(function(){
    Route::Post('/users',[UserController::class, 'store']);
});
Route::middleware('auth:sanctum','is_admin')->prefix('admin')->group(function(){
    Route::Put('/users/{id}',[UserController::class, 'updateUser']);
});
Route::middleware('auth:sanctum','is_admin')->prefix('admin')->group(function(){
    Route::Delete('/users/{id}',[UserController::class, 'destroy']);
});
Route::middleware('auth:sanctum','is_admin')->prefix('admin')->group(function(){
    Route::get('/getposts',[PostController::class, 'getAllPosts']);
});
Route::middleware('auth:sanctum','is_admin')->prefix('admin')->group(function(){
    Route::put('/approvepost/{id}',[PostController::class, 'approvePost']);
});
Route::middleware('auth:sanctum','is_admin')->prefix('admin')->group(function(){
    Route::get('/getpendingposts',[PostController::class, 'getPendingPost']);
});
Route::middleware('auth:sanctum','is_admin')->prefix('admin')->group(function(){
    Route::put('/rejectpost/{id}',[PostController::class, 'rejectPost']);
});
Route::middleware('auth:sanctum','is_admin')->prefix('admin')->group(function(){
    Route::delete('/deletepost/{id}',[PostController::class, 'adminDeletePost']);
});
Route::middleware('auth:sanctum','is_admin')->prefix('admin')->group(function(){
    Route::get('/getroles',[PostController::class, 'getRoles']);
});
Route::post('/login',[AuthController::class, 'userLogin']);
Route::middleware('auth:sanctum')->post('/posts',[PostController::class,'createPost']);
Route::middleware('auth:sanctum')->get('/posts',[PostController::class,'getPosts']);
Route::middleware('auth:sanctum')->put('/posts/{id}',[PostController::class,'updatePost']);
Route::middleware('auth:sanctum')->delete('/posts/{id}',[PostController::class,'deletePost']);
Route::middleware('auth:sanctum')->get('/canupdate',[UserController::class,'canUpdate']);