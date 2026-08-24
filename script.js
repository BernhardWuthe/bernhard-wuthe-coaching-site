document.addEventListener('DOMContentLoaded', () => {

  // Mobiles Menue: Vollbild-Overlay in Navy
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    const setzeZustand = (offen) => {
      navLinks.classList.toggle('open', offen);
      document.body.classList.toggle('menu-open', offen);
      navToggle.setAttribute('aria-expanded', offen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', offen ? 'Menü schließen' : 'Menü öffnen');
    };

    navToggle.addEventListener('click', () => {
      setzeZustand(!navLinks.classList.contains('open'));
    });

    // Nach einem Klick auf einen Menuepunkt schliessen
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => setzeZustand(false));
    });

    // Escape schliesst und gibt den Fokus zurueck
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        setzeZustand(false);
        navToggle.focus();
      }
    });

    // Beim Wechsel auf Desktop-Breite aufraeumen
    const breit = window.matchMedia('(min-width: 861px)');
    breit.addEventListener('change', (e) => { if (e.matches) setzeZustand(false); });
  }

  // Wiedererkennung: Karten einzeln markierbar (mehrfach auswählbar)
  document.querySelectorAll('.recognition-item').forEach(item => {
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-pressed', 'false');
    const toggle = () => {
      const active = item.classList.toggle('active');
      item.setAttribute('aria-pressed', active ? 'true' : 'false');
    };
    item.addEventListener('click', toggle);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });

  // Arbeitsweise: Akkordeon, eine Phase wächst, Rest tritt zurück
  const phases = Array.from(document.querySelectorAll('.phase'));
  phases.forEach((phase, i) => {
    phase.setAttribute('role', 'button');
    phase.setAttribute('tabindex', '0');
    const activate = () => {
      phases.forEach(p => p.classList.remove('active'));
      phase.classList.add('active');
    };
    phase.addEventListener('click', activate);
    phase.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
    if (i === 0) phase.classList.add('active');
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover)').matches;

  // Scroll-Progress-Indikator (Pfad-Motiv: Fortschritt als Linie)
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.setAttribute('aria-hidden', 'true');
  document.body.prepend(progressBar);
  const updateProgress = () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.setProperty('--progress', pct + '%');
  };
  document.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // Reveal-on-Scroll: Sections/Karten faden mit Versatz ein, Gruppen gestaffelt
  if (!reduceMotion) {
    const revealTargets = document.querySelectorAll(
      '.section-head, .recognition-item, .text-split-head, .text-split-body, .stance blockquote, .method-intro > div, .phase, .split-panel-media, .split-panel-inner, .path-card, .hero-stage-inner .kicker, .hero-stage-inner h1, .hero-stage-sub, .hero-stage-inner .btn, .hero-badge, .page-head .kicker, .page-head h1, .page-head .lede, .page-mark, .case-card, .topic-pills li, .t-item, .rail-list li, .statement, .grid-note, .step-note'
    );
    revealTargets.forEach(el => el.setAttribute('data-reveal', ''));

    const staggerGroups = document.querySelectorAll('.recognition-list, .phases, .paths, .method-intro, .hero-stage-inner, .text-split, .case-grid, .topic-pills, .timeline, .rail-list');
    staggerGroups.forEach(group => {
      Array.from(group.children).forEach((child, i) => {
        child.style.setProperty('--rd', `${i * 0.09}s`);
      });
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach(el => revealObserver.observe(el));

    // Pfad-Motiv: SVG-Linien zeichnen sich beim Sichtbarwerden
    const paths = document.querySelectorAll('.wave-divider path, .path-divider .track');
    paths.forEach(p => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
      p.style.transition = 'stroke-dashoffset 1.7s cubic-bezier(.22,.61,.36,1)';
    });
    const pathObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.strokeDashoffset = '0';
          pathObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    paths.forEach(p => pathObserver.observe(p));

    // Wegpunkte entlang der Linie ploppen leicht verzögert auf
    document.querySelectorAll('.wave-divider circle, .path-divider circle').forEach((c, i) => {
      c.style.opacity = '0';
      c.style.transition = `opacity .4s ease ${0.6 + i * 0.15}s`;
    });
    [...document.querySelectorAll('.wave-divider'), ...document.querySelectorAll('.path-divider')].forEach(svgWrap => {
      const wrapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('circle').forEach(c => { c.style.opacity = '1'; });
            wrapObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      wrapObserver.observe(svgWrap);
    });
  }

  // Overlay-Header: nach dem Verlassen der Hero-Bühne deckend werden
  const overlayHeader = document.querySelector('.page--hero-overlay .site-header');
  const stage = document.querySelector('.hero-stage');
  if (overlayHeader && stage) {
    const updateHeaderState = () => {
      const trigger = stage.offsetTop + stage.offsetHeight - overlayHeader.offsetHeight;
      overlayHeader.classList.toggle('is-stuck', window.scrollY > trigger);
    };
    document.addEventListener('scroll', updateHeaderState, { passive: true });
    window.addEventListener('resize', updateHeaderState);
    updateHeaderState();
  }

  // Magnetische Buttons: primäre CTAs folgen leicht dem Cursor
  if (canHover && !reduceMotion) {
    document.querySelectorAll('.btn--primary').forEach(btn => {
      btn.classList.add('btn--magnetic');
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.22}px, ${y * 0.35 - 2}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }


  /* ===========================================================
     Consent: Google Fonts werden erst nach Einwilligung geladen.
     Ohne Zustimmung entsteht keine Verbindung zu Google-Servern.
  =========================================================== */
  (function(){
    const KEY = 'bw-consent-fonts';
    const FONT_URL = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;600;650;700&display=swap';

    const ladeSchriften = () => {
      if (document.getElementById('gfonts')) return;
      const pre1 = document.createElement('link');
      pre1.rel = 'preconnect'; pre1.href = 'https://fonts.googleapis.com';
      const pre2 = document.createElement('link');
      pre2.rel = 'preconnect'; pre2.href = 'https://fonts.gstatic.com'; pre2.crossOrigin = 'anonymous';
      const css = document.createElement('link');
      css.id = 'gfonts'; css.rel = 'stylesheet'; css.href = FONT_URL;
      document.head.append(pre1, pre2, css);
    };

    const lesen = () => {
      try { return JSON.parse(localStorage.getItem(KEY)); }
      catch (e) { return null; }
    };
    const schreiben = (wert) => {
      try { localStorage.setItem(KEY, JSON.stringify({ fonts: wert, zeitpunkt: new Date().toISOString() })); }
      catch (e) { /* Local Storage nicht verfuegbar, Auswahl gilt nur fuer diese Sitzung */ }
    };

    // Banner aufbauen
    const banner = document.createElement('aside');
    banner.className = 'consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'consent-titel');
    banner.setAttribute('aria-describedby', 'consent-text');
    banner.hidden = true;
    banner.innerHTML =
      '<h2 id="consent-titel">Schriftarten von Google</h2>' +
      '<p id="consent-text">Diese Website setzt keine Cookies und verwendet kein Tracking. ' +
      'Für die Darstellung möchten wir Schriftarten von Google laden. Dabei wird Ihre IP-Adresse an Google übertragen. ' +
      'Ohne Ihre Zustimmung nutzen wir ausschließlich Schriftarten, die auf Ihrem Gerät vorhanden sind. ' +
      'Mehr dazu in der <a href="datenschutz.html">Datenschutzerklärung</a>.</p>' +
      '<div class="consent-actions">' +
        '<button type="button" class="btn btn--accept" data-consent="ja">Schriftarten laden</button>' +
        '<button type="button" class="btn btn--decline" data-consent="nein">Nicht laden</button>' +
      '</div>';
    document.body.appendChild(banner);

    const oeffnen = () => {
      banner.hidden = false;
      requestAnimationFrame(() => banner.classList.add('is-open'));
    };
    const schliessen = () => {
      banner.classList.remove('is-open');
      setTimeout(() => { banner.hidden = true; }, 450);
    };

    banner.querySelectorAll('[data-consent]').forEach(btn => {
      btn.addEventListener('click', () => {
        const ja = btn.dataset.consent === 'ja';
        schreiben(ja);
        if (ja) ladeSchriften();
        schliessen();
      });
    });

    // Fusszeilen-Link oeffnet das Banner erneut, damit die Wahl widerrufbar bleibt
    const link = document.getElementById('cookie-settings');
    if (link) {
      link.addEventListener('click', (e) => { e.preventDefault(); oeffnen(); });
    }

    const gespeichert = lesen();
    if (gespeichert === null) oeffnen();
    else if (gespeichert.fonts === true) ladeSchriften();
  })();



});
