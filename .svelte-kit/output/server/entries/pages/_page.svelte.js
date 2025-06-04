import { u as head, n as pop, p as push } from "../../chunks/index.js";
import { g as goto } from "../../chunks/client.js";
import { B as Button, g as gameModeStore } from "../../chunks/Button.js";
function _page($$payload, $$props) {
  push();
  function handleStart() {
    gameModeStore.set("typeSelection");
    goto();
  }
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>小学口算练习</title>`;
    $$payload2.out += `<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>`;
  });
  $$payload.out += `<div class="container svelte-1i38ql6"><div class="welcome-card svelte-1i38ql6"><div class="header svelte-1i38ql6"><h1 class="title svelte-1i38ql6">🧮</h1> <h2 class="subtitle svelte-1i38ql6">小学口算练习</h2> <p class="description svelte-1i38ql6">提高你的心算能力，让数学变得更有趣！</p></div> <div class="features svelte-1i38ql6"><div class="feature svelte-1i38ql6"><span class="icon svelte-1i38ql6">✏️</span> <span>10道精选题目</span></div> <div class="feature svelte-1i38ql6"><span class="icon svelte-1i38ql6">🎯</span> <span>填空题或选择题</span></div> <div class="feature svelte-1i38ql6"><span class="icon svelte-1i38ql6">⚡</span> <span>即时判题反馈</span></div></div> <div class="action svelte-1i38ql6">`;
  Button($$payload, {
    type: "primary",
    size: "large",
    fullWidth: true,
    onClick: handleStart,
    children: ($$payload2) => {
      $$payload2.out += `<!---->开始练习`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div></div>`;
  pop();
}
export {
  _page as default
};
