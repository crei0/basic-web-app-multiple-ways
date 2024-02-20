<script>
	import { onMount } from 'svelte';
    import { redirect } from '@sveltejs/kit';
    import { page } from '$app/stores';

    import { PATH, API_PATH } from '../../../lib/utilities/constants';
    import DisplayTransactionState from '../../../lib/partials/DisplayTransactionState.svelte'

    let isLoaded = false;
    let error = '';

    let data = {
        id: '',
        state: 0,
        amount: 0,
        dateUnix: 0,
        cardHolder: '',
        notes: ''
    };

    onMount(() => {
        console.log('+page.svelte #22 > $page', $page);

        if (!$page.params?.transactionId) {
            redirect(302, PATH.TRANSACTIONS);
        } else {
            fetch(API_PATH.TRANSACTION_DETAILS + '/' + $page.params?.transactionId)
                .then(res => res.json())
                .then(
                    (result) => {
                        isLoaded = true;
                        data = result;
                    },
                    (error) => {
                        isLoaded = true;
                        error = error.message;
                    }
                )
        }

        
    });

    // export function load() {
    //     console.log($page.params)

    //     // console.log('+page.svelte #19 > params', params);
        
    //     // if (!params?.transactionId) {
    //     //     redirect(302, PATH.TRANSACTIONS);
    //     // }

    //     // fetch(API_PATH.TRANSACTION_DETAILS + '/' + params?.transactionId)
    //     //     .then(res => res.json())
    //     //     .then(
    //     //         (result) => {
    //     //             isLoaded = true;
    //     //             data = result;
    //     //         },
    //     //         (error) => {
    //     //             isLoaded = true;
    //     //             error = error.message;
    //     //         }
    //     //     )
    // }
</script>

<div>
    {#if error}
        <div>Error: {error}</div>
    {:else if !isLoaded}
        <div>Loading...</div>
    {:else if data}
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
    {:else}
        <div>Transaction data couldn't be found</div>
    {/if}
</div>

<style>
    
</style>