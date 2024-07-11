<script setup>
import { ref, onMounted } from 'vue'

const editUrl = ref('')
const theme = ref('')

onMounted(() => {
  // Switch theme button
  const switchThemeButton = document.querySelector('.VPSwitchAppearance');
  if (switchThemeButton) {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'aria-checked') {
          const isDarkMode = switchThemeButton.getAttribute('aria-checked') === 'true';
          theme.value = isDarkMode ? 'dark' : 'light';
        }
      });
    });

    observer.observe(switchThemeButton, {
      attributes: true // Configure the observer to listen to attribute changes
    });
  }

  // Edit page button Link
  const currentUrl = window.location.href.replace('html', 'md');
  const urlObject = new URL(currentUrl);

  const pathSegments = urlObject.pathname.split('/').filter(segment => segment); 
  pathSegments.unshift('https://github.com/Willi4mL')
  pathSegments.splice(2, 0, 'blob/main');
  editUrl.value = pathSegments.join('/'); 
})
</script>

<template>
  <div class="edite-button-container">
    <a :class="theme === 'dark' ? 'edit-link edit-link-dark' : 'edit-link edit-link-light'" :href="editUrl" target="_blank"> Ändra sidan </a>
  </div>
</template>

<style>
/* Edit page button */
.edite-button-container {
  padding-top: 2rem;
}

.edit-link-light {
  border: 1px solid var(--vp-button-brand-border);
  color: var(--vp-button-brand-text) !important;
  background-color: var(--vp-button-brand-bg);
}

.edit-link-dark {
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-button-brand-border) !important;
  background-color: transparent;

}

.edit-link {
  padding: 0.5em 1em;
  font-weight: normal !important;
  border-radius: 8px;
  transition: all 0.25s !important;
  text-decoration: none !important;
}

.edit-link:hover {
  background-color: var(--vp-button-brand-hover-bg);
  border: 1px solid var(--vp-button-brand-hover-border);
  color: var(--vp-button-brand-hover-text) !important;
}

.pager-link > .title {
  color: var(--vp-button-brand-hover-text) !important;
}

.pager-link:hover {
  border: 1px solid var(--vp-button-brand-hover-border) !important;
}
</style>