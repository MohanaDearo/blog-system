<?php
namespace App\Repositories;
use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface{
  public function all(){
    return User::where('role','user')->latest()->get();
  }
  public function find($id){
    return User::findOrFail($id);
  }
  public function create(array $data){
    return User::create($data);
  }
  public function update($id, array $data){
    $user = User::findOrFail($id);
    $user->update($data);
    return $user;
  }
  public function delete($id){
    return User::destroy($id);
  }
  public function allowUpdate($id, array $data){
    $user = User::findOrFail($id);
    $user->update($data);
    return $user;
  }
  public function canUpdate($id){
    $user = User::findOrFail($id);
    return $user->can_update;
  }
}