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

Route::post('/login',[AuthController::class, 'login']);
Route::middleware('auth:sanctum','is_admin')->prefix('admin')->group(function(){
    Route::get('/users',[UserController::class, 'index']);
    Route::put('/allowupdate/{id}',[UserController::class, 'allowUpdate']);
    Route::post('/users',[UserController::class, 'store']);
    Route::put('/users/{id}',[UserController::class, 'updateUser']);
    Route::delete('/users/{id}',[UserController::class, 'destroy']);
    Route::get('/getposts',[PostController::class, 'getAllPosts']);
    Route::put('/approvepost/{id}',[PostController::class, 'approvePost']);
    Route::get('/getpendingposts',[PostController::class, 'getPendingPost']);
    Route::put('/rejectpost/{id}',[PostController::class, 'rejectPost']);
    Route::delete('/deletepost/{id}',[PostController::class, 'adminDeletePost']);
    Route::get('/getroles',[PostController::class, 'getRoles']);
    Route::get('/getdashboarddetails',[PostController::class, 'getDashboardDetails']);
});

// Route::post('/login',[AuthController::class, 'userLogin']);
Route::middleware('auth:sanctum','is_user')->group(function(){
    Route::post('/posts',[PostController::class,'createPost']);
    Route::get('/posts',[PostController::class,'getPosts']);
    Route::put('/posts/{id}',[PostController::class,'updatePost']);
    Route::delete('/posts/{id}',[PostController::class,'deletePost']);
    Route::get('/canupdate',[UserController::class,'canUpdate']);
});
