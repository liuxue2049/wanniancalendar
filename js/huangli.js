function getCurrentShichenInfo() {
    const shichenList = [
        { name: '子时', time: '23:00-01:00', jingluo: '胆经', yixing: '安睡养阳' },
        { name: '丑时', time: '01:00-03:00', jingluo: '肝经', yixing: '熟睡养肝' },
        { name: '寅时', time: '03:00-05:00', jingluo: '肺经', yixing: '调息叩齿' },
        { name: '卯时', time: '05:00-07:00', jingluo: '大肠经', yixing: '晨起诵经' },
        { name: '辰时', time: '07:00-09:00', jingluo: '胃经', yixing: '进食养胃' },
        { name: '巳时', time: '09:00-11:00', jingluo: '脾经', yixing: '活动学习' },
        { name: '午时', time: '11:00-13:00', jingluo: '心经', yixing: '小憩养心' },
        { name: '未时', time: '13:00-15:00', jingluo: '小肠经', yixing: '消化轻动' },
        { name: '申时', time: '15:00-17:00', jingluo: '膀胱经', yixing: '饮水工作' },
        { name: '酉时', time: '17:00-19:00', jingluo: '肾经', yixing: '休息养肾' },
        { name: '戌时', time: '19:00-21:00', jingluo: '心包经', yixing: '放松晚课' },
        { name: '亥时', time: '21:00-23:00', jingluo: '三焦经', yixing: '泡脚入睡' }
    ];
    
    const currentHour = new Date().getHours();
    const index = (currentHour + 1) % 12;
    const shichen = shichenList[index];
    return `${shichen.name} ${shichen.jingluo} ${shichen.yixing}`;
}

function getHuangli(year, month, day) {
    const jiYiList = [
        [[1, 1], ['宜祭祀', '忌动土']],
        [[1, 2], ['宜沐浴', '忌出行']],
        [[1, 5], ['宜破屋', '忌嫁娶']],
        [[1, 7], ['宜入宅', '忌安葬']],
        [[1, 9], ['宜祈福', '忌开市']],
        [[1, 15], ['宜赏灯', '忌动土']],
        [[2, 2], ['宜祭祀', '忌搬家']],
        [[2, 14], ['宜约会', '忌修造']],
        [[3, 8], ['宜嫁娶', '忌搬家']],
        [[4, 1], ['宜玩乐', '忌动土']],
        [[4, 4], ['宜祭祀', '忌开业']],
        [[4, 5], ['宜踏青', '忌搬家']],
        [[5, 1], ['宜劳动', '忌搬家']],
        [[5, 5], ['宜赛龙舟', '忌搬家']],
        [[6, 1], ['宜儿童节', '忌动土']],
        [[7, 7], ['宜乞巧', '忌嫁娶']],
        [[7, 15], ['宜祭祀', '忌开业']],
        [[8, 15], ['宜赏月', '忌动土']],
        [[9, 9], ['宜登高', '忌搬家']],
        [[10, 1], ['宜国庆', '忌动土']],
        [[10, 15], ['宜祭祀', '忌开市']],
        [[12, 8], ['宜祭祀', '忌搬家']],
        [[12, 23], ['宜祭祀', '忌开业']],
        [[12, 30], ['宜除夕', '忌动土']]
    ];
    
    const lunarDate = getLunarDateInfo(year, month, day);
    const lunarDay = lunarDate[2];
    
    const defaultJiYi = {
        1: ['宜祭祀', '忌动土'],
        2: ['宜沐浴', '忌搬家'],
        3: ['宜出行', '忌开业'],
        5: ['宜破屋', '忌嫁娶'],
        6: ['宜求医', '忌搬家'],
        7: ['宜嫁娶', '忌动土'],
        8: ['宜开市', '忌搬家'],
        9: ['宜祈福', '忌开业'],
        10: ['宜祭祀', '忌动土'],
        14: ['宜祭祀', '忌开业'],
        15: ['宜赏月', '忌动土'],
        16: ['宜返探', '忌开业'],
        20: ['宜安床', '忌搬家'],
        23: ['宜祭祀', '忌开业'],
        24: ['宜祭祀', '忌动土'],
        25: ['宜开业', '忌搬家'],
        26: ['宜祈福', '忌动土'],
        27: ['宜祭祀', '忌开业'],
        29: ['宜祭祀', '忌动土'],
        30: ['宜祭祀', '忌动土']
    };
    
    const found = jiYiList.find(item => item[0][0] === month && item[0][1] === day);
    let result;
    if (found) {
        result = found[1];
    } else {
        result = defaultJiYi[lunarDay] || ['宜嫁娶', '忌动土'];
    }
    
    const festival = getFestivals(month, day);
    
    return {
        yi: result[0],
        ji: result[1],
        festival: festival
    };
}

