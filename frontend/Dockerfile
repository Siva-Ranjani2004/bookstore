# Use Node image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose Vite port
EXPOSE 5173

# Run Vite dev server (important: --host for external access)
CMD ["npm", "run", "dev", "--", "--host"]