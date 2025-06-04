<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { base } from '$app/paths';
    import { gameModeStore, questionsStore, scoreStore } from '$lib/stores.js';
    import { gradeQuestions } from '$lib/grading.js';
    import Button from '$lib/components/Button.svelte';
    
    let gradedQuestions = [];
    let score = 0;
    let correctCount = 0;
    let totalQuestions = 0;
    let gradeComplete = false;
    
    onMount(() => {
        const unsubscribeQuestions = questionsStore.subscribe(questions => {
            if (questions.length > 0) {
                // 进行判题
                const result = gradeQuestions(questions);
                gradedQuestions = result.questions;
                score = result.score;
                correctCount = result.correctCount;
                totalQuestions = result.totalQuestions;
                
                // 更新store
                questionsStore.set(result.questions);
                scoreStore.set(score);
                gradeComplete = true;
            } else {
                // 没有题目数据，返回首页
                goto(`${base}/`);
            }
        });
        
        return () => {
            unsubscribeQuestions();
        };
    });
    
    function restartQuiz() {
        // 重置所有状态
        gameModeStore.set('initial');
        questionsStore.set([]);
        scoreStore.set(0);
        goto(`${base}/`);
    }
    
    function getScoreColor(score) {
        if (score >= 90) return '#28a745';
        if (score >= 70) return '#ffc107';
        return '#dc3545';
    }
    
    function getScoreEmoji(score) {
        if (score >= 90) return '🎉';
        if (score >= 70) return '😊';
        return '💪';
    }
    
    function getEncouragement(score) {
        if (score >= 90) return '太棒了！你的口算能力很强！';
        if (score >= 70) return '不错！继续努力会更好的！';
        return '加油！多练习就能提高哦！';
    }
</script>

<svelte:head>
    <title>判题结果 - 小学口算练习</title>
</svelte:head>

