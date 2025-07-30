<?php

namespace App\Providers;
use \App\Repositories\Interfaces\PostRepositoryInterface;
use \App\Repositories\PostRepository;
use \App\Repositories\Interfaces\UserRepositoryInterface;
use \App\Repositories\UserRepository;
use \App\Repositories\Interfaces\AuthRepositoryInterface;
use \App\Repositories\AuthRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        $this->app->bind(PostRepositoryInterface::class, PostRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(AuthRepositoryInterface::class, AuthRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
