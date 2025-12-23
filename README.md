# Phantom Wallet Connection Example

**From the book:** _Fast, Low-Fee Mobile Crypto Payments: A Practical Guide to Solana USDC in React Native_

This is a practical example demonstrating how to integrate Phantom wallet with a Next.js application and submit transactions to the Solana blockchain.

## What This Example Demonstrates

- ✅ Connecting to Phantom wallet browser extension
- ✅ Detecting wallet connection status
- ✅ Displaying connected wallet address
- ✅ Creating and signing Solana transactions
- ✅ Submitting transactions to Solana devnet
- ✅ Confirming transaction finalization

## Architecture Overview

```
app/page.tsx                          → Main entry point
components/phantom-connect.tsx        → Phantom SDK Provider setup
components/wallet-connect.tsx         → Wallet connection UI
components/solana-transaction.tsx     → Transaction submission logic
```

## Prerequisites

- Node.js 18+ installed
- [Phantom Wallet](https://phantom.app/) browser extension installed
- SOL tokens on devnet (get from [Solana Faucet](https://faucet.solana.com/))

## Getting Started

1. **Install dependencies:**

```bash
npm install
```

2. **Run the development server:**

```bash
npm run dev
```

3. **Open your browser:**

   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Click "Connect Wallet" button
   - Approve connection in Phantom popup

4. **Test transaction:**
   - Click "Send SOL" button
   - Approve transaction in Phantom
   - Transaction sends 0.0005 SOL to a test address

## Key Technologies

- **Next.js 15** - React framework with App Router
- **@phantom/react-sdk** - Official Phantom wallet React integration
- **@solana/web3.js** - Solana blockchain JavaScript SDK
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling

## Code Walkthrough

### 1. Provider Setup (`phantom-connect.tsx`)

Wraps the app with `PhantomProvider` to enable wallet functionality across all components.

### 2. Wallet Connection (`wallet-connect.tsx`)

Uses `usePhantom()` hook to access connection state and `ConnectBox` component for UI.

### 3. Transaction Flow (`solana-transaction.tsx`)

Demonstrates complete transaction lifecycle:

- Connect to Solana RPC
- Get wallet public key
- Create transfer instruction
- Build transaction message
- Sign and send via Phantom
- Confirm finalization

## Network Configuration

This example uses **Solana Devnet** for testing. To use mainnet:

```typescript
const connection = new Connection("https://api.mainnet-beta.solana.com");
```

## Book Reference

This example is featured in Chapter X of _Fast, Low-Fee Mobile Crypto Payments_, demonstrating core concepts that apply to both web and React Native implementations.

## Learn More

- [Phantom Documentation](https://docs.phantom.app/)
- [Solana Web3.js Docs](https://solana-labs.github.io/solana-web3.js/)
- [Next.js Documentation](https://nextjs.org/docs)

## License

Educational example for book readers.
