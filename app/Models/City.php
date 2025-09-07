<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{

    protected $fillable = [
        'city',
        'lat',
        'lng',
        'country',
        'iso2',
        'admin_name',
        'capital',
        'population',
    ];


    protected $casts = [
        'lat' => 'decimal:8',
        'lng' => 'decimal:8',
    ];


    public static function findByName(string $cityName): ?City
    {
        return static::whereRaw('LOWER(city) = ?', [strtolower($cityName)])->first();
    }

    public function scopePopular($query)
    {
        return $query->where(function ($q) {
            $q->whereRaw('population != \'\' AND CAST(population AS INTEGER) >= ?', [50000])
              ->orWhereIn('capital', ['primary', 'admin']);
        })
        ->orderByRaw('CASE WHEN population = \'\' THEN 0 ELSE CAST(population AS INTEGER) END DESC');
    }

    public function scopeSearch($query, string $search)
    {
        return $query->whereRaw('LOWER(city) LIKE LOWER(?)', ['%' . $search . '%'])
                     ->orderByRaw('CASE WHEN LOWER(city) = LOWER(?) THEN 1 WHEN LOWER(city) LIKE LOWER(?) THEN 2 ELSE 3 END', 
                                 [$search, $search . '%']);
    }
}