let currentTheme = 'caishen';
let currentImageIndex = 0;
let isPlaying = true;
let imageList = [];
let selectedRecordDay = null;
let isEditMode = false;

function initApp() {
    currentTheme = localStorage.getItem('calendar_theme') || 'caishen';
    document.getElementById('theme-name').textContent = currentTheme === 'caishen' ? '财神' : '生肖';
    
    renderCalendar();
    updateInfo();
    loadImages();
    startImageCarousel();
    
    setInterval(updateShichen, 60000);
}

function updateInfo() {
    updateShichen();
    
    const huangli = getHuangli(selectedYear, selectedMonth, selectedDay);
    document.getElementById('huangli-yi').textContent = huangli.yi;
    document.getElementById('huangli-ji').textContent = huangli.ji;
    document.getElementById('festival').textContent = huangli.festival;
    
    const recordDays = getMonthRecordDays(selectedYear, selectedMonth);
    if (recordDays.length > 0) {
        document.getElementById('record-indicator').textContent = `有记录：${recordDays.join('、')}日`;
    } else {
        document.getElementById('record-indicator').textContent = '无记录';
    }
}

function updateShichen() {
    document.getElementById('shichen-info').textContent = getCurrentShichenInfo();
}

function loadImages() {
    const dayOfMonth = new Date().getDate();
    imageList = [];
    
    if (currentTheme === 'caishen') {
        for (let i = 1; i <= 12; i++) {
            imageList.push(`images/caishen/CS${i}.jpg`);
        }
    } else {
        for (let i = 1; i <= 12; i++) {
            imageList.push(`images/生肖/${i}.jpg`);
        }
    }
    
    // 将shouyin图片放到数组末尾
    const shouyinImage = `images/shouyin/shouyin_${dayOfMonth}.jpg`;
    imageList.push(shouyinImage);
    
    // 从主题图片开始轮播，而不是从shouyin开始
    currentImageIndex = 0;
    
    updateCurrentImage();
}

function updateCurrentImage() {
    if (imageList.length > 0) {
        const img = document.getElementById('current-image');
        img.src = imageList[currentImageIndex];
        img.onerror = function() {
            img.src = '';
        };
        document.getElementById('image-indicator').textContent = `${currentImageIndex + 1}/${imageList.length}`;
    } else {
        document.getElementById('current-image').src = '';
        document.getElementById('image-indicator').textContent = '无节日图片';
    }
}

function updateImages() {
    loadImages();
}

let carouselInterval;

function startImageCarousel() {
    stopCarousel();
    carouselInterval = setInterval(() => {
        if (isPlaying && imageList.length > 0) {
            currentImageIndex = (currentImageIndex + 1) % imageList.length;
            updateCurrentImage();
        }
    }, 3000);
}

function stopCarousel() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
}

function showThemeDialog() {
    document.getElementById('theme-dialog').style.display = 'flex';
}

function closeThemeDialog() {
    document.getElementById('theme-dialog').style.display = 'none';
}

function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('calendar_theme', theme);
    document.getElementById('theme-name').textContent = theme === 'caishen' ? '财神' : '生肖';
    closeThemeDialog();
    loadImages();
}

function showRecordDialog(day) {
    selectedRecordDay = day;
    document.getElementById('record-content').value = '';
    document.getElementById('record-dialog-title').textContent = `为 ${selectedYear}年${selectedMonth}月${day}日 添加记录`;
    document.getElementById('record-dialog').style.display = 'flex';
}

function closeRecordDialog() {
    document.getElementById('record-dialog').style.display = 'none';
    selectedRecordDay = null;
}

function saveRecord() {
    const content = document.getElementById('record-content').value.trim();
    if (content && selectedRecordDay) {
        const date = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedRecordDay).padStart(2, '0')}`;
        saveRecordToStorage(date, content);
        closeRecordDialog();
        renderCalendar();
        updateInfo();
    }
}

function showViewRecordsDialog() {
    const records = getDateRecords(selectedYear, selectedMonth, selectedDay);
    const list = document.getElementById('records-list');
    
    if (records.length === 0) {
        list.innerHTML = '<div class="empty-records">暂无记录</div>';
    } else {
        let html = '';
        records.forEach(record => {
            const date = new Date(record.timestamp);
            const timeStr = date.toLocaleString('zh-CN');
            html += `
                <div class="record-item">
                    <div class="record-content">${record.content}</div>
                    <div class="record-time">${timeStr}</div>
                </div>
            `;
        });
        list.innerHTML = html;
    }
    
    document.getElementById('view-records-title').textContent = `${selectedYear}年${selectedMonth}月${selectedDay}日 的记录`;
    document.getElementById('view-records-dialog').style.display = 'flex';
}

function closeViewRecordsDialog() {
    document.getElementById('view-records-dialog').style.display = 'none';
    isEditMode = false;
    document.getElementById('record-content').value = '';
}

function deleteRecords() {
    deleteDateRecords(selectedYear, selectedMonth, selectedDay);
    closeViewRecordsDialog();
    renderCalendar();
    updateInfo();
}

function editRecords() {
    const records = getDateRecords(selectedYear, selectedMonth, selectedDay);
    if (records.length > 0) {
        const content = records.map(r => r.content).join('\n');
        closeViewRecordsDialog();
        
        selectedRecordDay = selectedDay;
        document.getElementById('record-content').value = content;
        document.getElementById('record-dialog-title').textContent = `修改 ${selectedYear}年${selectedMonth}月${selectedDay}日 的记录`;
        document.getElementById('record-dialog').style.display = 'flex';
        
        deleteDateRecords(selectedYear, selectedMonth, selectedDay);
    }
}

document.addEventListener('DOMContentLoaded', initApp);
