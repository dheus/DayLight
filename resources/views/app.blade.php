<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="{{ config('app.description') }}">

    <title>{{ config('app.name', 'DayLight') }} - {{ config('app.title', 'Interview Test') }}</title>
    @viteReactRefresh

    <!-- Scripts -->
    @vite(['resources/js/app.jsx'])
</head>

<body class="font-sans antialiased">
    <div id="app"></div>
    <script>
    window.Laravel = {
        appName: '{{ config("app.name") }}',
        appTitle: '{{ config("app.title") }}',
        appDescription: '{{ config("app.description") }}'
    };
    </script>
</body>

</html>