<template>
  <div>

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
        <div class="set-image-size-container">
          <label class="set-image-size" for="image-size-input">Max höjd/bredd (px):
            <input class="image-size-input" id="image-size-input" name="image-size-input" form="image-size-input"
              type="number" v-model="setImageSize" />
            (Valfritt)
          </label>
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

// Reactive state references
const hasImage = ref(false); // Tracks if an image is selected
let originalImage = ref(null); // Holds the original image URL
const originalSize = ref(0); // Holds the original image size
let compressedImage = ref(null); // Holds the compressed image URL
const compressedSize = ref(0); // Holds the compressed image size
const downloadLink = ref(null); // Holds the download link for the compressed image
const errorMessage = ref(""); // Holds any error message
const setImageSize = ref(null); // Holds the user-selected size for image compression

// Function to format file sizes into a readable string
function formatFileSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB']; // Size units from Bytes to Gigabytes
  let unitIndex = 0; // Start with Bytes
  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024; // Convert to the next unit
    unitIndex++; // Move to the next unit
  }
  return `${bytes.toFixed(2)} ${units[unitIndex]}`; // Return formatted size
}

// Handle file selection and compression
async function handleFileChange(event) {
  const file = event.target.files[0]; // Get the selected file
  if (!file) {
    return; // Exit if no file is selected
  }

  // Set compression options based on user selection
  let options = setImageSize.value && setImageSize.value !== 0 ? {
    maxWidthOrHeight: setImageSize.value, // User-defined size
    useWebWorker: true, // Use web worker for performance
  } : {
    useWebWorker: true, // Default option when no size is selected
  };

  try {
    // Attempt to compress the selected file
    const compressedFile = await imageCompression(file, options);
    // Create URLs for the original and compressed images
    const compressedImageUrl = URL.createObjectURL(compressedFile);
    compressedImage.value = compressedImageUrl;
    originalImage.value = URL.createObjectURL(file);

    // Update UI with file sizes
    fileFormat(file, compressedFile);
    hasImage.value = true; // Indicate that an image is now selected
    downloadLink.value = 'komprimerad-' + file.name; // Set the download link
    errorMessage.value = ""; // Clear any previous error message
  } catch (error) {
    // Handle any errors during compression
    console.error('Error compressing the image:', error);
    compressedImage.value = null;
    originalImage.value = null;
    hasImage.value = false; // Indicate that no image is selected
    errorMessage.value = 'Det gick inte att komprimera bilden. Försök med en annan bild.'; // Display error message
  } finally {
    // Reset the file input to allow re-selecting the same file
    event.target.value = '';
  }
};

// Function to update the UI with the original and compressed file sizes
function fileFormat(orgFile, compFile) {
  originalSize.value = formatFileSize(orgFile.size); // Set original size
  compressedSize.value = formatFileSize(compFile.size); // Set compressed size
}

</script>

<style>
.button-container {
  display: flex;
  gap: 1rem;
}

.set-image-size-container {
  display: flex;
  align-items: center;
  margin-top: 1rem;
}

.set-image-size {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.image-size-input {
  width: 5em;
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  padding: 0 0.5rem;
  transition: all 0.25s !important;
}

.image-size-input:hover {
  border: 1px solid var(--vp-button-brand-border);
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

.upload-button:hover,
.download-button:hover {
  background-color: var(--vp-button-brand-hover-bg);
  border: 1px solid var(--vp-button-brand-hover-border);
  color: var(--vp-button-brand-hover-text) !important;
  cursor: pointer;
}
</style>