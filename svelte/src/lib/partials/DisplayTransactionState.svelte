<script lang="ts">
    import { TransactionState } from '../utilities/types';
    import translations from '../utilities/translations';

    export let state;
    
    let stateText = translations.transactionState[TransactionState.Unknown];

    if (state) {
        // TODO: FIXME: Fix TS error
        stateText = translations.transactionState[state];
    }
</script>

<span>{stateText}</span>