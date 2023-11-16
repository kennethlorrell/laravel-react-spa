<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::factory()->create([
            'name' => 'Test Administrator',
            'email' => 'admin@example.test',
            'password' => bcrypt('password')
        ]);
        $admin->roles()->attach(
            Role::where('name', Role::ROLE_ADMIN)->first()->id
        );

        $editor = User::factory()->create([
            'name' => 'Test Editor',
            'email' => 'editor@example.test',
            'password' => bcrypt('password')
        ]);
        $editor->roles()->attach(
            Role::where('name', Role::ROLE_EDITOR)->first()->id
        );
    }
}
