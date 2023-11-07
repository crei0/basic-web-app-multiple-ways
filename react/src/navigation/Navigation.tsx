import { Link } from 'react-router-dom';

import { PATH } from '../utilities/constants';
import './navigation.css'

function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to={PATH.MAIN}>Start</Link>
                </li>
                <li>
                    <Link to={PATH.TRANSACTIONS}>Transactions</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;