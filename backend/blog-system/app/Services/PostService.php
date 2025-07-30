<?php

namespace App\Services;
use App\Repositories\Interfaces\PostRepositoryInterface;

class PostService{
  protected $postRepository;

  public function __construct(PostRepositoryInterface $postRepository){
    $this->postRepository = $postRepository;
  }

  public function getAllPosts(){ // this is for admin to fetch all the posts
      return $this->postRepository->all();
  }
   public function getUserPosts($user){ // this is for user to fetch posts
    return $this->postRepository->allPost($user);
  }
  public function getPostById($id){
    return $this->postRepository->find($id);
  }
  public function createPost($user, array $data){
    $data['user_id'] = $user->id;
    $data['created_by'] = $user->name;
    return $this->postRepository->create($data);
  }
  public function updatePost($user, $id, array $data){
    $data['user_id'] = $user->id;
    $data['updated_by'] = $user->name;
    return $this->postRepository->update($user,$id, $data);
  }
  public function deletePost($user,$id){ // this is for user
    return $this->postRepository->delete($user,$id);
  }

  public function adminDeletePost($id){
    return $this->postRepository->adminDeletePost($id);
  }

  public function approvePost($adminid, $postid){
    $post = $this->postRepository->find($postid);
    if(! $post){
      throw new \Exception('Post not found');
    }

    if($post->status !== 'pending'){
      throw new \Exception('Post already pubished');
    }

    $now = now();
    $today9am = now()->copy()->setTime(9,00,0);
    if($now->lessThan($today9am)){
      $post->published_at=$today9am;
    }else{
      $post->published_at=$now;
    }

    $post->status = 'approved';
    $post->approved_by = $adminid;
    $post->approved_at = $now;

    $post->save();
    return $post;
  }
  public function rejectPost($adminid, $postid){
    $post = $this->postRepository->find($postid);
    if(! $post){
      throw new \Exception('Post not found');
    }

    if($post->status === 'rejected'){
      throw new \Exception('Post already rejected');
    }

    $post->status = 'rejected';
    $post->approved_by = $adminid;

    $post->save();
    return $post;
  }

  public function getPendingPost(){
    return $this->postRepository->getPendingPost();
  }
  public function getRoles(){
    return $this->postRepository->getRoles();
  }

 
}