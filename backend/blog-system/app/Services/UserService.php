<?php

namespace App\Services;
use App\Repositories\Interfaces\UserRepositoryInterface;


class UserService{
  protected $userRepository;

  public function __construct(UserRepositoryInterface $userRepository){
    $this->userRepository = $userRepository;
  }

  public function getAllUsers(){
    return $this->userRepository->all();
  }
  public function getUserById($id){
    return $this->userRepository->find($id);
  }
  public function createUser(array $data){
    $data['password']=bcrypt($data['password']);
    return $this->userRepository->create($data);
  }
  public function updateUser($id, array $data){
    $data['password']=bcrypt($data['password']);
    return $this->userRepository->update($id,$data);
  }
  public function deleteUser($id){
    return $this->userRepository->delete($id);
  }
  public function allowUpdate($id, array $data){
    return $this->userRepository->allowUpdate($id,$data);
  }
}