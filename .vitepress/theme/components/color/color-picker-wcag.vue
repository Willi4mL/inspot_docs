<template>
    <select v-model="selected" name="color" id="color-disability" class="color-disability">
        <option disabled value="">Välj synfel</option>
        <option value="normal">Normal</option>
        <option value="protanopia">Protanopia (ej röd)</option>
        <option value="deuteranopia">Deuteranopia (ej grön)</option>
        <option value="tritanopia">Tritanopia (ej blå)</option>
        <option value="achromatopsia">Achromatopsia (svartvit)</option>
    </select>
  <section class="wcag-container">
    <div class="wcag-color-picker-container">
      <ColorPicker @color-change="updateColorBackground" id="color-picker-background" default-format="hex" alpha-channel="hide"/>
      <ColorPicker @color-change="updateColorText" id="color-picker-foreground" default-format="hex" alpha-channel="hide" color="#000000"/>
    </div>
    <div class="wcag-background" :style="{ backgroundColor: backgroundColor }">
      <input class="wcag-foreground" :style="{ color: foregroundColor }" value="Lorem ipsum"></input>
    </div>
    <section class="table-container">
      <table>
        <caption>
          WCAG 2.2 kontrastförhållande
        </caption>
        <thead>
          <tr>
            <th scope="col">Betyg</th>
            <th scope="col">Normal text</th>
            <th scope="col">Stor text (18.66px eller bold)</th>
            <th scope="col">Komponent</th>
            <th scope="col">Din poäng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">AA</th>
            <td v-for="(point, index) in pointsAA" :key="'aa-' + index" :style="{ backgroundColor: calcRatio() > point ? '#65d75bff' : '#e64949ff' }">{{ point }}</td>
            <td>{{ calcRatio() }}</td>
          </tr>
          <tr>
            <th scope="row">AAA</th>
            <td v-for="(point, index) in pointsAAA" :key="'aaa-' + index" :style="{ backgroundColor: calcRatio() > point ? '#65d75bff' : '#e64949ff' }">{{ point }}</td>
            <td>{{ calcRatio() }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
</template>
  
  <script setup>
  import { ref } from 'vue'
  import { ColorPicker } from 'vue-accessible-color-picker'
  import { simulate } from '@bjornlu/colorblind';
  
  // Reactive variables for background and foreground colors
  const backgroundColor = ref('#fffffff'); // Initial background color
  const foregroundColor = ref('#00000'); // Initial foreground color
  const selected = ref(''); // Variable to store the selected option
  const pointsAA = [4.5, 3.1, 3.1]
  const pointsAAA = [7.1, 4.5, 3.1]

  let backHex
  let foreHex

  function updateColorBackground (eventData) {
    let color = eventData.cssColor;
  if (selected.value !== '' && selected.value !== 'normal') {
    let backgroundInRgb = hexToRgb(color.startsWith('#') ? color : backgroundColor.value);
    let simulatedColor = simulate({ r: backgroundInRgb[0], g: backgroundInRgb[1], b: backgroundInRgb[2] }, selected.value);
    backHex = backgroundColor.value = rgbToHex(simulatedColor.r, simulatedColor.g, simulatedColor.b); 
    backgroundColor.value = `rgb(${simulatedColor.r}, ${simulatedColor.g}, ${simulatedColor.b})`;
    } else {
      backHex = null;
      backgroundColor.value = color;
  }
 }

  function updateColorText (eventData) {
    let color = eventData.cssColor;
  if (selected.value !== '' && selected.value !== 'normal') {
    let foregroundInRgb = hexToRgb(color.startsWith('#') ? color : foregroundColor.value);
    let simulatedColor = simulate({ r: foregroundInRgb[0], g: foregroundInRgb[1], b: foregroundInRgb[2] }, selected.value);
    foreHex = foregroundColor.value = rgbToHex(simulatedColor.r, simulatedColor.g, simulatedColor.b);
    foregroundColor.value = `rgb(${simulatedColor.r}, ${simulatedColor.g}, ${simulatedColor.b})`;
  } else {
    foreHex = null;
    foregroundColor.value = color;
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
    
    return [r, g, b];
}

function rgbToHex(r, g, b) {
    // Ensure each component is within 0-255
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    // Convert to hexadecimal and pad with leading zeros if necessary
    let red = r.toString(16).padStart(2, '0');
    let green = g.toString(16).padStart(2, '0');
    let blue = b.toString(16).padStart(2, '0');

    // Combine into a full hex string
    return `#${red}${green}${blue}`.toUpperCase();
}

function luminance(r, g, b) {
    // Convert RGB to sRGB
    let a = [r, g, b].map(function(value) {
        value /= 255;
        return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    });
    // Calculate the luminance
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrastRatio(lum1, lum2) {
    let brighter = Math.max(lum1, lum2);
    let darker = Math.min(lum1, lum2);
    return (brighter + 0.05) / (darker + 0.05);
}

function calcRatio() {
  let bgRgb = backHex ? hexToRgb(backHex) : hexToRgb(backgroundColor.value);
  let fgRgb = foreHex ? hexToRgb(foreHex) : hexToRgb(foregroundColor.value);
  let simulatedBgRgb, simulatedFgRgb;
  
  if(selected.value !== '' && selected.value !== 'normal') {
    let simulatedBg = simulate({ r: bgRgb[0], g: bgRgb[1], b: bgRgb[2] }, selected.value);
    let simulatedFg = simulate({ r: fgRgb[0], g: fgRgb[1], b: fgRgb[2] }, selected.value);
    
    simulatedBgRgb = [simulatedBg.r, simulatedBg.g, simulatedBg.b];
    simulatedFgRgb = [simulatedFg.r, simulatedFg.g, simulatedFg.b];
    } else {
      simulatedBgRgb = bgRgb;
      simulatedFgRgb = fgRgb;
  }

  let bgLum = luminance(...simulatedBgRgb);
  let fgLum = luminance(...simulatedFgRgb);

  return Number(contrastRatio(bgLum, fgLum).toFixed(2));
}

</script>
  
  

<style>
@import url('vue-accessible-color-picker/styles');

.wcag-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.wcag-color-picker-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.wcag-background {
    padding: 1rem;
    width: 100%;
    border-radius: 0.3rem;
    margin-top: 1rem;
    border: 1px solid #ccc;
}

.wcag-foreground {
  margin: 0 !important;
  font-size: 1em;
}

.color-disability {
    margin: 0 0 3rem 0;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid var(--vp-button-brand-border);
    color: var(--vp-button-brand-text) !important;
    background-color: var(--vp-button-brand-bg);
    padding: 0.5em 1em;
    font-weight: normal !important;
    border-radius: 8px;
    transition: all 0.25s !important;
    text-decoration: none !important;
}

.color-disability:hover {
  background-color: var(--vp-button-brand-hover-bg);
  border: 1px solid var(--vp-button-brand-hover-border);
  color: var(--vp-button-brand-hover-text) !important;
  cursor: pointer;
}

.table-container {
    display: flex;
    justify-content: center;
}
</style>