<?php

namespace Database\Seeders;

use Database\Seeders\AdminSeeder;
use Database\Seeders\RolesMasterSeeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // $this->call([AdminSeeder::class]);
        $this->call([RolesMasterSeeder::class]);
    }
}
