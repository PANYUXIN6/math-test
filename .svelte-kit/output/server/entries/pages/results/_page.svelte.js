import { u as head, n as pop, p as push } from "../../../chunks/index.js";
import "../../../chunks/client.js";
import "../../../chunks/Button.svelte_svelte_type_style_lang.js";
function _page($$payload, $$props) {
  push();
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>判题结果 - 小学口算练习</title>`;
  });
  $$payload.out += `<div class="results-container svelte-15esl3u">`;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="loading-card svelte-15esl3u"><div class="loading-spinner svelte-15esl3u"></div> <p class="svelte-15esl3u">正在判题中...</p></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
export {
  _page as default
};
