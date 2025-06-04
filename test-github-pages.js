#!/usr/bin/env node

// 模拟GitHub Pages环境的测试脚本
const { execSync } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

// 获取仓库名（如果是GitHub Pages部署）
const REPO_NAME = process.env.REPO_NAME || 'test-app';
const BASE_PATH = `/${REPO_NAME}`;
const PORT = 3001;

console.log('🔧 构建应用（模拟GitHub Pages环境）...');
try {
    execSync(`BASE_PATH='${BASE_PATH}' npm run build`, { stdio: 'inherit' });
    console.log('✅ 构建成功！');
} catch (error) {
    console.error('❌ 构建失败：', error.message);
    process.exit(1);
}

// 创建简单的HTTP服务器来测试
const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'build', req.url === '/' ? '/index.html' : req.url);
    
    // 处理子路径
    if (req.url.startsWith(BASE_PATH)) {
        const relativePath = req.url.slice(BASE_PATH.length) || '/index.html';
        filePath = path.join(__dirname, 'build', relativePath === '/' ? '/index.html' : relativePath);
    }
    
    // 设置正确的MIME类型
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    
    switch (ext) {
        case '.js':
            contentType = 'application/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.ico':
            contentType = 'image/x-icon';
            break;
    }
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // 对于SPA，任何找不到的路径都返回index.html
                fs.readFile(path.join(__dirname, 'build', 'index.html'), (err, content) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('服务器错误');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content);
                    }
                });
            } else {
                res.writeHead(500);
                res.end('服务器错误');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log('\n🚀 测试服务器启动成功！');
    console.log(`\n📱 请访问以下地址测试应用：`);
    console.log(`   主页：http://localhost:${PORT}${BASE_PATH}`);
    console.log(`   直接访问：http://localhost:${PORT}${BASE_PATH}/quiz`);
    console.log(`\n💡 这模拟了GitHub Pages的部署环境`);
    console.log(`   仓库名：${REPO_NAME}`);
    console.log(`   Base路径：${BASE_PATH}`);
    console.log(`\n⏹️  按 Ctrl+C 停止服务器`);
}); 