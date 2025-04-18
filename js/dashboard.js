// 仪表盘特定的JavaScript功能

// 模拟图表数据
const chartData = {
    dates: ['4/12', '4/13', '4/14', '4/15', '4/16', '4/17', '4/18'],
    ctr: [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.5],
    cpc: [0.52, 0.50, 0.48, 0.47, 0.46, 0.45, 0.45],
    conversion: [2.8, 2.9, 3.0, 3.1, 3.2, 3.2, 3.2],
    roi: [2.5, 2.6, 2.6, 2.7, 2.7, 2.8, 2.8]
};

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
    ctx.fillStyle = '#f0f2f5';
    ctx.fillRect(0, 0, width, height);
    
    // 绘制图表区域背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(margin.left, margin.top, chartWidth, chartHeight);
    
    // 绘制标题
    ctx.fillStyle = '#262626';
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
    ctx.strokeStyle = '#d9d9d9';
    ctx.stroke();
    
    // 绘制X轴标签
    ctx.fillStyle = '#8c8c8c';
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
    ctx.strokeStyle = '#d9d9d9';
    ctx.stroke();
    
    // 绘制Y轴标签和网格线
    ctx.fillStyle = '#8c8c8c';
    ctx.textAlign = 'right';
    
    const ySteps = 5;
    for (let i = 0; i <= ySteps; i++) {
        const y = margin.top + (chartHeight / ySteps) * i;
        const value = maxCtr - (maxCtr / ySteps) * i;
        
        // 绘制网格线
        ctx.beginPath();
        ctx.moveTo(margin.left, y);
        ctx.lineTo(width - margin.right, y);
        ctx.strokeStyle = '#f0f2f5';
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
    ctx.strokeStyle = '#1890ff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 绘制CTR数据点
    ctrData.forEach((value, i) => {
        const x = margin.left + i * xStep;
        const y = margin.top + chartHeight - (value / maxCtr) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#1890ff';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
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
    ctx.strokeStyle = '#52c41a';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 绘制转化率数据点
    conversionData.forEach((value, i) => {
        const x = margin.left + i * xStep;
        const y = margin.top + chartHeight - (value / maxConversion) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#52c41a';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
    });
    
    // 绘制图例
    const legendY = margin.top + 15;
    
    // CTR图例
    ctx.beginPath();
    ctx.rect(margin.left + 10, legendY - 5, 20, 2);
    ctx.fillStyle = '#1890ff';
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(margin.left + 20, legendY - 4, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#1890ff';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    ctx.fillStyle = '#262626';
    ctx.textAlign = 'left';
    ctx.font = '12px Arial';
    ctx.fillText('CTR', margin.left + 35, legendY);
    
    // 转化率图例
    ctx.beginPath();
    ctx.rect(margin.left + 90, legendY - 5, 20, 2);
    ctx.fillStyle = '#52c41a';
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(margin.left + 100, legendY - 4, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#52c41a';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    ctx.fillStyle = '#262626';
    ctx.fillText('转化率', margin.left + 115, legendY);
}

// 初始化仪表盘
function initDashboard() {
    // 绘制趋势图
    drawTrendChart();
    
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
    });
}

// 当DOM加载完成后初始化仪表盘
document.addEventListener('DOMContentLoaded', initDashboard);
