import {  LAMPORTS_PER_SOL , PublicKey} from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { FC, useCallback, useState } from 'react';

let theWallet = ('');

export const Airdrop: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    
    let [TxLink, setLink] = useState('');
    let [Wallet, setWallet] = useState('');
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

        
        const signature = await connection.requestAirdrop(new PublicKey(theWallet), LAMPORTS_PER_SOL);

        await connection.confirmTransaction(signature);

        setTx(signature);
        console.log("Tx: ", signature)
        //create Tx url LINK
        let Link = 'https://explorer.solana.com/tx/' + signature + '?cluster=devnet'
        setLink(Link);

    }, [publicKey, sendTransaction, connection]);

    function setTheWallet(e: any) {
        setWallet(e.target.value);
        theWallet = e.target.value;
    }

    return (
        <div className="AirdropCss">

            <button className="OpenClose" onClick={showClick}> Airdrop Sol </button>
            {Show ? <div className="Airdrop" >
                <h4> Input Recieving Address </h4>
                <form >
                    <label>
                        <p>
                            Address:
                            <input type="text" value={Wallet} onChange={(e) => setTheWallet(e)} disabled={!publicKey} />
                        </p>
                    </label>
                </form>

                <h6>
                    <p style={{ margin: 2 }}>Address: {theWallet} </p>
                    <p style={{ margin: 0 }}>
                        Tx:
                        <a href={TxLink} target="_blank">
                            {' ' + Tx}
                        </a>
                    </p>
                </h6>

                <button className="TxButton" onClick={onClick} disabled={!publicKey}>
                    Airdrop 1 SOL !
                </button>
                <br />
                *Devnet Only
                <br />
                *Airdrops fail often. Please try again later.
            </div>: null}

        </div>
    );
};