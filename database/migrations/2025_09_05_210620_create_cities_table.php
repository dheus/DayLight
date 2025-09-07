<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->string('city');
            $table->decimal('lat', 10, 8);
            $table->decimal('lng', 11, 8);
            $table->string('country');
            $table->string('iso2', 2);
            $table->string('admin_name')->nullable();
            $table->string('capital')->nullable();
            $table->string('population')->nullable();
            $table->timestamps();
            
            // Add indexes for better performance
            $table->index('city');
            $table->index('country');
            $table->index('iso2');
            $table->index(['lat', 'lng']);
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('cities');
    }
};