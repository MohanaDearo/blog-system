<?php

namespace Database\Seeders;
use App\Models\roles_master;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesMasterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        roles_master::create([
            'role'=>'admin',
        ]
        );
        roles_master::create([
            'role'=>'user',
        ]
        );
    }
}
