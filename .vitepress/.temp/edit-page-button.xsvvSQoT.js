import { ref, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
const _sfc_main = {
  __name: "edit-page-button",
  __ssrInlineRender: true,
  setup(__props) {
    const editUrl = ref("");
    const theme = ref("");
    onMounted(() => {
      const switchThemeButton = document.querySelector(".VPSwitchAppearance");
      if (switchThemeButton) {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === "attributes" && mutation.attributeName === "aria-checked") {
              const isDarkMode = switchThemeButton.getAttribute("aria-checked") === "true";
              theme.value = isDarkMode ? "dark" : "light";
            }
          });
        });
        observer.observe(switchThemeButton, {
          attributes: true
          // Configure the observer to listen to attribute changes
        });
      }
      const currentUrl = window.location.href.replace("html", "md");
      const urlObject = new URL(currentUrl);
      const pathSegments = urlObject.pathname.split("/").filter((segment) => segment);
      pathSegments.unshift("https://github.com/Willi4mL");
      pathSegments.splice(2, 0, "blob/main");
      editUrl.value = pathSegments.join("/");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "edite-button-container" }, _attrs))}><a class="${ssrRenderClass(theme.value === "dark" ? "edit-link edit-link-dark" : "edit-link edit-link-light")}"${ssrRenderAttr("href", editUrl.value)} target="_blank"> Ändra sidan </a></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/edit-page-button.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
