<template>
  <section class="wcag-container">
    <div class="wcag-color-picker-container">
      <ColorPicker @color-change="updateColorBackground" id="color-picker-background" default-format="hex" />
      <ColorPicker @color-change="updateColorText" id="color-picker-foreground" default-format="hex" color="#000000" />
    </div>
    <div class="wcag-background" :style="{ backgroundColor: backgroundColor }">
      <input class="wcag-foreground" :style="{ color: foregroundColor }" value="Lorem ipsum"></input>
    </div>
    <section class="table-container">
      <table>
        <caption>
          WCAG 2.1
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
  
  // Reactive variables for background and foreground colors
  const backgroundColor = ref('#ffffff'); // Initial background color
  const foregroundColor = ref('#000000'); // Initial foreground color
  const pointsAA = [4.5, 3.1, 3.1]
  const pointsAAA = [7.1, 4.5, 3.1]

  function updateColorBackground (eventData) {
    backgroundColor.value = eventData.cssColor
    calcRatio()
 }

  function updateColorText (eventData) {
    foregroundColor.value = eventData.cssColor
    calcRatio()
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

// Convert hex to RGB
function calcRatio() {
let bgRgb = hexToRgb(backgroundColor.value);
let foregroundRgb = hexToRgb(foregroundColor.value);

// Calculate luminance for both colors
let bgLum = luminance(bgRgb[0], bgRgb[1], bgRgb[2]);
let foregroundLum = luminance(foregroundRgb[0], foregroundRgb[1], foregroundRgb[2]);

// Calculate the contrast ratio
let wcagRatio = contrastRatio(bgLum, foregroundLum).toFixed(2);

return Number(wcagRatio);
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
    border: 1px solid #8a8a8a;
}

.wcag-foreground {
  margin: 0 !important;
  font-size: 1em;
}

.table-container {
    display: flex;
    justify-content: center;
}
</style>