# Cookie hantering

Grundläggande hantering av cookies i webbläsaren.

## Hämta cookies

### Alla cookies
```js
allCookies = document.cookie;
```

### Specifik cookie

```js
document.cookie.split("; ").find((row) => row.startsWith("name="))
```

## Lägga till en ny cookie

###  Grundläggande cookie

name=value: Detta sätter namnet och värdet på cookien. I detta fall är name cookiens namn och value är dess värde. Båda är strängar.

```js
document.cookie = 'name=value';
```

### Extra inställningar till cookien

path=/: Detta attribut specificerar vilken väg (path) på webbplatsen som cookien är giltig för. I detta fall betyder / att cookien är giltig för hela webbplatsen.

max-age=86400: Detta attribut anger cookiens livslängd i sekunder. Här är 86400 sekunder, vilket motsvarar 24 timmar. Efter denna tid kommer cookien att tas bort automatiskt av webbläsaren.

Secure: Detta attribut säkerställer att cookien endast skickas över säkra anslutningar, som HTTPS. Det hjälper till att skydda cookien från att skickas över okrypterade anslutningar.

```js
document.cookie = 'name=value; path=/;  max-age=86400; Secure';
```

## Radera cookie

För att radera en cookie behöver man sätta utgångsdatumet i det förflutna och alla attribut måste vara med.

```js
document.cookie = 'name=value; path=/;  max-age=0; Secure';
```


<script setup>
import EditPageButton from '../../.vitepress/theme/components/edit-page-button.vue'
</script>

<EditPageButton />