import { w as writable } from "./exports.js";
import { w as fallback, x as attr_class, y as attr, C as slot, v as bind_props, B as stringify } from "./index.js";
/* empty css                                     */
const gameModeStore = writable("initial");
const questionsStore = writable([]);
function Button($$payload, $$props) {
  let onClick = fallback($$props["onClick"], () => {
  });
  let type = fallback($$props["type"], "primary");
  let size = fallback($$props["size"], "normal");
  let disabled = fallback($$props["disabled"], false);
  let fullWidth = fallback($$props["fullWidth"], false);
  $$payload.out += `<button${attr_class(`btn btn-${stringify(type)} btn-${stringify(size)}`, "svelte-hpu6fe", { "btn-full-width": fullWidth })}${attr("disabled", disabled, true)}><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></button>`;
  bind_props($$props, { onClick, type, size, disabled, fullWidth });
}
export {
  Button as B,
  gameModeStore as g,
  questionsStore as q
};
