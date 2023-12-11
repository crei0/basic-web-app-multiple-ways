import {
    component$,
    useStylesScoped$,
    useResource$,
    Resource
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

import { PATH, API_PATH } from '../../../utilities/constants';
import styles from "./transactions-details.css?inline";
import { DisplayTransactionState } from "~/components/partials";

export default component$(() => {
    useStylesScoped$(styles);

    const loc = useLocation();

    const dataResource = useResource$(async () => {
        const result = await fetch(API_PATH.TRANSACTION_DETAILS + '/' + loc.params.id)

        return result.json();
    });

    return (
        <div>
            <Resource
                value={dataResource}
                onPending={() => <div>Loading...</div>}
                onRejected={(reason) => <div>Error: {reason}</div>}
                onResolved={(data) => {
                    if (data) {
                        return (
                            <div>
                                <a href={PATH.TRANSACTIONS}>
                                    Back
                                </a>

                                <h2>Transaction: {data.id}</h2>

                                <section id="details">
                                    <div class='details-field'>State:</div>
                                    <div class='details-value'><DisplayTransactionState state={data.state} /></div>

                                    <div class='details-field'>Amount:</div>
                                    <div class='details-value'>{data.amount} &euro;</div>

                                    <div class='details-field'>Date:</div>
                                    <div class='details-value'>{data.dateUnix}</div>

                                    <div class='details-field'>Card holder:</div>
                                    <div class='details-value'>{data.cardHolder}</div>

                                    <div class='details-field'>Notes:</div>
                                    <div class='details-value'>{data.notes}</div>
                                </section>
                            </div>
                        );
                    } else {
                        return <div>Transaction data couldn't be found</div>;
                    }
                }}
            />
        </div>
    );
});
