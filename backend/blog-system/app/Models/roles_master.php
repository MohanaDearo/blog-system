<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class roles_master extends Model
{
    use HasFactory;
    protected $fillable = [
        'role',
    ];
}
