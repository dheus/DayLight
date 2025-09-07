<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DaylightController;

Route::get('/search', [DaylightController::class, 'searchCities']);
Route::get('/chart', [DaylightController::class, 'getChartData']);