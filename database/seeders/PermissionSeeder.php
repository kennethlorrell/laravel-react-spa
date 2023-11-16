<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => Permission::PERMISSION_POST_VIEW]);
        Permission::create(['name' => Permission::PERMISSION_POST_CREATE]);
        Permission::create(['name' => Permission::PERMISSION_POST_UPDATE]);
        Permission::create(['name' => Permission::PERMISSION_POST_DELETE]);
    }
}
