<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $configPath = config_path('cities.json');
        
        if (!file_exists($configPath)) {
            Log::error('Cities JSON file not found at: ' . $configPath);
            $this->command->error('Cities JSON file not found at: ' . $configPath);
            return;
        }
        
        $jsonContent = file_get_contents($configPath);
        $cities = json_decode($jsonContent, true);
        
        if (!is_array($cities)) {
            Log::error('Invalid JSON format in cities.json');
            $this->command->error('Invalid JSON format in cities.json');
            return;
        }
        
        $this->command->info('Starting to seed cities...');
        $bar = $this->command->getOutput()->createProgressBar(count($cities));
        $bar->start();
        
        $batchSize = 1000;
        $chunks = array_chunk($cities, $batchSize);
        
        foreach ($chunks as $chunk) {
            $citiesToInsert = [];
            
            foreach ($chunk as $cityData) {
                $citiesToInsert[] = [
                    'city' => $cityData['city'] ?? '',
                    'lat' => (float) ($cityData['lat'] ?? 0),
                    'lng' => (float) ($cityData['lng'] ?? 0),
                    'country' => $cityData['country'] ?? '',
                    'iso2' => $cityData['iso2'] ?? '',
                    'admin_name' => $cityData['admin_name'] ?? null,
                    'capital' => $cityData['capital'] ?? null,
                    'population' => $cityData['population'] ?? null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
            
            City::insert($citiesToInsert);
            $bar->advance(count($chunk));
        }
        
        $bar->finish();
        $this->command->newLine();
        $this->command->info('Successfully seeded ' . count($cities) . ' cities.');
    }
}
