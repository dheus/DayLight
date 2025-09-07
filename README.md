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

##### Create a seeder to populate the database.

##### _(cities.json file in config)_

```bash
php artisan make:seeder CitiesSeeder
```

##### Running the Application

```bash
composer run dev
open: http://127.0.0.1:8000
```

### Tech Stack

#### Backend (Laravel)

- _Laravel 12.0_
- _PostgreSQL_
- _SunCalc PHP - Astronomical calculations for sun/moon positions_

#### Frontend (React)

- _React 19.1.1_
- _React Router DOM 7.8.2_
- _Chart.js 4.5.0 - Data visualization_
- \*React Chart.js 2 5.3.0\*\* - React wrapper for Chart.js
- _Zustand 5.0.8_
- _Axios 1.11.0_
- _Sass 1.92.0_

#### SunCalc Library

This project uses a custom integration of the [SunCalc PHP library](https://github.com/gregseth/suncalc-php/tree/master) for accurate astronomical calculations.

#### Authors

- [@dheus](https://github.com/dheus)

#### License

[MIT](https://choosealicense.com/licenses/mit/)
