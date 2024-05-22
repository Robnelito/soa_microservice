#!/bin/bash

echo "Installing dependencies in Api_gateway..."
cd Api_gateway
npm install
cd ..

echo "Installing dependencies in User..."
cd User
npm install
npx prisma db push
npx prisma generate
cd ..

echo "Installing dependencies in Client..."
cd Client
npm install
npx prisma db push
npx prisma generate
cd ..

echo "Installing dependencies in payment..."
cd payment
npm install
npx prisma db push
npx prisma generate
cd ..

echo "Installing dependencies in Frontend..."
cd Frontend
npm install
cd ..

echo "All dependencies installed and databases initialized successfully."
