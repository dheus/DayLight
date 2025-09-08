![DayLight Logo](https://raw.githubusercontent.com/dheus/DayLight/main/public/logo.png)

## Alfons Digital - Daylight Duration Tracker

A web application that visualizes daylight duration throughout the year for Finnish cities. This project was developed as a technical assignment during a job interview process.

##### Installation

```bash
npm install
composer install
cp .env.example .env
php artisan key:generate
```

##### Create PostgreSQL database

```bash
createdb daylight
```

##### Run migrations

```bash
php artisan migrate
```

##### Configure Database Connection

Update your `.env` file with your database credentials:

```bash
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=daylight
DB_USERNAME=username
DB_PASSWORD=password
```

##### Run the seeder to populate the database:

> The application includes a `cities.json` file in the `config/` directory.

```bash
php artisan db:seed --class=CitySeeder
```

##### Running the Application

```bash
composer run dev
open: http://127.0.0.1:8000
```

### Tech Stack

#### Backend

- Laravel 12.0
- PostgreSQL
- [SunCalc PHP library](https://github.com/gregseth/suncalc-php/tree/master) - Astronomical calculations for sun/moon positions

#### Frontend

- React 19.1.1
- React Router DOM 7.8.2
- Chart.js 4.5.0 - Data visualization
- React Chart.js 2 5.3.0 - React wrapper for Chart.js
- Zustand 5.0.8
- Axios 1.11.0
- Sass 1.92.0

#### Authors

##### **_[@dheus](https://github.com/dheus)_**

#### License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
