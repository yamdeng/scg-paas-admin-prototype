#!/bin/sh

cd ~/Project/scg-paas-server-prototype/admin
rm -rf `ls | find . -name image -prune -o -print`
echo "server public remove success(admin)"
cd ~/Project/scg-paas-admin-prototype
yarn build:dev
echo "build success(admin)"
sleep 1
cp -rf ./build/* ../scg-paas-server-prototype/admin
# sleep 1
sleep 1
echo "copy success(admin)"
exit 0
