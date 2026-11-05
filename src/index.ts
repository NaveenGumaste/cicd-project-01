const PORT = Number(Bun.env.PORT ?? 3000);

export const app = {
  fetch(request: Request): Response {
    const url = new URL(request.url);

    // Health check endpoint
    if (url.pathname === "/health") {
      return Response.json({
        status: "healthy",
        message: "Application is running",
        runtime: "Bun",
      });
    }

    // Main application endpoint
    if (url.pathname === "/") {
      return Response.json({
        message: "Hello from Bun!",
        application: "CI/CD Demo",
        runtime: "Bun",
        status: "success",
      });
    }

    // Handle unknown routes
    return Response.json(
      {
        message: "Route not found",
      },
      {
        status: 404,
      },
    );
  },
};

// Start the server only when this file is executed directly.
if (import.meta.main) {
  const server = Bun.serve({
    port: PORT,
    fetch: app.fetch,
  });

  console.log(`Server running at http://localhost:${server.port}`);
}
