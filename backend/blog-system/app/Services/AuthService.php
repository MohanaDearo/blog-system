<?php

namespace App\Services;
use App\Repositories\Interfaces\AuthRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class AuthService{
  protected $authRepository;

  public function __construct(AuthRepositoryInterface $authRepository){
    $this->authRepository = $authRepository;
  }

  public function login(array $credentials){
    $user = $this->authRepository->findByEmail($credentials['email']);

    if($user && Hash::check($credentials['password'], $user->password)){
      $token = $user->createToken('login-token')->plainTextToken;
      return $token;
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