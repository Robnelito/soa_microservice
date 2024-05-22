@echo off

echo --------------------------------------------
echo Installing dependencies in Api_gateway...
cd Api_gateway
call npm i
cd ..

echo --------------------------------------------
echo Installing dependencies in User...
cd User
call npm i
echo --------------------------------------------
echo Init DB User...
call npx prisma db push
call npx prisma generate
cd ..

echo --------------------------------------------
echo Installing dependencies in Client...
cd Client
call npm i
echo --------------------------------------------
echo Init DB User...
call npx prisma db push
call npx prisma generate
cd ..

echo --------------------------------------------
echo Installing dependencies in payment...
cd payment
call npm i
echo --------------------------------------------
echo Init DB payment...
call npx prisma db push
call npx prisma generate
cd ..

echo --------------------------------------------
echo Installing dependencies in Frontend...
cd Frontend
call npm i
cd ..

echo --------------------------------------------
echo All dependencies installed and databases initialized successfully.
pause
