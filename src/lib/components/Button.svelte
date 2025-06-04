<script>
    export let onClick = () => {};
    export let type = 'primary'; // 'primary', 'secondary', 'success', 'warning'
    export let size = 'normal'; // 'small', 'normal', 'large'
    export let disabled = false;
    export let fullWidth = false;
</script>

<button 
    class="btn btn-{type} btn-{size}" 
    class:btn-full-width={fullWidth}
    {disabled}
    on:click={onClick}
>
    <slot />
</button>

<style>
    .btn {
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        text-align: center;
        transition: all 0.2s ease;
        font-family: inherit;
        outline: none;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .btn:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
    
    .btn:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    /* 大小样式 */
    .btn-small {
        padding: 8px 16px;
        font-size: 14px;
    }
    
    .btn-normal {
        padding: 12px 24px;
        font-size: 16px;
    }
    
    .btn-large {
        padding: 16px 32px;
        font-size: 18px;
    }
    
    /* 类型样式 */
    .btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }
    
    .btn-primary:hover:not(:disabled) {
        background: linear-gradient(135deg, #5a6fd8 0%, #6b4190 100%);
    }
    
    .btn-secondary {
        background: #f8f9fa;
        color: #6c757d;
        border: 2px solid #dee2e6;
    }
    
    .btn-secondary:hover:not(:disabled) {
        background: #e9ecef;
        border-color: #adb5bd;
    }
    
    .btn-success {
        background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
        color: white;
    }
    
    .btn-success:hover:not(:disabled) {
        background: linear-gradient(135deg, #4e9f27 0%, #98d9bc 100%);
    }
    
    .btn-warning {
        background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
        color: #721c24;
    }
    
    .btn-warning:hover:not(:disabled) {
        background: linear-gradient(135deg, #ff8a8e 0%, #fdbcdf 100%);
    }
    
    .btn-full-width {
        width: 100%;
    }
</style> 