// 绘制趋势图
function drawTrendChart() {
    const chartContainer = document.querySelector('.chart-placeholder');
    if (!chartContainer) return;
    
    // 清空容器并添加canvas元素
    chartContainer.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.width = chartContainer.clientWidth || 400;
    canvas.height = chartContainer.clientHeight || 160;
    chartContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // 设置边距
    const margin = {
        top: 20,
        right: 30,
        bottom: 30,
        left: 40
    };
    
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // 模拟数据
    const dates = ['4/12', '4/13', '4/14', '4/15', '4/16', '4/17', '4/18'];
    const conversionData = [2.8, 2.9, 3.0, 3.1, 3.2, 3.2, 3.2];
    const roiData = [2.5, 2.6, 2.6, 2.7, 2.7, 2.8, 2.8];
    
    // 绘制背景
    ctx.fillStyle = '#f0f2f5';
    ctx.fillRect(0, 0, width, height);
    
    // 绘制图表区域背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(margin.left, margin.top, chartWidth, chartHeight);
    
    // 绘制标题
    ctx.fillStyle = '#262626';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('转化率和ROI趋势图', width / 2, margin.top / 2);
    
    // 计算数据范围
    const maxConversion = Math.max(...conversionData) * 1.2;
    const maxROI = Math.max(...roiData) * 1.2;
    
    // 绘制X轴
    ctx.beginPath();
    ctx.moveTo(margin.left, height - margin.bottom);
    ctx.lineTo(width - margin.right, height - margin.bottom);
    ctx.strokeStyle = '#d9d9d9';
    ctx.stroke();
    
    // 绘制X轴标签
    ctx.fillStyle = '#8c8c8c';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    
    const xStep = chartWidth / (dates.length - 1);
    dates.forEach((date, i) => {
        const x = margin.left + i * xStep;
        ctx.fillText(date, x, height - margin.bottom + 15);
    });
    
    // 绘制Y轴
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, height - margin.bottom);
    ctx.strokeStyle = '#d9d9d9';
    ctx.stroke();
    
    // 绘制Y轴标签
    ctx.fillStyle = '#8c8c8c';
    ctx.textAlign = 'right';
    ctx.font = '10px Arial';
    
    const ySteps = 4;
    for (let i = 0; i <= ySteps; i++) {
        const y = margin.top + (chartHeight / ySteps) * i;
        const value = maxConversion - (maxConversion / ySteps) * i;
        
        // 绘制网格线
        ctx.beginPath();
        ctx.moveTo(margin.left, y);
        ctx.lineTo(width - margin.right, y);
        ctx.strokeStyle = '#f0f2f5';
        ctx.stroke();
        
        // 绘制Y轴标签
        ctx.fillText(value.toFixed(1) + '%', margin.left - 5, y + 4);
    }
    
    // 绘制转化率折线
    ctx.beginPath();
    conversionData.forEach((value, i) => {
        const x = margin.left + i * xStep;
        const y = margin.top + chartHeight - (value / maxConversion) * chartHeight;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.strokeStyle = '#52c41a';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 绘制转化率数据点
    conversionData.forEach((value, i) => {
        const x = margin.left + i * xStep;
        const y = margin.top + chartHeight - (value / maxConversion) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#52c41a';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
    });
    
    // 绘制ROI折线
    ctx.beginPath();
    roiData.forEach((value, i) => {
        const x = margin.left + i * xStep;
        const y = margin.top + chartHeight - (value / maxROI) * chartHeight;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.strokeStyle = '#1890ff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 绘制ROI数据点
    roiData.forEach((value, i) => {
        const x = margin.left + i * xStep;
        const y = margin.top + chartHeight - (value / maxROI) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#1890ff';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
    });
    
    // 绘制图例
    const legendY = height - 10;
    
    // 转化率图例
    ctx.beginPath();
    ctx.rect(margin.left + 10, legendY - 5, 15, 2);
    ctx.fillStyle = '#52c41a';
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(margin.left + 17, legendY - 4, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#52c41a';
    ctx.fill();
    
    ctx.fillStyle = '#262626';
    ctx.textAlign = 'left';
    ctx.font = '10px Arial';
    ctx.fillText('转化率', margin.left + 25, legendY);
    
    // ROI图例
    ctx.beginPath();
    ctx.rect(margin.left + 80, legendY - 5, 15, 2);
    ctx.fillStyle = '#1890ff';
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(margin.left + 87, legendY - 4, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#1890ff';
    ctx.fill();
    
    ctx.fillStyle = '#262626';
    ctx.fillText('ROI', margin.left + 95, legendY);
}

// AI聊天对话界面的JavaScript功能

// 自动调整文本区域高度
function autoResizeTextarea() {
    const textarea = document.querySelector('.input-wrapper textarea');
    if (!textarea) return;
    
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        const newHeight = Math.min(this.scrollHeight, 120); // 最大高度120px
        this.style.height = newHeight + 'px';
    });
}

// 发送消息
function setupMessageSending() {
    const textarea = document.querySelector('.input-wrapper textarea');
    const sendBtn = document.querySelector('.send-btn');
    const messagesContainer = document.querySelector('.messages-container');
    
    if (!textarea || !sendBtn || !messagesContainer) return;
    
    // 发送消息的函数
    function sendMessage() {
        const messageText = textarea.value.trim();
        if (!messageText) return;
        
        // 获取当前时间
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        
        // 创建用户消息HTML
        const userMessageHTML = `
            <div class="message user-message">
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-sender">您</span>
                    </div>
                    <div class="message-body">
                        <p>${messageText}</p>
                    </div>
                    <div class="message-footer">
                        <span class="message-time">${timeString}</span>
                    </div>
                </div>
                <div class="message-avatar">
                    <div class="avatar-placeholder">用户</div>
                </div>
            </div>
        `;
        
        // 添加用户消息到对话区域
        messagesContainer.insertAdjacentHTML('beforeend', userMessageHTML);
        
        // 清空输入框并重置高度
        textarea.value = '';
        textarea.style.height = '40px';
        
        // 滚动到底部
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // 模拟AI回复（实际应用中这里会调用后端API）
        setTimeout(() => {
            // 创建AI消息HTML
            const aiMessageHTML = `
                <div class="message ai-message">
                    <div class="message-avatar">
                        <div class="ai-avatar-placeholder">AI</div>
                    </div>
                    <div class="message-content">
                        <div class="message-header">
                            <span class="message-sender">AI助手</span>
                        </div>
                        <div class="message-body">
                            <p>我已收到您的消息："${messageText}"</p>
                            <p>在实际应用中，这里将显示AI的回复内容。目前这只是一个演示界面。</p>
                        </div>
                        <div class="message-footer">
                            <span class="message-time">${hours}:${(parseInt(minutes) + 1).toString().padStart(2, '0')}</span>
                        </div>
                    </div>
                </div>
            `;
            
            // 添加AI消息到对话区域
            messagesContainer.insertAdjacentHTML('beforeend', aiMessageHTML);
            
            // 滚动到底部
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // 更新上下文使用量（模拟）
            updateContextUsage();
        }, 1000);
    }
    
    // 点击发送按钮发送消息
    sendBtn.addEventListener('click', sendMessage);
    
    // 按Enter键发送消息（Shift+Enter换行）
    textarea.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

// 更新上下文使用量
function updateContextUsage() {
    const progressBar = document.querySelector('.progress-bar');
    const contextInfo = document.querySelector('.context-info');
    
    if (!progressBar || !contextInfo) return;
    
    // 模拟增加上下文使用量
    const currentWidth = parseInt(progressBar.style.width);
    const newWidth = Math.min(currentWidth + 5, 100);
    progressBar.style.width = `${newWidth}%`;
    
    // 更新颜色
    if (newWidth > 80) {
        progressBar.style.backgroundColor = 'var(--error)';
    } else if (newWidth > 60) {
        progressBar.style.backgroundColor = 'var(--warning)';
    } else {
        progressBar.style.backgroundColor = 'var(--primary)';
    }
    
    // 更新文本
    const tokenUsed = Math.floor(1300 + (newWidth - 65) * 20);
    contextInfo.textContent = `上下文使用: ${newWidth}% (${tokenUsed}/2000 tokens)`;
}

// 设置AI模型选择
function setupModelSelection() {
    const modelOptions = document.querySelectorAll('.model-option input[type="radio"]');
    const modelDescription = document.querySelector('.model-description p');
    
    if (!modelOptions.length || !modelDescription) return;
    
    const descriptions = {
        'model1': '基础对话型：适合日常对话和一般性问题咨询，响应速度快。',
        'model2': '创意生成型：擅长生成创意广告文案和视觉创意建议，适合创意策划。',
        'model3': '数据分析型：专注于数据分析和洞察，提供详细的数据解读和优化建议。'
    };
    
    modelOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.checked) {
                modelDescription.textContent = descriptions[this.id];
            }
        });
    });
}

