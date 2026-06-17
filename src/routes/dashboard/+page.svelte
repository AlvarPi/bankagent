<script>
  import { selectedLang } from '$lib/stores/lang.js';
  import { nav, formatMoney } from '$lib/i18n.js';

  /** @type {{ data: import('./$types').PageData }} */
  let { data } = $props();

  const t = $derived.by(() => nav[$selectedLang]);
  const overview = $derived(data.overview);
</script>

<h1 class="page-title">{t.overview}</h1>

{#if overview.dbError}
  <p class="empty">PostgreSQL: {overview.dbError}</p>
{/if}

<div class="grid">
  <section class="card">
    <p class="card-label">{t.totalBalance}</p>
    <p class="card-value">{formatMoney($selectedLang, overview.totalBalanceCents)}</p>
  </section>
  <section class="card">
    <p class="card-label">{t.accounts}</p>
    <p class="card-value">{overview.accounts.length}</p>
  </section>
</div>

<h2 class="page-title">{t.recentTx}</h2>
{#if overview.transactions.length === 0}
  <p class="empty">{t.noTransactions}</p>
{:else}
  <div class="table-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Account</th>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {#each overview.transactions as tx}
          <tr>
            <td>{tx.booked_at}</td>
            <td>{tx.account_label}</td>
            <td>{tx.description || '—'}</td>
            <td class:amount-positive={Number(tx.amount_cents) >= 0} class:amount-negative={Number(tx.amount_cents) < 0}>
              {formatMoney($selectedLang, Number(tx.amount_cents), tx.currency)}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
