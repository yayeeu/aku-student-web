FROM node:20.11.1-alpine

# Set working directory
WORKDIR /app

# Install curl
RUN apk add --no-cache curl

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

#RUN npm install --save-dev @types/react @types/react-dom @types/react-router-dom
#RUN npm install --save-dev @types/node @types/axios
RUN npm install axios
RUN npm install --save-dev @types/react @types/react-router-dom
RUN npm install @langchain/core@latest @langchain/google-genai@latest @langchain/openai@latest langchain@latest

# Copy the rest of the application
COPY . .

# Expose the correct port
EXPOSE 8080

# Start the app in development mode with hot reloading
CMD ["npm", "run", "dev", "--", "--host"]