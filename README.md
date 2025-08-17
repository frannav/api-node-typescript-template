# Template API Node.js and TypeScript

## Prerequisites

-   [Node.js](https://nodejs.org/) (v18.0 or higher)
-   [pnpm](https://pnpm.io/) (recommended package manager)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone api-node-typescript-template
    cd api-node-typescript-template
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables (opcional):**
    Create a `.env` file in the root of the project to override default variables:
    ```
    PORT=3000
    NODE_ENV=development
    ```
    
    **Note**: This project uses Node.js native environment variable support (requires Node.js 20+). The `.env` file is optional since variables can also be set via the shell or system environment.

## Usage

### Development

To run the server in development mode with auto-reloading:

```bash
npm run dev
```

This command will:
1. **Compile** TypeScript files to `dist/` directory using `tsc`
2. **Start** the server with Node.js native `--watch dist/index.js` 
3. **Auto-restart** when compiled files change

**Note**: When you modify TypeScript files in `src/`, you need to run `npm run build` to recompile, then the server will automatically restart.

The server will be available at `http://localhost:3000`.

### Production

To build and run the server in production mode:

1.  **Build the project:**
    ```bash
    npm run build
    ```

2.  **Start the server:**
    ```bash
    npm start
    ```

## Environment Variables

This project uses Node.js native environment variable support (Node.js 20+). You can set environment variables in multiple ways:

### 1. Using a `.env` file (recommended for development):
```bash
# Create a .env file in the project root
PORT=3000
NODE_ENV=development
```

### 2. Using shell environment:
```bash
PORT=3000 npm run dev
```

### 3. Using system environment variables:
```bash
export PORT=3000
npm run dev
```

### Available Environment Variables:
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Application environment (development, production, test)

The project automatically loads `.env` files using Node.js native `--env-file-if-exists` flag, which means:
- ✅ The `.env` file is optional (won't cause errors if missing)
- ✅ System environment variables take precedence over `.env` file values
- ✅ No additional dependencies required (uses Node.js built-in support)

## Available Scripts

In the `package.json` file, you'll find several scripts for common development tasks:

-   `dev`: Compiles TypeScript and starts development server with Node.js native `--watch` for auto-restart.
-   `start`: Starts the pre-compiled application from `dist/` directory. Requires `build` first.
-   `build`: Compiles the TypeScript project into JavaScript using `tsc`.
-   `test`: Runs both unit and integration tests directly from TypeScript (no compilation needed).
-   `test:unit`: Runs only the unit tests using `tsx --test` (direct TypeScript execution).
-   `test:integration`: Runs only the integration tests using `tsx --test` (direct TypeScript execution).
-   `lint`: Lints and automatically fixes issues in the codebase using Biome.
-   `lint:check`: Checks for linting and formatting errors without applying changes.
-   `lint:check:fix`: Checks for linting and formatting errors applying safe changes.
-   `format`: Formats the entire codebase using Biome.
-   `ci:check`: Runs all Biome checks (lint, format, etc.), suitable for a CI pipeline.

You can run any script using `npm run <script-name>`. For example:
```bash
npm run test
```

## Running with Docker

You can also run the application using Docker and Docker Compose.

1.  **Build and run with Docker Compose (recommended):**
    ```bash
    docker-compose up -d
    ```
    This command builds the image and starts the container in the background. The API will be available at `http://localhost:8080`. The `db.json` file is mounted as a volume to persist data across container restarts.

2.  **Manual build and run with Docker:**
    -   **Build the image:**
        ```bash
        docker build -t node-ts-api .
        ```
    -   **Run the container:**
        ```bash
        docker run -p 8080:8080 -v ./db.json:/app/db.json --env-file ./.env node-ts-api
        ```

## API Documentation

This project uses Swagger for API documentation. Once the server is running, you can access the interactive API documentation by navigating to `/api-docs` in your browser.

-   **Development**: `http://localhost:3000/api-docs`
-   **Docker**: `http://localhost:8080/api-docs`

The documentation provides detailed information about all available endpoints, including request parameters, response bodies, and status codes.

## Node.js Features

This template leverages modern Node.js features:

-   **Native Watch Mode**: Uses `node --watch` for development hot-reloading (Node.js 18+)
-   **Native Environment Variables**: Uses `node --env-file` for `.env` file support (Node.js 20+)
-   **ES Modules**: Full ES module support with TypeScript
-   **Native Test Runner**: Uses Node.js built-in test runner for testing
-   **TypeScript Compilation**: Uses standard `tsc` for reliable TypeScript compilation
-   **Stable Architecture**: No experimental loaders - production-ready approach

### Development Workflow

The development setup uses a **hybrid approach** that balances stability and practicality:

#### **Application Code (Production-Ready):**
1. **Initial Setup**: `npm run dev` compiles TypeScript and starts the server
2. **Development**: Edit files in `src/`
3. **Recompile**: Run `npm run build` to see changes
4. **Auto-restart**: Server automatically restarts when `dist/` files change

#### **Tests (Development-Friendly):**
- **Unit Tests**: Run directly from TypeScript using `tsx --test`
- **Integration Tests**: Run directly from TypeScript using `tsx --test`
- **No compilation needed**: Tests execute immediately

#### Quick Development Commands:
```bash
# Start development server
npm run dev

# After editing TypeScript files, recompile:
npm run build
# Server will auto-restart!

# Run tests (no compilation needed)
npm test
npm run test:unit
npm run test:integration
```

#### **Why This Hybrid Approach?**

**✅ Application Compiled (Stable):**
- **Production-ready**: Same process for dev and production
- **No experimental features**: Uses standard `tsc` + `node`
- **Performance**: Compiled code runs faster
- **Debugging**: Clear separation between source and runtime

**✅ Tests Direct Execution (Practical):**
- **Speed**: No compilation step slows down testing
- **Simplicity**: Edit test → run test (immediate feedback)
- **Logical**: Tests are development code, not production assets
- **Modern**: Uses `tsx` - a modern, fast TypeScript runner

This approach provides:
- ✅ **Best of both worlds**: Stable production, fast development
- ✅ **No experimental loaders** for the main application
- ✅ **Fast test cycles** without compilation overhead
- ✅ **Clear separation** between production and development concerns

## API Endpoints

All endpoints are prefixed with `/api`.

### Users
- `POST /api/users`: Create a new user.
  - **Body**: `{ "name": "John Doe", "email": "john.doe@example.com", "password": "yourpassword" }`

## Project Structure

The project follows a modular, layered architecture:

-   `src/`: Main source code directory.
    -   `adapters/`: Connectors to external systems (e.g., database).
    -   `config/`: Application configuration.
    -   `middleware/`: Express middlewares.
    -   `modules/`: Feature-based modules (e.g., `user`, `account`, `card`). Each module contains its own router, controller, services, schemas, and types.
    -   `routes.ts`: Main API router that aggregates all module routers.
    -   `app.ts`: Express application setup.
    -   `index.ts`: Application entry point.
