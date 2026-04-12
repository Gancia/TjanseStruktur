# Status på TjanseStruktur (April 2026)

Dette dokument opsummerer den tekniske status efter den store arkitektoniske oprydning og refakturering.

## ✅ Løste Udfordringer (Resolved)

### 1. Statistisk Prioriterings-bias
- **Problem:** De øverste opgaver i listen fik altid de "friske" elever fra puljen, mens de nederste fik gengangere eller rester.
- **Løsning:** Opgaverne blandes nu internt i logikken, før tildelingen starter. Dette sikrer en fair og jævn fordeling af elever på tværs af alle tjanser.

### 2. Manuelle Dubletter
- **Problem:** Brugeren kunne ved en fejl tildele den samme elev til flere opgaver manuelt.
- **Løsning:** Der er nu indbygget et advarselssystem (Toast), der popper op, hvis man vælger en elev, der allerede har en anden tjans.

### 3. "Flimmer" i Animationer
- **Problem:** Spøgelses-tekster og navne i visse animationer skiftede så hurtigt, at det kunne virke overstimulerende.
- **Løsning:** 
  - **Spøgelset:** Vælger nu ét tilfældigt ord per lodtrækning og holder fast i det.
  - **Indfase (Fade):** Er gjort ultra-rolig; viser kun diskrete pulserende prikker undervejs og fader navnet ind til sidst.

### 4. Uge-synkronisering
- **Problem:** Hvis appen stod åben på en skærm over en weekend, opdagede den ikke ugeskiftet om mandagen.
- **Løsning:** Der er tilføjet en baggrunds-lytter, der tjekker ugenummeret hver time og automatisk genindlæser/arkiverer historik, når det er relevant.

### 5. Kode-skalerbarhed (Arkitektur)
- **Problem:** `App.jsx` var blevet en gigantisk fil på 1.200 linjer, der var svær at fejlsøge i.
- **Løsning:** Projektet er nu splittet op i logiske moduler:
  - `useDukseLogic.js`: Hjernen (Logik & State).
  - `TaskCard.jsx`, `Sidebar.jsx`, `Modals.jsx`: Kroppen (Visning).
  - `animations.css` & `constants.js`: Design og data.

---

## 🚀 Nye Forbedringer & Navngivning
For at gøre koden lettere at læse for dig fremadrettet, er animationerne omdøbt til mere sigende navne:
- `dice` er blevet til **`slot`** (da det ligner en spillemaskine/tromle).
- `classic` er blevet til **`flicker`** (da det beskriver navne-flimmeret).
- Ubrugt kode (som "Spooky Eyes") er fjernet for at holde projektet slankt.

---

## 📋 Fremtidig Backlog (Idéer)
*   **Drag-and-drop:** Mulighed for at flytte elever mellem opgaver med musen.
*   **Flere farvetemaer:** Mulighed for at lave sine helt egne farvekombinationer.
*   **Statistik-modul:** En oversigt der viser, hvem der har haft "Feje-tjansen" flest gange over et helt år.

---
*Sidst opdateret: April 2026*
