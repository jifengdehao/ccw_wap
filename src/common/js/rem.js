/*
 * @Author: WuFengliang 
 * @Date: 2017-12-26 09:13:33 
 * DeveloperMailbox:   wufengliang@ccw163.com 
 * FunctionPoint:  全局响应式布局
 */
;(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth
      if (!clientWidth) return
      docEl.style.fontSize = 20 * (clientWidth / 375) + 'px'
    }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
