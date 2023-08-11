// 屏幕缩放
export function screenSize(editorDom,isSmall) {
  let screenWidth = document.body.clientWidth || document.documentElement.clientWidth;
  let screenHeight = document.body.clientHeight || document.documentElement.clientHeight;
  let defWidth = 1920;
  let defHeight = 1080;
  let xScale = screenWidth / defWidth;
  let yScale = screenHeight / defHeight;
  if(isSmall){
    xScale = xScale -0.1
    yScale = yScale -0.1
  }
  editorDom.style.cssText += ';transform: scale(' + xScale + ',' + yScale + ')';

  $(window).resize(() => {
    let screenWidth = document.body.clientWidth || document.documentElement.clientWidth;
    let screenHeight = document.body.clientHeight || document.documentElement.clientHeight;
    xScale = screenWidth / defWidth;
    yScale = screenHeight / defHeight;
    editorDom.style.cssText += ';transform: scale(' + xScale + ',' + yScale + ')';
  })
}
// 金额单位
export function moneyUnit(num){
    var moneyUnits = ["元", "万元", "亿元", "万亿"]
    var dividend = 10000;
    var currentNum = num;
    //转换数字
    var currentUnit = moneyUnits[0];
    //转换单位
    for (var i = 0; i <4; i++) {
      currentUnit = moneyUnits[i]
      if(strNumSize(currentNum)<5){
        break;
      }
      currentNum = currentNum / dividend
    }
  currentNum = Number(currentNum)
    var m = {money: 0, unit: ""}
    m.money = currentNum.toFixed(2)
    m.unit = currentUnit;
    return m;
}

function strNumSize(tempNum){
  if(tempNum){
    var stringNum = tempNum.toString()
    var index = stringNum.indexOf(".")
    var newNum = stringNum;
    if(index!=-1){
      newNum = stringNum.substring(0,index)
    }

    return newNum.length
  }
  return 0

}
/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  var el = document.documentElement;
// 兼容各个浏览器请求全屏方法
  ( el.requestFullscreen
    || el.webkitRequestFullScreen
    || el.mozRequestFullScreen
    || el.msRequestFullscreen).call(el);
}
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  ( document.exitFullscreen
    || document.msExitFullscreen
    || document.mozCancelFullScreen
    || document.webkitExitFullscreen).call(document);
}
