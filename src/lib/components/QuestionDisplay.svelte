<script>
    export let question;
    export let questionNumber;
    export let totalQuestions;
</script>

<div class="question-display">
    <div class="question-header">
        <span class="question-number">第 {questionNumber} 题</span>
        <span class="progress">{questionNumber}/{totalQuestions}</span>
    </div>
    
    <div class="question-content">
        <div class="question-text">
            {question.text} = 
            {#if question.type === 'fill-in'}
                <span class="fill-blank">?</span>
            {:else}
                <span class="multiple-choice-mark">?</span>
            {/if}
        </div>
    </div>
</div>

<style>
    .question-display {
        background: white;
        border-radius: 15px;
        padding: 25px;
        margin-bottom: 25px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border: 2px solid #f0f0f0;
    }
    
    .question-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        font-size: 0.9rem;
    }
    
    .question-number {
        color: #667eea;
        font-weight: 600;
    }
    
    .progress {
        color: #6c757d;
        background: #f8f9fa;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.85rem;
    }
    
    .question-content {
        text-align: center;
    }
    
    .question-text {
        font-size: 2rem;
        font-weight: 600;
        color: #333;
        font-family: 'Courier New', monospace;
        letter-spacing: 2px;
    }
    
    .fill-blank, .multiple-choice-mark {
        color: #667eea;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    @media (max-width: 480px) {
        .question-display {
            padding: 20px 15px;
        }
        
        .question-text {
            font-size: 1.5rem;
            letter-spacing: 1px;
        }
        
        .question-header {
            font-size: 0.85rem;
        }
    }
</style> 