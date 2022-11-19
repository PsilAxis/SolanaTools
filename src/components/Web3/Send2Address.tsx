import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { SystemProgram, Transaction, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import React, { FC, useCallback, useState } from 'react';

let thelamports = 0.000;
let theWallet = '';


export const SendSOLToAddress: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    let [TxLink, setLink] = useState('');

    let [Wallet, setWallet] = useState('');
    let [lamports, setLamports] = useState(0.00);
    let [Tx, setTx] = useState('');
   


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const [Show, setShow] = useState(false) //Create Show state and set it later with setShow

    

    const showClick = () => setShow(!Show)

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    const onClick = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();
        
        // 890880 lamports as of 2022-09-01
        let lamportsI = LAMPORTS_PER_SOL * thelamports;

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(theWallet),
                lamports: lamportsI,
            }) 
        );
        const {
            context: { slot: minContextSlot },
            value: { blockhash, lastValidBlockHeight }
        } = await connection.getLatestBlockhashAndContext();

        const signature = await sendTransaction(transaction, connection, { minContextSlot });

        await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
        setTx(signature)

        //create Tx url LINK
        let Link = 'https://explorer.solana.com/tx/' + signature + '?cluster=devnet'
        setLink(Link);

    }, [publicKey, sendTransaction, connection]);

    function setTheLamports(e: any) {
        console.log(Number(e.target.value));
        setLamports(Number(e.target.value));
        lamports = e.target.value;
        thelamports = lamports;
    }

    function setTheWallet(e: any) {
        setWallet(e.target.value)
        theWallet = e.target.value;
    }

    //Show Results, will be used later to show the current state.

    return (
        <div className="Send2Address">
            <button className="OpenClose" onClick={showClick}> Send2Address </button>
            {Show ? <div className="S2Address">
                <h4> Input Recieving Address and Amount. </h4>
                <form className="">
                    <label>

                        <p>Address:</p>
                        <input type="text" value={Wallet} onChange={(e) => setTheWallet(e)} disabled={!publicKey} />
                        <br />
                        <p style={{ margin: 0 }}>
                            Tx:
                            <a href={TxLink} target="_blank">
                                {' ' + Tx}
                            </a>
                        </p>

                        <p style={{ margin: 0 }}>
                            {'Sending to: ' + theWallet}
                        </p>


                        <p>Amount:</p>
                        <input type="number" value={lamports} onChange={(e) => setTheLamports(e)} disabled={!publicKey} />

                    </label>
                </form>

                <button className="TxButton" onClick={onClick} disabled={!publicKey}>
                    Sending {thelamports} SOL!
                </button>
            </div>: null}
        </div>
    );
};
