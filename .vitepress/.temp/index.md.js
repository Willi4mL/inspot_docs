import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"inspot mall","text":"Dokumentations sida","tagline":"Översikt över våra projekt","actions":[{"theme":"brand","text":"Inspot dokumenation","link":"/docs-landing"},{"theme":"alt","text":"Markdown Exempel","link":"/markdown-examples"},{"theme":"alt","text":"API Exempel","link":"/api-examples"}]},"features":[{"icon":"🧩","title":"Flexibla Komponenter","details":"Våra komponenter är designade för att vara modulära och återanvändbara, vilket sparar tid och arbete i dina utvecklingsprojekt. Med enkla konfigurationer kan du anpassa och integrera dem i dina applikationer för att snabbt uppnå de resultat du önskar."},{"icon":"📑","title":"Omfattande API-dokumentation","details":"Vi tillhandahåller detaljerad och lättförståelig API-dokumentation som hjälper dig att snabbt komma igång med våra tjänster. Dokumentationen inkluderar tydliga exempel, användningsfall och omfattande referensguider för att säkerställa att du kan utnyttja våra API:er till fullo."},{"icon":"🖌️","title":"Designsystem och Stilmallar","details":"Vårt designsystem inkluderar ett bibliotek av stilmallar och UI-komponenter som säkerställer ett enhetligt utseende och känsla i dina projekt. Genom att använda våra stilmallar kan du enkelt upprätthålla konsekvens och spara tid på designarbete."},{"icon":"💾","title":"Optimerade Prestandamönster","details":"Vi erbjuder beprövade prestandamönster och optimeringstekniker som hjälper dig att bygga snabba och effektiva applikationer. Genom att följa våra riktlinjer kan du maximera dina applikationers hastighet och responsivitet."},{"icon":"🔐","title":"Säkerhetsstandarder och Praxis","details":"Vår dokumentation omfattar också säkerhetsstandarder och bästa praxis för att skydda dina applikationer mot vanliga hot. Vi hjälper dig att implementera robusta säkerhetsåtgärder och att hålla din data säker."},{"icon":"🏗️","title":"Skalbar Arkitektur","details":"Bygg dina applikationer med skalbarhet i åtanke genom att följa våra arkitektoniska riktlinjer. Vi erbjuder insikter och mönster för att skapa system som kan hantera ökande belastningar och växa med dina behov."}]},"headers":[],"relativePath":"index.md","filePath":"index.md"}');
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
