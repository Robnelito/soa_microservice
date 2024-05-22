@echo off
cd Api_gateway
start cmd /k npm start

cd ../User
start cmd /k npm start

cd ../Client
start cmd /k npm start

cd ../payment
start cmd /k npm start

cd ../Frontend
start cmd /k npm run dev