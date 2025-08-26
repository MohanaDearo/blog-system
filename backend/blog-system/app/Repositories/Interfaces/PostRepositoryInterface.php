<?php
namespace App\Repositories\Interfaces;

interface PostRepositoryInterface{
  public function all();
  public function allPost($user);
  public function find($id);
  public function create(array $data);
  public function update($user, $id, array $data);
  public function delete($user,$id);
  public function getPendingPost();
  public function getRoles();
  public function getDashboardDetails();
}
