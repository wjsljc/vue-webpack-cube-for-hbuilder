import { AD_FLAG, LOGIN_FLAG } from 'assets/js/storageConst'
/*
 * 制作存储定时localstorage方法
 * */
export const MyLocalStorage = {
  Cache: {
    /**
     * 总容量5M
     * 存入缓存，支持字符串类型、json对象的存储
     * 页面关闭后依然有效 ie7+都有效
     * @param key 缓存key
     * @param stringVal
     * @time 数字 缓存有效时间（秒） 默认60s
     * 注：localStorage 方法存储的数据没有时间限制。第二天、第二周或下一年之后，数据依然可用。不能控制缓存时间，故此扩展
     * */
    set: function (key, stringVal, time) {
      try {
        if (!localStorage) {
          return false;
        }
        if (!time || isNaN(time)) {
          time = 60;
        }
        let cacheExpireDate = (new Date() - 1) + time * 1000;
        let cacheVal = {
          val: stringVal,
          exp: cacheExpireDate
        };
        localStorage.setItem(key, JSON.stringify(cacheVal)); //存入缓存值
        //console.log(key+":存入缓存，"+new Date(cacheExpireDate)+"到期");
      } catch (e) {
      }
    },
    /**获取缓存*/
    get: function (key) {
      try {
        if (!localStorage) {
          return false;
        }
        let cacheVal = localStorage.getItem(key);
        let result = JSON.parse(cacheVal);
        let now = new Date() - 1;
        if (!result) {
          return null;
        } //缓存不存在
        if (now > result.exp) { //缓存过期
          this.remove(key);
          return null;
        }
        //console.log("get cache:"+key);
        return result.val;
      } catch (e) {
        this.remove(key);
        return null;
      }
    },
    /**移除缓存，一般情况不手动调用，缓存过期自动调用*/
    remove: function (key) {
      if (!localStorage) {
        return false;
      }
      localStorage.removeItem(key);
    },
    /**清空所有缓存*/
    clear: function () {
      if (!localStorage) {
        return false;
      }
      localStorage.clear();
    }
  } //end Cache
}

/*
* 检查是否执行广告
* */
export function checkADFlag () {
  console.log("执行checkADFlag")
  let AD_flag = MyLocalStorage.Cache.get(AD_FLAG)
  if (!AD_flag) {
    console.log('进入广告')
    MyLocalStorage.Cache.set(AD_FLAG, true, 30)
    return true
  } else {
    return false
  }
}

/*
* 检查是否登陆
* */
export function checkLoginFlag () {
  console.log("执行checkLoginFlag")
  let login_flag = MyLocalStorage.Cache.get(LOGIN_FLAG)
  console.log('login_flag ' + JSON.stringify(login_flag))
  if (!login_flag) {
    console.log('进入登陆')
    return true
  } else {
    return false
  }
}

/*
* 去除inputBlur
* */
export function inputBlur () {
  let inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].blur();
  }
}

let elementStyle = document.createElement('div').style // 能力检测
let vendor = (() => { // 供应商
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false // 如果都没有，那么这个浏览器是有问题的
})()

/*
 * 根据供应商添加前缀
 * */
export function prefixStyle (style) {
  if (vendor === false) {
    return false
  }
  
  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1) // 首字母大写如 webkitTransform
}

/*
 * 数组去重方法
 * @param {{Array}} arr 需要去重的数组
 * */
export function uniqueArr (arr) {
  let res = [];
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      res.push(arr[i]);
      obj[arr[i]] = 1;
    }
  }
  return res;
}


/**
 * 5+ event(5+没提供我自己实现)
 * @param {type} webview
 * @param {type} eventType
 * @param {type} data
 * @returns {undefined}
 */
