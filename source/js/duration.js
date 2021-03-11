!(function() {
  function update() {
    var now = new Date();
    var grt = new Date("2020-09-09 00:00:00");  /** 此处是计时的起始时间 **/
    now.setTime(now.getTime()+250);
    days = (now - grt ) / 1000 / 60 / 60 / 24;
    dnum = Math.floor(days);
    document.getElementById("timeDate").innerHTML = "本站安全运行&nbsp"+dnum+"&nbsp天";
    
  }
  setInterval(update, 1000);
})();