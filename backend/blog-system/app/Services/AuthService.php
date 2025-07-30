<?php

namespace App\Services;
use App\Repositories\Interfaces\AuthRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class AuthService{
  protected $authRepository;

  public function __construct(AuthRepositoryInterface $authRepository){
    $this->authRepository = $authRepository;
  }

  public function adminLogin(array $credentials){
    $user = $this->authRepository->findByEmail($credentials['email']);

    if($user && Hash::check($credentials['password'], $user->password) && $user->role == 'admin'){
      return $user->createToken('admin-token')->plainTextToken;
    }
    return false;
  }

  public function userLogin(array $credentials){
    $user = $this->authRepository->findByEmail($credentials['email']);

    if($user && Hash::check($credentials['password'], $user->password) && $user->role == 'user'){
      return $user->createToken('user-token')->plainTextToken;
    }
    return false;
  }
}