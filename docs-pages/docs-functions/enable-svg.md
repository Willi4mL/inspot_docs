# Tillåt SVG i wordpress

Denna dokumentation beskriver hur man får wordpress att tillåta SVG filer.

## Kod

Den här koden är skriven i php och ska placeras i function.php filen.

**Input**

```php
function enable_svg_support($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'enable_svg_support');
```

## Visa SVG i media library

För att kunna se SVG filen som en thumbnail efter uppladning till "wordpress media library", behövs även den här koden läggas in i function.php filen.

**Input**

```php
function fix_svg_preview($response, $attachment, $meta) {
    if ($response['mime'] === 'image/svg+xml') {
        $response['sizes'] = [
            'thumbnail' => [
                'url' => $response['url'],
                'width' => $response['width'],
                'height' => $response['height'],
            ],
        ];
    }
    return $response;
}
add_filter('wp_prepare_attachment_for_js', 'fix_svg_preview', 10, 3);

```

<script setup>
import EditPageButton from '../../.vitepress/theme/components/edit-page-button.vue'
</script>

<EditPageButton />
