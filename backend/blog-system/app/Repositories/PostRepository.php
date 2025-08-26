<?php
namespace App\Repositories;
use App\Models\Post;
use App\Models\roles_Master;
use App\Repositories\Interfaces\PostRepositoryInterface;
use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;

class PostRepository implements PostRepositoryInterface{
  public function all(){ //this is for admin to fetch all the posts
    return Post::all();
  }
  public function allPost($user){ //this is to get all the posts for a particular user
    return Post::where('user_id', $user->id)->where('status','approved')->where('published_at', '<=', now())->latest()->get();
  }
  public function find($id){
    return Post::findOrFail($id);
  }
  public function create(array $data){
    return Post::create($data);
  }
  public function update($user, $id, array $data){
    $post = Post::where('id',$id)->where('user_id',$user->id)->firstOrFail();
    $post->update($data);
    $post->refresh();
    return $post;
  }
  public function delete($user,$id){
    $post =  Post::where('id',$id)->where('user_id',$user->id)->firstOrFail();
    $post->delete();
    return true;
  }

  public function adminDeletePost($id){
    $post = Post::where('id',$id)->firstOrFail();
    $post->delete();
    return true;
  }
  public function getPendingPost(){
    $post = Post::where('status','pending')->latest()->get();
    return $post;
  }
  public function getRoles(){
    $roles = roles_master::all();
    return $roles;
  }

  public function getDashboardDetails(){
    $dashboardDetails = [
      $users = User::count(),
      $approvedPosts = Post::where('status','approved')->count(),
      $pendingPosts = Post::where('status','pending')->count(),
      $rejectedPosts = Post::where('status','rejected')->count(),
    ];

    return $dashboardDetails;
  }
}