<div class="results-container">
    {#if gradeComplete}
        <div class="results-card">
            <div class="score-section">
                <div class="score-circle" style="border-color: {getScoreColor(score)}">
                    <div class="score-emoji">{getScoreEmoji(score)}</div>
                    <div class="score-number" style="color: {getScoreColor(score)}">{score}</div>
                    <div class="score-label">分</div>
                </div>
                
                <div class="score-details">
                    <h2 class="score-title">恭喜完成！</h2>
                    <p class="score-stats">答对了 <strong>{correctCount}</strong> 题，共 <strong>{totalQuestions}</strong> 题</p>
                    <p class="encouragement">{getEncouragement(score)}</p>
                </div>
            </div>
            
            <div class="questions-review">
                <h3 class="review-title">题目回顾</h3>
                <div class="questions-list">
                    {#each gradedQuestions as question, index}
                        <div class="question-item" class:correct={question.isCorrect} class:incorrect={!question.isCorrect}>
                            <div class="question-header">
                                <span class="question-number">第 {index + 1} 题</span>
                                <span class="question-result">
                                    {#if question.isCorrect}
                                        <span class="correct-icon">✓</span>
                                        <span class="result-text correct">正确</span>
                                    {:else}
                                        <span class="incorrect-icon">✗</span>
                                        <span class="result-text incorrect">错误</span>
                                    {/if}
                                </span>
                            </div>
                            
                            <div class="question-content">
                                <div class="question-text">{question.text} = ?</div>
                                <div class="answers">
                                    <div class="answer-row">
                                        <span class="answer-label">你的答案：</span>
                                        <span class="user-answer" class:correct={question.isCorrect} class:incorrect={!question.isCorrect}>
                                            {question.userAnswer !== null ? question.userAnswer : '未答'}
                                        </span>
                                    </div>
                                    {#if !question.isCorrect}
                                        <div class="answer-row">
                                            <span class="answer-label">正确答案：</span>
                                            <span class="correct-answer">{question.correctAnswer}</span>
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
            
            <div class="action-section">
                <Button 
                    type="primary"
                    size="large"
                    fullWidth={true}
                    onClick={restartQuiz}
                >
                    再来一次
                </Button>
            </div>
        </div>
    {:else}
        <div class="loading-card">
            <div class="loading-spinner"></div>
            <p>正在判题中...</p>
        </div>
    {/if}
</div>

<style>
    :global(body) {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
    }
    
    .results-container {
        max-width: 700px;
        margin: 0 auto;
        padding: 20px;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding-top: 40px;
    }
    
    .results-card {
        background: white;
        border-radius: 20px;
        padding: 40px 30px;
        width: 100%;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
    
    .score-section {
        text-align: center;
        margin-bottom: 40px;
        padding-bottom: 30px;
        border-bottom: 2px solid #f8f9fa;
    }
    
    .score-circle {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 120px;
        height: 120px;
        border: 4px solid;
        border-radius: 50%;
        margin-bottom: 20px;
        background: #fff;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
    
    .score-emoji {
        font-size: 2rem;
        margin-bottom: 5px;
    }
    
    .score-number {
        font-size: 2rem;
        font-weight: 700;
        line-height: 1;
    }
    
    .score-label {
        font-size: 0.9rem;
        color: #6c757d;
        margin-top: 2px;
    }
    
    .score-title {
        color: #333;
        margin: 0 0 15px 0;
        font-size: 1.8rem;
        font-weight: 700;
    }
    
    .score-stats {
        color: #555;
        font-size: 1.1rem;
        margin: 0 0 15px 0;
    }
    
    .score-stats strong {
        color: #667eea;
    }
    
    .encouragement {
        color: #666;
        font-size: 1rem;
        margin: 0;
        font-style: italic;
    }
    
    .questions-review {
        margin-bottom: 40px;
    }
    
    .review-title {
        color: #333;
        font-size: 1.3rem;
        font-weight: 600;
        margin: 0 0 25px 0;
        text-align: center;
    }
    
    .questions-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .question-item {
        border: 2px solid #e9ecef;
        border-radius: 12px;
        padding: 20px;
        transition: all 0.3s ease;
    }
    
    .question-item.correct {
        border-color: #28a745;
        background: #f8fff9;
    }
    
    .question-item.incorrect {
        border-color: #dc3545;
        background: #fff8f8;
    }
    
    .question-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }
    
    .question-number {
        color: #667eea;
        font-weight: 600;
        font-size: 0.9rem;
    }
    
    .question-result {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    
    .correct-icon, .incorrect-icon {
        font-size: 1.1rem;
        font-weight: bold;
    }
    
    .correct-icon {
        color: #28a745;
    }
    
    .incorrect-icon {
        color: #dc3545;
    }
    
    .result-text {
        font-size: 0.9rem;
        font-weight: 600;
    }
    
    .result-text.correct {
        color: #28a745;
    }
    
    .result-text.incorrect {
        color: #dc3545;
    }
    
    .question-content {
        text-align: center;
    }
    
    .question-text {
        font-size: 1.3rem;
        font-weight: 600;
        font-family: 'Courier New', monospace;
        color: #333;
        margin-bottom: 15px;
        letter-spacing: 1px;
    }
    
    .answers {
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: center;
    }
    
    .answer-row {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 1rem;
    }
    
    .answer-label {
        color: #6c757d;
        font-weight: 500;
    }
    
    .user-answer {
        font-weight: 600;
        font-family: 'Courier New', monospace;
        padding: 2px 8px;
        border-radius: 4px;
    }
    
    .user-answer.correct {
        color: #28a745;
        background: rgba(40, 167, 69, 0.1);
    }
    
    .user-answer.incorrect {
        color: #dc3545;
        background: rgba(220, 53, 69, 0.1);
    }
    
    .correct-answer {
        color: #28a745;
        font-weight: 600;
        font-family: 'Courier New', monospace;
        background: rgba(40, 167, 69, 0.1);
        padding: 2px 8px;
        border-radius: 4px;
    }
    
    .action-section {
        text-align: center;
    }
    
    .loading-card {
        background: white;
        border-radius: 20px;
        padding: 60px 40px;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
    
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px auto;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @media (max-width: 480px) {
        .results-container {
            padding: 15px;
            padding-top: 30px;
        }
        
        .results-card {
            padding: 30px 20px;
        }
        
        .score-circle {
            width: 100px;
            height: 100px;
        }
        
        .score-emoji {
            font-size: 1.5rem;
        }
        
        .score-number {
            font-size: 1.5rem;
        }
        
        .score-title {
            font-size: 1.5rem;
        }
        
        .question-item {
            padding: 15px;
        }
        
        .question-text {
            font-size: 1.1rem;
        }
        
        .answer-row {
            flex-direction: column;
            gap: 5px;
            text-align: center;
        }
    }
</style> 