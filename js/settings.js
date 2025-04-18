// 设置页面的JavaScript功能

// 设置导航切换
function setupSettingsNav() {
    const navItems = document.querySelectorAll('.settings-nav ul li');
    const settingsSections = document.querySelectorAll('.settings-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // 获取目标设置部分的ID
            const targetId = this.getAttribute('data-target');
            
            // 移除所有导航项的活跃状态
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // 添加当前导航项的活跃状态
            this.classList.add('active');
            
            // 隐藏所有设置部分
            settingsSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // 显示目标设置部分
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// 设置表单处理
function setupSettingsForm() {
    const saveButtons = document.querySelectorAll('.btn-primary');
    
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 获取当前活跃的设置部分
            const activeSection = document.querySelector('.settings-section.active');
            if (!activeSection) return;
            
            // 模拟保存设置
            alert('设置已保存！在实际应用中，这里会将设置保存到服务器。');
        });
    });
    
    // 恢复默认设置
    const resetButtons = document.querySelectorAll('.btn-default:contains("恢复默认")');
    resetButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('确定要恢复默认设置吗？这将覆盖您的自定义设置。')) {
                // 模拟恢复默认设置
                alert('已恢复默认设置！在实际应用中，这里会重置表单字段。');
            }
        });
    });
}

// 设置模型开关
function setupModelToggles() {
    const modelToggles = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
    
    modelToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const modelName = this.closest('.model-item').querySelector('h4').textContent;
            
            if (this.checked) {
                console.log(`启用模型: ${modelName}`);
            } else {
                console.log(`禁用模型: ${modelName}`);
            }
        });
    });
}

// 设置预设管理
function setupPresetManagement() {
    // 编辑预设
    const editButtons = document.querySelectorAll('.preset-actions .btn:first-child');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const presetName = this.closest('.preset-item').querySelector('h4').textContent;
            alert(`编辑预设: ${presetName} - 在实际应用中，这里会打开预设编辑对话框。`);
        });
    });
    
    // 删除预设
    const deleteButtons = document.querySelectorAll('.preset-actions .btn:last-child');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const presetName = this.closest('.preset-item').querySelector('h4').textContent;
            
            if (confirm(`确定要删除预设 "${presetName}" 吗？此操作不可撤销。`)) {
                // 模拟删除预设
                this.closest('.preset-item').remove();
                alert(`预设 "${presetName}" 已删除！`);
            }
        });
    });
    
    // 添加预设
    const addPresetBtn = document.querySelector('.add-btn');
    if (addPresetBtn) {
        addPresetBtn.addEventListener('click', function() {
            alert('添加新预设 - 在实际应用中，这里会打开添加预设对话框。');
        });
    }
}

// 设置服务管理
function setupServiceManagement() {
    // 配置服务
    const configButtons = document.querySelectorAll('.service-actions .btn:first-child');
    configButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.closest('.service-item').querySelector('h4').textContent;
            alert(`配置服务: ${serviceName} - 在实际应用中，这里会打开服务配置对话框。`);
        });
    });
    
    // 连接/断开/重连服务
    const actionButtons = document.querySelectorAll('.service-actions .btn:last-child');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.closest('.service-item').querySelector('h4').textContent;
            const action = this.textContent.trim();
            
            if (action === '断开') {
                if (confirm(`确定要断开 "${serviceName}" 服务吗？`)) {
                    alert(`服务 "${serviceName}" 已断开！在实际应用中，这里会更新服务状态。`);
                }
            } else if (action === '重连') {
                alert(`正在重新连接 "${serviceName}" 服务...在实际应用中，这里会尝试重新连接服务。`);
            } else if (action === '连接') {
                alert(`正在连接 "${serviceName}" 服务...在实际应用中，这里会打开服务连接对话框。`);
            }
        });
    });
    
    // 刷新服务列表
    const refreshButton = document.querySelector('#mcp-services .btn-default');
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            alert('正在刷新服务列表...在实际应用中，这里会从服务器获取最新的服务列表。');
        });
    }
}

// 设置账号管理
function setupAccountManagement() {
    // 同步账号
    const syncButtons = document.querySelectorAll('.account-actions .btn:first-child');
    syncButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accountName = this.closest('.account-item').querySelector('h4').textContent;
            alert(`正在同步 ${accountName}...在实际应用中，这里会从广告平台获取最新数据。`);
        });
    });
    
    // 断开/连接账号
    const connectionButtons = document.querySelectorAll('.account-actions .btn:last-child');
    connectionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accountName = this.closest('.account-item').querySelector('h4').textContent;
            const action = this.textContent.trim();
            
            if (action === '断开') {
                if (confirm(`确定要断开 "${accountName}" 吗？`)) {
                    alert(`账号 "${accountName}" 已断开！在实际应用中，这里会更新账号状态。`);
                }
            } else if (action === '连接') {
                alert(`正在连接 "${accountName}"...在实际应用中，这里会打开账号连接对话框。`);
            }
        });
    });
    
    // API密钥管理
    const apiKeyButtons = document.querySelectorAll('.api-key-actions .btn');
    apiKeyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const keyName = this.closest('.api-key-item').querySelector('h4').textContent;
            const action = this.textContent.trim();
            
            if (action === '查看') {
                alert(`查看 ${keyName} - 在实际应用中，这里会显示完整的API密钥。`);
            } else if (action === '更新') {
                alert(`更新 ${keyName} - 在实际应用中，这里会打开API密钥更新对话框。`);
            }
        });
    });
    
    // 添加API密钥
    const addApiKeyBtn = document.querySelector('#account-connect .add-btn');
    if (addApiKeyBtn) {
        addApiKeyBtn.addEventListener('click', function() {
            alert('添加新API密钥 - 在实际应用中，这里会打开添加API密钥对话框。');
        });
    }
}

// 设置数据管理
function setupDataManagement() {
    // 导出按钮
    const exportButtons = document.querySelectorAll('#data-management .btn-default:not(:contains("选择文件导入"))');
    exportButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            alert(`${action} - 在实际应用中，这里会生成并下载导出文件。`);
        });
    });
    
    // 导入按钮
    const importButton = document.querySelector('#data-management .btn-default:contains("选择文件导入")');
    if (importButton) {
        importButton.addEventListener('click', function() {
            alert('选择文件导入 - 在实际应用中，这里会打开文件选择对话框。');
        });
    }
    
    // 清除数据按钮
    const clearDataButton = document.querySelector('.btn-danger');
    if (clearDataButton) {
        clearDataButton.addEventListener('click', function() {
            if (confirm('警告：您确定要清除所有数据吗？此操作不可撤销，将删除所有对话历史和设置。')) {
                if (confirm('最后确认：此操作将永久删除所有数据且无法恢复。是否继续？')) {
                    alert('所有数据已清除！在实际应用中，这里会删除所有用户数据。');
                }
            }
        });
    }
}

// 修复选择器
Element.prototype.contains = function(text) {
    return this.textContent.includes(text);
};

// 初始化设置页面
function initSettingsPage() {
    setupSettingsNav();
    setupSettingsForm();
    setupModelToggles();
    setupPresetManagement();
    setupServiceManagement();
    setupAccountManagement();
    setupDataManagement();
}

// 当DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', initSettingsPage);
