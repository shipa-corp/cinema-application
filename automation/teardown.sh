#!/bin/sh

# Deleting apps

shipa app remove -a movies-service -y
shipa app remove -a cinema-catalog -y
shipa app remove -a notification-service -y
shipa app remove -a payment-service -y
shipa app remove -a booking-service -y
shipa app remove -a api-gateway -y
shipa app remove -a ui-service -y

# Deleting cluster
shipa cluster remove cinema-cluster -y

# Deleting frameworks
shipa framework remove cinema-services -y
shipa framework remove cinema-payment -y
shipa framework remove cinema-ui -y

echo "--------- TEARDOWN COMPLETED ---------"