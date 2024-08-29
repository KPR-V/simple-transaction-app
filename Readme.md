# Simple Transaction App

**Simple Transaction App** is a decentralized application (dApp) that facilitates Ethereum transactions between two parties without storing ether in the contract. The project leverages the latest technologies, including ethers.js, Next.js, Foundry, zod, and dotenv, to provide a secure and efficient way to conduct peer-to-peer transactions on the Ethereum blockchain.

## Features

- **Secure Transactions**: The smart contract ensures that ether is transferred directly from the sender to the receiver without being stored in the contract.
- **Real-time Validation**: Input data is validated in real-time using zod, ensuring that only valid Ethereum addresses and amounts are processed.
- **Tested Deployment**: The smart contract is thoroughly tested using Foundry, ensuring reliability and security in real-world scenarios.

## Technologies Used

- **Ethers.js**: For interacting with the Ethereum blockchain and the deployed smart contract.
- **Next.js**: Provides the frontend framework for building the user interface.
- **Foundry**: A blazing fast, portable, and modular toolkit for Ethereum application development, used here for testing the smart contract.
- **Zod**: A TypeScript-first schema declaration and validation library, used for validating user input.
- **dotenv**: For managing environment variables securely.

## Smart Contract

The smart contract that powers this dApp is designed to facilitate transactions without storing ether. It has been deployed on a testnet (Sepolia) and includes functionalities for securely transferring ether from one party to another.

### Key Functions:

- **Transaction**: The core function that transfers ether from the sender to the receiver.

## Deployment and Testing

The smart contract is deployed on the Sepolia testnet, and tests have been conducted using Foundry to ensure the robustness of the contract.

### Running Tests

To run the tests locally:

1. Clone the repository.
2. Install Foundry.
3. Configure your `.env` file with the required environment variables.
4. Run `forge test` to execute the tests.

## Getting Started

### Prerequisites

- Node.js (v20)
- NPM or Yarn
- Foundry

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/simple-transaction-app.git
   cd simple-transaction-app
      ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Set up environment variables by creating a .env file:
   ```plaintext
   SEPOLIA_RPC_URL=your_sepolia_rpc_url
   PRIVATE_KEY=your_private_key
    ```
4.  Run the application:
   ```bash
     npm run dev
 ```


# Usage 
1. Open the application in your browser.
2. Enter the recipient's Ethereum address and the amount of ether to send.
3. The input will be validated in real-time.
4. Click "Send" to execute the transaction.

# License
This project is licensed under the MIT License.