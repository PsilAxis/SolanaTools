import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import React, { FC, useCallback, useState } from 'react';
import logo from '../logo.png';

export const SendSOLToRandomAddress: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    let [Address, setAddress] = useState('');


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const [Show, setShow] = useState(false) //Create Show state and set it later with setShow
    //Show Results, will be used later to show the current state.
    const Results = () => (
        <div>
            <div>
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <h6>Send 0.00089588 SOL</h6>
            <button className="TxButton" onClick={() => { onClick(); }} disabled={!publicKey}>
                Send
            </button>
            <h6>
                <p style={{ margin: 0 }}> Random Address:</p>
                {Address}
            </h6>
        </div>
    )

    const showClick = () => setShow(!Show)

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const onClick = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();

        // 890880 lamports as of 2022-09-01
        const lamports = await connection.getMinimumBalanceForRentExemption(0);
        let reciever = Keypair.generate().publicKey;
        let recieverW = reciever.toBase58();
        
        console.log(recieverW)
        setAddress(recieverW)

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: reciever,
                lamports,
            })      
        );
        const {
            context: { slot: minContextSlot },
            value: { blockhash, lastValidBlockHeight }
        } = await connection.getLatestBlockhashAndContext();

        const signature = await sendTransaction(transaction, connection, { minContextSlot });

        await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
    }, [publicKey, sendTransaction, connection]);


    return (

        <div className="Send2Random">
            <button className="OpenClose" onClick={showClick}> Send2Random </button>
            <div className="S2Random">
                
                {Show ? <Results /> : null}
            </div>
        </div>
    );
};