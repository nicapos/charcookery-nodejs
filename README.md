# CharCookery

A REST API backend for [CharCookery](https://github.com/CheaFernandez/MOBDEVE_CharCookery), an Android project built as a course requirement for MOBDEVE.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/nicapos/charcookery-nodejs.git
cd charcookery-nodejs
```

2. Initialize and install the necessary modules.
```bash
npm install
```

3. Configure environment variables. Duplicate the [`.env.example`](./.env.example) file and name it as `.env`. Fill in the required environment variables in the file with the appropriate values.

## Usage
To start the application in development, run:
```bash
npm run start
```

This will start the server at [localhost:3000](http://localhost:3000) and the documentation at [localhost:3000/docs](http://localhost:3000/docs) (or replace with the port specified in your `.env` file if different).

To build the app at `/dist`, run:
```bash
npm run build
```

After building, you can start the app in production by running:
```bash
npm run serve
```

<!-- Source: https://dev.to/wizdomtek/typescript-express-building-robust-apis-with-nodejs-1fln -->