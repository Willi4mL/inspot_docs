<template>
    <div class="test-form">
        <div class="form-container">
            <h2>Testformulär</h2>
            <form class="test-form">
                <section class="project-info-section">

                    <div>
                        <div class="form-input-continer">
                            <label for="company"><span class="required-symbol">&#42;</span>Företag:</label>
                            <input class="content-input" type="text" id="company" name="company" required>
                        </div>
                        <div class="form-input-continer">
                            <label for="domain"><span class="required-symbol">&#42;</span>Domän:</label>
                            <input class="content-input" type="text" id="domain" name="domain" required>
                        </div>
                    </div>

                    <div>
                        <div class="form-input-continer">
                            <label for="name"><span class="required-symbol">&#42;</span>Namn:</label>
                            <input class="content-input" type="text" id="name" name="name" required>
                        </div>
                        <div class="form-input-continer">
                            <label for="project-manager"><span class="required-symbol">&#42;</span>Projekt
                                ledare:</label>
                            <input class="content-input" type="text" id="project-manager" name="project-manager"
                                required>
                        </div>
                    </div>
                </section>

                <section class="content-container" v-for="(container, containerIndex) in newContainer"
                    :key="containerIndex">
                    <div :container>
                        <div class="content-heading-container">
                            <span class="required-symbol required-heading">&#42;</span>
                            <input class="content-heading" type="text" id="content-heading" name="heading"
                                placeholder="Rubrik" v-model="container.heading" required>
                            <span v-if="container.heading" class="add-new-inputs"
                                @click="addNewContent(containerIndex)">Lägg till {{ container.heading.toLowerCase() }}
                                innehåll &#43;</span>
                        </div>

                        <section id="responsiv-content-container" class="responsiv-content-container">
                            <div class="responsiv-content" v-for="(content, contentIndex) in container.content"
                                :key="contentIndex">

                                <div class="content-input-container--flex">
                                    <div>
                                        <div>
                                            <label :for="`responsiv-content-desc-${contentIndex}`"><span
                                                    class="required-symbol">&#42;</span>Beskrivning {{
                                                        contentIndex + 1 }}:</label>
                                            <textarea class="content-input"
                                                :id="`responsiv-content-desc-${contentIndex}`" type="text"
                                                v-model="content.description" required></textarea>
                                        </div>
                                        <div>
                                            <label :for="`responsiv-content-link-${contentIndex}`">Länk {{ contentIndex
                                                + 1
                                                }}:</label>
                                            <input class="content-input" :id="`responsiv-content-link-${contentIndex}`"
                                                type="text" v-model="content.link">
                                        </div>

                                    </div>
                                    <div>
                                        <p>Sätt poäng mellan 0-5</p>
                                        <span class="value-span">0
                                            <input class="ratio-value" v-model.number="content.value" />
                                            5
                                        </span>
                                        <Slider v-model="content.value" :max="5" />
                                    </div>

                                </div>

                                <div class="image-preview">
                                    <p v-if="!content.image">{{ errorMessage }}</p>
                                    <div v-if="content.image[containerIndex]">
                                        <img class="image" :src="content.image" alt="Bild">
                                    </div>

                                    <input type="file" :id="`fileInput-${containerIndex}-${contentIndex}`"
                                        @change="handleFileChange($event, containerIndex, contentIndex)"
                                        style="display: none;" />
                                    <label :for="`fileInput-${containerIndex}-${contentIndex}`" slot="upload-label">
                                        <figure>
                                            <!-- SVG omitted for brevity -->
                                        </figure>
                                        <span class="upload-button">{{ content.image ? "Byt bild &#63;" : "Ladda upp bild &#43;"
                                            }}</span>
                                    </label>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>

                <div class="download-button-container">
                    <span class="new-heading-button" @click="addNewContainer">Ny rubrik</span>
                    <button v-if="newContainer.length > 0" class="download-form" type="submit">Ladda ner
                        formulär</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Slider from 'primevue/slider';

