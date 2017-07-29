# Backend functions

## Deployment

```bash
./deploy.sh
```

## Destruction
```bash
export ENV_NAME=invoices-dev
./destroy.sh
```

## Setup local dev

```bash
yarn
serverless dynamodb install
# imports schema
serverless offline start --migrate true
```

## Run local dev

```bash
serverless offline start
```
