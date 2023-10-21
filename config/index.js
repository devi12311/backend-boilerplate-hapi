require('dotenv').config({
    path: './config/.env'
});

const config = {
    server: {
        appUrl: process.env.APP_URL || 'http://0.0.0.0:3000/',
        host: process.env.HOST || '0.0.0.0',
        port: process.env.PORT || 3000,

        db: {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            user: process.env.DB_USER || 'postgres',
            pass: process.env.DB_PASS || 'dUdE8bbzztGsGT73pts8cNSub2NUq7xq',
            name: process.env.DB_NAME || 'skysafe'
        },
        auth: {
            secret: process.env.AUTH_SECRET || 'aoisjioqwjdoqwijdqwodj',
            refreshTokenExpiration: process.env.AUTH_REFRESH_TOKEN_EXPIRATION || 60 * 60 * 24 * 60,
            accessTokenExpiration: process.env.AUTH_ACCESS_TOKEN_EXPIRATION || 60 * 60 * 4,
        },
    }
}

module.exports = config
