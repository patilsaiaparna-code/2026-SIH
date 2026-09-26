export function renderHeader(activeRoute = 'home') {
  return `
    <header class="sticky-header">
      <div class="header-inner">
        <a href="#home" class="brand-logo">
          <span>🎓</span>
          <span>StudentHub</span>
        </a>

        <nav class="main-nav" aria-label="Main Navigation">
          <a href="#home" class="nav-link ${activeRoute === 'home' ? 'active' : ''}">Home</a>
          <a href="#news-skills" class="nav-link ${activeRoute === 'news-skills' ? 'active' : ''}">News & Skills</a>
          <a href="#learn" class="nav-link ${activeRoute === 'learn' ? 'active' : ''}">Learn</a>
          <a href="#opportunities" class="nav-link ${activeRoute === 'opportunities' ? 'active' : ''}">Opportunities</a>
        </nav>

        <div class="header-actions">
          <button id="header-search-btn" class="search-trigger-btn" aria-label="Search">
            <span>🔍</span>
            <span class="search-text">Search...</span>
            <kbd class="kbd-shortcut">/</kbd>
          </button>
          <button id="hamburger-toggle" class="hamburger-btn" aria-label="Toggle mobile menu">☰</button>
        </div>
      </div>

      <div id="mobile-drawer" class="mobile-drawer">
        <a href="#home" class="nav-link ${activeRoute === 'home' ? 'active' : ''}">Home</a>
        <a href="#news-skills" class="nav-link ${activeRoute === 'news-skills' ? 'active' : ''}">News & Skills</a>
        <a href="#learn" class="nav-link ${activeRoute === 'learn' ? 'active' : ''}">Learn Catalog</a>
        <a href="#opportunities" class="nav-link ${activeRoute === 'opportunities' ? 'active' : ''}">Opportunities</a>
        <a href="#planner" class="nav-link ${activeRoute === 'planner' ? 'active' : ''}">Opportunity Planner</a>
        <a href="#trend-checker" class="nav-link ${activeRoute === 'trend-checker' ? 'active' : ''}">Trend Checker</a>
        <a href="#x-days" class="nav-link ${activeRoute === 'x-days' ? 'active' : ''}">I Have X Days Plan</a>
      </div>
    </header>
  `;
}
