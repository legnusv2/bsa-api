# bsa-api

Solution API for the BSA interview. This code was develop using Elementary OS (v5.1.2).

## Requirements

- MongoDB (v3.6.3)
- npm (v6.13.4) or yarn (v1.22.0)
- node (v12.16.0)

### Environment set up

1. Copy the .env.example file in the folder env to create your custom env file (Verify credentials fro mongo). Used env files are .env.development and .env.test (This last is not required now).

2. Run the following commands where env is the enviroment you want to initialize, development, test, production, etc. (For test is not required.):

```
npm install
npm run setup <env>
```
or

```
yarn install
yarn setup <env>
```

### Run the tests

Run the following command:

```
npm run test
```

or

```
yarn test
```