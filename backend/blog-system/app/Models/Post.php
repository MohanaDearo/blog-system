<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'title',
        'content',
        'status',
        'approved_by',
        'approved_at',
        'published_at',
        'created_by',
        'updated_by',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
