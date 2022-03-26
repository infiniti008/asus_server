module.exports = {
  apps: [
    {
      name: 'test',
      script: __dirname + '/apps/test/index.js',
      autorestart: true,
      watch: [__dirname + '/apps/test/*'],
      watch_delay: 1000
    },
    {
      name: 'mqtt',
      script: __dirname + '/apps/mqtt/index.js',
      autorestart: true,
      watch: [__dirname + '/apps/mqtt/*'],
      watch_delay: 1000
    }
  ]
};