export function fire (webview, eventType, data) {
  if (webview) {
    if (typeof data === 'undefined') {
      data = '';
    } else if (typeof data === 'boolean' || typeof data === 'number') {
      webview.evalJS("receive('" + eventType + "'," + data + ")");
      return;
    } else {
      data = JSON.stringify(data || {}).replace(/\'/g, "\\u0027").replace(/\\/g, "\\u005c");
    }
    webview.evalJS("receive('" + eventType + "','" + data + "')");
  }
}

/**
 * 5+ event(5+没提供我自己实现)
 * @param {type} eventType
 * @param {type} data
 * @returns {undefined}
 */
window.receive = receive

export function receive (eventType, data) {
  console.log(22222222222)
  if (eventType) {
    try {
      if (data && typeof data === 'string') {
        data = JSON.parse(data);
      }
    } catch (e) {
    }
    trigger(document, eventType, data);
  }
}

export function trigger (element, eventType, eventData) {
  console.log(3333)
  element.dispatchEvent(new CustomEvent(eventType, {
    detail: eventData,
    bubbles: true,
    cancelable: true
  }))
  return this
}

/**
 * 跳转首页并关闭指定webviewId函数
 * PS：依赖constConfig.js、mui.js
 * @param {Array} webviewIds 不需要关闭的webviewIds
 * @param {Boolean} signFlag 为true第一个参数为需要关闭的页面
 * PS：如果关闭的页面只有2个，为了平滑关闭，将当前发起关闭请求的页面写在关闭数组的第一个
 */
export function jumpAndDealWebviewByIds (webviewIdsArr, signFlag) {
  let sign = signFlag || false // 是否首参是仅需要关闭页面id的标识（默认不是即首参是不需要关闭的ids）
  let closeWebviewIds = [] // 储存需要关闭的webviewId
  let webviewIds = webviewIdsArr || [] // 需要操作的webview
  let goId = plus.webview.getLaunchWebview().id // 跳转页面id
  let closeAnimate = '' // 关闭动画
  let closeTime = null // 关闭时间
  let allWebview = plus.webview.all() // 获取所有打开的webview
  let allWebviewIds = [] // 所有webviewIds数组
  if (!sign) {
    webviewIds.push(goId) // 将首页id添加进去
    if (plus.os.name === 'iOS') {
      closeAnimate = "auto"
      closeTime = 150
    } else {
      closeAnimate = "none"
      closeTime = 0
    }
    for (let i = 0, len1 = allWebview.length; i < len1; i++) {
      allWebviewIds.push(allWebview[i].id)
      let isEqual = false // 是否相等标识符
      for (let j = 0, len2 = webviewIds.length; j < len2; j++) {
        if (allWebviewIds[i] === webviewIds[j]) {
          isEqual = true // 有相等标识
          break
        }
      }
      if (!isEqual) {
        closeWebviewIds.push(allWebviewIds[i])
      }
    }
  } else { // 首参为需要关闭的页面id
    closeWebviewIds = webviewIds
  }
  for (let i = 0, len = closeWebviewIds.length; i < len; i++) {
    (function (i) {
      if (len <= 2) {
        console.log("i 进来")
        if (len = 2) {
          plus.webview.close(closeWebviewIds[len - 2], 'none', 300)
        }
        plus.webview.close(closeWebviewIds[len - 1], 'pop-out', 300)
      } else {
        if (i === len - 2) {
          plus.webview.close(closeWebviewIds[len - 2], 'pop-out', 300)
          plus.webview.close(closeWebviewIds[len - 1], 'pop-out', 300)
        } else {
          plus.webview.close(closeWebviewIds[i], 'none', 0)
        }
      }
    })(i)
  }
}

/*
   * 检查原生view点击范围函数
   * @param {Object} e 点击位置信息
   * @param {Object} position draw的位置信息
   * position{
   *   top:,
   *   left:,
   *   width:,
   *   height:
   * }
   * @param {Object} extend 按钮扩展点击距离
   * extend{
   *   top:,
   *   bottom:,
   *   left:,
   *   right:
   * }
   * */
export function checkClickRang (e, position, extend) {
  let _extend = extend || {
    left: 2,
    right: 2,
    top: 2,
    bottom: 2
  };
  let rangeWidthX1 = changeUnitToPx(position.left) + _extend.left;
  let rangeWidthX2 = rangeWidthX1 + changeUnitToPx(position.width) + _extend.right;
  let rangeHeightY1 = changeUnitToPx(position.top) + _extend.top;
  let rangeHeightY2 = rangeHeightY1 * 2 + changeUnitToPx(position.height) + _extend.bottom;
  if (e.pageX > rangeWidthX1 && e.pageX < rangeWidthX2 && e.pageY > rangeHeightY1 && e.pageY < rangeHeightY2) { // 判断范围是否合法
    return true;
  } else {
    return false;
  }
}

/*
 * 获取转换为px的宽度
 * */
export function changeUnitToPx (str) {
  let res = null
  if (str.indexOf("px") !== -1) { // 是px
    res = Number(str.slice(0, str.length - 2))
    return res
  }
  if (str.indexOf("%") !== -1) { // 是百分比
    res = Number(str.slice(0, str.length - 1) / 100 * document.body.clientWidth)
    return res
  }
  if (Number(str)) { // 无单位
    return str
  }
}
