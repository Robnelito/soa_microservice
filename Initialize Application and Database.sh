@echo off

echo Installing dependencies in Api_gateway...
cd Api_gateway
call npm i
cd ..

echo Installing dependencies in User...
cd User
call npm i
call npx prisma db push
call npx prisma generate
cd ..

echo Installing dependencies in Client...
cd Client
call npm i
call npx prisma db push
call npx prisma generate
cd ..

echo Installing dependencies in payment...
cd payment
call npm i
call npx prisma db push
call npx prisma generate
cd ..

echo Installing dependencies in Frontend...
cd Frontend
call npm i
cd ..

echo All dependencies installed and databases initialized successfully.
pause
