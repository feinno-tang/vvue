/**
 *
 * 工具方法
 */

export const String = {
    'stringFormat': function() {
        if (arguments.length == 0)
            return null;
        var value = arguments[0];
        for (var i = 1, count = arguments.length; i < count; i++) {
            var pattern = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            value = value.replace(pattern, arguments[i]);
        }
        return value;
    },

    'trim': function(source) {
        return source.replace(/^\s+|\s+$/gi, '');
    },

    'getByteLength': function(source) {
        return String(source).replace(/[^\x00-\xff]/g, "ci").length;
    },

    'subByte': function(source, length, tail) {
        source = String(source);
        tail = tail || '';
        if (length < 0 || this.getByteLength(source) <= length) {
            return source;
        }
        source = source.substr(0, length).replace(/([^\x00-\xff])/g, "\x241 ")
            .substr(0, length)
            .replace(/[^\x00-\xff]$/, "")
            .replace(/([^\x00-\xff]) /g, "\x241");
        return source + tail;
    },

    'xssFilter': function(source){
        source = source.replace(/</gi, '').replace(/>/gi, '').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
        return source;
    },

    'stringToArray':function(){
        
    }

};
export const DateTime = {
    'showtime': function(source) {
        var month = source.getMonth() + 1
        return source.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (source.getDate() < 10 ? '0' + source.getDate() : source.getDate());
    },

    'fulltime': function(source){
        var hours = source.getHours(),minutes = source.getMinutes(),seconds = source.getSeconds();
        return this.showtime(source) + ' '
            + (hours < 10 ? '0' + hours : hours)
            + ':' + (minutes < 10 ? '0' + minutes : minutes)
            + ':' + (seconds < 10 ? '0' + seconds : seconds);
    },

    'countdownTime':function(timestamp,useUnit){
        var day = 24 * 60 * 60 * 1000,
            hour = 60 * 60 * 1000,
            minutes = 60 * 1000,
            timeFormat;
        if ((timeFormat = parseInt(timestamp / day)) >= 1) {
            timeFormat += useUnit? i18nTranslate('Store_Days'):'';
        } else if ((timeFormat = parseInt(timestamp / hour)) >= 1) {
            timeFormat += useUnit ?i18nTranslate('Store_Hours'):"";
        } else if ((timeFormat = parseInt(timestamp / minutes)) >= 1) {
            timeFormat += useUnit ?i18nTranslate('Store_Minutes'):"";
        } else {
            timeFormat = timestamp<=0 ? 0:parseInt(timestamp/ 1000) +i18nTranslate('Store_Seconds');
        }
        return timeFormat;
    },
    'getDHMS':function(time,lg){
        var t = time/1000;
        var danwei = {
            'en':{
                d:'day',
                h:'hour',
                m:'minute',
                s:'second'
            },
            'ar':{
                d:'اليوم',
                h:'ساعة',
                m:'دقيقة',
                s:'ثانية'
            },
            'tr':{
                d:'gün',
                h:'saat',
                m:'dakika',
                s:'ikinci'
            }
        }
        var str = '',
            d = 0,
            h = 0 ,
            m = 0 ,
            s = 0;
        s = parseInt(t%60);
        m = parseInt(t/60)%60;
        h = parseInt(t/60/60)%24;
        d = parseInt(t/60/60/24);
        str += d? d+danwei[lg]['d']+'&nbsp':'';
        str += h? h+danwei[lg]['h']+'&nbsp':'';
        str += m? m+danwei[lg]['m']+'&nbsp':'';
        str += s? s+danwei[lg]['s']:'';
        return str;
    },
};

export const Image = {

}
