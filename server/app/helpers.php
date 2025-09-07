<?php

use App\Models\City;
use Carbon\Carbon;

require_once __DIR__ . '/Http/Controllers/Suncalc.php';

if (!function_exists('getPopularCities')) {
    function getPopularCities(int $limit = 20)
    {
        return City::popular()
            ->limit($limit)
            ->get()
            ->map(fn($city) => formatCityData($city));
    }
}

if (!function_exists('searchCities')) {
    function searchCities(?string $query, int $limit = 15)
    {
        if (empty($query) || strlen($query) < 2) {
            return getPopularCities();
        }

        return City::search($query)
            ->orderBy('population', 'desc')
            ->limit($limit)
            ->get()
            ->map(fn($city) => formatCityData($city));
    }
}

if (!function_exists('getCitiesByName')) {
    function getCitiesByName(array $cityNames)
    {
        return City::whereIn('city', $cityNames)->get();
    }
}

if (!function_exists('formatCityData')) {
    function formatCityData(City $city): array
    {
        return [
            'name'       => $city->city,
            'latitude'   => (float)$city->lat,
            'longitude'  => (float)$city->lng,
            'country'    => $city->country,
            'iso2'       => $city->iso2,
            'admin_name' => $city->admin_name,
            'capital'    => $city->capital,
            'population' => $city->population
        ];
    }
}

if (!function_exists('getDaylightDataForCity')) {
    function getDaylightDataForCity(City $city): array
    {
        $year = date('Y');
        $data = [];

        for ($day = 1; $day <= 365; $day++) {
            $date = Carbon::createFromDate($year, 1, 1)->addDays($day - 1);
            $daylightHours = calculateDaylightHours((float)$city->lat, (float)$city->lng, $date);

            $data[] = [
                'date'           => $date->format('Y-m-d'),
                'daylight_hours' => $daylightHours,
            ];
        }

        return $data;
    }
}

if (!function_exists('calculateDaylightHours')) {
    function calculateDaylightHours(float $lat, float $lng, Carbon $date): float
    {
        $sunCalc = new \AurorasLive\SunCalc($date, $lat, $lng);
        $times   = $sunCalc->getSunTimes();

        if (isset($times['sunrise']) && isset($times['sunset'])) {
            $hours = ($times['sunset']->getTimestamp() - $times['sunrise']->getTimestamp()) / 3600;
            return round($hours, 2);
        }

        // Polar day or night
        if (isset($times['sunrise']) && !isset($times['sunset'])) {
            return 24.0; // Midnight Sun
        }

        if (!isset($times['sunrise']) && isset($times['sunset'])) {
            return 0.0; // Polar Night
        }

        // Sun neither rises nor sets (extreme case at poles)
        return $lat > 0 
            ? ($date->month >= 4 && $date->month <= 9 ? 24.0 : 0.0) 
            : ($date->month >= 10 || $date->month <= 3 ? 24.0 : 0.0);
    }
}

if (!function_exists('formatHours')) {
    function formatHours(float $hours): string
    {
        if ($hours >= 24) return "24h";
        if ($hours <= 0)  return "0h";

        $wholeHours = floor($hours);
        $minutes    = round(($hours - $wholeHours) * 60);

        return $minutes === 0 ? "{$wholeHours}h" : "{$wholeHours}h {$minutes}m";
    }
}

if (!function_exists('buildChartData')) {
    function buildChartData(array $cityNames): array
    {
        if (empty($cityNames) || !is_array($cityNames)) {
            return [
                'labels'   => [],
                'datasets' => []
            ];
        }

        $cities = getCitiesByName($cityNames);
        $citiesData = [];
        $allDates = [];
        
        foreach ($cities as $city) {
            $daylightData = getDaylightDataForCity($city);
            $cityData = [];
            
            foreach ($daylightData as $dayData) {
                $dateStr = $dayData['date'];
                $cityData[$dateStr] = $dayData['daylight_hours'];
                $allDates[] = $dateStr;
            }
            
            $citiesData[$city->city] = $cityData;
        }
        
        $allDates = array_unique($allDates);
        sort($allDates);
        
        return [
            'labels'   => formatLabels($allDates),
            'datasets' => buildDatasets($citiesData, $allDates)
        ];
    }
}

if (!function_exists('formatLabels')) {
    function formatLabels(array $allDates): array
    {
        return array_map(fn($date) =>
            Carbon::createFromFormat('Y-m-d', $date)->format('M j'), $allDates
        );
    }
}

if (!function_exists('buildDatasets')) {
    function buildDatasets(array $citiesData, array $allDates): array
    {
        $datasets = [];
        $colors = generateColors();
        $colorIndex = 0;
        
        foreach ($citiesData as $cityName => $cityData) {
            $data = array_map(fn($date) => $cityData[$date] ?? null, $allDates);
            $formattedData = array_map(fn($date) =>
                isset($cityData[$date]) ? formatHours($cityData[$date]) : null, 
                $allDates
            );
            
            $datasets[] = [
                'label'         => $cityName,
                'data'          => $data,
                'formattedData' => $formattedData,
                'borderColor'   => $colors[$colorIndex % count($colors)],
                'backgroundColor' => $colors[$colorIndex % count($colors)] . '33',
                'borderWidth'   => 2,
                'pointRadius'   => 2,
                'fill'          => false,
                'tension'       => 0.5,
            ];
            
            $colorIndex++;
        }
        
        return $datasets;
    }
}

if (!function_exists('generateColors')) {
    function generateColors(): array
    {
        return [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
            '#9966FF', '#FF9F40', '#C9CBCF'
        ];
    }
}