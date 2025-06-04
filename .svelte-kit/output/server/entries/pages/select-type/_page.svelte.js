import { u as head, n as pop, p as push } from "../../../chunks/index.js";
import { g as goto } from "../../../chunks/client.js";
import { B as Button, g as gameModeStore } from "../../../chunks/Button.js";
function _page($$payload, $$props) {
  push();
  function goBack() {
    gameModeStore.set("initial");
    goto();
  }
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>选择题目类型 - 小学口算练习</title>`;
  });
  $$payload.out += `<div class="container svelte-125l7ko"><div class="select-card svelte-125l7ko"><div class="header svelte-125l7ko"><h2 class="title svelte-125l7ko">选择题目类型</h2> <p class="description svelte-125l7ko">请选择你喜欢的答题方式</p></div> <div class="options svelte-125l7ko"><div class="option-card svelte-125l7ko" tabindex="0" role="button"><div class="option-icon svelte-125l7ko">✏️</div> <h3 class="option-title svelte-125l7ko">填空题</h3> <p class="option-desc svelte-125l7ko">自己输入答案，更有挑战性</p> <div class="option-example svelte-125l7ko">例如：25 + 17 = <span class="blank svelte-125l7ko">___</span></div></div> <div class="option-card svelte-125l7ko" tabindex="0" role="button"><div class="option-icon svelte-125l7ko">🎯</div> <h3 class="option-title svelte-125l7ko">选择题</h3> <p class="option-desc svelte-125l7ko">从4个选项中选择正确答案</p> <div class="option-example svelte-125l7ko">例如：25 + 17 = ?<br/> <small class="choices svelte-125l7ko">A. 42  B. 41  C. 43  D. 40</small></div></div></div> <div class="back-button svelte-125l7ko">`;
  Button($$payload, {
    type: "secondary",
    size: "normal",
    onClick: goBack,
    children: ($$payload2) => {
      $$payload2.out += `<!---->返回首页`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div></div>`;
  pop();
}
export {
  _page as default
};
