<?php
namespace App\Repositories\Interfaces;

interface AuthRepositoryInterface{
  public function findByEmail(string $email);
}