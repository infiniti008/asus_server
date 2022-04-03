module.exports = {
  apps: [
    {
      name: 'base',
      script: __dirname + '/apps/base/index.js',
      autorestart: true,
      watch: [__dirname + '/apps/base/*'],
      watch_delay: 3000,
      wait_ready: true
    },
    {
      name: 'currency_grabber',
      script: __dirname + '/apps/currency_grabber/index.js',
      autorestart: true,
      watch: [__dirname + '/apps/currency_grabber/*'],
      watch_delay: 3000
    }
  ]
};