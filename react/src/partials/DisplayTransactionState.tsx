import { TransactionState } from '../utilities/types';
import translations from '../utilities/translations';
import DisplayTransactionStateProps from './types';

function DisplayTransactionState({ state }: DisplayTransactionStateProps): React.JSX.Element {
    if (state) {
        // TODO: An error might be lurking here, if the state is not mappeable
        return (
            <span>{translations.transactionState[state]}</span>
        );
    }

    return (<span>{translations.transactionState[TransactionState.Unknown]}</span>);
}

export default DisplayTransactionState;
