const tellDateET = function(){
    let timeNow = new Date();
    const monthNamesET =['Jaanuar','Veebruar','Märts','Aprill','Mai','Juuni','Juuli','August','September','Oktoober','November','Detsember'];
    return timeNow.getDate() + '.' + monthNamesET[timeNow.getMonth()] + '.' + timeNow.getFullYear();
}

const tellWeekDayET = function(){
	let timeNow = new Date();
	const weekdayNamesEt = ["pühapäev", "esmaspäev", "teisipäv", "kolmapäev", "neljapäev", "reede", "laupäev"];
	return weekdayNamesEt[timeNow.getDay()];
}

const tellTimeET = function (){
    let timeNow = new Date();
    return timeNow.getHours() + ':' + timeNow.getMinutes() + ':' + timeNow.getSeconds();
}

module.exports = {longDate: tellDateET, weekDay: tellWeekDayET, time: tellTimeET
};

