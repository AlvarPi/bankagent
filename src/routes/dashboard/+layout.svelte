<script>
  import { page } from '$app/stores';
  import { selectedLang } from '$lib/stores/lang.js';
  import { nav } from '$lib/i18n.js';

  /** @type {{ children: import('svelte').Snippet }} */
  let { children } = $props();

  const t = $derived.by(() => nav[$selectedLang]);

  function toggleLang() {
    selectedLang.update((lang) => (lang === 'et' ? 'en' : 'et'));
  }
</script>

<div class="app-shell">
  <aside class="sidebar">
    <p class="sidebar-title">{t.appTitle}</p>
    <nav>
      <a class="nav-link" class:active={$page.url.pathname === '/dashboard'} href="/dashboard">{t.overview}</a>
      <a class="nav-link" class:active={$page.url.pathname === '/dashboard/accounts'} href="/dashboard/accounts">{t.accounts}</a>
      <a class="nav-link" class:active={$page.url.pathname === '/dashboard/transactions'} href="/dashboard/transactions">{t.transactions}</a>
      <a class="nav-link" class:active={$page.url.pathname === '/dashboard/compare'} href="/dashboard/compare">{t.compare}</a>
    </nav>
  </aside>
  <div class="main">
    <div class="topbar">
      <button type="button" class="lang-btn" onclick={toggleLang}>{t.langToggle}</button>
    </div>
    {@render children()}
  </div>
</div>
