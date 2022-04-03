#!/bin/sh

cd /usr/src

rm -rf asus_server

git clone https://github.com/infiniti008/asus_server.git

cd asus_server

npm ci

npm install pm2 -g

export $(cat .env | xargs)

pm2 start ./ecosystem.config.cjs

sleep infinity