<template>
    <div class="test-form">
        <div class="form-container">
            <h2>Testformulär</h2>
            <form class="test-form">
                <section class="project-info-section">

                    <div>
                        <div class="form-input-continer">
                            <label for="company">Företag:</label>
                            <input class="content-input" type="text" id="company" name="company" required>
                        </div>
                        <div class="form-input-continer">
                            <label for="domain">Domän:</label>
                            <input class="content-input" type="text" id="domain" name="domain" required>
                        </div>
                    </div>

                    <div>
                        <div class="form-input-continer">
                            <label for="name">Namn:</label>
                            <input class="content-input" type="text" id="name" name="name" required>
                        </div>
                        <div class="form-input-continer">
                            <label for="project-manager">Projekt ledare:</label>
                            <input class="content-input" type="text" id="project-manager" name="project-manager"
                                required>
                        </div>
                    </div>
                </section>

                <section class="content-container" v-for="(container, containerIndex) in newContainer" :key="containerIndex">
                    <div :container>
                <div class="content-heading-container">
                    <input class="content-heading" type="text" id="content-heading" name="heading" placeholder="Rubrik"
                        required>
                    <span class="add-new-inputs" @click="addNewContent(containerIndex)">Lägg till nytt fält</span>
                </div>
                <section id="responsiv-content-container" class="responsiv-content-container">
                    <div class="responsiv-content" v-for="(content, contentIndex) in container.content" :key="contentIndex">
                        <div>
                            <label :for="`responsiv-content-desc-${contentIndex}`">Beskrivning {{ contentIndex + 1 }}:</label>
                            <textarea class="content-input" :id="`responsiv-content-desc-${contentIndex}`" type="text"
                                v-model="content.description"></textarea>
                        </div>

                        <div>
                            <label :for="`responsiv-content-link-${contentIndex}`">Länk {{ contentIndex + 1 }}:</label>
                            <input class="content-input" :id="`responsiv-content-link-${contentIndex}`" type="text"
                                v-model="content.link">
                        </div>

                        <div class="image-preview">
                            <p v-if="!content.image">{{ errorMessage }}</p>
                            <div v-if="content.image">
                                <img class="image" :src="content.image" alt="Original bild">
                            </div>

                            <input type="file" :id="`fileInput-${contentIndex}`" @change="handleFileChange($event, contentIndex)"
                                style="display: none;" />
                            <label :for="`fileInput-${contentIndex}`" slot="upload-label">
                                <figure>
                                    <!-- SVG omitted for brevity -->
                                </figure>
                                <span class="upload-button">{{ content.image ? "Byt bild" : "Ladda upp bild" }}</span>
                            </label>
                        </div>
                    </div>
                </section>
            </div>
                </section>

                <div class="download-button-container">
                    <span class="new-heading-button" @click="addNewContainer">Ny rubrik</span>
                    <button v-if="newContent.length > 0" class="download-form" type="submit">Ladda ner
                        formulär</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

let newContent = ref([]);
let newContainer = ref([]);
const errorMessage = ref('');

function addNewContainer() {
    newContainer.value.push({ content: [{ description: '', link: '', image: '' }] });
}

function addNewContent(containerIndex) {
    newContainer.value[containerIndex].content.push({ description: '', link: '', image: '' });
}

function handleFileChange(event, contentIndex) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    try {
        const imageUrl = URL.createObjectURL(file);
        // Find the container that contains the content item to update
        newContainer.value.forEach(container => {
            container.content.forEach((content, index) => {
                if (index === contentIndex) {
                    content.image = imageUrl;
                }
            });
        });
    } catch (error) {
        console.error('Error handling the image:', error);
        errorMessage.value = 'Det gick inte att ladda upp bilden. Försök med en annan bild.';
    } finally {
        event.target.value = ''; // Reset the file input
    }
}
</script>

<style>
.test-form {
    display: flex;
    flex-direction: column;
    gap: 2rem;

}

.project-info-section {
    display: flex;
    gap: 1rem;

    div {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        width: 100%;
        margin-bottom: 0.5rem;
    }
}

.form-input-continer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.2rem;
}

.content-heading-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.content-container > div {
    border-bottom: 1px solid #ccc;

}

.content-heading {
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 0.2em 0.5em;
    font-size: 1.5em;
    font-weight: bold;
}

.content-input {
    border: 1px solid #ccc;
    border-radius: 0.3rem;
    padding: 0.2em 0.5em;
    font-size: 1em;
}

.responsiv-content-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.responsiv-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 2rem;
    margin-bottom: 1rem;

    div:not(.image-preview) {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
    }
}

.image-preview {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
}

.image {
    max-width: 150px;
    max-height: 150px;
}

.download-button-container {
    display: flex;
    justify-content: space-between;
}

.download-form,
.add-new-inputs,
.upload-button,
.new-heading-button {
    padding: 0.5em 1em;
    font-weight: normal !important;
    border-radius: 8px;
    transition: all 0.25s !important;
    text-decoration: none !important;
    border: 1px solid var(--vp-button-brand-border);
    color: var(--vp-button-brand-text) !important;
    background-color: var(--vp-button-brand-bg);
    font-size: 1em;
    width: fit-content;
}

.download-form:hover,
.add-new-inputs:hover,
.upload-button:hover,
.new-heading-button:hover {
    background-color: var(--vp-button-brand-hover-bg);
    border: 1px solid var(--vp-button-brand-hover-border);
    color: var(--vp-button-brand-hover-text) !important;
    cursor: pointer;
}
</style>