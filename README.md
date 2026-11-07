# Bun CI/CD Project

A small Bun web application with GitHub Actions and Jenkins pipelines.

## Run locally

Install dependencies and start the app:

```bash
bun install
bun run start
```

The app runs at `http://localhost:3000`. It has a home route (`/`) and a health route (`/health`).

## Run tests

```bash
bun test
```

## Run with Docker

```bash
docker build -t bun-cicd-project .
docker run --rm -p 3000:3000 bun-cicd-project
```

GitHub Actions tests the app and builds the Docker image on pushes to `main`. The Jenkins pipeline also tests, deploys, and checks the app health.
