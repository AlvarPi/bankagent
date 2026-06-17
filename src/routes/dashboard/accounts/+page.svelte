<script>
  import { selectedLang } from '$lib/stores/lang.js';
  import { nav, formatMoney } from '$lib/i18n.js';

  /** @type {{ data: import('./$types').PageData }} */
  let { data } = $props();

  const t = $derived.by(() => nav[$selectedLang]);
</script>

<h1 class="page-title">{t.accounts}</h1>

{#if data.dbError}
  <p class="empty">PostgreSQL: {data.dbError}</p>
{/if}

{#if data.accounts.length === 0}
  <p class="empty">{t.noAccounts}</p>
{:else}
  <div class="table-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th>Bank</th>
          <th>Label</th>
          <th>IBAN</th>
          <th>Balance</th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>
        {#each data.accounts as account}
          <tr>
            <td>{account.bank_name || '—'}</td>
            <td>{account.label}</td>
            <td>{account.iban || '—'}</td>
            <td>{formatMoney($selectedLang, Number(account.balance_cents), account.currency)}</td>
            <td>{account.source}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
