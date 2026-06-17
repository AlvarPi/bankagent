<script>
  import { selectedLang } from '$lib/stores/lang.js';
  import { nav } from '$lib/i18n.js';

  /** @type {{ data: import('./$types').PageData }} */
  let { data } = $props();

  const t = $derived.by(() => nav[$selectedLang]);
</script>

<h1 class="page-title">{t.compare}</h1>

{#if data.dbError}
  <p class="empty">PostgreSQL: {data.dbError}</p>
{/if}

{#if data.rates.length === 0}
  <p class="empty">{t.noRates}</p>
{:else}
  <div class="table-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th>Bank</th>
          <th>Product</th>
          <th>Label</th>
          <th>Rate %</th>
          <th>Fee</th>
          <th>Updated</th>
        </tr>
      </thead>
      <tbody>
        {#each data.rates as row}
          <tr>
            <td>{row.bank_slug}</td>
            <td>{row.product_type}</td>
            <td>{row.label}</td>
            <td>{row.rate_percent != null ? `${row.rate_percent}%` : '—'}</td>
            <td>{row.fee_cents != null ? `${(Number(row.fee_cents) / 100).toFixed(2)} €` : '—'}</td>
            <td>{new Date(row.scraped_at).toLocaleString($selectedLang === 'et' ? 'et-EE' : 'en-GB')}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
