// 主要JavaScript功能

// 更新当前日期和时间
function updateDateTime() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        weekday: 'long' 
    };
    
    // 获取中文日期格式
    const dateString = now.toLocaleDateString('zh-CN', options);
    
    // 模拟天气数据（实际应用中应从API获取）
    const weather = '晴';
    const temperature = '26°C';
    
    // 更新欢迎区域的日期和天气
    const dateElement = document.querySelector('.welcome-text p');
    if (dateElement) {
        dateElement.textContent = `${dateString} | ${weather} ${temperature}`;
    }
}

// 创建CSS占位符替代缺失的图片
function createImagePlaceholders() {
    // 替换logo占位图
    const logoImgs = document.querySelectorAll('.logo img');
    logoImgs.forEach(img => {
        const logoPlaceholder = document.createElement('div');
        logoPlaceholder.className = 'logo-placeholder';
        logoPlaceholder.innerHTML = 'AI<span>助手</span>';
        img.parentNode.replaceChild(logoPlaceholder, img);
    });
    
    // 替换用户头像占位图
    const avatarImgs = document.querySelectorAll('.user-avatar img');
    avatarImgs.forEach(img => {
        const avatarPlaceholder = document.createElement('div');
        avatarPlaceholder.className = 'avatar-placeholder';
        avatarPlaceholder.innerHTML = '用户';
        img.parentNode.replaceChild(avatarPlaceholder, img);
    });
    
    // 替换AI头像占位图
    const aiAvatarImgs = document.querySelectorAll('.message-avatar img[alt="AI头像"]');
    aiAvatarImgs.forEach(img => {
        const aiAvatarPlaceholder = document.createElement('div');
        aiAvatarPlaceholder.className = 'ai-avatar-placeholder';
        aiAvatarPlaceholder.innerHTML = 'AI';
        img.parentNode.replaceChild(aiAvatarPlaceholder, img);
    });
    
    // 添加CSS样式
    const style = document.createElement('style');
    style.textContent = `
        .logo-placeholder {
            height: 32px;
            display: flex;
            align-items: center;
            font-weight: bold;
            font-size: 18px;
            color: var(--primary);
            margin-right: var(--space-sm);
        }
        .logo-placeholder span {
            color: var(--text-primary);
        }
        .avatar-placeholder, .ai-avatar-placeholder {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: white;
        }
        .avatar-placeholder {
            background-color: var(--primary);
        }
        .ai-avatar-placeholder {
            background-color: #52c41a;
        }
    `;
    document.head.appendChild(style);
}

// 初始化函数
function init() {
    updateDateTime();
    createImagePlaceholders();
    
    // 为侧边栏导航项添加点击事件
    const navItems = document.querySelectorAll('.side-nav ul li');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 为任务项添加点击事件
    const taskItems = document.querySelectorAll('.task-item input[type="checkbox"]');
    taskItems.forEach(item => {
        item.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                label.style.textDecoration = 'line-through';
                label.style.color = 'var(--text-secondary)';
            } else {
                label.style.textDecoration = 'none';
                label.style.color = 'var(--text-primary)';
            }
        });
    });
    
    // 为快速操作按钮添加点击事件
    const newChatBtn = document.querySelector('.action-btn:first-child');
    if (newChatBtn) {
        newChatBtn.addEventListener('click', function() {
            window.location.href = 'chat.html';
        });
    }
}

// 当DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
