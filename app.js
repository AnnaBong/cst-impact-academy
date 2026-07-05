const config = window.CST_CONFIG;
const mobileNav = document.querySelector(".mobile-nav");
mobileNav.innerHTML = config.navigation.map(([label, href]) => `<a href="${href}">${label}</a>`).join("") +
  `<a class="button button-gold" href="#contact">Talk to CST</a>`;

const waURL = `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(config.contact.whatsappMessage)}`;
document.querySelectorAll("[data-whatsapp]").forEach(link => link.href = waURL);

document.querySelector("#path-grid").innerHTML = config.paths.map(item => `
  <article class="path-card reveal">
    <span>${item.num}</span><h3>${item.need}</h3><p>${item.text}</p>
    <div><small>RECOMMENDED START</small><b>${item.path}</b></div>
    <a data-whatsapp href="${waURL}" target="_blank" rel="noopener" aria-label="Ask about ${item.path}">Find my pathway →</a>
  </article>`).join("");

document.querySelector("#programme-grid").innerHTML = config.programmes.map((item, index) => `
  <article class="programme-card reveal">
    <div class="programme-head"><span>${item.tag}</span><small>0${index + 1}</small></div>
    <div class="programme-visual visual-${index + 1}" aria-hidden="true"><i></i><i></i><i></i></div>
    <p class="programme-sub">${item.subtitle}</p><h3>${item.title}</h3><p>${item.text}</p>
    <div class="mini-logic">${item.logic.map((x, i) => `<span>${x}</span>${i < item.logic.length - 1 ? "<i>→</i>" : ""}`).join("")}</div>
    <a data-whatsapp href="${waURL}" target="_blank" rel="noopener">Explore this pathway <span>↗</span></a>
  </article>`).join("");

const toggle = document.querySelector(".menu-toggle");
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  toggle.querySelector(".sr-only").textContent = open ? "Open navigation" : "Close navigation";
  mobileNav.hidden = open;
  document.body.classList.toggle("menu-open", !open);
});
mobileNav.addEventListener("click", event => {
  if (event.target.closest("a")) {
    toggle.setAttribute("aria-expanded", "false");
    mobileNav.hidden = true;
    document.body.classList.remove("menu-open");
  }
});

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); }
}), { threshold: .08 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
