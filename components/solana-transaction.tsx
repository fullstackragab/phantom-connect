import {
  VersionedTransaction,
  TransactionMessage,
  SystemProgram,
  PublicKey,
  Connection,
} from "@solana/web3.js";
import { useSolana } from "@phantom/react-sdk";
import { useState } from "react";

export default function SolanaTransaction() {
  const { solana } = useSolana();
  const [status, setStatus] = useState<string>("");

  const sendTransaction = async () => {
    const connection = new Connection("https://api.devnet.solana.com");
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    const fromAddress = await solana.getPublicKey();
    const toAddress = "6GXVP4mTMNqihNARivweYwc6rtuih1ivoJN7bcAEWWCV";
    if (!fromAddress) {
      throw new Error("Failed to get public key");
    }
    const transferInstruction = SystemProgram.transfer({
      fromPubkey: new PublicKey(fromAddress),
      toPubkey: new PublicKey(toAddress),
      lamports: 500000, // 0.0005 SOL
    });

    const messageV0 = new TransactionMessage({
      payerKey: new PublicKey(fromAddress),
      recentBlockhash: blockhash,
      instructions: [transferInstruction],
    }).compileToV0Message();

    const transaction = new VersionedTransaction(messageV0);

    const result = await solana.signAndSendTransaction(transaction);
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
  };

  return (
    <>
      <button
        className="px-4 py-2 ml-8 mt-4 cursor-pointer bg-green-600 text-white rounded hover:bg-green-700"
        onClick={sendTransaction}
      >
        Send SOL
      </button>
      <p className="mt-4 ml-8">{status}</p>
    </>
  );
}
