# Kendte Bugs og Forbedringspunkter (Dukse-appen)

Herunder findes en oversigt over de tekniske "sniger-bugs", der er identificeret i den nuværende version af applikationen.

## 1. Individuel prioriterings-bias (Bias i tildelingsrækkefølge)
**Beskrivelse:** Selvom makkerpar nu fordeles tilfældigt, bliver de enkelte elever (individer) tildelt i en fast rækkefølge til de resterende pladser.
**Konsekvens:** De opgaver, der står øverst på listen, har statistisk set en højere chance for at få "friske" elever (dem, der ikke havde opgaven sidst), mens opgaverne nederst på listen oftere må nøjes med gengangere eller elever fra backup-puljen.

## 2. Manuelle dubletter (Manglende validering)
**Beskrivelse:** Ved manuel tildeling via drop-down menuen tjekker systemet ikke, om en elev allerede er tildelt en anden opgave.
**Konsekvens:** En bruger kan ved en fejl låse den samme elev til flere forskellige opgaver manuelt. Systemet giver ingen advarsel om dette i selve redigeringstilstanden, hvilket kan føre til fejl i den endelige plan.

## 3. Den "glemte" uge (Session-problematik)
**Beskrivelse:** Den automatiske arkivering til historik sker kun ved indlæsning af siden (`useEffect`). 
**Konsekvens:** Hvis appen står åben på en iPad eller computer natten over (f.eks. fra søndag til mandag), vil den ikke opdage, at ugenummeret er skiftet. Brugeren risikerer at overskrive den nye uges data i den gamle uges "slot" i hukommelsen. En manuel genindlæsning er påkrævet for at aktivere ugeskiftet.

## 4. Makkere i "trekant-drama" (Konfliktende parringer)
**Beskrivelse:** Hvis en elev i indstillingerne tildeles to forskellige faste makkere (f.eks. "Sofie + Lukas" og "Sofie + Emma"), kan algoritmen kun håndtere én af parringerne.
**Konsekvens:** Systemet vil altid vælge det par, der står først i listen over `pairedStudents`. Den anden parring vil blive ignoreret af logikken, hvilket kan skabe forvirring hos brugeren, der forventer at se begge parringer overholdt.

---
*Sidst opdateret: April 2026*
