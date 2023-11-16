<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::create(['name' => Role::ROLE_ADMIN]);
        $admin->permissions()->attach(
            Permission::pluck('id')
        );

        $editor = Role::create(['name' => Role::ROLE_EDITOR]);
        $editor->permissions()->attach(
            Permission::where('name', '!=', Permission::PERMISSION_POST_DELETE)->pluck('id')
        );
    }
}
