# Base image with Node.js, Chromium, and necessary dependencies
FROM cypress/browsers:22.17.0

# Set working directory
WORKDIR /e2e

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (Cypress, TypeScript, etc.)
RUN npm ci

# Copy all project files (e.g. Cypress tests, configs)
COPY . .

# Optional: Set environment variables (useful for CI)
ENV CYPRESS_BASE_URL=https://app.qa.nesto.ca

# Run Cypress tests headlessly in Chrome
CMD ["npx", "cypress", "run"]
