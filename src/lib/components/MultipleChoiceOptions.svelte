<script>
    export let question;
    export let disabled = false;
    export let onAnswerChange = () => {};
    
    const optionLabels = ['A', 'B', 'C', 'D'];
    
    function selectOption(optionValue) {
        if (disabled) return;
        
        question.userAnswer = optionValue;
        onAnswerChange(question);
    }
    
    function handleKeydown(event, optionValue) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            selectOption(optionValue);
        }
    }
</script>

<div class="multiple-choice-container">
    <div class="options-grid">
        {#each question.options as option, index}
            <div 
                class="option-item"
                class:selected={question.userAnswer === option}
                class:disabled
                on:click={() => selectOption(option)}
                on:keydown={(e) => handleKeydown(e, option)}
                tabindex={disabled ? -1 : 0}
                role="button"
                aria-pressed={question.userAnswer === option}
            >
                <span class="option-label">{optionLabels[index]}</span>
                <span class="option-value">{option}</span>
            </div>
        {/each}
    </div>
    
    <div class="choice-hint">
        <span class="hint-text">👆 点击选择你认为正确的答案</span>
    </div>
</div>

<style>
    .multiple-choice-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        margin: 20px 0;
    }
    
    .options-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        width: 100%;
        max-width: 300px;
    }
    
    .option-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 15px 20px;
        border: 2px solid #e9ecef;
        border-radius: 12px;
        background: white;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        outline: none;
    }
    
    .option-item:hover:not(.disabled) {
        border-color: #667eea;
        background: #f8f9ff;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
    }
    
    .option-item:focus:not(.disabled) {
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    .option-item.selected {
        border-color: #28a745;
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        color: white;
        transform: scale(1.05);
        box-shadow: 0 6px 15px rgba(40, 167, 69, 0.3);
    }
    
    .option-item.selected .option-label {
        background: rgba(255, 255, 255, 0.2);
        color: white;
    }
    
    .option-item.disabled {
        opacity: 0.6;
        cursor: not-allowed;
        background: #f8f9fa;
        border-color: #dee2e6;
    }
    
    .option-label {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        background: #667eea;
        color: white;
        border-radius: 50%;
        font-weight: 600;
        font-size: 0.9rem;
        flex-shrink: 0;
    }
    
    .option-value {
        font-size: 1.1rem;
        font-weight: 600;
        font-family: 'Courier New', monospace;
        letter-spacing: 1px;
    }
    
    .choice-hint {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    
    .hint-text {
        font-size: 0.85rem;
        color: #28a745;
    }
    
    @media (max-width: 480px) {
        .options-grid {
            grid-template-columns: 1fr;
            max-width: 250px;
            gap: 12px;
        }
        
        .option-item {
            padding: 12px 16px;
            gap: 10px;
        }
        
        .option-label {
            width: 24px;
            height: 24px;
            font-size: 0.8rem;
        }
        
        .option-value {
            font-size: 1rem;
        }
        
        .hint-text {
            font-size: 0.8rem;
        }
    }
</style> 