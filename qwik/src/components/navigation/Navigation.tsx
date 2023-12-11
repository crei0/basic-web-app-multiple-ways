
import { component$, useStylesScoped$ } from '@builder.io/qwik';

import { PATH } from '../../utilities/constants';
import styles from "./navigation.css?inline";

const Navigation = component$(() => {
    useStylesScoped$(styles);

    return (
        <nav>
            <ul>
                <li>
                    <a href={PATH.MAIN}>Start</a>
                </li>
                <li>
                    <a href={PATH.TRANSACTIONS}>Transactions</a>
                </li>
            </ul>
        </nav>
    );
}
);


export default Navigation;