// 设置返回按钮
function setupBackButton() {
    const backBtn = document.querySelector('.back-btn');
    if (!backBtn) return;
    
    backBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
}

// 设置素材缩略图
function setupMaterialThumbnails() {
    const materialItems = document.querySelectorAll('.material-item');
    const placeholderColors = ['#1890ff', '#52c41a', '#faad14', '#f5222d'];
    
    materialItems.forEach((item, index) => {
        // 设置不同的背景色作为占位符
        item.style.backgroundColor = placeholderColors[index % placeholderColors.length];
        
        // 移除img标签，添加占位符
        const img = item.querySelector('img');
        if (img) {
            item.removeChild(img);
        }
        
        // 添加点击事件
        item.addEventListener('click', function() {
            const textarea = document.querySelector('.input-wrapper textarea');
            if (textarea) {
                // 在实际应用中，这里会插入素材引用
                textarea.value += ` #[素材${index + 1}] `;
                textarea.focus();
            }
        });
    });
}

// 替换现有的消息头像
function replaceMessageAvatars() {
    // 替换AI头像
    const aiAvatars = document.querySelectorAll('.ai-message .message-avatar img');
    aiAvatars.forEach(img => {
        const aiAvatarPlaceholder = document.createElement('div');
        aiAvatarPlaceholder.className = 'ai-avatar-placeholder';
        aiAvatarPlaceholder.innerHTML = 'AI';
        img.parentNode.replaceChild(aiAvatarPlaceholder, img);
    });
    
    // 替换用户头像
    const userAvatars = document.querySelectorAll('.user-message .message-avatar img');
    userAvatars.forEach(img => {
        const avatarPlaceholder = document.createElement('div');
        avatarPlaceholder.className = 'avatar-placeholder';
        avatarPlaceholder.innerHTML = '用户';
        img.parentNode.replaceChild(avatarPlaceholder, img);
    });
}

// 初始化聊天界面
function initChat() {
    // 滚动到最新消息
    const messagesContainer = document.querySelector('.messages-container');
    if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    replaceMessageAvatars();
    autoResizeTextarea();
    setupMessageSending();
    setupModelSelection();
    setupBackButton();
    setupMaterialThumbnails();
    
    // 绘制趋势图
    drawTrendChart();
    
    // 设置聊天列表项点击事件
    const chatListItems = document.querySelectorAll('.chat-list-item');
    chatListItems.forEach(item => {
        item.addEventListener('click', function() {
            chatListItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // 在实际应用中，这里会加载对应的对话内容
        });
    });
    
    // 监听窗口大小变化，重新绘制图表
    window.addEventListener('resize', function() {
        drawTrendChart();
    });
}

// 当DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', initChat);
