import { component$ } from '@builder.io/qwik';

import { TransactionState } from '../../utilities/types';
import translations from '../../utilities/translations';
import type DisplayTransactionStateProps from './types';

const DisplayTransactionState = component$(({ state }: DisplayTransactionStateProps) => {
    if (state) {
        // TODO: An error might be lurking here, if the state is not mappeable
        return (
            <span>{translations.transactionState[state]}</span>
        );
    }

    return (<span>{translations.transactionState[TransactionState.Unknown]}</span>);
});

export default DisplayTransactionState;
