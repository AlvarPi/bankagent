<script>
  import { selectedLang } from '$lib/stores/lang.js';
  import { nav, formatMoney } from '$lib/i18n.js';

  /** @type {{ data: import('./$types').PageData }} */
  let { data } = $props();

  const t = $derived.by(() => nav[$selectedLang]);
</script>

<h1 class="page-title">{t.transactions}</h1>

{#if data.dbError}
  <p class="empty">PostgreSQL: {data.dbError}</p>
{/if}

{#if data.transactions.length === 0}
  <p class="empty">{t.noTransactions}</p>
{:else}
  <div class="table-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Bank</th>
          <th>Account</th>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {#each data.transactions as tx}
          <tr>
            <td>{tx.booked_at}</td>
            <td>{tx.bank_name || '—'}</td>
            <td>{tx.account_label}</td>
            <td>{tx.description || tx.counterparty || '—'}</td>
            <td class:amount-positive={Number(tx.amount_cents) >= 0} class:amount-negative={Number(tx.amount_cents) < 0}>
              {formatMoney($selectedLang, Number(tx.amount_cents), tx.currency)}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
