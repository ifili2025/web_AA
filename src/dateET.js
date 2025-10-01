//function tellDateET (){
exports.tellDateET = function(){
    let timeNow = new Date();
    const monthNamesET =['Jaanuar','Veebruar','Märts','Aprill','Mai','Juuni','Juuli','August','September','Oktoober','November','Detsember'];
    return 'Täna on ' + timeNow.getDate() + '.' + monthNamesET[timeNow.getMonth()] + '.' + timeNow.getFullYear();
}

