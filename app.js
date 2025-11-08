const root = document.getElementById('app')

const ROUTES = {
  '/': () => `
    <div class="card">
      <h2>Hi — I'm Davide</h2>
      <p>Frontend developer. This is a minimal portfolio — static SPA hosted on Vercel.</p>
    </div>
  `,
  '/work': () => `
    <div class="card">
      <h2>Selected Work</h2>
      <ul>
        <li>Project A — description</li>
        <li>Project B — description</li>
      </ul>
    </div>
  `,
  '/contact': () => `
    <div class="card">
      <h2>Contact</h2>
      <p>Email: <a href="mailto:hello@davidearcolini.it">hello@davidearcolini.it</a></p>
    </div>
  `,
  notfound: () => `<div class="card"><h2>Not found</h2><p>Page not found.</p></div>`
}

function render () {
  const path = location.hash.replace('#', '') || '/'
  const page = ROUTES[path] || ROUTES.notfound
  root.innerHTML = page()
}

window.addEventListener('hashchange', render)
window.addEventListener('load', render)
