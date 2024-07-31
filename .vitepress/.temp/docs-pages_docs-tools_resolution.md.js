import { ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { ref, watch, useSSRContext } from "vue";
import "upscaler";
import "@upscalerjs/esrgan-legacy";
import { _ as _sfc_main$2 } from "./edit-page-button.xsvvSQoT.js";
const _sfc_main$1 = {
  __name: "resolution",
  __ssrInlineRender: true,
  setup(__props) {
    const url = ref("");
    const selectedResolution = ref("");
    const selectedFile = ref("");
    watch(selectedResolution, () => {
      const fileInput = document.getElementById("selected-file");
      if (fileInput) {
        fileInput.value = "";
        selectedFile.value = "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="option-container"><select name="resolution" id="resolution-options" class="resolution-options"><option disabled value=""${ssrIncludeBooleanAttr(Array.isArray(selectedResolution.value) ? ssrLooseContain(selectedResolution.value, "") : ssrLooseEqual(selectedResolution.value, "")) ? " selected" : ""}>Bildkvalitet</option><option value="GANS"${ssrIncludeBooleanAttr(Array.isArray(selectedResolution.value) ? ssrLooseContain(selectedResolution.value, "GANS") : ssrLooseEqual(selectedResolution.value, "GANS")) ? " selected" : ""}>Kvalitet x6</option><option value="PSNRSmall"${ssrIncludeBooleanAttr(Array.isArray(selectedResolution.value) ? ssrLooseContain(selectedResolution.value, "PSNRSmall") : ssrLooseEqual(selectedResolution.value, "PSNRSmall")) ? " selected" : ""}>Kvalitet x5</option><option value="div2K2X"${ssrIncludeBooleanAttr(Array.isArray(selectedResolution.value) ? ssrLooseContain(selectedResolution.value, "div2K2X") : ssrLooseEqual(selectedResolution.value, "div2K2X")) ? " selected" : ""}>Kvalitet x4</option><option value="div2K3X"${ssrIncludeBooleanAttr(Array.isArray(selectedResolution.value) ? ssrLooseContain(selectedResolution.value, "div2K3X") : ssrLooseEqual(selectedResolution.value, "div2K3X")) ? " selected" : ""}>Kvalitet x3</option><option value="div2K4X"${ssrIncludeBooleanAttr(Array.isArray(selectedResolution.value) ? ssrLooseContain(selectedResolution.value, "div2K4X") : ssrLooseEqual(selectedResolution.value, "div2K4X")) ? " selected" : ""}>Kvalitet x2</option></select><label class="selected-file-showing" for="selected-file">Välj fil</label><input class="selected-file" id="selected-file" type="file"></div>`);
      if (selectedFile.value) {
        _push(`<div class="preview" id="preview"><div class="originalImage" id="originalImage"></div><div class="updatedImage" id="updatedImage"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (selectedFile.value && url.value.value) {
        _push(`<button class="download-button">Ladda ner</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/images/resolution.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __pageData = JSON.parse('{"title":"Bildverktyg","description":"","frontmatter":{},"headers":[],"relativePath":"docs-pages/docs-tools/resolution.md","filePath":"docs-pages/docs-tools/resolution.md"}');
const __default__ = { name: "docs-pages/docs-tools/resolution.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="bildverktyg" tabindex="-1">Bildverktyg <a class="header-anchor" href="#bildverktyg" aria-label="Permalink to &quot;Bildverktyg&quot;">​</a></h1><h2 id="bildkvalitet" tabindex="-1">Bildkvalitet <a class="header-anchor" href="#bildkvalitet" aria-label="Permalink to &quot;Bildkvalitet&quot;">​</a></h2><p>Förbättra bildens upplösning</p>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("docs-pages/docs-tools/resolution.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
