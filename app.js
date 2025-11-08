const root = document.getElementById('app');
document.getElementById('year').textContent = new Date().getFullYear();

const ROUTES = {
  '/': () => `
    <section class="section">
      <div class="card">
        <h1>Hi, I’m Davide Arcolini</h1>
        <p>Consultant at Liquid Reply, specializing in LLM integration and application modernization. MSc in Computer Engineering (Politecnico di Torino).</p>
        <a href="#/about" class="cta">Learn more about me</a>
      </div>
    </section>
  `,
  '/about': () => `
    <section class="section">
      <div class="card">
        <h2>About Me</h2>
        <p>I hold a Master of Science in Computer Engineering with a focus on cybersecurity from Politecnico di Torino, obtained in 2023. During my academic journey I developed a PRNG based on chaotic maps, contributed to CyberChallenge.IT and led project teams in collaboration with Aruba S.p.A.</p>
        <p>Currently, I work at Liquid Reply as a Consultant focused on IAM, API development on Kubernetes, micro-gateway infrastructural patterns and LLM integration.</p>
        <a href="#/work" class="cta">See what I’ve built</a>
      </div>
    </section>
  `,
  '/work': () => `
    <section class="section">
      <div class="card">
        <h2>Selected Work</h2>
        <ul>
          <li><strong>Master’s Thesis:</strong> Full-Lifecycle API Management – Microgateway Infrastructural Pattern adopting Kong Gateway.</li>
          <li><strong>Project A:</strong> PRNG design based on chaotic maps.</li>
          <li><strong>Project B:</strong> Design & Dev of personal digital portfolio with modern JS + static hosting.</li>
        </ul>
        <a href="#/contact" class="cta">Get in touch</a>
      </div>
    </section>
  `,
  '/contact': () => `
    <section class="section">
      <div class="card">
        <h2>Contact</h2>
        <p>If you’d like to collaborate, chat or hire me — drop me a line:</p>
        <p><a href="mailto:hello@davidearcolini.it" class="cta">hello@davidearcolini.it</a></p>
        <p>Or find me on <a href="https://github.com/dvdr00t" target="_blank">GitHub</a>.</p>
      </div>
    </section>
  `,
  notfound: () => `
    <section class="section">
      <div class="card">
        <h2>404 — Page Not Found</h2>
        <p>The requested page doesn’t exist.</p>
      </div>
    </section>
  `
};

function render() {
  const path = location.hash.replace('#', '') || '/';
  const page = ROUTES[path] || ROUTES.notfound;
  root.innerHTML = page();
}

window.addEventListener('hashchange', render);
window.addEventListener('load', render);
