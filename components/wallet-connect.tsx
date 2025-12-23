"use client";

import { ConnectBox } from "@phantom/react-sdk";
import { usePhantom } from "@phantom/react-sdk";

export default function WalletConnect() {
  const { isConnected, user, isLoading } = usePhantom();

  return (
    <>
      {isLoading ? (
        <div>
          <h1>Initializing Phantom SDK...</h1>
          <p>Please wait...</p>
        </div>
      ) : (
        <>
          <ConnectBox />
          <div>{isConnected ?? user?.addresses[0]}</div>
        </>
      )}{" "}
    </>
  );
}
