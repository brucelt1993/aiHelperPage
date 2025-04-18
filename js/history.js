// 历史记录页面的JavaScript功能

// 设置分类树交互
function setupCategoryTree() {
    const treeItems = document.querySelectorAll('.tree-item-header');
    
    treeItems.forEach(item => {
        item.addEventListener('click', function() {
            // 获取父级树项
            const treeItem = this.parentElement;
            
            // 切换展开/折叠状态
            treeItem.classList.toggle('expanded');
            
            // 更新展开/折叠图标
            const expandIcon = this.querySelector('.expand-icon i');
            if (treeItem.classList.contains('expanded')) {
                expandIcon.className = 'fas fa-caret-down';
            } else {
                expandIcon.className = 'fas fa-caret-right';
            }
        });
    });
    
    // 设置子项点击事件
    const treeSubitems = document.querySelectorAll('.tree-subitem');
    treeSubitems.forEach(subitem => {
        subitem.addEventListener('click', function() {
            // 移除所有子项的活跃状态
            treeSubitems.forEach(item => {
                item.classList.remove('active');
            });
            
            // 添加当前子项的活跃状态
            this.classList.add('active');
            
            // 在实际应用中，这里会根据选中的分类筛选对话
            filterConversations(this.textContent.trim());
        });
    });
}

// 筛选对话（模拟）
function filterConversations(category) {
    const conversationItems = document.querySelectorAll('.conversation-item');
    
    // 在实际应用中，这里会根据分类筛选对话
    // 这里只是简单模拟，根据分类名称包含在对话标题中来筛选
    conversationItems.forEach(item => {
        const title = item.querySelector('h3').textContent;
        
        if (category === 'Facebook广告' && title.includes('Facebook')) {
            item.style.display = 'block';
        } else if (category === 'Google广告' && title.includes('Google')) {
            item.style.display = 'block';
        } else if (category === 'Facebook广告' || category === 'Google广告') {
            item.style.display = 'none';
        } else {
            item.style.display = 'block';
        }
    });
}

// 设置对话项交互
function setupConversationItems() {
    const conversationItems = document.querySelectorAll('.conversation-item');
    
    conversationItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有对话项的活跃状态
            conversationItems.forEach(i => {
                i.classList.remove('active');
            });
            
            // 添加当前对话项的活跃状态
            this.classList.add('active');
            
            // 在实际应用中，这里会打开对话详情
            const title = this.querySelector('h3').textContent;
            console.log(`打开对话: ${title}`);
        });
        
        // 设置收藏按钮点击事件
        const starBtn = item.querySelector('.conversation-actions .icon-btn:first-child');
        if (starBtn) {
            starBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                
                // 切换收藏状态
                const starIcon = this.querySelector('i');
                if (starIcon.classList.contains('far')) {
                    starIcon.className = 'fas fa-star';
                } else {
                    starIcon.className = 'far fa-star';
                }
            });
        }
        
        // 设置更多操作按钮点击事件
        const moreBtn = item.querySelector('.conversation-actions .icon-btn:last-child');
        if (moreBtn) {
            moreBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                
                // 在实际应用中，这里会显示更多操作菜单
                alert('打开更多操作菜单');
            });
        }
    });
}

// 设置搜索功能
function setupSearch() {
    const searchInput = document.querySelector('.search-filter input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchText = this.value.toLowerCase();
            const conversationItems = document.querySelectorAll('.conversation-item');
            
            conversationItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const summary = item.querySelector('.conversation-summary').textContent.toLowerCase();
                
                if (title.includes(searchText) || summary.includes(searchText)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
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

// 设置导出按钮
function setupExportButton() {
    const exportBtn = document.querySelector('.btn.btn-default');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            alert('导出对话历史 - 在实际应用中会提供导出选项');
        });
    }
}

// 设置添加分类按钮
function setupAddCategoryButton() {
    const addBtn = document.querySelector('.tree-header .icon-btn');
    
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            alert('添加新分类 - 在实际应用中会打开添加分类对话框');
        });
    }
}

// 初始化历史记录页面
function initHistoryPage() {
    setupCategoryTree();
    setupConversationItems();
    setupSearch();
    setupFilterButton();
    setupExportButton();
    setupAddCategoryButton();
}

// 当DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', initHistoryPage);
