<script>
	import { onMount } from 'svelte';
    
    import { PATH, API_PATH } from '../../lib/utilities/constants';
    import DisplayTransactionState from '../../lib/partials/DisplayTransactionState.svelte';

    let isLoaded = false;
    let error = '';

    let data = {
        startFromTransactionIndex: 0,
        totalTransactionsCount: 0,
        numberOfTransactionsPerPage: 5,
        listOfTransactions: []
    };

    /** @type { import("../../lib/utilities/types").Transaction[] } */
    let listOfTransactions = data.listOfTransactions;

    function goToPage(targetPageIndex = 0) {
        // Clamp it
        refreshTheTable(Math.min(Math.max(targetPageIndex, 0), data.totalTransactionsCount));
    }

    function refreshTheTable(startFromTransactionIndex = 0) {
        fetch(API_PATH.TRANSACTIONS + '?startFromTransactionIndex=' + startFromTransactionIndex)
            .then(res => res.json())
            .then(
                (result) => {
                    isLoaded = true;

                    data = result;
                    listOfTransactions = result.listOfTransactions

                    error = '';
                },
                (error) => {
                    isLoaded = true;
                    error = error.message;
                }
            )
    }

    onMount(() => {
        refreshTheTable(0);
    });
</script>

<div>
    {#if error}
        <div>Error: {error}</div>
    {:else if !isLoaded}
        <div>Loading...</div>
    {:else}
        <table>
            <thead>
                <tr>
                    <td>Transaction ID</td>
                    <td>State</td>
                    <td class='col-aligned-right'>Amount</td>
                </tr>
            </thead>
            <tbody>
                {#each listOfTransactions as transaction}
                    <tr>
                        <td><a href={PATH.TRANSACTIONS + '/' + transaction.id}>{transaction.id}</a></td>
                        <td><DisplayTransactionState state={transaction.state} /></td>
                        <td class='col-aligned-right'>{transaction.amount} &euro;</td>
                    </tr>
                {/each}
            </tbody>
        </table>

        <ul id="controls">
            <li id="page-counter">{data.totalTransactionsCount} transactions</li>
            <li><button on:click={() => goToPage(0)}>|&lt;</button></li>
            <li><button on:click={() => goToPage(data.startFromTransactionIndex - data.numberOfTransactionsPerPage)}>&lt;</button></li>
            <li><button on:click={() => goToPage(data.startFromTransactionIndex + data.numberOfTransactionsPerPage)}>&gt;</button></li>
            <li><button on:click={() => goToPage(data.totalTransactionsCount - data.numberOfTransactionsPerPage)}>&gt;|</button></li>
        </ul>
    {/if}
</div>

<style>
    table {
        border: 0;
        width: 100%;
    }

    thead {
        font-weight: 700;
    }

    .col-aligned-right {
        text-align: end;
    }

    a {
        color: darkblue;
        text-decoration: underline;
    }

    #controls {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: end;
    }

    #page-counter {
        margin-inline-end: 2rem;
    }
</style>