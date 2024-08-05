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
      <ColorPicker @color-change="updateBackground" id="color-picker-background" default-format="hex"
        alpha-channel="hide" />
      <ColorPicker @color-change="updateForeground" id="color-picker-foreground" default-format="hex"
        alpha-channel="hide" color="#000000" />
    </div>
    <div class="color-example-container">

      <div class="text-option-container">
        <div>
          <label class="font-size-option" for="fontSizeOption">Textstorlek (px)
            <input type="number" name="fontSizeOption" id="fontSizeOption" v-model="fontSizeOptionExample">
          </label>
        </div>

        <div class="checkbox-container">
          <label class="checkbox-bold-text" for="checkboxBold">Fet text
            <input type="checkbox" name="checkboxBold" id="checkboxBold" class="checkboxBold" v-model="checkboxBold">
          </label>
        </div>

      </div>

      <div class="wcag-background" :style="{ backgroundColor: transformedBackgroundColor }">
        <input class="wcag-foreground" :style="{ color: transformedForegroundColor, fontWeight: checkboxBold ? 'bold' : 'normal', fontSize: fontSizeOptionExample + 'px' }"
          value="Lorem ipsum"></input>
      </div>
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
            <td v-for="(point, index) in pointsAA" :key="'aa-' + index"
              :style="{ backgroundColor: calcRatio() >= point ? '#65d75bff' : '#e64949ff' }">{{ point }}</td>
            <td>{{ calcRatio() }}</td>
          </tr>
          <tr>
            <th scope="row">AAA</th>
            <td v-for="(point, index) in pointsAAA" :key="'aaa-' + index"
              :style="{ backgroundColor: calcRatio() >= point ? '#65d75bff' : '#e64949ff' }">{{ point }}</td>
            <td>{{ calcRatio() }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
</template>
  
<script setup>
import { ref, watch } from 'vue'
import { ColorPicker } from 'vue-accessible-color-picker'
import { simulate } from '@bjornlu/colorblind';

// Define reactive references for original background and foreground colors
const originalBackgroundColor = ref('#ffffff'); // Store the original background color
const originalForegroundColor = ref('#000000'); // Store the original foreground color

// Define reactive references for transformed colors, initially set to original values
const transformedBackgroundColor = ref(originalBackgroundColor.value);
const transformedForegroundColor = ref(originalForegroundColor.value);

// Reactive reference for the current selection state
const selected = ref('');

// Accessibility standards for contrast ratios (AA and AAA levels)
const pointsAA = [4.5, 3.1, 3.1]; // Contrast ratios for AA standard
const pointsAAA = [7.1, 4.5, 3.1]; // Contrast ratios for AAA standard

// Reactive reference for checkbox state indicating if text is bold
const checkboxBold = ref(false);

// Reactive reference for font size example
const fontSizeOptionExample = ref(16);;

// Update colors based on the current selection
function updateColors() {
  if (selected.value !== '' && selected.value !== 'normal') {
    // Update colors based on selection for both background and foreground
    updateColorBasedOnSelection(originalBackgroundColor.value, 'background');
    updateColorBasedOnSelection(originalForegroundColor.value, 'foreground');
  } else {
    // If no selection or 'normal' is selected, revert to original colors
    transformedBackgroundColor.value = originalBackgroundColor.value;
    transformedForegroundColor.value = originalForegroundColor.value;
  }
}

// Update the background color based on event data
function updateBackground(eventData) {
  const color = eventData.cssColor ? eventData.cssColor : eventData.value;
  // Update the original background color and trigger color update
  originalBackgroundColor.value = color;
  updateColors();
}

// Update the foreground color based on event data
function updateForeground(eventData) {
  const color = eventData.cssColor ? eventData.cssColor : eventData.value;
  // Update the original foreground color and trigger color update
  originalForegroundColor.value = color;
  updateColors();
}

// Update color based on the current selection for either background or foreground
function updateColorBasedOnSelection(color, type) {
  const colorInRgb = hexToRgb(color);
  if (selected.value !== '' && selected.value !== 'normal') {
    // Simulate color based on the selection
    const simulatedColor = simulate({ r: colorInRgb[0], g: colorInRgb[1], b: colorInRgb[2] }, selected.value);
    // Convert simulated color back to hex
    const hexCode = rgbToHex(simulatedColor.r, simulatedColor.g, simulatedColor.b);
    // Update the transformed color based on the type (background or foreground)
    if (type === 'background') {
      transformedBackgroundColor.value = hexCode;
    } else {
      transformedForegroundColor.value = hexCode;
    }
  } else {
    // If no selection or 'normal' is selected, revert to original color
    if (type === 'background') {
      transformedBackgroundColor.value = color;
    } else {
      transformedForegroundColor.value = color;
    }
  }
}

// Setup watchers to trigger updateColors when selected, originalBackgroundColor, or originalForegroundColor changes
watch([selected, originalBackgroundColor, originalForegroundColor], () => {
  updateColors();
}, { immediate: true });

// Convert hex color to RGB
function hexToRgb(hex) {
  hex = hex.replace('#', '');
  // Parse hex string to integer
  let bigint = parseInt(hex, 16);
  // Extract RGB values
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return [r, g, b];
}

// Convert RGB color to hex
function rgbToHex(r, g, b) {
  // Ensure RGB values are within 0-255 range
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  // Convert RGB values to hex string
  let red = r.toString(16).padStart(2, '0');
  let green = g.toString(16).padStart(2, '0');
  let blue = b.toString(16).padStart(2, '0');
  return `#${red}${green}${blue}`.toUpperCase();
}

// Calculate luminance of a color
function luminance(r, g, b) {
  // Convert RGB to relative luminance
  let a = [r, g, b].map(value => {
    value /= 255;
    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Calculate contrast ratio between two luminances
function contrastRatio(lum1, lum2) {
  // Determine the brighter and darker luminances
  let brighter = Math.max(lum1, lum2);
  let darker = Math.min(lum1, lum2);
  // Calculate contrast ratio
  return (brighter + 0.05) / (darker + 0.05);
}

// Calculate the contrast ratio between transformed background and foreground colors
function calcRatio() {
  // Convert transformed colors to RGB
  let bgRgb = hexToRgb(transformedBackgroundColor.value);
  let fgRgb = hexToRgb(transformedForegroundColor.value);
  // Calculate luminance for both colors
  let bgLum = luminance(...bgRgb);
  let fgLum = luminance(...fgRgb);
  // Calculate and return contrast ratio
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
    max-width: 620px;
    margin: 0 auto;
}

.wcag-color-picker-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.vacp-color-picker {
  background-color: transparent
}

.vacp-color-input {
  color: #000000;
}

.vacp-icon > path {
  fill: #000000 !important;
}

.color-example-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    gap: 0.3rem;
    width: 100%;
}

.text-option-container {
    display: flex;
    justify-content: left;
    align-items: center;
    width: 100%;
    gap: 1rem;
}

.font-size-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  input {
    width: 4em;
    border: 1px solid #ccc;
    border-radius: 0.3rem;
    padding: 0 0.5rem;
    transition: all 0.25s !important;
  }

  input:hover {
    border: 1px solid var(--vp-button-brand-border);
  }
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.25s !important;
  border: 1px solid transparent;
  border-radius: 0.3rem;
}

.checkbox-container:hover {
  border: 1px solid var(--vp-button-brand-border);
}

.checkbox-bold-text,
.checkboxBold {
  padding: 0 0.5rem;
  cursor: pointer;
}

.wcag-background {
    padding: 1rem;
    width: 100%;
    border-radius: 8px;
    border: 1px solid #ccc;
    transition: all 0.25s !important;
}

.wcag-background:hover {
  border: 1px solid var(--vp-button-brand-border);
}

.wcag-foreground {
  margin: 0 !important;
  width: 100%;
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