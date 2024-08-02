<template>
  <div class="hello">

    <div>
      <input type="file" id="fileInput" @change="handleFileChange" style="display: none;" />
      <label for="fileInput" slot="upload-label">
        <figure>
          <!-- SVG omitted for brevity -->
        </figure>
        <div class="button-container">
          <span class="upload-button">{{ hasImage ? "Byt bild" : "Ladda upp bild" }}</span>
          <a v-if="compressedImage" :href="compressedImage" :download=downloadLink class="download-button">Hämta
            komprimerad bild</a>
        </div>
      </label>
      <div class="image-preview">
        <p>{{ errorMessage }}</p>
        <div v-if="originalImage">
          <img :src="originalImage" alt="Original bild">
          <p>Original filstorlek: {{ originalSize }} </p>
        </div>
        <div v-if="compressedImage">
          <img :src="compressedImage" alt="Komprimerad bild">
          <p>Komprimerad filstorlek: {{ compressedSize }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import imageCompression from 'browser-image-compression';

const hasImage = ref(false);
let originalImage = ref(null);
const originalSize = ref(0);
const compressedImage = ref(null);
const compressedSize = ref(0);
const downloadLink = ref(null);
const errorMessage = ref("");

function formatFileSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let unitIndex = 0;
  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024;
    unitIndex++;
  }
  return `${bytes.toFixed(2)} ${units[unitIndex]}`;
}

async function handleFileChange(event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  originalImage.value = URL.createObjectURL(file);
  const options = {
    // maxSizeMB: 2,
    // maxWidthOrHeight: 800,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    const compressedImageUrl = URL.createObjectURL(compressedFile);
    compressedImage.value = compressedImageUrl;

    fileFormat(file, compressedFile);
    hasImage.value = true;
    downloadLink.value = 'komprimerad-' + file.name;
    errorMessage.value = ""; // Clear error message on success
  } catch (error) {
    console.error('Error compressing the image:', error);
    compressedImage.value = null;
    originalImage.value = null;
    hasImage.value = false;
    errorMessage.value = 'Det gick inte att komprimera bilden. Försök med en annan bild.'; // Set error message
  }
};

function fileFormat(orgFile, compFile) {
  originalSize.value = formatFileSize(orgFile.size);
  compressedSize.value = formatFileSize(compFile.size);
}

</script>

<style>
.button-container {
  display: flex;
  gap: 1rem;
}

.image-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  margin: 4rem 0;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 150px;
    }
  }
}

.upload-button,
.download-button {
  padding: 0.5em 1em;
  font-weight: normal !important;
  border-radius: 8px;
  transition: all 0.25s !important;
  text-decoration: none !important;
  border: 1px solid var(--vp-button-brand-border);
  color: var(--vp-button-brand-text) !important;
  background-color: var(--vp-button-brand-bg);
  font-size: 1em;
}

.upload-caption:hover,
.download-button:hover {
  background-color: var(--vp-button-brand-hover-bg);
  border: 1px solid var(--vp-button-brand-hover-border);
  color: var(--vp-button-brand-hover-text) !important;
  cursor: pointer;
}
</style>