let newContainer = ref([]);
const errorMessage = ref('');

function addNewContainer() {
    newContainer.value.push({ content: [{ description: '', link: '', image: '', value: 3, heading: '' }] });
}

function addNewContent(containerIndex) {
    newContainer.value[containerIndex].content.push({ description: '', link: '', image: '', value: 3 });
}

function handleFileChange(event, containerIndex, contentIndex) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    try {
        const imageUrl = URL.createObjectURL(file);
        // Access the specific container and content item
        let targetContainer = newContainer.value[containerIndex];
        let targetContent = targetContainer.content[contentIndex];

        // Update the image property for the specific content item
        targetContent.image = imageUrl;
        errorMessage.value = '';
    } catch (error) {
        console.error('Error handling the image:', error);
        errorMessage.value = 'Det gick inte att ladda upp bilden. Försök med en annan bild.';
    } finally {
        event.target.value = ''; // Reset the file input
    }
}
</script>

<style>
* {
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
}

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

.content-container>div {
    border-bottom: 1px solid #ccc;
    margin-bottom: 2rem;

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

.content-input-container--flex {
    display: flex !important;
    flex-direction: column;
    margin-top: 1rem;
}

.content-input-container--flex>div:last-child {
    max-width: 200px;
    height: 130px;
    margin-top: 24px;
    border: 1px solid #ccc;
    border-radius: 0.3rem;
    padding: 0 0.5em;
    text-align: center;
}

@media (min-width: 768px) {
    .content-input-container--flex {
        display: grid !important;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 4rem !important;
    }

    .content-input-container--flex div:first-child {
        grid-column: 1 / span 2;
        grid-row: 1;
    }

    .content-input-container--flex div:last-child {
        grid-column: 3;
        grid-row: 1;
    }
}

.content-input-container--flex>div>div {
    margin-bottom: 0.5rem;
    width: 100%;
}

.required-heading {
    position: absolute;
}

.required-symbol {
    color: #dd0404;
}

:root {
    --p-slider-handle-height: 1rem;
    --p-slider-handle-width: 1rem;
    --p-slider-transition-duration: 0.2s;
    --p-slider-handle-background: #ffffff;
    --p-slider-handle-border-radius: 50%;

    /* Handle focus */
    --p-slider-handle-focus-border-color: var(--vp-button-brand-bg);
    --p-slider-handle-content-background: var(--vp-button-brand-bg);

    /* Slider */
    --p-slider-track-size: 0.5rem;
    /* --p-slider-track-background: #063442; */
    --p-slider-border-radius: 0.3rem;

    /* Range */
    --p-slider-range-background: var(--vp-button-brand-bg);
}

.value-span {
    display: flex;
    justify-content: space-between;
    font-size: 0.8em;
}

.ratio-value {
    text-align: center;
    font-size: 1.2em !important;
    font-weight: bold;
    width: 2em;
}

.p-slider {
    border: 1px solid #ccc
}

.p-slider-range {
    height: 1em;
    width: 100%;
    background-color: red;
}

.p-slider-handle {
    border: 2px solid var(--vp-button-brand-bg);
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

.add-new-inputs,
.upload-button {
    padding: 0.5em 1em;
    border: 1px solid transparent;
    border-bottom: 1px solid #ccc;
    transition: all 0.25s !important;
}

.add-new-inputs:hover,
.upload-button:hover {
    border: 1px solid var(--vp-button-brand-hover-border);
    color: var(--vp-button-brand-hover-text) !important;
    cursor: pointer;
    border-radius: 8px;
}

.download-form,
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
.new-heading-button:hover {
    background-color: var(--vp-button-brand-hover-bg);
    border: 1px solid var(--vp-button-brand-hover-border);
    color: var(--vp-button-brand-hover-text) !important;
    cursor: pointer;
}
</style>