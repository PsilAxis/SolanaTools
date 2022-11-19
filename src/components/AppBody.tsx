import { SendSOLToRandomAddress } from './Web3/Send2Random';
import { SendSOLToAddress } from './Web3/Send2Address';

import { Airdrop } from './Web3/RequestAirdrop';
import { Donate } from './Web3/Donation';
import { useWallet } from '@solana/wallet-adapter-react';
import { Balance } from './Web3/WalletBalance';

function AppBody() {

    const { publicKey, sendTransaction } = useWallet();

    if (!publicKey) return (
        <div className="noLog">

            <h1 style={{ }}>
                Please Sign in Using Solana Wallet
            </h1>
            

        </div>
    );
    return (
        <div className="App-Body">
            <div className="OpenButtons">
            <div>
                <SendSOLToRandomAddress />
            </div>

            <div>
                <SendSOLToAddress />
            </div>

            <div>
                <Airdrop />
            </div>

            <div>
               <Donate />
            </div>
        </div>
        </div>
    )
};
export default AppBody;