import {
  PublicKey,
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { useSolana } from "@phantom/react-sdk";
import {
  createTransferInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  getAccount,
} from "@solana/spl-token";
import { useState } from "react";

export default function USDCTransaction() {
  const { solana } = useSolana();
  const [status, setStatus] = useState<string>("");

  const sendTransaction = async () => {
    try {
      const connection = new Connection("https://api.devnet.solana.com");
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();

      const fromPubkeyStr = await solana.getPublicKey();
      if (!fromPubkeyStr) throw new Error("Failed to get public key");

      const fromPubkey = new PublicKey(fromPubkeyStr);
      const toPubkey = new PublicKey(
        "6GXVP4mTMNqihNARivweYwc6rtuih1ivoJN7bcAEWWCV"
      );
      const USDC_MINT = new PublicKey(
        "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
      );

      // Debug: Check balances first
      const solBalance = await connection.getBalance(fromPubkey);
      setStatus(`SOL balance: ${solBalance / 1e9} SOL`);

      if (solBalance < 10000000) {
        // Less than 0.01 SOL
        throw new Error(
          "Not enough SOL for transaction fees. Get devnet SOL from a faucet."
        );
      }

      const fromTokenAccount = await getAssociatedTokenAddress(
        USDC_MINT,
        fromPubkey
      );
      const toTokenAccount = await getAssociatedTokenAddress(
        USDC_MINT,
        toPubkey
      );

      // Check if sender has USDC
      try {
        const tokenAccountInfo = await getAccount(connection, fromTokenAccount);
        setStatus(`USDC balance: ${tokenAccountInfo.amount.toString()}`);

        if (tokenAccountInfo.amount < BigInt(1_000_000)) {
          throw new Error("Not enough USDC. You need at least 1 USDC.");
        }
      } catch (e: unknown) {
        if (e instanceof Error && e.name === "TokenAccountNotFoundError") {
          throw new Error(
            "You don't have a USDC token account on devnet for this mint."
          );
        }
        throw e;
      }

      const instructions = [];

      const toAccountInfo = await connection.getAccountInfo(toTokenAccount);
      if (!toAccountInfo) {
        instructions.push(
          createAssociatedTokenAccountInstruction(
            fromPubkey,
            toTokenAccount,
            toPubkey,
            USDC_MINT
          )
        );
      }

      instructions.push(
        createTransferInstruction(
          fromTokenAccount,
          toTokenAccount,
          fromPubkey,
          200_000
        )
      );

      const message = new TransactionMessage({
        payerKey: fromPubkey,
        recentBlockhash: blockhash,
        instructions,
      }).compileToV0Message();

      const tx = new VersionedTransaction(message);

      const result = await solana.signAndSendTransaction(tx);
      setStatus("Transaction sent, awaiting confirmation...");

      const confirmation = await connection.confirmTransaction(
        {
          signature: result.signature,
          blockhash,
          lastValidBlockHeight,
        },
        "finalized"
      );

      if (confirmation.value.err) {
        throw new Error("Transaction failed to finalize");
      }

      setStatus("Transaction finalized!");
      console.log("Transaction finalized!");
      console.log("Transaction sent:", result.signature);
    } catch (error: unknown) {
      console.error("Full error:", error);
      setStatus(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  return (
    <>
      <button
        className="px-4 py-2 ml-8 mt-4 cursor-pointer bg-green-600 text-white rounded hover:bg-green-700"
        onClick={sendTransaction}
      >
        Send USDC
      </button>
      <p className="mt-4 ml-8 max-w-md break-all">{status}</p>
    </>
  );
}
