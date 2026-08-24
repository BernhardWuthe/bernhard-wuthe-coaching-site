# Website ändern — Anleitung

Diese Anleitung beschreibt, wie du Änderungen an deiner Website
**coachingbernhardwuthe.netlify.app** vornimmst, ohne selbst programmieren zu müssen.

Du beschreibst im Chat, was du geändert haben möchtest. Ein KI-Assistent setzt es um.
Die Website aktualisiert sich danach von selbst.

---

## Wie das Ganze zusammenhängt

Es sind drei Bausteine im Spiel:

| Baustein | Wofür |
|---|---|
| **GitHub** | Hier liegen alle Dateien der Website. Das ist der Ort der Wahrheit. |
| **Codex** (in ChatGPT) | Hier beschreibst du Änderungen im Chat. Codex bearbeitet die Dateien auf GitHub. |
| **Netlify** | Bemerkt jede Änderung auf GitHub und veröffentlicht sie automatisch im Internet. |

Bei Netlify musst du dich **nie** anmelden. Das läuft von allein.

---

## Schritt 1 — Bei GitHub anmelden

Rufe [github.com](https://github.com) auf und melde dich mit deinem Konto **BernhardWuthe** an.
Die Zugangsdaten hast du separat erhalten.

Unter *Your repositories* findest du **bernhard-wuthe-coaching-site**.
Das Repository gehört dir. Dort liegen alle Dateien der Website.

Es ist auf **privat** gestellt: Nur du und Niklas könnt hineinsehen.

---

## Schritt 2 — Codex einrichten (einmalig)

Codex ist der Teil von ChatGPT, der Dateien bearbeiten kann. Der normale ChatGPT-Chat
kann das nicht. Codex ist in den kostenpflichtigen ChatGPT-Tarifen enthalten.

1. Bei [chatgpt.com](https://chatgpt.com) anmelden
2. In der linken Seitenleiste **Codex** öffnen
3. Codex fragt nach der Verbindung zu GitHub. Bestätigen und dabei den Zugriff
   auf **bernhard-wuthe-coaching-site** erlauben
4. Das Repository als Arbeitsbereich auswählen

Das musst du nur einmal machen.

---

## Schritt 3 — Eine Änderung beauftragen

Beschreibe im Chat in normalem Deutsch, was anders sein soll. Je konkreter, desto besser.

**Gute Beispiele:**

> Auf der Startseite im Abschnitt „Über mich" soll im letzten Satz statt
> „Längere Aufenthalte in Indien, Nepal" stehen: „Längere Aufenthalte in Indien und Nepal".

> Meine Telefonnummer hat sich geändert. Bitte überall auf 0171 / 11 22 333 ändern,
> auch im Impressum und in der Datenschutzerklärung.

> Auf der Seite „Für Unternehmen" soll die vierte Karte einen neuen Titel bekommen:
> „Führungskräfte langfristig binden".

**Weniger gut:** „Mach die Seite schöner." Damit kann Codex wenig anfangen und trifft
Entscheidungen, die du vielleicht nicht willst.

Wenn Codex fertig ist, zeigt es die Änderungen an. Du bestätigst sie, dann werden sie
auf GitHub gespeichert (das nennt sich „committen" und „pushen").

---

## Schritt 4 — Ergebnis ansehen

Nach ein bis zwei Minuten ist die Änderung im Internet sichtbar unter
**coachingbernhardwuthe.netlify.app**

Falls du nichts siehst: Seite im Browser neu laden und dabei die Umschalttaste
gedrückt halten. Das umgeht den Zwischenspeicher.

---

## Wichtig: Was besondere Vorsicht braucht

### Impressum und Datenschutzerklärung

Die Dateien `impressum.html` und `datenschutz.html` sind rechtlich heikel.
Sie sind genau auf das abgestimmt, was die Website tatsächlich tut.

**Bitte hier nichts „nebenbei schöner machen lassen".** Wenn Änderungen nötig sind,
beauftrage sie gezielt und einzeln.

Eine Regel gilt immer: **Kommt ein neuer Dienst auf die Website** — ein Kontaktformular,
ein Newsletter, eine Landkarte, ein Video, ein Statistik-Werkzeug — **dann muss die
Datenschutzerklärung mitgeändert werden.** Sonst stimmt sie nicht mehr.

Sag Codex in solchen Fällen ausdrücklich dazu:

> Bitte passe auch die Datenschutzerklärung entsprechend an.

Codex kennt diese Regel bereits: Im Repository liegt eine Datei `AGENTS.md`,
die alle Projektregeln enthält und beim Start automatisch gelesen wird.

### Coaching bleibt Coaching

Die Website bewirbt ausschließlich **Coaching**, nicht die Heilpraktikertätigkeit.
Diese Trennung ist bewusst so gebaut und sollte nicht verwischt werden.

Der Hinweis im Seitenfuß („Coaching ersetzt keine medizinische oder psychotherapeutische
Behandlung") und der klarstellende Satz im Abschnitt „Über mich" gehören dazu.
Bitte nicht entfernen lassen.

### Noch offen

Impressum und Datenschutzerklärung sind **anwaltlich noch nicht geprüft**.
An einigen Stellen stehen noch gelb hinterlegte Platzhalter mit offenen Punkten.
Solange die nicht geklärt sind, sollte die Website nicht unter der eigenen Domain
beworben werden.

---

## Wenn etwas schiefgeht

Alles ist rücknehmbar. Jede Änderung wird auf GitHub gespeichert, ältere Stände
bleiben erhalten. Es kann nichts unwiederbringlich kaputtgehen.

Wenn eine Änderung nicht passt, schreib einfach im Chat:

> Mach die letzte Änderung bitte rückgängig.

Wenn die Website nach einer Änderung merkwürdig aussieht oder gar nicht mehr lädt,
melde dich bei Niklas. Der Weg zurück ist immer möglich.

---

## Kurzfassung

1. Bei GitHub anmelden (Konto **BernhardWuthe**)
2. In ChatGPT **Codex** öffnen, Repository auswählen
3. Änderung im Chat beschreiben
4. Bestätigen
5. Nach ein bis zwei Minuten ist sie online

Bei Rechtstexten und neuen Diensten: langsam machen und im Zweifel nachfragen.
