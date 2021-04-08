#!/bin/sh

# Deploying apps
echo "--------- STARTING COMPLETED ---------"

# Movies
echo "Deploying app 'movies-service'"
shipa app deploy -a movies-service -i gcr.io/cosimages-206514/movies-service

# Cinema
echo "Deploying app 'cinema-catalog'"
shipa app deploy -a cinema-catalog -i gcr.io/cosimages-206514/cinema-catalog-service

# Notifications
echo "Deploying app 'notification-service'"
shipa app deploy -a notification-service -i gcr.io/cosimages-206514/notification-service

# Payments
echo "Deploying app 'payment-service'"
shipa app deploy -a payment-service -i gcr.io/cosimages-206514/payment-service

# Booking
echo "Deploying app 'booking-service'"
shipa app deploy -a booking-service -i gcr.io/cosimages-206514/booking-service

# Api Gateway 
echo "Deploying app 'api-gateway'"
shipa app deploy -a api-gateway -i gcr.io/cosimages-206514/api-gateway

# Cinema UI
echo "Deploying app 'ui-service'"
shipa app deploy -a ui-service -i gcr.io/cosimages-206514/ui-cinemas

echo "--------- DEPLOYMENTS COMPLETED ---------"
