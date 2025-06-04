import { t as escape_html, v as bind_props, n as pop, p as push, w as fallback, x as attr_class, y as attr, u as head, z as attr_style, A as ensure_array_like, B as stringify } from "../../../chunks/index.js";
import { g as goto } from "../../../chunks/client.js";
import { q as questionsStore, g as gameModeStore } from "../../../chunks/Button.svelte_svelte_type_style_lang.js";
import { B as Button } from "../../../chunks/Button.js";
function areAllQuestionsAnswered(questions) {
  return questions.every(
    (question) => question.userAnswer !== null && question.userAnswer !== void 0 && question.userAnswer !== ""
  );
}
function getUnansweredCount(questions) {
  return questions.filter(
    (question) => question.userAnswer === null || question.userAnswer === void 0 || question.userAnswer === ""
  ).length;
}
function QuestionDisplay($$payload, $$props) {
  push();
  let question = $$props["question"];
  let questionNumber = $$props["questionNumber"];
  let totalQuestions = $$props["totalQuestions"];
  $$payload.out += `<div class="question-display svelte-167gaqt"><div class="question-header svelte-167gaqt"><span class="question-number svelte-167gaqt">第 ${escape_html(questionNumber)} 题</span> <span class="progress svelte-167gaqt">${escape_html(questionNumber)}/${escape_html(totalQuestions)}</span></div> <div class="question-content svelte-167gaqt"><div class="question-text svelte-167gaqt">${escape_html(question.text)} = `;
  if (question.type === "fill-in") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="fill-blank svelte-167gaqt">?</span>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span class="multiple-choice-mark svelte-167gaqt">?</span>`;
  }
  $$payload.out += `<!--]--></div></div></div>`;
  bind_props($$props, { question, questionNumber, totalQuestions });
  pop();
}
function FillInBlankInput($$payload, $$props) {
  push();
  let question = $$props["question"];
  let disabled = fallback($$props["disabled"], false);
  let onAnswerChange = fallback($$props["onAnswerChange"], () => {
  });
  let inputValue = question.userAnswer || "";
  if (question.userAnswer !== null && question.userAnswer !== void 0) {
    inputValue = question.userAnswer.toString();
  }
  $$payload.out += `<div class="fill-input-container svelte-zj8mt4"><div class="input-wrapper svelte-zj8mt4"><input type="text"${attr_class("answer-input svelte-zj8mt4", void 0, { "disabled": disabled })}${attr("value", inputValue)}${attr("disabled", disabled, true)} placeholder="请输入答案" maxlength="3" autocomplete="off"/></div> <div class="input-hint svelte-zj8mt4"><span class="hint-text svelte-zj8mt4">💡 只能输入数字</span></div></div>`;
  bind_props($$props, { question, disabled, onAnswerChange });
  pop();
}
function _page($$payload, $$props) {
  push();
  let currentQuestion, unansweredCount, progress;
  let questions = [];
  let currentQuestionIndex = 0;
  let showGradeButton = false;
  function handleAnswerChange(question) {
    questionsStore.update((questions2) => {
      const index = questions2.findIndex((q) => q.id === question.id);
      if (index !== -1) {
        questions2[index] = { ...question };
      }
      return questions2;
    });
    updateGradeButtonVisibility();
  }
  function updateGradeButtonVisibility() {
    const allAnswered = areAllQuestionsAnswered(questions);
    const currentAnswered = questions[currentQuestionIndex]?.userAnswer !== null && questions[currentQuestionIndex]?.userAnswer !== void 0;
    showGradeButton = allAnswered || currentQuestionIndex === questions.length - 1 && currentAnswered;
  }
  function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      updateGradeButtonVisibility();
    }
  }
  function prevQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
    }
  }
  function submitForGrading() {
    gameModeStore.set("results");
    goto();
  }
  function goBack() {
    goto();
  }
  currentQuestion = questions[currentQuestionIndex];
  unansweredCount = getUnansweredCount(questions);
  progress = questions.length > 0 ? (questions.length - unansweredCount) / questions.length * 100 : 0;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>答题中 - 小学口算练习</title>`;
  });
  $$payload.out += `<div class="quiz-container svelte-892rxq"><div class="quiz-header svelte-892rxq"><div class="progress-bar svelte-892rxq"><div class="progress-fill svelte-892rxq"${attr_style(`width: ${stringify(progress)}%`)}></div></div> <div class="quiz-info svelte-892rxq"><span class="answered-count svelte-892rxq">已完成：${escape_html(questions.length - unansweredCount)}/${escape_html(questions.length)}</span> <span class="quiz-type svelte-892rxq">${escape_html("填空题")}</span></div></div> `;
  if (currentQuestion) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(questions);
    $$payload.out += `<div class="question-section svelte-892rxq">`;
    QuestionDisplay($$payload, {
      question: currentQuestion,
      questionNumber: currentQuestionIndex + 1,
      totalQuestions: questions.length
    });
    $$payload.out += `<!----> <div class="answer-section svelte-892rxq">`;
    {
      $$payload.out += "<!--[-->";
      FillInBlankInput($$payload, {
        question: currentQuestion,
        onAnswerChange: handleAnswerChange
      });
    }
    $$payload.out += `<!--]--></div></div> <div class="navigation-section svelte-892rxq"><div class="question-nav svelte-892rxq"><!--[-->`;
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let question = each_array[index];
      $$payload.out += `<button${attr_class("nav-dot svelte-892rxq", void 0, {
        "answered": question.userAnswer !== null && question.userAnswer !== void 0,
        "current": index === currentQuestionIndex
      })}>${escape_html(index + 1)}</button>`;
    }
    $$payload.out += `<!--]--></div> <div class="action-buttons svelte-892rxq"><div class="nav-buttons svelte-892rxq">`;
    Button($$payload, {
      type: "secondary",
      size: "normal",
      disabled: currentQuestionIndex === 0,
      onClick: prevQuestion,
      children: ($$payload2) => {
        $$payload2.out += `<!---->上一题`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> `;
    Button($$payload, {
      type: "secondary",
      size: "normal",
      disabled: currentQuestionIndex === questions.length - 1,
      onClick: nextQuestion,
      children: ($$payload2) => {
        $$payload2.out += `<!---->下一题`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----></div> <div class="submit-section svelte-892rxq">`;
    if (showGradeButton) {
      $$payload.out += "<!--[-->";
      Button($$payload, {
        type: "success",
        size: "large",
        fullWidth: true,
        onClick: submitForGrading,
        children: ($$payload2) => {
          $$payload2.out += `<!---->${escape_html(areAllQuestionsAnswered(questions) ? "完成答题，立即判题" : `还有 ${unansweredCount} 题未答，判题`)}`;
        },
        $$slots: { default: true }
      });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div></div> <div class="back-section svelte-892rxq">`;
    Button($$payload, {
      type: "secondary",
      size: "small",
      onClick: goBack,
      children: ($$payload2) => {
        $$payload2.out += `<!---->重新选择题型`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
export {
  _page as default
};
