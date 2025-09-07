# Alfons Digital - Daylight Duration Tracker

A web application that visualizes daylight duration throughout the year for Finnish cities. This project was developed as a technical assignment during a job interview process.

## Installation

### Setup

composer install
npm install

cp .env.example .env
php artisan key:generate

# Create PostgreSQL database

createdb daylight

# Run migrations

php artisan migrate

# Create a seeder to populate the database, (cities.json file in config)

php artisan make:seeder CitiesSeeder

## Running the Application

composer run dev
open: http://127.0.0.1:8000

## Tech Stack

### Backend (Laravel)

- **Laravel 12.0**
- **PostgreSQL**
- **SunCalc PHP** - Astronomical calculations for sun/moon positions

### Frontend (React)

- **React 19.1.1**
- **React Router DOM 7.8.2**
- **Chart.js 4.5.0** - Data visualization
- **React Chart.js 2 5.3.0** - React wrapper for Chart.js
- **Zustand 5.0.8**
- **Axios 1.11.0**
- **Sass 1.92.0**

## SunCalc Library

This project uses a custom integration of the [SunCalc PHP library](https://github.com/gregseth/suncalc-php/tree/master) for accurate astronomical calculations.

## License

This project is open source and available under the [MIT License](LICENSE).