function getFestivals(month, day) {
    const festivals = {
        '1-1': '元旦',
        '2-14': '情人节',
        '3-8': '妇女节',
        '3-12': '植树节',
        '4-1': '愚人节',
        '4-5': '清明节',
        '5-1': '劳动节',
        '5-4': '青年节',
        '5-5': '端午节',
        '6-1': '儿童节',
        '6-18': '父亲节',
        '7-1': '建党节',
        '7-7': '七夕节',
        '8-1': '建军节',
        '8-15': '中秋节',
        '9-10': '教师节',
        '9-9': '重阳节',
        '10-1': '国庆节',
        '10-25': '重阳节',
        '12-24': '平安夜',
        '12-25': '圣诞节'
    };
    
    return festivals[`${month}-${day}`] || '';
}

function getLunarDateInfo(year, month, day) {
    const lunarInfo = [
        0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
        0x06566, 0x0d4a0, 0x0ea50, 0x16a95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0,
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
        0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0
    ];
    
    const yearOffset = year - 1900;
    if (yearOffset < 0 || yearOffset >= lunarInfo.length) {
        return [year, month, day];
    }
    
    let totalDays = 0;
    for (let i = 0; i < yearOffset; i++) {
        totalDays += (lunarInfo[i] & 0x0f) === 12 ? 30 : (lunarInfo[i] & 0x0f);
    }
    
    const monthInfo = lunarInfo[yearOffset];
    const isLeap = (monthInfo >> 13) === 1;
    const leapMonth = isLeap ? (monthInfo & 0x0f) : 0;
    
    let monthDays = 0;
    for (let m = 1; m <= 12; m++) {
        monthDays = (monthInfo >> (m - 1) & 1) === 1 ? 30 : 29;
        if (m === leapMonth) {
            totalDays += monthDays;
        }
        if (m < month) {
            totalDays += monthDays;
        } else if (m === month) {
            totalDays += day;
            break;
        }
    }
    
    let lunarYear = year;
    let lunarMonth = 1;
    let lunarDay = 1;
    
    const targetMonthInfo = lunarInfo[yearOffset];
    const targetIsLeap = (targetMonthInfo >> 13) === 1;
    const targetLeapMonth = targetIsLeap ? (targetMonthInfo & 0x0f) : 0;
    
    let dayCount = totalDays;
    for (let m = 1; m <= 12; m++) {
        const mDays = (targetMonthInfo >> (m - 1) & 1) === 1 ? 30 : 29;
        if (dayCount > mDays) {
            dayCount -= mDays;
        } else {
            lunarMonth = m;
            lunarDay = dayCount;
            break;
        }
    }
    
    return [lunarYear, lunarMonth, lunarDay];
}

function getLunarDate(year, month, day) {
    const lunarDateInfo = getLunarDateInfo(year, month, day);
    const lunarMonthNames = ['', '正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
    const lunarDayNames = ['', '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
        '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
        '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
    
    return `${lunarMonthNames[lunarDateInfo[1]]}${lunarDayNames[lunarDateInfo[2]]}`;
}