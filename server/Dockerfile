FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --silent

# Copy rest of the server code
COPY . .

EXPOSE 5000
CMD ["npm", "start"]
