import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
    export default {
        content: [
            './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
            './storage/framework/views/*.php',
            './resources/**/*.blade.php',
            './resources/**/*.js',
            './resources/**/*.tsx',
            './resources/**/*.vue',
        ],
        theme: {
            extend: {
                fontFamily: {
                    sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                },
                colors: {
                    primary: '#6e2390',
                    secondary: '#82e701',
                },
            },
        },
        plugins: [],
    };
