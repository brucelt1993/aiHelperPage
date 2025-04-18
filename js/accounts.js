// 账号管理页面的JavaScript功能

// 切换标签
function setupTabSwitching() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有标签的活跃状态
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // 添加当前标签的活跃状态
            this.classList.add('active');
            
            // 在实际应用中，这里会切换显示账号或素材内容
            const tabText = this.textContent.trim();
            
            if (tabText === '账号') {
                // 显示账号内容
                document.querySelector('.accounts-grid').style.display = 'grid';
                // 隐藏素材内容（如果有的话）
                const materialsGrid = document.querySelector('.materials-grid');
                if (materialsGrid) materialsGrid.style.display = 'none';
            } else if (tabText === '素材') {
                // 在实际应用中，这里会加载并显示素材内容
                alert('切换到素材标签 - 在实际应用中会显示素材内容');
                
                // 隐藏账号内容
                document.querySelector('.accounts-grid').style.display = 'none';
                
                // 如果有素材网格，则显示它
                const materialsGrid = document.querySelector('.materials-grid');
                if (materialsGrid) materialsGrid.style.display = 'grid';
            }
        });
    });
}

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
            
            // 在实际应用中，这里会根据选中的标签筛选账号
            filterAccounts();
        });
    });
}

// 筛选账号（模拟）
function filterAccounts() {
    const activeFilterTags = Array.from(document.querySelectorAll('.filter-tag.active')).map(tag => tag.textContent.trim());
    const accountCards = document.querySelectorAll('.account-card:not(.add-card)');
    
    // 如果选中了"全部"，则显示所有账号
    if (activeFilterTags.includes('全部')) {
        accountCards.forEach(card => {
            card.style.display = 'flex';
        });
        return;
    }
    
    // 根据选中的标签筛选账号
    accountCards.forEach(card => {
        // 获取账号的平台和状态
        const platformIcon = card.querySelector('.platform-icon');
        const statusTag = card.querySelector('.status-tag');
        
        let platform = '';
        if (platformIcon.classList.contains('facebook')) platform = 'Facebook';
        else if (platformIcon.classList.contains('google')) platform = 'Google';
        else if (platformIcon.classList.contains('twitter')) platform = 'Twitter';
        else if (platformIcon.classList.contains('tiktok')) platform = 'TikTok';
        else if (platformIcon.classList.contains('linkedin')) platform = 'LinkedIn';
        
        const status = statusTag.textContent.trim();
        
        // 检查是否匹配选中的标签
        const matchesPlatform = activeFilterTags.includes(platform);
        const matchesStatus = activeFilterTags.includes(status);
        
        // 如果匹配任一选中的标签，则显示账号
        if (matchesPlatform || matchesStatus) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// 设置筛选面板
function setupFilterPanel() {
    const filterBtn = document.querySelector('.filter-btn');
    const filterPanel = document.querySelector('.filter-panel');
    const closeBtn = document.querySelector('.filter-panel .close-btn');
    const applyBtn = document.querySelector('.filter-panel-footer .btn-primary');
    const resetBtn = document.querySelector('.filter-panel-footer .btn-default');
    
    if (!filterBtn || !filterPanel || !closeBtn) return;
    
    // 打开筛选面板
    filterBtn.addEventListener('click', function() {
        filterPanel.style.display = 'flex';
    });
    
    // 关闭筛选面板
    closeBtn.addEventListener('click', function() {
        filterPanel.style.display = 'none';
    });
    
    // 应用筛选
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            // 在实际应用中，这里会根据筛选条件筛选账号
            alert('应用筛选 - 在实际应用中会根据筛选条件筛选账号');
            filterPanel.style.display = 'none';
        });
    }
    
    // 重置筛选
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // 重置所有筛选选项
            const checkboxes = filterPanel.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            
            const dateInputs = filterPanel.querySelectorAll('input[type="date"]');
            dateInputs.forEach(input => {
                input.value = '';
            });
            
            const tagInput = filterPanel.querySelector('.tag-input');
            if (tagInput) tagInput.value = '';
        });
    }
    
    // 点击面板外部关闭面板
    document.addEventListener('click', function(event) {
        if (filterPanel.style.display === 'flex' && 
            !filterPanel.contains(event.target) && 
            !filterBtn.contains(event.target)) {
            filterPanel.style.display = 'none';
        }
    });
}

// 设置账号卡片交互
function setupAccountCards() {
    const accountCards = document.querySelectorAll('.account-card:not(.add-card)');
    const addCard = document.querySelector('.add-card');
    
    // 账号卡片点击事件
    accountCards.forEach(card => {
        card.addEventListener('click', function() {
            // 在实际应用中，这里会打开账号详情页面
            const accountName = this.querySelector('.account-info h3').textContent;
            alert(`打开 ${accountName} 详情页面`);
        });
        
        // 阻止菜单按钮点击事件冒泡
        const menuBtn = card.querySelector('.account-menu .icon-btn');
        if (menuBtn) {
            menuBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                // 在实际应用中，这里会显示账号操作菜单
                alert('打开账号操作菜单');
            });
        }
    });
    
    // 添加账号卡片点击事件
    if (addCard) {
        addCard.addEventListener('click', function() {
            // 在实际应用中，这里会打开添加账号对话框
            alert('打开添加账号对话框');
        });
    }
}

// 初始化账号管理页面
function initAccountsPage() {
    setupTabSwitching();
    setupFilterTags();
    setupFilterPanel();
    setupAccountCards();
}

// 当DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', initAccountsPage);
