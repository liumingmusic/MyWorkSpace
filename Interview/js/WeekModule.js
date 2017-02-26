var WeekModule = (function (window) {

    /**
     * 根据某年某月得到这个月的天数
     * @param year 某年
     * @param month 某月
     * @returns {number} 天数
     * @private
     */
    var _getDaysByMonth = function (year, month) {
        var months = parseInt(month, 10);
        var days = new Date(year, months, 0);
        return days.getDate();
    };

    /**
     * 根据某年某月得到这个月的第一天为周一是哪天
     * @param year 某年
     * @param month 某月
     * @returns {number} 周一是哪天
     * @private
     */
    var _getMonthFirst = function (year, month) {
        var date = new Date();
        //某年某月第一天
        date.setFullYear(year, month - 1, 1);
        //让某年某月的第一天为周一
        while (date.getDay() !== 1) {
            date.setDate(date.getDate() + 1);
        }
        return date.getDate();
    };

    /**
     * 根据某年某月得到这个月的周数
     * @param year 某年
     * @param month 某月
     * @returns {number} 这个月有几周
     * @private
     */
    var _getWeeksByMonth = function (year, month) {
        var days = _getDaysByMonth(year, month);
        var firstMonday = _getMonthFirst(year, month);
        //这个月还需要减去上个月周数的几天
        return Math.ceil((days - firstMonday) / 7);
    };

    /**
     * 根据某年某月某周 获取这一周的所有日期
     * @param year 某年
     * @param month 某月
     * @param week 某周
     * @returns {Array} 一周天数
     * @private
     */
    var _getDaysByWeek = function (year, month, week) {
        var result = [];
        var weekDay = 7;
        //某年某月多少周
        var weeks = _getWeeksByMonth(year, month);
        //某年某月是周一的的是哪天
        var firstMonday = _getMonthFirst(year, month);
        //判断输入的周数不满足
        if (weeks < week) {
            return;
        }
        //当前年月周的星期一
        var monday = firstMonday + weekDay * (week - 1);
        //当前年月周date对象
        var currentMonday = new Date(year, month, monday);
        //循环组装数据
        for (var i = 1; i < weekDay + 1; i++) {
            //写成i-1是为了调用addDay进行数据格式化处理
            result.push(_addDay(currentMonday, i - 1));
        }
        return result;
    };

    /**
     * 根据当前的日期添加天数
     * @param currentDate  当前日期
     * @param days 加几天
     * @returns {string} 日期
     * @private
     */
    var _addDay = function (currentDate, days) {
        var date = new Date(currentDate);
        date.setDate(date.getDate() + days);
        //不需要加一，因为传过来的已经加了
        var month = date.getMonth();
        var day = date.getDate();
        //格式化处理
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        return date.getFullYear() + "-" + month + "-" + day;
    };

    return {
        getDaysByWeek: _getDaysByWeek
    }

}(window));