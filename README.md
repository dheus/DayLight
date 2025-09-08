![DayLight Logo](https://raw.githubusercontent.com/dheus/DayLight/main/public/logo.png)

### Alfons Digital - Daylight Duration Tracker

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

##### Populate the database with cities data

The application includes a `cities.json` file in the `config/` directory. Run the seeder to populate the database:

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

- _Laravel 12.0_
- _PostgreSQL_
- _SunCalc PHP - Astronomical calculations for sun/moon positions_

#### Frontend

- _React 19.1.1_
- _React Router DOM 7.8.2_
- _Chart.js 4.5.0 - Data visualization_
- _React Chart.js 2 5.3.0 - React wrapper for Chart.js_
- _Zustand 5.0.8_
- _Axios 1.11.0_
- _Sass 1.92.0_

#### SunCalc Library

This project uses a custom integration of the [SunCalc PHP library](https://github.com/gregseth/suncalc-php/tree/master) for accurate astronomical calculations.

#### Authors

- [@dheus](https://github.com/dheus)

#### License

[MIT](https://choosealicense.com/licenses/mit/)
