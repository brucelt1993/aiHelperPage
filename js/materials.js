// 素材库页面的JavaScript功能

// 筛选标签切换
function setupFilterTags() {
    const filterTags = document.querySelectorAll('.filter-tag');
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // 如果是"全部"标签，则移除其他标签的活跃状态
            if (this.textContent.trim() === '全部') {
                filterTags.forEach(t => {
                    if (t !== this) t.classList.remove('active');
                });
                this.classList.add('active');
            } else {
                // 移除"全部"标签的活跃状态
                const allTag = document.querySelector('.filter-tag:first-child');
                allTag.classList.remove('active');
                
                // 切换当前标签的活跃状态
                this.classList.toggle('active');
                
                // 如果没有活跃的标签，则激活"全部"标签
                const hasActiveTag = Array.from(filterTags).some(t => t !== allTag && t.classList.contains('active'));
                if (!hasActiveTag) {
                    allTag.classList.add('active');
                }
            }
            
            // 根据选中的标签筛选素材
            filterMaterials();
        });
    });
}

// 筛选素材
function filterMaterials() {
    const activeFilterTags = Array.from(document.querySelectorAll('.filter-tag.active')).map(tag => tag.textContent.trim());
    const materialCards = document.querySelectorAll('.material-card:not(.upload-card)');
    
    // 如果选中了"全部"，则显示所有素材
    if (activeFilterTags.includes('全部')) {
        materialCards.forEach(card => {
            card.style.display = 'block';
        });
        return;
    }
    
    // 根据选中的标签筛选素材
    materialCards.forEach(card => {
        // 获取素材的类型和状态
        const typeTags = card.querySelectorAll('.material-type-tag');
        const statusTags = card.querySelectorAll('.material-status-tag');
        
        let types = [];
        let statuses = [];
        
        typeTags.forEach(tag => {
            types.push(tag.textContent.trim());
        });
        
        statusTags.forEach(tag => {
            statuses.push(tag.textContent.trim());
        });
        
        // 检查是否匹配选中的标签
        const matchesType = types.some(type => activeFilterTags.includes(type));
        const matchesStatus = statuses.some(status => activeFilterTags.includes(status));
        
        // 如果匹配任一选中的标签，则显示素材
        if (matchesType || matchesStatus) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// 设置素材预览
function setupMaterialPreview() {
    const previewBtns = document.querySelectorAll('.material-action-btn:first-child');
    const modal = document.querySelector('.material-preview-modal');
    const closeBtn = document.querySelector('.close-modal-btn');
    const previewContainer = document.querySelector('.preview-container');
    const modalTitle = document.querySelector('.modal-header h3');
    
    if (!previewBtns.length || !modal || !closeBtn || !previewContainer || !modalTitle) return;
    
    // 打开预览模态框
    previewBtns.forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.stopPropagation();
            
            // 获取素材卡片
            const card = this.closest('.material-card');
            if (!card) return;
            
            // 获取素材信息
            const title = card.querySelector('.material-info h3').textContent;
            const type = card.querySelector('.material-type-tag').textContent.trim();
            
            // 更新模态框标题
            modalTitle.textContent = title;
            
            // 根据素材类型生成预览内容
            let previewContent = '';
            
            if (type === '图片') {
                // 获取背景颜色作为演示
                const bgColor = card.querySelector('.material-thumbnail').style.backgroundColor;
                previewContent = `<div style="width: 100%; height: 300px; background-color: ${bgColor}; border-radius: 4px;"></div>`;
            } else if (type === '视频') {
                // 获取背景颜色作为演示
                const bgColor = card.querySelector('.material-thumbnail').style.backgroundColor;
                previewContent = `
                    <div style="position: relative; width: 100%; height: 300px; background-color: ${bgColor}; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                        <div class="video-icon" style="position: static; transform: none;">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                `;
            } else if (type === '文案') {
                const textContent = card.querySelector('.text-preview p').textContent;
                previewContent = `
                    <div class="text-content">
                        <p style="font-size: 16px; line-height: 1.6;">${textContent}</p>
                    </div>
                `;
            }
            
            // 更新预览容器
            previewContainer.innerHTML = previewContent;
            
            // 显示模态框
            modal.style.display = 'flex';
        });
    });
    
    // 关闭预览模态框
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // 点击模态框外部关闭模态框
    modal.addEventListener('click', function(event) {
        if (event.target === modal || event.target.classList.contains('modal-overlay')) {
            modal.style.display = 'none';
        }
    });
}

// 设置素材卡片交互
function setupMaterialCards() {
    const materialCards = document.querySelectorAll('.material-card:not(.upload-card)');
    const uploadCard = document.querySelector('.upload-card');
    
    // 素材卡片点击事件
    materialCards.forEach(card => {
        card.addEventListener('click', function() {
            // 获取素材信息
            const title = this.querySelector('.material-info h3').textContent;
            
            // 模拟点击预览按钮
            const previewBtn = this.querySelector('.material-action-btn:first-child');
            if (previewBtn) {
                previewBtn.click();
            }
        });
        
        // 阻止操作按钮点击事件冒泡
        const actionBtns = card.querySelectorAll('.material-action-btn');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', function(event) {
                event.stopPropagation();
                
                // 根据按钮类型执行不同操作
                const icon = this.querySelector('i');
                if (icon.classList.contains('fa-download')) {
                    alert('下载素材');
                } else if (icon.classList.contains('fa-ellipsis-v')) {
                    alert('打开素材操作菜单');
                }
            });
        });
    });
    
    // 上传素材卡片点击事件
    if (uploadCard) {
        uploadCard.addEventListener('click', function() {
            alert('打开上传素材对话框');
        });
    }
}

// 设置筛选按钮
function setupFilterButton() {
    const filterBtn = document.querySelector('.filter-btn');
    
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            alert('打开筛选面板 - 在实际应用中会显示筛选选项');
        });
    }
}

// 设置上传按钮
function setupUploadButton() {
    const uploadBtn = document.querySelector('.btn.btn-primary');
    
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            alert('打开上传素材对话框');
        });
    }
}

// 初始化素材库页面
function initMaterialsPage() {
    setupFilterTags();
    setupMaterialPreview();
    setupMaterialCards();
    setupFilterButton();
    setupUploadButton();
    
    // 修复素材状态标签颜色
    const statusTags = document.querySelectorAll('.material-status-tag');
    statusTags.forEach(tag => {
        if (tag.textContent.trim() === '使用中') {
            tag.style.backgroundColor = 'var(--primary-light)';
            tag.style.color = 'var(--primary)';
        } else {
            tag.style.backgroundColor = 'var(--bg-color)';
            tag.style.color = 'var(--text-secondary)';
        }
    });
}

// 当DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', initMaterialsPage);
