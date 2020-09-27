# Prerequisites

docker & docker-compose
node 12 (LTS)
expo-cli installed globally

# Usage

On the root directory:

- Optional (if you want to test it on mobile)

```sh
export GRAPHQL_HOST="192.168.x.x" # your machine IP address in your localnetwork
```

- Required:

```sh
docker-compose up -d
yarn # lerna as dev dependency
yarn bootstrap # It will automatically install project dependencies & create schemas
yarn start # It will run all our applications
```

- Go to http://localhost:19002/ & scan the Expo QR Code from your phone or open the app in your web browser

# Notes

1. Frontend application tested on web and android

2. Setup scripts tested on Ubuntu
