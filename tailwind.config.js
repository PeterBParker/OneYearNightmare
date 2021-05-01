module.exports = {
    purge: [
        'src/**/*.js',
        'src/**/*.jsx',
        'src/**/*.ts',
        'src/**/*.tsx',
        'public/**/*.html'
    ],
    theme: {
        extend: {},
        fontFamily: {
            header: ['Montserrat'],
            body: ['Montserrat']
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            green: {
                light: '#939341',
                DEFAULT: '#939341',
                dark: '#939341',
            },
            grey: {
                light: '#393d36',
                DEFAULT: '#393d36',
                dark: '#2d302a',
            },
            mocha: {
                light: '#afa694',
                DEFAULT: '#afa694',
                dark: '#998f7e',
            },
            cream: {
                light: '#eae6da',
                DEFAULT: '#eae6da',
                dark: '#e0dcd1',
            },
            eggshell: {
                DEFAULT: '#f4f1ed',
            }
        },
        variants: {},
        plugins: [],
    }
}