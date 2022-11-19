import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { SystemProgram, Transaction, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import React, { FC, useCallback, useState } from 'react';

let thelamports = 0.000;
let theWallet = 'FNPHcFciDRmeuDtxPnfnqmRxRDLTBZfX5UenCLe9w8QZ';

export const Donate: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    let [lamports, setLamports] = useState(0.00);
    let [Tx, setTx] = useState('');

    let [TxLink, setLink] = useState('');

    const [Show, setShow] = useState(false) //Create Show state and set it later with setShow

    const showClick = () => setShow(!Show)





    const onClick = useCallback(async () => {

        if (!publicKey) throw new WalletNotConnectedError();

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

        //Update NEW Tx Value
        setTx(signature);

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

    return (
        <div className="Donations">

            <button className="OpenClose" onClick={showClick}> Donations </button>
            {Show ? <div className="Donate">
                <form>
                    <label>
                        <h1>Donation!</h1>
                        <p style={{ margin: 0 }}>MyAddress:</p>
                        {theWallet}

                        <br />
                        <p style={{ margin: 0 }}> Tx: </p>
                        <a href={TxLink} target="_blank">
                            {Tx}
                        </a>

                        <p>Amount:</p>
                        <input type="number" value={lamports} onChange={(e) => setTheLamports(e)} disabled={!publicKey} />

                    </label>
                </form>

                <button className="TxButton" onClick={onClick} disabled={!publicKey}>
                    Donating {thelamports} SOL!
                </button>
            </div> : null}

        </div>
    );
};