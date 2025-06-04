<script>
    import { goto } from '$app/navigation';
    import { gameModeStore } from '$lib/stores.js';
    import Button from '$lib/components/Button.svelte';
    
    function handleStart() {
        gameModeStore.set('typeSelection');
        goto('/select-type');
    }
</script>

<svelte:head>
    <title>小学口算练习</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
</svelte:head>

<div class="container">
    <div class="welcome-card">
        <div class="header">
            <h1 class="title">🧮</h1>
            <h2 class="subtitle">小学口算练习</h2>
            <p class="description">提高你的心算能力，让数学变得更有趣！</p>
        </div>
        
        <div class="features">
            <div class="feature">
                <span class="icon">✏️</span>
                <span>10道精选题目</span>
            </div>
            <div class="feature">
                <span class="icon">🎯</span>
                <span>填空题或选择题</span>
            </div>
            <div class="feature">
                <span class="icon">⚡</span>
                <span>即时判题反馈</span>
            </div>
        </div>
        
        <div class="action">
            <Button 
                type="primary" 
                size="large" 
                fullWidth={true}
                onClick={handleStart}
            >
                开始练习
            </Button>
        </div>
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
    
    .welcome-card {
        background: white;
        border-radius: 20px;
        padding: 40px 30px;
        max-width: 400px;
        width: 100%;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        text-align: center;
    }
    
    .header {
        margin-bottom: 30px;
    }
    
    .title {
        font-size: 4rem;
        margin: 0 0 10px 0;
        line-height: 1;
    }
    
    .subtitle {
        font-size: 1.8rem;
        color: #333;
        margin: 0 0 15px 0;
        font-weight: 700;
    }
    
    .description {
        color: #666;
        font-size: 1rem;
        line-height: 1.5;
        margin: 0;
    }
    
    .features {
        margin-bottom: 40px;
    }
    
    .feature {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
        font-size: 1rem;
        color: #555;
        gap: 10px;
    }
    
    .feature:last-child {
        margin-bottom: 0;
    }
    
    .icon {
        font-size: 1.2rem;
    }
    
    .action {
        margin-top: 20px;
    }
    
    @media (max-width: 480px) {
        .welcome-card {
            padding: 30px 20px;
            margin: 10px;
        }
        
        .title {
            font-size: 3rem;
        }
        
        .subtitle {
            font-size: 1.5rem;
        }
    }
</style>
