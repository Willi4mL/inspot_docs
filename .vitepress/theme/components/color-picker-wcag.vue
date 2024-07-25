<template>
    <section>
      <div class="wcag-color-picker-container">
        <ColorPicker @color-change="updateColorBackground" id="color-picker-background" default-format="hex"/>
        <ColorPicker @color-change="updateColorText" id="color-picker-text" default-format="hex"/>
      </div>
      <div class="wcag-background" :style="{ backgroundColor: backgroundColor }">
        <p class="wcag-text" :style="{ color: textColor }">Lorem ipsum</p>  
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ColorPicker } from 'vue-accessible-color-picker'
  
  // Reactive variables for background and text colors
  const backgroundColor = ref('#ffffff'); // Initial background color
  const textColor = ref('#000000'); // Initial text color

  function updateColorBackground (eventData) {
    backgroundColor.value = eventData.cssColor
 }

  function updateColorText (eventData) {
    textColor.value = eventData.cssColor
 }

  </script>
  
  

<style>
@import url('vue-accessible-color-picker/styles');

.wcag-color-picker-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.wcag-background {
    padding: 0 1em;
    border-radius: 0.5rem;
    margin-top: 1rem;
    border: 1px solid #000;
}
</style>