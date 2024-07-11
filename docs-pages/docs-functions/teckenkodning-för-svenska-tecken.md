# Översätt teckenkodning mellan olika teckenkodningformat

Det finns inbyggda funktioner i PHP för att översätta mellan olika teckenkodningformat, men ibland fungerar dem inte av någon anledning. Då kan man använda sig av nedanstående kod för att ändra bokstäverna i texten manuellt.

## Översätt från UTF-8 till ISO-8859-1 för svenska tecken

```php
function inspot_translate_utf8_to_iso88591($string) {
    
    $string = str_replace("\u{00E5}", "\xE5", $string); // å
    $string = str_replace("\u{00E4}", "\xE4", $string); // ä
    $string = str_replace("\u{00F6}", "\xF6", $string); // ö

    $string = str_replace("\u{00C5}", "\xC5", $string); // Å
    $string = str_replace("\u{00C4}", "\xC4", $string); // Ä
    $string = str_replace("\u{00D6}", "\xD6", $string); // Ö

    return $string;
}
```


<script setup>
import EditPageButton from '../../.vitepress/theme/components/edit-page-button.vue'
</script>

<EditPageButton />