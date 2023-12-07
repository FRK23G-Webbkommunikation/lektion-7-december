# Lektion 7 december

## Övningar

Lägg upp ett valfritt projekt på Firebase så det blir åtkomligt via en URL.

1. Ladda först ner Firebase CLI här (välj standalone binary): https://firebase.google.com/docs/cli?authuser=0&hl=en

2. Öppna ett projekt i VS Code och öppna terminalen i VS Code.

3. I terminalen skriv `firebase login` och logga in (en flik i webbläsaren kommer öppnas).

4. Därefter skriv `firebase init hosting`
    a. Välj sedan `Use an existing project` och välj ditt projekt i Firebase
    b. Tryck enter på nästa fråga
    c. Frågorna efter så välj `n`

5. Nu ska det ha skapats en `public` - mapp i din projektmapp. Ta bort index.html i den mappen och lägg in därefter alla dina filer (index.html, js, css, bilder etc).

6. Skriv `firebase deploy` för att lägga upp projektet på Firebase.

7. För varje gång du har ändrat din kod och vill lägga upp dessa förändringar så skriv `firebase deploy` igen.