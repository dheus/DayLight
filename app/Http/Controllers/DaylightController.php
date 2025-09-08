<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class DaylightController extends Controller
{
    public function searchCities(): JsonResponse
    {
        $query = request()->get('q') ?? '';
        $limit = min((int)request()->get('limit', 15), 50);
        
        return response()->json(searchCities($query, $limit));
    }

    public function getChartData(): JsonResponse
    {
        $cityNames = request()->get('cities', []);
        
        return response()->json(buildChartData($cityNames));
    }
}