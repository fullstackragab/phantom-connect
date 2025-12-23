"use client";

import { PhantomProvider, lightTheme } from "@phantom/react-sdk";
import { AddressType } from "@phantom/browser-sdk";
import SolanaTransaction from "@/components/solana-transaction";
import WalletConnect from "@/components/wallet-connect";
import USDCTransaction from "./usdc-transaction";

export default function PhantomConnect() {
  return (
    <PhantomProvider
      config={{
        providers: ["injected"],
        addressTypes: [AddressType.solana],
      }}
      debugConfig={{ enabled: true }}
      theme={lightTheme}
      appName="Phantom Next.js"
    >
      <WalletConnect />
      <SolanaTransaction />
      <USDCTransaction />
    </PhantomProvider>
  );
}
