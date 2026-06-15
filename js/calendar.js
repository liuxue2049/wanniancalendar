let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1;
let currentDay = new Date().getDate();
let selectedYear = currentYear;
let selectedMonth = currentMonth;
let selectedDay = currentDay;

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function getFirstDayOfWeek(year, month) {
    return new Date(year, month - 1, 1).getDay();
}

function getShouyinImagePath(day) {
    return `images/shouyin/shouyin_${day}.jpg`;
}

function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    const title = document.getElementById('month-title');
    
    title.textContent = `${selectedYear}年${selectedMonth}月`;
    
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDay = getFirstDayOfWeek(selectedYear, selectedMonth);
    
    let html = '';
    
    // 添加背景图片
    const shouyinPath = getShouyinImagePath(currentDay);
    html += `<img class="calendar-bg" src="${shouyinPath}" alt="" onerror="this.style.display='none'">`;
    html += '<div class="calendar-content">';
    
    for (let i = 0; i < firstDay; i++) {
        html += '<div class="day-cell empty"></div>';
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        let classes = 'day-cell';
        if (day === currentDay && selectedMonth === currentMonth && selectedYear === currentYear) {
            classes += ' today';
        }
        if (day === selectedDay) {
            classes += ' selected';
        }
        if (hasRecord(selectedYear, selectedMonth, day)) {
            classes += ' has-record';
        }
        
        html += `<div class="${classes}" onclick="selectDay(${day})" oncontextmenu="showRecordDialog(${day}); return false;">${day}</div>`;
    }
    
    html += '</div>';
    grid.innerHTML = html;
}

function selectDay(day) {
    selectedDay = day;
    renderCalendar();
    updateInfo();
    
    if (hasRecord(selectedYear, selectedMonth, selectedDay)) {
        showViewRecordsDialog();
    }
}

function prevMonth() {
    if (selectedMonth === 1) {
        selectedYear--;
        selectedMonth = 12;
    } else {
        selectedMonth--;
    }
    if (selectedDay > getDaysInMonth(selectedYear, selectedMonth)) {
        selectedDay = getDaysInMonth(selectedYear, selectedMonth);
    }
    renderCalendar();
    updateInfo();
    updateImages();
}

function nextMonth() {
    if (selectedMonth === 12) {
        selectedYear++;
        selectedMonth = 1;
    } else {
        selectedMonth++;
    }
    if (selectedDay > getDaysInMonth(selectedYear, selectedMonth)) {
        selectedDay = getDaysInMonth(selectedYear, selectedMonth);
    }
    renderCalendar();
    updateInfo();
    updateImages();
}

function hasRecord(year, month, day) {
    const records = getRecords();
    const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return records.some(r => r.date === dateKey);
}

function getMonthRecordDays(year, month) {
    const records = getRecords();
    const monthPrefix = `${year}-${String(month).padStart(2, '0')}-`;
    const days = records
        .filter(r => r.date.startsWith(monthPrefix))
        .map(r => parseInt(r.date.substring(8, 10)))
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort((a, b) => a - b);
    return days;
}

function getRecords() {
    const data = localStorage.getItem('date_records');
    return data ? JSON.parse(data) : [];
}

function saveRecordToStorage(date, content) {
    const records = getRecords();
    const newRecord = {
        id: `record_${Date.now()}`,
        date: date,
        content: content,
        timestamp: Date.now()
    };
    records.push(newRecord);
    localStorage.setItem('date_records', JSON.stringify(records));
}

function getDateRecords(year, month, day) {
    const records = getRecords();
    const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return records.filter(r => r.date === dateKey);
}

function deleteDateRecords(year, month, day) {
    const records = getRecords();
    const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const filtered = records.filter(r => r.date !== dateKey);
    localStorage.setItem('date_records', JSON.stringify(filtered));
}
