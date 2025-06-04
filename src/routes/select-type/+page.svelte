<script>
    import { goto } from '$app/navigation';
    import { gameModeStore, questionTypeStore, questionsStore } from '$lib/stores.js';
    import { generateQuestions } from '$lib/questionGenerator.js';
    import Button from '$lib/components/Button.svelte';
    
    function selectType(type) {
        questionTypeStore.set(type);
        
        // 生成题目
        const questions = generateQuestions(type, 10);
        questionsStore.set(questions);
        
        // 更新游戏状态并导航到答题页面
        gameModeStore.set('quiz');
        goto('/quiz');
    }
    
    function goBack() {
        gameModeStore.set('initial');
        goto('/');
    }
</script>

<svelte:head>
    <title>选择题目类型 - 小学口算练习</title>
</svelte:head>

<div class="container">
    <div class="select-card">
        <div class="header">
            <h2 class="title">选择题目类型</h2>
            <p class="description">请选择你喜欢的答题方式</p>
        </div>
        
        <div class="options">
            <div class="option-card" on:click={() => selectType('fill-in')} on:keydown={(e) => e.key === 'Enter' && selectType('fill-in')} tabindex="0" role="button">
                <div class="option-icon">✏️</div>
                <h3 class="option-title">填空题</h3>
                <p class="option-desc">自己输入答案，更有挑战性</p>
                <div class="option-example">
                    例如：25 + 17 = <span class="blank">___</span>
                </div>
            </div>
            
            <div class="option-card" on:click={() => selectType('multiple-choice')} on:keydown={(e) => e.key === 'Enter' && selectType('multiple-choice')} tabindex="0" role="button">
                <div class="option-icon">🎯</div>
                <h3 class="option-title">选择题</h3>
                <p class="option-desc">从4个选项中选择正确答案</p>
                <div class="option-example">
                    例如：25 + 17 = ?<br>
                    <small class="choices">A. 42  B. 41  C. 43  D. 40</small>
                </div>
            </div>
        </div>
        
        <div class="back-button">
            <Button 
                type="secondary" 
                size="normal"
                onClick={goBack}
            >
                返回首页
            </Button>
        </div>
    </div>
</div>

<style>
    :global(body) {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
    }
    
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
        box-sizing: border-box;
    }
    
    .select-card {
        background: white;
        border-radius: 20px;
        padding: 40px 30px;
        max-width: 500px;
        width: 100%;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        text-align: center;
    }
    
    .header {
        margin-bottom: 40px;
    }
    
    .title {
        font-size: 1.8rem;
        color: #333;
        margin: 0 0 15px 0;
        font-weight: 700;
    }
    
    .description {
        color: #666;
        font-size: 1rem;
        margin: 0;
    }
    
    .options {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 30px;
    }
    
    .option-card {
        border: 2px solid #e9ecef;
        border-radius: 15px;
        padding: 25px 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        background: #f8f9fa;
    }
    
    .option-card:hover {
        border-color: #667eea;
        background: #fff;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(102, 126, 234, 0.15);
    }
    
    .option-card:focus {
        outline: none;
        border-color: #667eea;
        background: #fff;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    .option-icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
    }
    
    .option-title {
        font-size: 1.3rem;
        color: #333;
        margin: 0 0 10px 0;
        font-weight: 600;
    }
    
    .option-desc {
        color: #666;
        font-size: 0.9rem;
        margin: 0 0 15px 0;
    }
    
    .option-example {
        color: #495057;
        font-size: 0.85rem;
        background: #e9ecef;
        padding: 10px;
        border-radius: 8px;
        font-family: 'Courier New', monospace;
    }
    
    .blank {
        background: #fff;
        padding: 2px 8px;
        border: 1px solid #ccc;
        border-radius: 3px;
    }
    
    .choices {
        color: #6c757d;
        margin-top: 5px;
        display: block;
    }
    
    .back-button {
        margin-top: 20px;
    }
    
    @media (max-width: 480px) {
        .select-card {
            padding: 30px 20px;
            margin: 10px;
        }
        
        .options {
            gap: 15px;
        }
        
        .option-card {
            padding: 20px 15px;
        }
        
        .option-icon {
            font-size: 2rem;
        }
    }
    
    @media (min-width: 600px) {
        .options {
            flex-direction: row;
        }
        
        .option-card {
            flex: 1;
        }
    }
</style> 