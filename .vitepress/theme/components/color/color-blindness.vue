<template>
    <select v-model="selected" name="color" id="color-disability" class="color-disability">
        <option disabled value="">Välj synfel</option>
        <option value="protanopia">Protanopia (ej röd)</option>
        <option value="deuteranopia">Deuteranopia (ej grön)</option>
        <option value="tritanopia">Tritanopia (ej blå)</option>
        <option value="achromatopsia">Achromatopsia (svartvit)</option>
    </select>
    <section class="wcag-container">
        <div class="wcag-color-picker-container">
            <ColorPicker @color-change="updateColorBackground" id="color-picker-background" default-format="hex" alpha-channel="hide"/>
            <ColorPicker @color-change="updateColorText" id="color-picker-foreground" default-format="hex" alpha-channel="hide" color="#000000" />
        </div>
        <div class="wcag-background" :style="{ backgroundColor: backgroundColor }">
            <input class="wcag-foreground" :style="{ color: foregroundColor }" value="Lorem ipsum"></input>
        </div>
    </section>
</template>

<script setup>
  import { ref } from 'vue'
  import { ColorPicker } from 'vue-accessible-color-picker'
  import { simulate } from '@bjornlu/colorblind';
  
  // Reactive variables for background and foreground colors
  const backgroundColor = ref('#ffff'); // Initial background color
  const foregroundColor = ref('#0000'); // Initial foreground color
  const selected = ref(''); // Variable to store the selected option

  function updateColorBackground (eventData) {
    backgroundColor.value = eventData.cssColor;
    if (selected.value !== '') {
        let backgroundInRgb = hexToRgb(backgroundColor.value);
        backgroundColor.value  = simulate({ r: backgroundInRgb['r'], g: backgroundInRgb['g'], b: backgroundInRgb['b'] }, selected.value);
        backgroundColor.value = `rgb(${backgroundColor.value.r}, ${backgroundColor.value.g}, ${backgroundColor.value.b})`;
    }
 }

  function updateColorText (eventData) {
    foregroundColor.value = eventData.cssColor;
    if (selected.value !== '') {
        let forgroundInRgb = hexToRgb(foregroundColor.value);
        foregroundColor.value  = simulate({ r: forgroundInRgb['r'], g: forgroundInRgb['g'], b: forgroundInRgb['b'] }, selected.value);
        foregroundColor.value = `rgb(${foregroundColor.value.r}, ${foregroundColor.value.g}, ${foregroundColor.value.b})`;
}
 }

 function hexToRgb(hex) {
    // Remove the '#' character
    hex = hex.replace('#', '');
    
    // Convert to RGB
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    
    return { r, g, b }; 
}

</script>

<style>
.color-disability {
    margin: 0 0 3rem 0;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    }
</style>