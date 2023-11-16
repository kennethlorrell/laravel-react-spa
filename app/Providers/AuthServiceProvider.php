<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use App\Models\Permission;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        if (Schema::hasTable('permissions')) {
            $permissions = Permission::all('name');

            foreach ($permissions as $permission) {
                Gate::define(
                    $permission->name,
                    fn ($user) => $user->hasPermission($permission->name)
                );
            }
        }
    }
}
