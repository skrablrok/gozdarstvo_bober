/* ===== shared behaviour for subpages: menu, e-mail, reveals, counters, header ===== */
(function(){
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- footer year ---- */
  const yr = document.getElementById("yr"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---- mobile menu ---- */
  const btn = document.querySelector(".menu-btn"), nav = document.getElementById("nav");
  btn.addEventListener("click", () => { const o = nav.classList.toggle("open"); btn.setAttribute("aria-expanded", o); });
  nav.addEventListener("click", e => { if (e.target.tagName === "A"){ nav.classList.remove("open"); btn.setAttribute("aria-expanded", false); } });
  document.querySelectorAll(".sub-btn").forEach(b => b.addEventListener("click", () => {
    const o = b.parentElement.classList.toggle("open"); b.setAttribute("aria-expanded", o);
  }));
  document.addEventListener("click", e => document.querySelectorAll(".has-sub.open").forEach(w => {
    if (!w.contains(e.target)){ w.classList.remove("open"); w.querySelector(".sub-btn").setAttribute("aria-expanded", false); }
  }));

  /* ---- e-mail (assembled at runtime against scrapers) ---- */
  const addr = ["vojvodaigor", "yahoo.com"].join("@");
  const mail = document.getElementById("mail"); if (mail) mail.href = "mailto:" + addr;

  /* ---- reveal on scroll ---- */
  const heads = document.querySelectorAll(".sec-head");
  heads.forEach(h => { const t = h.querySelector("h2"); if (t) t.style.setProperty("--w", t.scrollWidth + "px"); });
  document.querySelectorAll(".detail, .gear-main, .cards").forEach(c => [...c.querySelectorAll(":scope > [data-rv]")].forEach((el, i) => el.style.setProperty("--dl", (i * .12) + "s")));
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in"); io.unobserve(e.target);
    e.target.querySelectorAll(".cnt").forEach(count);
  }), {rootMargin: "0px 0px -12% 0px", threshold: .12});
  [...heads, ...document.querySelectorAll("[data-rv]")].forEach(t => io.observe(t));

  /* ---- numbers count up ---- */
  function count(el){
    const raw = el.dataset.to, to = parseFloat(raw.replace(",", ".")), dec = raw.includes(",") ? 1 : 0;
    if (reduce){ el.textContent = raw; return; }
    const t0 = performance.now(), d = 1200;
    (function step(t){
      const k = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - k, 4);
      el.textContent = (to * e).toFixed(dec).replace(".", ",");
      if (k < 1) requestAnimationFrame(step); else el.textContent = raw;
    })(t0);
  }

  /* ---- header: scroll progress line ---- */
  const top = document.querySelector(".top"), bar = document.querySelector(".progress");
  let ticking = false;
  function frame(){
    ticking = false;
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    bar.style.setProperty("--p", max > 0 ? (y / max).toFixed(4) : 0);
    top.classList.toggle("small", y > 40);
  }
  addEventListener("scroll", () => { if (!ticking){ ticking = true; requestAnimationFrame(frame); } }, {passive: true});
  addEventListener("resize", frame);
  frame();
})();
