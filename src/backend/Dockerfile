# Use the official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the Hardhat network port
EXPOSE 8545

# Start the Hardhat node and deploy the contracts
CMD ["sh", "-c", "npx hardhat node & sleep 5 && npx hardhat run scripts/deploy_etherfund.js --network localhost && tail -f /dev/null"]
