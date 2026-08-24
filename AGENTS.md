# Bernhard Wuthe Coaching — Projektregeln

Statische Website für Bernhard Wuthe, Executive- und Resilienzcoaching in München.
Reines HTML, CSS und JavaScript. Kein Framework, kein Build-Schritt, keine Abhängigkeiten.

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite |
| `fuehrungskraefte.html` | Für Führungskräfte (Hauptweg, persönlicher) |
| `unternehmen.html` | Für Unternehmen (sachlicher, kürzer) |
| `termin.html` | Terminbuchung mit eingebettetem Calendly-Kalender |
| `impressum.html`, `datenschutz.html` | Rechtstexte |
| `styles.css` | Sämtliche Styles |
| `script.js` | Sämtliches JavaScript |
| `images/` | Bilder, bereits web-optimiert |

Veröffentlicht wird über Netlify vom `main`-Branch. Jeder Push geht live.

---

## Regel 1 — Rechtstexte gehören zu jeder technischen Änderung

**Das ist die wichtigste Regel dieses Projekts.**

Wird irgendetwas eingebaut, das Daten an Dritte überträgt oder etwas im Browser speichert
— ein neuer Dienst, ein Embed, ein Skript, eine Schriftart, ein Formular, ein Tracker —
dann muss `datenschutz.html` **in derselben Änderung** mitgezogen werden.

Prüffragen bei jeder Änderung:

1. Entsteht eine Verbindung zu einem fremden Server?
2. Werden Cookies gesetzt oder wird etwas im Local Storage abgelegt?

Bei „ja" gehört ein passender Abschnitt in die Datenschutzerklärung, und bei
einwilligungspflichtigen Diensten zusätzlich eine Einbindung ins Consent-Banner
in `script.js` (Muster: die bestehende Google-Fonts-Logik, die erst nach Zustimmung lädt).

Die Datenschutzerklärung ist eng auf das zugeschnitten, was die Seite **tatsächlich** tut.
Sätze wie „Wir selbst setzen keine Cookies" werden durch jede Erweiterung schnell unwahr.

## Regel 2 — Coaching und Heilpraktik bleiben getrennt

Bernhard Wuthe ist Heilpraktiker **und** Coach. Über diese Website wird
**ausschließlich Coaching** angeboten: Reflexion, Selbstführung, Prävention,
berufliche und persönliche Entwicklung. Keine Diagnosen, keine Behandlung.

Die Heilpraktikertätigkeit ist ein eigenes Angebot mit eigenem Vertrag und eigener
Rechnung. Das Impressum weist deshalb bewusst **kein** Heilpraktiker-Berufsrecht aus
(keine Aufsichtsbehörde Gesundheitsamt, keine Berufsbezeichnung, kein HeilprG).

In der Vita auf der Startseite darf die Heilpraktikererfahrung vorkommen — sie ist
Biografie, kein Leistungsversprechen. Der klarstellende Satz direkt darunter
(„Das Coaching, das ich hier anbiete, ist von meiner Heilpraktikertätigkeit unabhängig")
und die Fußzeile auf allen Seiten dürfen nicht entfernt werden.

Diese Trennung ist nicht Kosmetik: Tritt die Seite als Heilpraxis auf, greift
womöglich das Heilmittelwerbegesetz für gesundheitsbezogene Aussagen.

## Regel 3 — Keine Angaben erfinden

In Impressum und Datenschutzerklärung stehen ausschließlich belegte Angaben.
Fehlt etwas, wird es als sichtbarer Platzhalter markiert:

```html
<span class="legal-todo">Zu klären: …</span>
```

Niemals eine Steuernummer, Speicherdauer, Anschrift oder Zertifizierung raten.
Wenn eine Angabe nicht belegbar ist, gehört das so in den Text („Der Anbieter nennt
keine feste Speicherdauer") statt einer erfundenen Zahl.

## Regel 4 — Tonalität

Die Copy ist bewusst als **Zielzustand** formuliert, nicht als Defizit.
„Wieder abschalten können" statt „Abschalten gelingt nicht mehr".
Der Leser soll sich wiedererkennen, ohne dass ihm Schwäche unterstellt wird.

Keine Gedankenstriche im Fließtext, stattdessen Kommas. Keine Superlative,
keine absoluten Werbeaussagen.

## Regel 5 — Technische Konventionen

**Cache-Busting:** `styles.css` und `script.js` werden auf allen Seiten mit
`?v=NN` eingebunden. Bei jeder Änderung an CSS oder JS die Zahl auf **allen**
HTML-Dateien gemeinsam hochzählen, sonst sehen Besucher alte Versionen:

```bash
for f in *.html; do sed -i '' 's/v=47/v=48/g' "$f"; done
```

**Bilder:** vor dem Commit auf Webgröße bringen. Richtwert: maximal 2400px Breite,
JPEG-Qualität um 75, Dateigröße unter 800 KB. Originale gehören nicht ins Repository
(sie sind über `.gitignore` ausgeschlossen). Bei geänderten Maßen die `width`- und
`height`-Attribute im HTML mitziehen, sonst springt das Layout beim Laden.

**Animationen:** Elemente mit `data-reveal` bekommen beim Einblenden ein `transform`.
Deshalb darf kein Element, das per Reveal animiert wird, gleichzeitig ein dauerhaftes
`transform` im CSS tragen — das hat schon zweimal zu verschobenen Bildern geführt.

**Prüfen nach Änderungen:** lokal servieren und ansehen, nicht blind committen.

```bash
python3 -m http.server 8734
```

## Offene Punkte

In `impressum.html` und `datenschutz.html` stehen noch `legal-todo`-Platzhalter.
Beide Dateien sind **anwaltlich noch nicht freigegeben**. Vor dem Verbinden einer
eigenen Domain sollte diese Prüfung erfolgen.
