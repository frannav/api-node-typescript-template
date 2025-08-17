# Use the official Node.js image as a base
FROM node:18-alpine AS base
WORKDIR /usr/src/app

# Create a temporary directory for development dependencies to leverage caching
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json pnpm-lock.yaml /temp/dev/
RUN cd /temp/dev && corepack enable pnpm && pnpm install --frozen-lockfile

# Create a temporary directory for production dependencies
RUN mkdir -p /temp/prod
COPY package.json pnpm-lock.yaml /temp/prod/
RUN cd /temp/prod && corepack enable pnpm && pnpm install --frozen-lockfile --prod

# Copy all non-ignored project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Set environment for production and build the application
ENV NODE_ENV=production
RUN npm run build

# Create the final, optimized release image
FROM base AS release
# Copy production dependencies from the install stage
COPY --from=install /temp/prod/node_modules node_modules
# Copy the built application from the prerelease stage
COPY --from=prerelease /usr/src/app/dist ./dist
# Copy essential files for running the app
COPY --from=prerelease /usr/src/app/package.json .
COPY --from=prerelease /usr/src/app/db.json .
COPY --from=prerelease /usr/src/app/.development.env .


# Run the application as a non-root user for security
USER node
EXPOSE 8080/tcp

# Define the entrypoint for the container
ENTRYPOINT [ "node", "dist/index.js" ]

