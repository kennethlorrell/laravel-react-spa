<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Permission extends Model
{
    use HasFactory;

    const PERMISSION_POST_VIEW = 'post_view';
    const PERMISSION_POST_CREATE = 'post_create';
    const PERMISSION_POST_UPDATE = 'post_update';
    const PERMISSION_POST_DELETE = 'post_delete';

    protected $fillable = ['name'];

    protected $hidden = ['pivot'];

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }
}
