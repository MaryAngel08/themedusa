const works = [
  {
    flag: "CAFFE_BRASILIA",
    status: "Live",
    code: "CAFFE_BRASILIA // ",
    num: "01",
    role: "Web design — layout, type, and a café site built to ship.",
    desc: "A Venetian café identity taken into the browser: warm hierarchy, cinematic frames, and a page that reads as clearly on a phone as it does on a wide screen.",
    tags: ["WEB DESIGN", "BRAND", "LIVE"],
    href: "work/caffe-brasilia/",
    cta: "Open case study",
    soon: false,
  },
  {
    flag: "BLAKE_SALON",
    status: "Live",
    code: "BLAKE_SALON // ",
    num: "02",
    role: "Web design — salon site with a precise, tactile interface.",
    desc: "A salon presence built around quiet luxury: measured type, generous space, and a booking-ready page that still feels editorial.",
    tags: ["WEB DESIGN", "SALON", "LIVE"],
    href: "work/blake/",
    cta: "Open case study",
    soon: false,
  },
  {
    flag: "CTRLALTDESIGNER",
    status: "Live",
    code: "CTRLALTDESIGNER // ",
    num: "03",
    role: "Web design — studio site with a clear, precise system.",
    desc: "A designer studio presence built for clarity and presence: considered type, cinematic layout, and a page that ships as a working site.",
    tags: ["WEB DESIGN", "STUDIO", "LIVE"],
    href: "work/ctrlaltdesigner/",
    cta: "Open case study",
    soon: false,
  },
  {
    flag: "EMBER_VINE",
    status: "In progress",
    code: "EMBER_VINE // ",
    num: "04",
    role: "Concept design — restaurant identity and evening atmosphere.",
    desc: "A restaurant concept tuned for low light and long dinners: ember tones, vine-like motion, and a menu that feels like a printed piece.",
    tags: ["CONCEPT", "RESTAURANT", "SOON"],
    href: "#work",
    cta: "Coming soon",
    soon: true,
  },
];

const field = document.getElementById("particles");
if (field && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const COUNT = 16;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement("div");
    p.className = "particle" + (Math.random() > 0.5 ? " violet" : "");
    p.style.left = Math.random() * 100 + "%";
    p.style.setProperty("--drift", Math.random() * 40 - 20 + "px");
    p.style.animationDuration = 9 + Math.random() * 10 + "s";
    p.style.animationDelay = Math.random() * -18 + "s";
    field.appendChild(p);
  }
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function showStudioIntro() {
  const detail = document.getElementById("hero-detail");
  if (detail) detail.classList.remove("is-project");
  document.querySelectorAll(".work-switch, .thumb").forEach((el) => {
    el.classList.remove("is-active", "active");
  });
}

function renderWork(index) {
  const work = works[index];
  if (!work) return;

  const detail = document.getElementById("hero-detail");
  if (detail) detail.classList.add("is-project");

  setText("hero-code", work.code);
  setText("hero-num", work.num);
  setText("hero-role", work.role);
  setText("hero-desc", work.desc);

  const tags = document.getElementById("hero-tags");
  if (tags) {
    tags.replaceChildren(
      ...work.tags.map((label) => {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = label;
        return span;
      })
    );
  }

  const link = document.getElementById("hero-link");
  if (link) {
    link.textContent = work.cta;
    link.href = work.href;
    link.classList.toggle("is-soon", work.soon);
    if (work.soon || !/^https?:\/\//.test(work.href)) {
      link.removeAttribute("target");
      link.removeAttribute("rel");
    } else {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  }

  document.querySelectorAll(".work-switch").forEach((btn) => {
    btn.classList.toggle("is-active", Number(btn.dataset.work) === index);
  });
  document.querySelectorAll(".thumb").forEach((btn) => {
    btn.classList.toggle("active", Number(btn.dataset.work) === index);
  });
}

document.querySelectorAll("[data-work]").forEach((el) => {
  el.addEventListener("click", () => {
    renderWork(Number(el.dataset.work));
  });
});

document.querySelectorAll('a[href="#top"]').forEach((el) => {
  el.addEventListener("click", () => {
    showStudioIntro();
  });
});

document.querySelectorAll(".swatch").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".swatch").forEach((item) => item.classList.remove("is-on"));
    btn.classList.add("is-on");
  });
});

