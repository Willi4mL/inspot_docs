# Knappar

Denna dokumentation visar flera alternativ av knappar.

## Standard knapp

Den här koden är skriven i HTML och CSS med en simple hover effekt.
<div>
  <button class="standard-button" role="button">Standard knapp</button>
</div>

**Input**

::: code-group

```html [HTML]
<button class="standard-button" role="button">Standard knapp</button>
```

```css [CSS]
.standard-button {
    background-color: #FAFBFC;
    border: 1px solid rgba(27, 31, 35, 0.15);
    border-radius: 6px;
    box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
    color: #24292E;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    padding: 6px 16px;
    transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
    white-space: nowrap;
    word-wrap: break-word;
  }
  
  .standard-button:hover {
    background-color: #F3F4F6;
    transition-duration: 0.1s;
  }
  
  .standard-button:active {
    background-color: #EDEFF2;
    box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
    transition: none 0s;
  }
```
:::

<script setup>
import './elements.css'
import EditPageButton from '../../.vitepress/theme/components/edit-page-button.vue'
</script>

<EditPageButton />

