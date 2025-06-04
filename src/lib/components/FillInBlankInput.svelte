<script>
    export let question;
    export let disabled = false;
    export let onAnswerChange = () => {};
    
    let inputValue = question.userAnswer || '';
    
    function handleInput(event) {
        const value = event.target.value;
        
        // 只允许数字输入
        if (value === '' || /^\d+$/.test(value)) {
            inputValue = value;
            question.userAnswer = value === '' ? null : parseInt(value);
            onAnswerChange(question);
        } else {
            // 恢复之前的值
            event.target.value = inputValue;
        }
    }
    
    function handleKeydown(event) {
        // 允许的按键：数字、退格、删除、方向键
        const allowedKeys = [
            'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 
            'ArrowUp', 'ArrowDown', 'Tab', 'Enter'
        ];
        
        if (!allowedKeys.includes(event.key) && !/^[0-9]$/.test(event.key)) {
            event.preventDefault();
        }
    }
    
    // 响应外部更改
    $: if (question.userAnswer !== null && question.userAnswer !== undefined) {
        inputValue = question.userAnswer.toString();
    }
</script>

<div class="fill-input-container">
    <div class="input-wrapper">
        <input 
            type="text" 
            class="answer-input"
            class:disabled
            bind:value={inputValue}
            on:input={handleInput}
            on:keydown={handleKeydown}
            {disabled}
            placeholder="请输入答案"
            maxlength="3"
            autocomplete="off"
        />
    </div>
    
    <div class="input-hint">
        <span class="hint-text">💡 只能输入数字</span>
    </div>
</div>

<style>
    .fill-input-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        margin: 20px 0;
    }
    
    .input-wrapper {
        position: relative;
    }
    
    .answer-input {
        width: 120px;
        height: 60px;
        font-size: 1.8rem;
        font-weight: 600;
        text-align: center;
        border: 3px solid #e9ecef;
        border-radius: 12px;
        outline: none;
        transition: all 0.3s ease;
        font-family: 'Courier New', monospace;
        letter-spacing: 2px;
    }
    
    .answer-input:focus {
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        transform: scale(1.05);
    }
    
    .answer-input:not(:focus):not(:placeholder-shown) {
        border-color: #28a745;
        background: #f8fff9;
    }
    
    .answer-input.disabled {
        background: #f8f9fa;
        border-color: #dee2e6;
        color: #6c757d;
        cursor: not-allowed;
    }
    
    .answer-input::placeholder {
        color: #adb5bd;
        font-size: 0.9rem;
        font-weight: normal;
        letter-spacing: normal;
    }
    
    .input-hint {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    
    .hint-text {
        font-size: 0.85rem;
        color: #28a745;
    }
    
    @media (max-width: 480px) {
        .answer-input {
            width: 100px;
            height: 50px;
            font-size: 1.5rem;
        }
        
        .hint-text {
            font-size: 0.8rem;
        }
    }
</style> 