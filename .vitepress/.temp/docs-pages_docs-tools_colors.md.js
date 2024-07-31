import { ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderAttrs } from "vue/server-renderer";
import { ref, unref, useSSRContext } from "vue";
import { ColorPicker } from "vue-accessible-color-picker";
import { simulate } from "@bjornlu/colorblind";
import { _ as _sfc_main$2 } from "./edit-page-button.xsvvSQoT.js";
const _sfc_main$1 = {
  __name: "color-picker-wcag",
  __ssrInlineRender: true,
  setup(__props) {
    const backgroundColor = ref("#fffffff");
    const foregroundColor = ref("#00000");
    const selected = ref("");
    const pointsAA = [4.5, 3.1, 3.1];
    const pointsAAA = [7.1, 4.5, 3.1];
    const checkboxBold = ref(false);
    const fontSizeOptionExample = ref(16);
    let backHex;
    let foreHex;
    function updateColorBackground(eventData) {
      let color = eventData.cssColor;
      if (selected.value !== "" && selected.value !== "normal") {
        let backgroundInRgb = hexToRgb(color.startsWith("#") ? color : backgroundColor.value);
        let simulatedColor = simulate({ r: backgroundInRgb[0], g: backgroundInRgb[1], b: backgroundInRgb[2] }, selected.value);
        backHex = backgroundColor.value = rgbToHex(simulatedColor.r, simulatedColor.g, simulatedColor.b);
        backgroundColor.value = `rgb(${simulatedColor.r}, ${simulatedColor.g}, ${simulatedColor.b})`;
      } else {
        backHex = null;
        backgroundColor.value = color;
      }
    }
    function updateColorText(eventData) {
      let color = eventData.cssColor;
      if (selected.value !== "" && selected.value !== "normal") {
        let foregroundInRgb = hexToRgb(color.startsWith("#") ? color : foregroundColor.value);
        let simulatedColor = simulate({ r: foregroundInRgb[0], g: foregroundInRgb[1], b: foregroundInRgb[2] }, selected.value);
        foreHex = foregroundColor.value = rgbToHex(simulatedColor.r, simulatedColor.g, simulatedColor.b);
        foregroundColor.value = `rgb(${simulatedColor.r}, ${simulatedColor.g}, ${simulatedColor.b})`;
      } else {
        foreHex = null;
        foregroundColor.value = color;
      }
    }
    function hexToRgb(hex) {
      hex = hex.replace("#", "");
      let bigint = parseInt(hex, 16);
      let r = bigint >> 16 & 255;
      let g = bigint >> 8 & 255;
      let b = bigint & 255;
      return [r, g, b];
    }
    function rgbToHex(r, g, b) {
      r = Math.max(0, Math.min(255, r));
      g = Math.max(0, Math.min(255, g));
      b = Math.max(0, Math.min(255, b));
      let red = r.toString(16).padStart(2, "0");
      let green = g.toString(16).padStart(2, "0");
      let blue = b.toString(16).padStart(2, "0");
      return `#${red}${green}${blue}`.toUpperCase();
    }
    function luminance(r, g, b) {
      let a = [r, g, b].map(function(value) {
        value /= 255;
        return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }
    function contrastRatio(lum1, lum2) {
      let brighter = Math.max(lum1, lum2);
      let darker = Math.min(lum1, lum2);
      return (brighter + 0.05) / (darker + 0.05);
    }
    function calcRatio() {
      let bgRgb = backHex ? hexToRgb(backHex) : hexToRgb(backgroundColor.value);
      let fgRgb = foreHex ? hexToRgb(foreHex) : hexToRgb(foregroundColor.value);
      let simulatedBgRgb, simulatedFgRgb;
      if (selected.value !== "" && selected.value !== "normal") {
        let simulatedBg = simulate({ r: bgRgb[0], g: bgRgb[1], b: bgRgb[2] }, selected.value);
        let simulatedFg = simulate({ r: fgRgb[0], g: fgRgb[1], b: fgRgb[2] }, selected.value);
        simulatedBgRgb = [simulatedBg.r, simulatedBg.g, simulatedBg.b];
        simulatedFgRgb = [simulatedFg.r, simulatedFg.g, simulatedFg.b];
      } else {
        simulatedBgRgb = bgRgb;
        simulatedFgRgb = fgRgb;
      }
      let bgLum = luminance(...simulatedBgRgb);
      let fgLum = luminance(...simulatedFgRgb);
      return Number(contrastRatio(bgLum, fgLum).toFixed(2));
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><select name="color" id="color-disability" class="color-disability"><option disabled value=""${ssrIncludeBooleanAttr(Array.isArray(selected.value) ? ssrLooseContain(selected.value, "") : ssrLooseEqual(selected.value, "")) ? " selected" : ""}>Välj synfel</option><option value="normal"${ssrIncludeBooleanAttr(Array.isArray(selected.value) ? ssrLooseContain(selected.value, "normal") : ssrLooseEqual(selected.value, "normal")) ? " selected" : ""}>Normal</option><option value="protanopia"${ssrIncludeBooleanAttr(Array.isArray(selected.value) ? ssrLooseContain(selected.value, "protanopia") : ssrLooseEqual(selected.value, "protanopia")) ? " selected" : ""}>Protanopia (ej röd)</option><option value="deuteranopia"${ssrIncludeBooleanAttr(Array.isArray(selected.value) ? ssrLooseContain(selected.value, "deuteranopia") : ssrLooseEqual(selected.value, "deuteranopia")) ? " selected" : ""}>Deuteranopia (ej grön)</option><option value="tritanopia"${ssrIncludeBooleanAttr(Array.isArray(selected.value) ? ssrLooseContain(selected.value, "tritanopia") : ssrLooseEqual(selected.value, "tritanopia")) ? " selected" : ""}>Tritanopia (ej blå)</option><option value="achromatopsia"${ssrIncludeBooleanAttr(Array.isArray(selected.value) ? ssrLooseContain(selected.value, "achromatopsia") : ssrLooseEqual(selected.value, "achromatopsia")) ? " selected" : ""}>Achromatopsia (svartvit)</option></select><section class="wcag-container"><div class="wcag-color-picker-container">`);
      _push(ssrRenderComponent(unref(ColorPicker), {
        onColorChange: updateColorBackground,
        id: "color-picker-background",
        "default-format": "hex",
        "alpha-channel": "hide"
      }, null, _parent));
      _push(ssrRenderComponent(unref(ColorPicker), {
        onColorChange: updateColorText,
        id: "color-picker-foreground",
        "default-format": "hex",
        "alpha-channel": "hide",
        color: "#000000"
      }, null, _parent));
      _push(`</div><div class="color-example-container"><div class="text-option-container"><div><label class="font-size-option" for="fontSizeOption">Textstorlek (px) <input type="number" name="fontSizeOption" id="fontSizeOption"${ssrRenderAttr("value", fontSizeOptionExample.value)}></label></div><div><label class="checkbox-bold-text" for="checkboxBold">Fet text <input type="checkbox" name="checkboxBold" id="checkboxBold"${ssrIncludeBooleanAttr(Array.isArray(checkboxBold.value) ? ssrLooseContain(checkboxBold.value, null) : checkboxBold.value) ? " checked" : ""}></label></div></div><div class="wcag-background" style="${ssrRenderStyle({ backgroundColor: backgroundColor.value })}"><input class="wcag-foreground" style="${ssrRenderStyle({ color: foregroundColor.value, fontWeight: checkboxBold.value ? "bold" : "normal", fontSize: fontSizeOptionExample.value + "px" })}" value="Lorem ipsum"></div></div><section class="table-container"><table><caption> WCAG 2.2 kontrastförhållande </caption><thead><tr><th scope="col">Betyg</th><th scope="col">Normal text</th><th scope="col">Stor text (18.66px eller bold)</th><th scope="col">Komponent</th><th scope="col">Din poäng</th></tr></thead><tbody><tr><th scope="row">AA</th><!--[-->`);
      ssrRenderList(pointsAA, (point, index) => {
        _push(`<td style="${ssrRenderStyle({ backgroundColor: calcRatio() > point ? "#65d75bff" : "#e64949ff" })}">${ssrInterpolate(point)}</td>`);
      });
      _push(`<!--]--><td>${ssrInterpolate(calcRatio())}</td></tr><tr><th scope="row">AAA</th><!--[-->`);
      ssrRenderList(pointsAAA, (point, index) => {
        _push(`<td style="${ssrRenderStyle({ backgroundColor: calcRatio() > point ? "#65d75bff" : "#e64949ff" })}">${ssrInterpolate(point)}</td>`);
      });
      _push(`<!--]--><td>${ssrInterpolate(calcRatio())}</td></tr></tbody></table></section></section><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/color/color-picker-wcag.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __pageData = JSON.parse('{"title":"Färg tillgänglighet","description":"","frontmatter":{},"headers":[],"relativePath":"docs-pages/docs-tools/colors.md","filePath":"docs-pages/docs-tools/colors.md"}');
const __default__ = { name: "docs-pages/docs-tools/colors.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="farg-tillganglighet" tabindex="-1">Färg tillgänglighet <a class="header-anchor" href="#farg-tillganglighet" aria-label="Permalink to &quot;Färg tillgänglighet&quot;">​</a></h1><h2 id="wcag" tabindex="-1">WCAG <a class="header-anchor" href="#wcag" aria-label="Permalink to &quot;WCAG&quot;">​</a></h2><p>Betygsätt kontrasten mellan två färger.</p>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("docs-pages/docs-tools/colors.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
