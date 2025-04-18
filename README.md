# Frontend för "Husdjurs-API"

I denna uppgift (U06) har vi fått i uppdrag att bygga en frontend till den backend som utvecklades i U05. Jag har använt JavaScript/TypeScript, Vite, SCSS och HTML i projektet. Applikationen är tillgänglig för alla så välkomna att testa!

## Funktionalitet

Projektet innehåller fullständigt stöd för CRUD-operationer för djur, samt funktioner för användarregistrering och inloggning. Fler funktioner kommer att implementeras framöver.

- Registrera/logga in användare  
- Skapa, hämta, uppdatera och ta bort husdjur

## Figma-design

Designen för projektet är skapad i Figma och fungerar som en visuell riktlinje för gränssnittet. Här nedan finns länken: [U06-frontend](https://www.figma.com/design/zZR3xrdGOXaK5HZqU9hNcl/U06-SKISS?node-id=0-1&t=G5fkP0MYxJr47c62-1)

## Deployad

För den som vill testa projektet utan att behöva gå igenom installationssteg finns en deployad version tillgänglig här nedan:  
[furry-friend-care.netlify.app](https://furry-friend-care.netlify.app/)

## Installation

För dig som vill köra projektet lokalt, följ stegen nedan:

### Steg 1 – Klona projektet

- Skapa en mapp där du vill att projektet (U06) ska ligga, öppna mappen i VS Code och skriv följande kommando:

```
git clone https://github.com/chas-academy/u06-vanilla-frontend-Lazcano007.git
 ```

* Sedan kör du:

```
cd "u06-vanilla-frontend-Lazcano007"
```

### Steg 2 - Installera beroenden

När du väl klonat ner projektet ska du då köra följande kommando för att installera beroenden:

```
npm install
```

### Steg 3 - Anslutning till backend

För att kunna använda projektet lokalt behöver du även koppla det till databasen. Gör så här:

* Skapa en .env fil där du ska lägga till MongoDB Atlas-URL:en

```
MONGO_URL=mongodb+srv://<användarnamn>:<lösenord>@u05-api.8vzwt.mongodb.net/husdjurs-api
```

### Steg 4 - Starta servern

Efter alla steg startar du igång servern med följande kommando:

```
npm run dev
```

## Kommande funktioner

Projektet är fortfarande under utveckling. Här är några planerade förbättringar:

* Lägga til återbesök perhusdjur
* Lägga till vaccinationer per husdjur
* Lägga till bilder per husdjur
* Förbättrad felhantering och validering