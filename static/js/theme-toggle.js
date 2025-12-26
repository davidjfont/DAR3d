// DAR3D Theme Controller // v1.0
(function () {
    // 1. Initial State Check
    const storedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    // Default to dark unless explicit light preference or stored 'light'
    // DAR3D is dark-first, so we only switch if requested.
    if (storedTheme === 'light' || (!storedTheme && prefersLight)) {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // 2. Toggle Logic
    window.toggleTheme = function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Dispatch event for other components (like charts or 3D viewer overrides)
        window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme: newTheme } }));
    };
})();
