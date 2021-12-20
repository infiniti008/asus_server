#!/bin/sh

cd /usr/src

git clone https://github.com/infiniti008/asus_server.git

cd asus_server

npm ci

npm install pm2 -g

pm2 start ./ecosystem.config.js