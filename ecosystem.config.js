module.exports = {
    apps : [
        {
            name: 'test',
            script: __dirname + '/test/index.js',
            autorestart: true
        },
        {
            name: 'mqtt',
            script: __dirname + '/mqtt/index.js',
            autorestart: true
        }
    ]
};