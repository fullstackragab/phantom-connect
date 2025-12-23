"use client";

import { PhantomProvider, lightTheme } from "@phantom/react-sdk";
import { AddressType } from "@phantom/browser-sdk";
import SolanaTransaction from "@/components/solana-transaction";
import WalletConnect from "@/components/wallet-connect";

export default function PhantomConnect() {
  return (
    <PhantomProvider
      config={{
        providers: ["injected"],
        addressTypes: [AddressType.solana],
      }}
      theme={lightTheme}
      appName="Phantom Next.js"
    >
      <WalletConnect />
      <SolanaTransaction />
    </PhantomProvider>
  );
}
