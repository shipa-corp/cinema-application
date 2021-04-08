#!/bin/sh

echo "--------- STARTING SETUP ---------"

# Setting up ENV vars
echo "Make sure to specify the right team in ENV in the cinema-start.sh file"
TEAM=team1
MONGO_HOST=34.83.231.158:27017

# Creating frameworks
echo "Creating frameworks"
shipa framework add ./frameworks/cinema-ui.yaml
shipa framework add ./frameworks/cinema-services.yaml
shipa framework add ./frameworks/cinema-payment.yaml

# Creating cluster
echo "Creating the cluster"
shipa cluster add --from-file ./clusters/daniel-cluster.yaml

echo "Waiting for the cluster to be fully functional (30s)"
sleep 30

# Creating apps
echo "Creating applications and setting ENVs"

# Movies
shipa app create movies-service -t $TEAM -k cinema-services
shipa env set -a movies-service DB_SERVER=$MONGO_HOST DB_USER=shipau DB_PASS=shipapass DB=movies

# Cinema
shipa app create cinema-catalog -t $TEAM -k cinema-services
shipa env set -a cinema-catalog DB_SERVER=$MONGO_HOST DB_USER=shipau DB_PASS=shipapass DB=cinemas

# Notifications
shipa app create notification-service -t $TEAM -k cinema-services

# Payments
shipa app create payment-service -t $TEAM -k cinema-payment
shipa env set -a payment-service DB_SERVER=$MONGO_HOST DB_USER=shipau DB_PASS=shipapass DB=booking STRIPE_SECRET=sk_test_51IdLurBRUf3hM8oNI4QGItAkmgXuLIRmeuOxoFIRhiL9eVrsE5I8l0HWfXPZJjtPzaG67NDcejqKhzmrl37YBTiT00OP0CYNR6 STRIPE_PUBLIC=pk_test_51IdLurBRUf3hM8oNDQAqw4rDsPPd995CCZebej6zJCx8HmSK6b9AezNmGuVIK4mU0csY7UjhMmpesadKJLCJ6WHh00OvMvcDrR

# Booking
shipa app create booking-service -t $TEAM -k cinema-services
shipa env set -a booking-service DB_SERVER=$MONGO_HOST DB_USER=shipau DB_PASS=shipapass DB=booking NOTIFICATION_API_HOST=app-notification-service.shipa-cinema-services.svc PAYMENT_API_HOST=app-payment-service.shipa-cinema-payment.svc

# Api Gateway 
shipa app create api-gateway -t $TEAM -k cinema-services
shipa env set -a api-gateway API_BOOKING=app-booking-service.shipa-cinema-services.svc:3000 API_MOVIES=app-movies-service.shipa-cinema-services.svc:3000 API_CINEMA=app-cinema-catalog.shipa-cinema-services.svc:3000

# Cinema UI
shipa app create ui-service -t $TEAM -k cinema-ui

GATEWAY_URL=$(shipa app info -a api-gateway | grep "Address:" | cut -c 10-)
shipa env set -a ui-service REACT_APP_API_SERVER=$GATEWAY_URL

echo "--------- SETUP COMPLETED ---------"