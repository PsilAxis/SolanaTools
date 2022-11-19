import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, } from '@solana/web3.js';
import { FC, useState } from 'react';

export const Balance: FC = () => {

    const { connection } = useConnection();
    const { publicKey } = useWallet();

    let [WalletBalance, setBalance] = useState(0); // Allows you to change the WalletBalance

    const getBalance = (async () => {
        if (!publicKey) throw new WalletNotConnectedError();



        let balance = await connection.getBalance(publicKey);

        WalletBalance = (balance / LAMPORTS_PER_SOL);

        setBalance(WalletBalance); // Set new WalletBalance using setBalance // IMPORTANT

        return;
    });

    getBalance()

    if (!publicKey) return (
        <div className="Greeting">

            Hello, Stranger!

        </div>
    );
    return (
         
        <div className="Greeting">
            Balance:
            ${WalletBalance} SOL! {/* This is where id like WalletBalance to show. */}
            <button className="OpenClose" onClick={getBalance} disabled={!publicKey}> Refresh</button>
            <p style={{ fontSize: 10, margin: 0 }}>
                *please Refresh after each transaction to see updated balance.
            </p>
            
        </div>
    );
}
