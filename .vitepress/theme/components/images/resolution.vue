<template>
    <div class="option-container">
      <select v-model="selectedResolution" name="resolution" id="resolution-options" class="resolution-options">
        <option disabled value="">Bildkvalitet</option>
        <option value="GANS">Kvalitet x6</option>
        <option value="PSNRSmall">Kvalitet x5</option>
        <option value="div2K2X">Kvalitet x4</option> <!-- Removed trailing comma -->
        <option value="div2K3X">Kvalitet x3</option> <!-- Removed trailing comma -->
        <option value="div2K4X">Kvalitet x2</option>
      </select>
      <label class="selected-file-showing" for="selected-file">Välj fil</label>
      <input class="selected-file" id="selected-file" type="file" @change="onFileChange" />
    </div>
    <div v-if="selectedFile" class="preview" id="preview">
      <div class="originalImage" id="originalImage"></div>
      <div class="updatedImage" id="updatedImage"></div>
    </div>
    <button v-if="selectedFile && url.value" @click="downloadImage" class="download-button">Ladda ner</button>
  </template>
  
  <script setup>
import { watch } from 'vue';
import Upscaler from 'upscaler';
import * as models from '@upscalerjs/esrgan-legacy';
import { ref } from 'vue';

const url = ref('');
const selectedResolution = ref('');
const selectedFile = ref('');
let downloadName = '';

// Watcher to clear the file input when the resolution changes
watch(selectedResolution, () => {
  const fileInput = document.getElementById('selected-file');
  if (fileInput) {
    fileInput.value = ''; // Clear the file input
    selectedFile.value = ''; // Also clear the selectedFile ref
  }
});

function formatFileSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let unitIndex = 0;
  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024;
    unitIndex++;
  }
  return `${bytes.toFixed(2)} ${units[unitIndex]}`;
}

async function onFileChange(e) {
  const file = e.target.files[0];
  selectedFile.value = file || '';

  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (event) => {
    const originalImageElement = document.getElementById("originalImage");
    const updatedImageElement = document.getElementById("updatedImage");
    originalImageElement ? originalImageElement.innerHTML = `<p>Original bild. ${formatFileSize(file.size)}</p>` : '';
    updatedImageElement ? updatedImageElement.innerHTML = '<p>uppdaterad bild</p>' : '';

    if (event.target?.result) {
      await fileUpload(event.target.result);
      const imgBefore = new Image();
      if(typeof event.target.result === 'string') {
          imgBefore.src = event.target.result;
      }
      if(originalImageElement) {
          originalImageElement.appendChild(imgBefore);
      }
    }
  };
  reader.readAsDataURL(file);
  downloadName = `upscaled-image-${file.name}`;

  // Clear the file input to ensure the change event can trigger again with the same file
  e.target.value = '';
}

async function fileUpload(base64Image) {
  const selectedModel = models[selectedResolution.value];
  const upscaler = new Upscaler({ model: selectedModel });

  upscaler.upscale(base64Image).then((upscaledImgSrc) => {
    const imageSizeInBytes = Math.floor((upscaledImgSrc.length * (3 / 4)) - (upscaledImgSrc.split('=')[1]?.length || 0));
    const updatedImageElement = document.getElementById("updatedImage");
    updatedImageElement ? updatedImageElement.innerHTML = `<p>uppdaterad bild. ${formatFileSize(imageSizeInBytes)}</p>` : '';

    const img = new Image();
    img.src = upscaledImgSrc;
    if(updatedImageElement) {
        updatedImageElement.appendChild(img);
      }
    url.value = upscaledImgSrc;
  });
}

function downloadImage() {
  const link = document.createElement('a');
  link.href = url.value;
  link.download = downloadName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<style>
.option-container {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.selected-file {
    display: none;
}

.preview {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.originalImage,
.updatedImage {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;

    img {
        width: 100%;
        max-width: 300px;
    }
}


.download-button,
.resolution-options,
.selected-file-showing {
    margin: 3rem 0;
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

.download-button:hover,
.resolution-options:hover,
.selected-file-showing:hover {
    background-color: var(--vp-button-brand-hover-bg);
    border: 1px solid var(--vp-button-brand-hover-border);
    color: var(--vp-button-brand-hover-text) !important;
    cursor: pointer;
}
</style>