const navToggle = document.getElementById("nav-toggle");
document.querySelectorAll(".top-nav a, .mobile-nav a, .cta-link, .wordmark, .footer-nav a").forEach((el) => {
  el.addEventListener("click", () => {
    if (navToggle) navToggle.checked = false;
  });
});

const revealItems = document.querySelectorAll(".reveal");
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealItems.forEach((item) => item.classList.add("in-view"));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  revealItems.forEach((item) => io.observe(item));
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const REVEAL_MS = 700;

function typewrite(el) {
  const full = el.dataset.text || el.textContent || "";
  el.dataset.text = full;
  if (reducedMotion) {
    el.textContent = full;
    return;
  }
  el.textContent = "";
  let i = 0;
  const tick = () => {
    i += 1;
    el.textContent = full.slice(0, i);
    if (i < full.length) window.setTimeout(tick, 45);
    else el.classList.add("fx-done");
  };
  if (full) window.setTimeout(tick, 45);
  else el.classList.add("fx-done");
}

function startFx(el) {
  if (el.dataset.fxOn) return;
  el.dataset.fxOn = "1";
  el.classList.add("fx-ready");
  if (el.classList.contains("fx-typewriter")) typewrite(el);
  if (el.classList.contains("fx-shimmer-once")) {
    const settle = () => el.classList.add("fx-done");
    if (reducedMotion) {
      settle();
      return;
    }
    el.addEventListener("animationend", settle, { once: true });
    window.setTimeout(settle, 1680);
  }
}

function afterReveal(host, start) {
  if (reducedMotion) {
    start();
    return;
  }
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    start();
  };
  const onEnd = (event) => {
    if (event.target !== host) return;
    if (event.propertyName !== "opacity" && event.propertyName !== "transform") return;
    host.removeEventListener("transitionend", onEnd);
    finish();
  };
  host.addEventListener("transitionend", onEnd);
  window.setTimeout(finish, REVEAL_MS + 80);
}

function armFx(el) {
  const host = el.closest(".reveal");
  const start = () => startFx(el);
  if (!host) {
    if (reducedMotion) start();
    else window.setTimeout(start, REVEAL_MS);
    return;
  }
  if (host.classList.contains("in-view")) {
    afterReveal(host, start);
    return;
  }
  const watch = new MutationObserver(() => {
    if (!host.classList.contains("in-view")) return;
    watch.disconnect();
    afterReveal(host, start);
  });
  watch.observe(host, { attributes: true, attributeFilter: ["class"] });
}

document.querySelectorAll(".fx-shimmer, .fx-shimmer-once, .fx-glitch, .fx-glitch-live, .fx-pulse-dot, .fx-typewriter").forEach(armFx);

const bootLogo = document.querySelector(".topbar .wordmark.fx-shimmer-boot");
if (bootLogo) {
  const settleBoot = () => bootLogo.classList.add("fx-done");
  if (reducedMotion) {
    settleBoot();
  } else {
    bootLogo.classList.add("fx-ready");
    bootLogo.addEventListener("animationend", settleBoot, { once: true });
    window.setTimeout(settleBoot, 1200);
  }
}

const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = ["about", "work", "services", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

if (navLinks.length && sections.length) {
  const ratios = new Map();
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
    });
    let current = "";
    let best = 0;
    ratios.forEach((ratio, id) => {
      if (ratio > best) {
        best = ratio;
        current = id;
      }
    });
    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      link.classList.toggle("is-active", Boolean(current) && href.endsWith(`#${current}`));
    });
  }, { rootMargin: "-80px 0px -55% 0px", threshold: [0, 0.15, 0.35, 0.55, 1] });
  sections.forEach((section) => spy.observe(section));
}

document.querySelectorAll(".mobile-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    const toggle = document.getElementById("nav-toggle");
    if (toggle) toggle.checked = false;
  });
});

const systemClock = document.getElementById("system-clock");
function tickClock() {
  if (!systemClock) return;
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour12: false });
  systemClock.textContent = `SYSTEM_STATUS // ${time}`;
}
if (systemClock) {
  tickClock();
  setInterval(tickClock, 1000);
}

const touchForm = document.getElementById("touch-form");
if (touchForm) {
  touchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!touchForm.reportValidity()) return;
    const data = new FormData(touchForm);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(name ? `Project inquiry from ${name}` : "Project inquiry");
    const body = encodeURIComponent(`${name ? `Name: ${name}\n` : ""}Email: ${email}\n\n${message}`);
    window.location.href = `mailto:the.medusa@outlook.com?subject=${subject}&body=${body}`;
  });
}
