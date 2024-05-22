#!/bin/bash

# Function to start a service in a new terminal tab
start_service() {
  local dir=$1
  local cmd=$2
  gnome-terminal --tab -- bash -c "cd $dir && $cmd; exec bash"
}

start_service "Api_gateway" "npm start"
start_service "User" "npm start"
start_service "Client" "npm start"
start_service "payment" "npm start"
start_service "Frontend" "npm run dev"
