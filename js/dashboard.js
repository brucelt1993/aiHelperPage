// 仪表盘特定的JavaScript功能

// 模拟图表数据
const chartData = {
    dates: ['4/12', '4/13', '4/14', '4/15', '4/16', '4/17', '4/18'],
    ctr: [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.5],
    cpc: [0.52, 0.50, 0.48, 0.47, 0.46, 0.45, 0.45],
    conversion: [2.8, 2.9, 3.0, 3.1, 3.2, 3.2, 3.2],
    roi: [2.5, 2.6, 2.6, 2.7, 2.7, 2.8, 2.8],
    impressions: [8500, 9200, 9800, 10500, 11200, 12000, 12500],
    clicks: [178, 202, 225, 252, 280, 312, 312]
};

// 当前主题
let currentTheme = 'light';

// 绘制趋势图
function drawTrendChart() {
    const chartContainer = document.querySelector('.chart-container');
    if (!chartContainer) return;
    
    // 清空容器并添加canvas元素
    chartContainer.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.width = chartContainer.clientWidth;
    canvas.height = chartContainer.clientHeight;
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
    
    // 绘制背景
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-color');
    ctx.fillRect(0, 0, width, height);
    
    // 绘制图表区域背景
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--white');
    ctx.fillRect(margin.left, margin.top, chartWidth, chartHeight);
    
    // 绘制标题
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary');
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('广告效果趋势图', width / 2, margin.top / 2);
    
    // 计算数据范围
    const ctrData = chartData.ctr;
    const conversionData = chartData.conversion;
    
    const maxCtr = Math.max(...ctrData) * 1.2;
    const maxConversion = Math.max(...conversionData) * 1.2;
    
    // 绘制X轴
    ctx.beginPath();
    ctx.moveTo(margin.left, height - margin.bottom);
    ctx.lineTo(width - margin.right, height - margin.bottom);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-color');
    ctx.stroke();
    
    // 绘制X轴标签
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary');
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    const xStep = chartWidth / (chartData.dates.length - 1);
    chartData.dates.forEach((date, i) => {
        const x = margin.left + i * xStep;
        ctx.fillText(date, x, height - margin.bottom + 20);
    });
    
    // 绘制Y轴
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, height - margin.bottom);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-color');
    ctx.stroke();
    
    // 绘制Y轴标签和网格线
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary');
    ctx.textAlign = 'right';
    
    const ySteps = 5;
    for (let i = 0; i <= ySteps; i++) {
        const y = margin.top + (chartHeight / ySteps) * i;
        const value = maxCtr - (maxCtr / ySteps) * i;
        
        // 绘制网格线
        ctx.beginPath();
        ctx.moveTo(margin.left, y);
        ctx.lineTo(width - margin.right, y);
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-color');
        ctx.stroke();
        
        // 绘制Y轴标签
        ctx.fillText(value.toFixed(1) + '%', margin.left - 5, y + 4);
    }
    
    // 绘制右侧Y轴标签
    ctx.textAlign = 'left';
    for (let i = 0; i <= ySteps; i++) {
        const y = margin.top + (chartHeight / ySteps) * i;
        const value = maxConversion - (maxConversion / ySteps) * i;
        ctx.fillText(value.toFixed(1) + '%', width - margin.right + 5, y + 4);
    }
    
    // 绘制CTR折线
    ctx.beginPath();
    ctrData.forEach((value, i) => {
        const x = margin.left + i * xStep;
        const y = margin.top + chartHeight - (value / maxCtr) * chartHeight;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--chart-color-1');
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 绘制CTR数据点
    ctrData.forEach((value, i) => {
        const x = margin.left + i * xStep;
        const y = margin.top + chartHeight - (value / maxCtr) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--chart-color-1');
        ctx.fill();
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--white');
        ctx.lineWidth = 1;
        ctx.stroke();
    });
    
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
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--chart-color-2');
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 绘制转化率数据点
    conversionData.forEach((value, i) => {
        const x = margin.left + i * xStep;
        const y = margin.top + chartHeight - (value / maxConversion) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--chart-color-2');
        ctx.fill();
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--white');
        ctx.lineWidth = 1;
        ctx.stroke();
    });
    
    // 绘制图例
    const legendY = margin.top + 15;
    
    // CTR图例
    ctx.beginPath();
    ctx.rect(margin.left + 10, legendY - 5, 20, 2);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--chart-color-1');
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(margin.left + 20, legendY - 4, 4, 0, Math.PI * 2);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--chart-color-1');
    ctx.fill();
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--white');
    ctx.lineWidth = 1;
    ctx.stroke();
    
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary');
    ctx.textAlign = 'left';
    ctx.font = '12px Arial';
    ctx.fillText('CTR', margin.left + 35, legendY);
    
    // 转化率图例
    ctx.beginPath();
    ctx.rect(margin.left + 90, legendY - 5, 20, 2);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--chart-color-2');
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(margin.left + 100, legendY - 4, 4, 0, Math.PI * 2);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--chart-color-2');
    ctx.fill();
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--white');
    ctx.lineWidth = 1;
    ctx.stroke();
    
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary');
    ctx.fillText('转化率', margin.left + 115, legendY);
}

// 绘制饼图
function drawPieChart() {
    const pieContainer = document.querySelector('.pie-chart-container');
    if (!pieContainer) return;
    
    // 清空容器并添加canvas元素
    pieContainer.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.width = pieContainer.clientWidth;
    canvas.height = pieContainer.clientHeight;
    pieContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // 饼图数据
    const data = [
        { label: 'Facebook', value: 45, color: getComputedStyle(document.documentElement).getPropertyValue('--chart-color-1') },
        { label: 'Google', value: 30, color: getComputedStyle(document.documentElement).getPropertyValue('--chart-color-2') },
        { label: 'Twitter', value: 15, color: getComputedStyle(document.documentElement).getPropertyValue('--chart-color-3') },
        { label: 'TikTok', value: 10, color: getComputedStyle(document.documentElement).getPropertyValue('--chart-color-4') }
    ];
    
    // 计算总和
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    // 设置饼图中心和半径
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;
    
    // 绘制标题
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary');
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('广告支出分布', centerX, 15);
    
    // 绘制饼图
    let startAngle = 0;
    data.forEach((item, index) => {
        // 计算角度
        const sliceAngle = (item.value / total) * 2 * Math.PI;
        
        // 绘制扇形
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        
        // 填充颜色
        ctx.fillStyle = item.color;
        ctx.fill();
        
        // 绘制边框
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--white');
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 计算标签位置
        const labelAngle = startAngle + sliceAngle / 2;
        const labelRadius = radius * 0.7;
        const labelX = centerX + Math.cos(labelAngle) * labelRadius;
        const labelY = centerY + Math.sin(labelAngle) * labelRadius;
        
        // 绘制百分比标签
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${Math.round(item.value)}%`, labelX, labelY);
        
        // 更新起始角度
        startAngle += sliceAngle;
    });
    
    // 绘制图例
    const legendTop = height - data.length * 20;
    data.forEach((item, index) => {
        const legendY = legendTop + index * 20;
        
        // 绘制颜色方块
        ctx.fillStyle = item.color;
        ctx.fillRect(10, legendY, 15, 15);
        
        // 绘制标签
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary');
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.label, 30, legendY + 7.5);
    });
}

// 绘制柱状图
function drawBarChart() {
    const barContainer = document.querySelector('.bar-chart-container');
    if (!barContainer) return;
    
    // 清空容器并添加canvas元素
    barContainer.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.width = barContainer.clientWidth;
    canvas.height = barContainer.clientHeight;
    barContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // 设置边距
    const margin = {
        top: 30,
        right: 20,
        bottom: 30,
        left: 40
    };
    
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // 绘制背景
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-color');
    ctx.fillRect(0, 0, width, height);
    
    // 绘制图表区域背景
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--white');
    ctx.fillRect(margin.left, margin.top, chartWidth, chartHeight);
    
    // 绘制标题
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary');
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('每日点击量', width / 2, 15);
    
    // 柱状图数据
    const data = chartData.clicks;
    const labels = chartData.dates;
    
    // 计算最大值
    const maxValue = Math.max(...data) * 1.2;
    
    // 绘制X轴
    ctx.beginPath();
    ctx.moveTo(margin.left, height - margin.bottom);
    ctx.lineTo(width - margin.right, height - margin.bottom);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-color');
    ctx.stroke();
    
    // 绘制Y轴
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, height - margin.bottom);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-color');
    ctx.stroke();
    
    // 绘制Y轴标签和网格线
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary');
    ctx.textAlign = 'right';
    ctx.font = '10px Arial';
    
    const ySteps = 5;
    for (let i = 0; i <= ySteps; i++) {
        const y = margin.top + (chartHeight / ySteps) * i;
        const value = maxValue - (maxValue / ySteps) * i;
        
        // 绘制网格线
        ctx.beginPath();
        ctx.moveTo(margin.left, y);
        ctx.lineTo(width - margin.right, y);
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-color');
        ctx.stroke();
        
        // 绘制Y轴标签
        ctx.fillText(Math.round(value), margin.left - 5, y + 4);
    }
    
    // 计算柱宽和间距
    const barCount = data.length;
    const barWidth = (chartWidth / barCount) * 0.6;
    const barSpacing = (chartWidth / barCount) * 0.4;
    
    // 绘制柱状图和X轴标签
    data.forEach((value, i) => {
        const x = margin.left + (chartWidth / barCount) * i + barSpacing / 2;
        const barHeight = (value / maxValue) * chartHeight;
        const y = height - margin.bottom - barHeight;
        
        // 绘制柱子
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--chart-color-3');
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // 绘制柱子边框
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--chart-color-3');
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, barWidth, barHeight);
        
        // 绘制数值标签
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary');
        ctx.textAlign = 'center';
        ctx.fillText(value, x + barWidth / 2, y - 5);
        
        // 绘制X轴标签
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary');
        ctx.fillText(labels[i], x + barWidth / 2, height - margin.bottom + 15);
    });
}

// 创建主题切换器
function createThemeSwitcher() {
    // 检查是否已存在主题切换器
    if (document.querySelector('.theme-switcher')) return;
    
    // 创建主题切换器容器
    const themeSwitcher = document.createElement('div');
    themeSwitcher.className = 'theme-switcher';
    
    // 添加主题选项
    const themes = [
        { name: 'light', label: '默认主题' },
        { name: 'dark', label: '深色主题' },
        { name: 'high-contrast', label: '高对比度' },
        { name: 'soft', label: '柔和主题' }
    ];
    
    themes.forEach(theme => {
        const themeOption = document.createElement('div');
        themeOption.className = `theme-option theme-${theme.name} ${theme.name === currentTheme ? 'active' : ''}`;
        themeOption.title = theme.label;
        themeOption.setAttribute('data-theme', theme.name);
        
        themeOption.addEventListener('click', () => {
            // 更新当前主题
            currentTheme = theme.name;
            
            // 更新文档主题
            document.documentElement.setAttribute('data-theme', theme.name);
            
            // 更新活动状态
            document.querySelectorAll('.theme-option').forEach(option => {
                option.classList.remove('active');
            });
            themeOption.classList.add('active');
            
            // 重新绘制图表
            drawTrendChart();
            drawPieChart();
            drawBarChart();
        });
        
        themeSwitcher.appendChild(themeOption);
    });
    
    // 添加到文档
    document.body.appendChild(themeSwitcher);
}

// 添加动画效果
function addAnimations() {
    // 为卡片添加动画类
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        // 添加延迟动画效果
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
    
    // 为图表添加动画类
    const chartContainers = document.querySelectorAll('.chart-container, .pie-chart-container, .bar-chart-container');
    chartContainers.forEach(container => {
        container.classList.add('slide-in-up');
    });
    
    // 为指标值添加动画类
    const metricValues = document.querySelectorAll('.metric-value');
    metricValues.forEach(value => {
        value.classList.add('pulse');
    });
}

// 创建额外的图表容器
function createAdditionalCharts() {
    const metricsOverview = document.querySelector('.metrics-overview');
    if (!metricsOverview) return;
    
    // 检查是否已经创建了额外图表
    if (metricsOverview.querySelector('.additional-charts')) return;
    
    // 创建额外图表容器
    const additionalCharts = document.createElement('div');
    additionalCharts.className = 'additional-charts';
    additionalCharts.style.display = 'flex';
    additionalCharts.style.gap = '16px';
    additionalCharts.style.marginTop = '16px';
    
    // 创建饼图容器
    const pieChartContainer = document.createElement('div');
    pieChartContainer.className = 'pie-chart-container';
    pieChartContainer.style.flex = '1';
    pieChartContainer.style.height = '200px';
    pieChartContainer.style.backgroundColor = 'var(--bg-color)';
    pieChartContainer.style.borderRadius = 'var(--radius-md)';
    
    // 创建柱状图容器
    const barChartContainer = document.createElement('div');
    barChartContainer.className = 'bar-chart-container';
    barChartContainer.style.flex = '1';
    barChartContainer.style.height = '200px';
    barChartContainer.style.backgroundColor = 'var(--bg-color)';
    barChartContainer.style.borderRadius = 'var(--radius-md)';
    
    // 添加到额外图表容器
    additionalCharts.appendChild(pieChartContainer);
    additionalCharts.appendChild(barChartContainer);
    
    // 添加到指标概览卡片
    metricsOverview.appendChild(additionalCharts);
}

// 添加图表交互
function addChartInteraction() {
    const chartContainer = document.querySelector('.chart-container');
    if (!chartContainer) return;
    
    // 添加提示框元素
    const tooltip = document.createElement('div');
    tooltip.className = 'chart-tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'var(--white)';
    tooltip.style.border = '1px solid var(--border-color)';
    tooltip.style.padding = '8px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.boxShadow = 'var(--shadow-sm)';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.opacity = '0';
    tooltip.style.transition = 'opacity 0.2s';
    tooltip.style.zIndex = '1000';
    document.body.appendChild(tooltip);
    
    // 监听鼠标移动
    chartContainer.addEventListener('mousemove', (event) => {
        const canvas = chartContainer.querySelector('canvas');
        if (!canvas) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // 设置边距
        const margin = {
            top: 20,
            right: 30,
            bottom: 30,
            left: 40
        };
        
        const chartWidth = canvas.width - margin.left - margin.right;
        const chartHeight = canvas.height - margin.top - margin.bottom;
        
        // 检查鼠标是否在图表区域内
        if (x >= margin.left && x <= canvas.width - margin.right &&
            y >= margin.top && y <= canvas.height - margin.bottom) {
            
            // 计算最接近的数据点
            const xStep = chartWidth / (chartData.dates.length - 1);
            const dataIndex = Math.round((x - margin.left) / xStep);
            
            if (dataIndex >= 0 && dataIndex < chartData.dates.length) {
                // 更新提示框内容
                tooltip.innerHTML = `
                    <div style="font-weight: bold; margin-bottom: 4px;">${chartData.dates[dataIndex]}</div>
                    <div>CTR: ${chartData.ctr[dataIndex]}%</div>
                    <div>转化率: ${chartData.conversion[dataIndex]}%</div>
                    <div>点击量: ${chartData.clicks[dataIndex]}</div>
                    <div>展示量: ${chartData.impressions[dataIndex]}</div>
                `;
                
                // 显示提示框
                tooltip.style.opacity = '1';
                tooltip.style.left = `${event.pageX + 10}px`;
                tooltip.style.top = `${event.pageY + 10}px`;
            }
        } else {
            // 隐藏提示框
            tooltip.style.opacity = '0';
        }
    });
    
    // 鼠标离开图表时隐藏提示框
    chartContainer.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
    });
}

// 添加图标到卡片标题
function addIconsToCardTitles() {
    // 为卡片标题添加图标
    const cardTitles = document.querySelectorAll('.card h2');
    
    cardTitles.forEach(title => {
        // 检查是否已经有图标
        if (title.querySelector('i')) return;
        
        const titleText = title.textContent.trim();
        let iconClass = '';
        
        // 根据标题文本选择图标
        if (titleText.includes('对话')) {
            iconClass = 'fas fa-comment-dots';
        } else if (titleText.includes('指标')) {
            iconClass = 'fas fa-chart-line';
        } else if (titleText.includes('任务')) {
            iconClass = 'fas fa-tasks';
        } else if (titleText.includes('操作')) {
            iconClass = 'fas fa-bolt';
        }
        
        // 如果有匹配的图标，添加到标题前面
        if (iconClass) {
            const icon = document.createElement('i');
            icon.className = iconClass;
            title.prepend(icon);
            title.prepend(' ');
        }
    });
}

// 初始化仪表盘
function initDashboard() {
    // 设置初始主题
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // 创建主题切换器
    createThemeSwitcher();
    
    // 创建额外的图表
    createAdditionalCharts();
    
    // 添加图标到卡片标题
    addIconsToCardTitles();
    
    // 绘制图表
    drawTrendChart();
    drawPieChart();
    drawBarChart();
    
    // 添加图表交互
    addChartInteraction();
    
    // 添加动画效果
    addAnimations();
    
    // 为最近对话项添加点击事件
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(item => {
        item.addEventListener('click', function() {
            // 在实际应用中，这里会跳转到对应的对话页面
            window.location.href = 'chat.html';
        });
    });
    
    // 为素材缩略图添加样式和点击事件
    const materialThumbnails = document.querySelectorAll('.material-thumbnail');
    const placeholderColors = ['#1890ff', '#52c41a', '#faad14'];
    
    materialThumbnails.forEach((thumbnail, index) => {
        // 添加不同的背景色
        thumbnail.style.backgroundColor = placeholderColors[index % placeholderColors.length];
        
        // 添加点击事件
        thumbnail.addEventListener('click', function() {
            // 在实际应用中，这里会打开素材预览
            alert('打开素材预览');
        });
    });
    
    // 监听窗口大小变化，重新绘制图表
    window.addEventListener('resize', function() {
        drawTrendChart();
        drawPieChart();
        drawBarChart();
    });
}

// 当DOM加载完成后初始化仪表盘
document.addEventListener('DOMContentLoaded', initDashboard);
