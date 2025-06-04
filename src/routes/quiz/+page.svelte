<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { base } from '$app/paths';
    import { gameModeStore, questionsStore, questionTypeStore } from '$lib/stores.js';
    import { areAllQuestionsAnswered, getUnansweredCount } from '$lib/grading.js';
    import QuestionDisplay from '$lib/components/QuestionDisplay.svelte';
    import FillInBlankInput from '$lib/components/FillInBlankInput.svelte';
    import MultipleChoiceOptions from '$lib/components/MultipleChoiceOptions.svelte';
    import Button from '$lib/components/Button.svelte';
    
    let questions = [];
    let questionType = 'fill-in';
    let currentQuestionIndex = 0;
    let showGradeButton = false;
    
    onMount(() => {
        const unsubscribeQuestions = questionsStore.subscribe(value => {
            questions = value;
            if (questions.length === 0) {
                goto(`${base}/`);
            }
        });
        
        const unsubscribeQuestionType = questionTypeStore.subscribe(value => {
            questionType = value;
        });
        
        return () => {
            unsubscribeQuestions();
            unsubscribeQuestionType();
        };
    });
    
    function handleAnswerChange(question) {
        questionsStore.update(questions => {
            const index = questions.findIndex(q => q.id === question.id);
            if (index !== -1) {
                questions[index] = { ...question };
            }
            return questions;
        });
        
        updateGradeButtonVisibility();
    }
    
    function updateGradeButtonVisibility() {
        const allAnswered = areAllQuestionsAnswered(questions);
        const currentAnswered = questions[currentQuestionIndex]?.userAnswer !== null && 
                               questions[currentQuestionIndex]?.userAnswer !== undefined;
        
        showGradeButton = allAnswered || (currentQuestionIndex === questions.length - 1 && currentAnswered);
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
    
    function goToQuestion(index) {
        currentQuestionIndex = index;
        updateGradeButtonVisibility();
    }
    
    function submitForGrading() {
        gameModeStore.set('results');
        goto(`${base}/results`);
    }
    
    function goBack() {
        goto(`${base}/select-type`);
    }
    
    $: currentQuestion = questions[currentQuestionIndex];
    $: unansweredCount = getUnansweredCount(questions);
    $: progress = questions.length > 0 ? ((questions.length - unansweredCount) / questions.length) * 100 : 0;
</script>

<svelte:head>
    <title>答题中 - 小学口算练习</title>
</svelte:head>

<div class="quiz-container">
    <div class="quiz-header">
        <div class="progress-bar">
            <div class="progress-fill" style="width: {progress}%"></div>
        </div>
        <div class="quiz-info">
            <span class="answered-count">已完成：{questions.length - unansweredCount}/{questions.length}</span>
            <span class="quiz-type">{questionType === 'fill-in' ? '填空题' : '选择题'}</span>
        </div>
    </div>
    
    {#if currentQuestion}
        <div class="question-section">
            <QuestionDisplay 
                question={currentQuestion}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
            />
            
            <div class="answer-section">
                {#if questionType === 'fill-in'}
                    <FillInBlankInput 
                        question={currentQuestion}
                        onAnswerChange={handleAnswerChange}
                    />
                {:else}
                    <MultipleChoiceOptions 
                        question={currentQuestion}
                        onAnswerChange={handleAnswerChange}
                    />
                {/if}
            </div>
        </div>
        
        <div class="navigation-section">
            <div class="question-nav">
                {#each questions as question, index}
                    <button 
                        class="nav-dot"
                        class:answered={question.userAnswer !== null && question.userAnswer !== undefined}
                        class:current={index === currentQuestionIndex}
                        on:click={() => goToQuestion(index)}
                    >
                        {index + 1}
                    </button>
                {/each}
            </div>
            
            <div class="action-buttons">
                <div class="nav-buttons">
                    <Button 
                        type="secondary"
                        size="normal"
                        disabled={currentQuestionIndex === 0}
                        onClick={prevQuestion}
                    >
                        上一题
                    </Button>
                    
                    <Button 
                        type="secondary"
                        size="normal"
                        disabled={currentQuestionIndex === questions.length - 1}
                        onClick={nextQuestion}
                    >
                        下一题
                    </Button>
                </div>
                
                <div class="submit-section">
                    {#if showGradeButton}
                        <Button 
                            type="success"
                            size="large"
                            fullWidth={true}
                            onClick={submitForGrading}
                        >
                            {areAllQuestionsAnswered(questions) ? '完成答题，立即判题' : `还有 ${unansweredCount} 题未答，判题`}
                        </Button>
                    {/if}
                </div>
            </div>
        </div>
        
        <div class="back-section">
            <Button 
                type="secondary"
                size="small"
                onClick={goBack}
            >
                重新选择题型
            </Button>
        </div>
    {/if}
</div>

<style>
    :global(body) {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
    }
    
    .quiz-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
    
    .quiz-header {
        background: white;
        border-radius: 15px;
        padding: 20px;
        margin-bottom: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .progress-bar {
        width: 100%;
        height: 8px;
        background: #e9ecef;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 15px;
    }
    
    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #28a745, #20c997);
        transition: width 0.3s ease;
        border-radius: 4px;
    }
    
    .quiz-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.9rem;
    }
    
    .answered-count {
        color: #28a745;
        font-weight: 600;
    }
    
    .quiz-type {
        color: #667eea;
        font-weight: 600;
        background: #f8f9ff;
        padding: 4px 12px;
        border-radius: 12px;
    }
    
    .question-section {
        flex: 1;
        margin-bottom: 30px;
    }
    
    .answer-section {
        display: flex;
        justify-content: center;
        margin: 30px 0;
    }
    
    .navigation-section {
        background: white;
        border-radius: 15px;
        padding: 25px;
        margin-bottom: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .question-nav {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        margin-bottom: 25px;
    }
    
    .nav-dot {
        width: 36px;
        height: 36px;
        border: 2px solid #e9ecef;
        border-radius: 50%;
        background: white;
        color: #6c757d;
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s ease;
        outline: none;
    }
    
    .nav-dot:hover {
        border-color: #667eea;
        background: #f8f9ff;
    }
    
    .nav-dot.answered {
        border-color: #28a745;
        background: #28a745;
        color: white;
    }
    
    .nav-dot.current {
        border-color: #667eea;
        background: #667eea;
        color: white;
        transform: scale(1.1);
    }
    
    .action-buttons {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    .nav-buttons {
        display: flex;
        gap: 15px;
        justify-content: center;
    }
    
    .submit-section {
        display: flex;
        justify-content: center;
    }
    
    .back-section {
        text-align: center;
        margin-top: 10px;
    }
    
    @media (max-width: 480px) {
        .quiz-container {
            padding: 15px;
        }
        
        .quiz-header {
            padding: 15px;
        }
        
        .navigation-section {
            padding: 20px 15px;
        }
        
        .nav-dot {
            width: 32px;
            height: 32px;
            font-size: 0.8rem;
        }
        
        .nav-buttons {
            flex-direction: column;
            gap: 10px;
        }
        
        .quiz-info {
            flex-direction: column;
            gap: 10px;
            text-align: center;
        }
    }
</style> 