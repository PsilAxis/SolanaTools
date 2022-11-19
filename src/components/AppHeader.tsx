import {
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { Balance } from './Web3/WalletBalance';

function Header() {
	return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">SolAxis</a>

                <div className="navbar-collapse" id="navbarNavDropdown">
                    <Balance />
                </div>
                <div className="Connect">
                    <WalletMultiButton />
                </div>
            </nav>
            </header>
    )
};
export default Header;