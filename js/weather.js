/* ============================================================
 * 天气模块：Open-Meteo（无需 API Key）
 *  - 地理编码：geocoding-api.open-meteo.com
 *  - 天气：api.open-meteo.com（当前 + 未来 7 天）
 *  - 穿搭推荐、携带物品推荐（基于天气 + 目的地类型 + 时长 + 方式）
 * ============================================================ */
(function (global) {
  'use strict';

  var GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
  var FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

  /** WMO 天气代码 → 中文描述 + 图标 */
  var WMO = {
    0: { desc: '晴', icon: '☀️' },
    1: { desc: '大部晴朗', icon: '🌤️' },
    2: { desc: '多云', icon: '⛅' },
    3: { desc: '阴', icon: '☁️' },
    45: { desc: '雾', icon: '🌫️' },
    48: { desc: '雾凇', icon: '🌫️' },
    51: { desc: '毛毛雨', icon: '🌦️' },
    53: { desc: '毛毛雨', icon: '🌦️' },
    55: { desc: '毛毛雨', icon: '🌧️' },
    56: { desc: '冻毛毛雨', icon: '🌧️' },
    57: { desc: '冻毛毛雨', icon: '🌧️' },
    61: { desc: '小雨', icon: '🌧️' },
    63: { desc: '中雨', icon: '🌧️' },
    65: { desc: '大雨', icon: '🌧️' },
    66: { desc: '冻雨', icon: '🌧️' },
    67: { desc: '冻雨', icon: '🌧️' },
    71: { desc: '小雪', icon: '🌨️' },
    73: { desc: '中雪', icon: '🌨️' },
    75: { desc: '大雪', icon: '❄️' },
    77: { desc: '米雪', icon: '🌨️' },
    80: { desc: '阵雨', icon: '🌦️' },
    81: { desc: '阵雨', icon: '🌧️' },
    82: { desc: '强阵雨', icon: '⛈️' },
    85: { desc: '阵雪', icon: '🌨️' },
    86: { desc: '强阵雪', icon: '❄️' },
    95: { desc: '雷阵雨', icon: '⛈️' },
    96: { desc: '雷阵雨伴冰雹', icon: '⛈️' },
    99: { desc: '雷阵雨伴冰雹', icon: '⛈️' }
  };

  function wmoInfo(code) {
    return WMO[code] || { desc: '未知', icon: '🌡️' };
  }

  /** Open-Meteo 地理编码 */
  async function geocodeCity(name) {
    var url = GEO_URL + '?name=' + encodeURIComponent(name) + '&count=5&language=zh&format=json';
    var res = await fetch(url);
    if (!res.ok) throw new Error('地理编码请求失败 (' + res.status + ')');
    var json = await res.json();
    var results = json.results || [];
    if (!results.length) throw new Error('未找到「' + name + '」的地理位置，请检查输入或换个写法（如“杭州”）。');
    var best = results[0];
    // 优先选择人口更多 / 更精确的中文名称结果
    for (var i = 0; i < results.length; i++) {
      if (results[i].country_code === 'CN' && (results[i].population || 0) > (best.population || 0)) {
        best = results[i];
      }
    }
    return {
      name: best.name || name,
      admin1: best.admin1 || '',
      country: best.country || '',
      lat: best.latitude,
      lng: best.longitude
    };
  }

  /**
   * 获取当前天气 + 预报。
   * @param {number} lat
   * @param {number} lng
   * @param {number} days 预报天数
   * @param {string} [startDate] 出发日期（YYYY-MM-DD），用于按行程返回预报
   */
  async function fetchWeather(lat, lng, days, startDate) {
    var params = new URLSearchParams({
      latitude: lat,
      longitude: lng,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max',
      timezone: 'auto'
    });
    if (startDate) {
      params.set('start_date', startDate);
      var end = new Date(startDate + 'T12:00:00');
      end.setDate(end.getDate() + (Math.max(days || 3, 1) - 1));
      var pad = function (n) { return (n < 10 ? '0' : '') + n; };
      params.set('end_date', end.getFullYear() + '-' + pad(end.getMonth() + 1) + '-' + pad(end.getDate()));
    } else {
      params.set('forecast_days', Math.min(Math.max(days || 3, 1), 7));
    }
    var url = FORECAST_URL + '?' + params.toString();
    var res = await fetch(url);
    if (!res.ok) throw new Error('天气请求失败 (' + res.status + ')');
    return await res.json();
  }

  function formatDate(iso) {
    var d = new Date(iso + 'T00:00:00');
    var week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][d.getDay()];
    return (d.getMonth() + 1) + '月' + d.getDate() + '日 ' + week;
  }

  /* ---------- 穿搭推荐规则 ---------- */
  function recommendClothing(weather, destType, tripDays) {
    var cur = weather.current || {};
    var code = cur.weather_code != null ? cur.weather_code : 0;
    var temp = cur.temperature_2m != null ? cur.temperature_2m : 20;
    var wind = cur.wind_speed_10m || 0;
    var info = wmoInfo(code);
    var rainy = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].indexOf(code) >= 0;
    var snowy = [71, 73, 75, 77, 85, 86].indexOf(code) >= 0;

    var upper, lower, accessory = [], tip = [];

    if (temp >= 28) {
      upper = '短袖 T 恤、轻薄衬衫、连衣裙';
      lower = '短裤、薄长裤、短裙';
      accessory.push('遮阳帽', '墨镜', '防晒冰袖');
    } else if (temp >= 20) {
      upper = '短袖 / 薄长袖、衬衫';
      lower = '薄长裤、半身裙';
      accessory.push('薄外套（早晚备用）');
    } else if (temp >= 12) {
      upper = '长袖 + 卫衣 / 针织开衫';
      lower = '长裤';
      accessory.push('薄夹克或风衣');
    } else if (temp >= 5) {
      upper = '毛衣 + 外套（风衣 / 夹克）';
      lower = '厚长裤';
      accessory.push('围巾（可选）');
    } else if (temp >= -5) {
      upper = '厚毛衣 / 加绒卫衣 + 羽绒服';
      lower = '加绒长裤、保暖裤';
      accessory.push('围巾', '手套', '帽子');
    } else {
      upper = '保暖内衣 + 厚羽绒服 / 冲锋衣';
      lower = '加绒保暖裤、雪地靴';
      accessory.push('围巾', '手套', '保暖帽', '耳罩');
    }

    if (rainy) { accessory.push('雨伞 / 防水外套', '防滑鞋'); tip.push('近期有降雨，鞋履注意防水防滑。'); }
    if (snowy) { accessory.push('防滑雪地靴', '厚袜子'); tip.push('有降雪，注意保暖与路面防滑。'); }
    if (wind >= 30) { accessory.push('防风外套'); tip.push('风力较大，注意防风。'); }

    // 目的地类型附加
    if (destType === 'beach' || destType === 'coastal') {
      if (temp >= 22) { accessory.push('泳衣泳裤', '沙滩拖鞋', '防晒衣'); tip.push('海滨城市，如计划下水请携带泳装与高倍防晒。'); }
      accessory.push('遮阳帽');
    }
    if (destType === 'mountain' || destType === 'oldtown') {
      accessory.push('舒适运动鞋 / 徒步鞋');
      if (temp < 15) tip.push('山区/高原早晚温差大，备一件保暖外套。');
    }
    if (destType === 'mountain' && code === 0 && temp > 10) tip.push('高原/山地紫外线强，注意防晒。');

    // 时长
    var change = Math.max(2, Math.min(tripDays + 1, 6));
    tip.push('按 ' + tripDays + ' 天行程建议携带 ' + change + ' 套换洗衣物（含睡衣）。');

    return {
      upper: upper, lower: lower,
      accessory: accessory.length ? accessory.join('、') : '—',
      tips: tip
    };
  }

  /* ---------- 携带物品推荐 ---------- */
  function recommendItems(opts) {
    // opts: { weather, destType, travelMode, playMode, tripDays }
    var weather = opts.weather || {};
    var cur = weather.current || {};
    var code = cur.weather_code != null ? cur.weather_code : 0;
    var temp = cur.temperature_2m != null ? cur.temperature_2m : 20;
    var rainy = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].indexOf(code) >= 0;
    var snowy = [71, 73, 75, 77, 85, 86].indexOf(code) >= 0;

    var cats = [
      { name: '🪪 证件与票务', items: ['身份证 / 护照', '手机及充电宝', '充电线 / 插头'] },
      { name: '🧴 洗漱与护理', items: ['牙刷 / 牙膏 / 毛巾', '洗面奶 / 护肤品', '防晒霜'] },
      { name: '💊 药品', items: ['常用药（感冒 / 肠胃 / 晕车）', '创可贴', '个人处方药'] },
      { name: '👕 衣物', items: ['换洗衣物 ' + (Math.max(2, opts.tripDays) + 1) + ' 套', '睡衣'] }
    ];

    // 天气相关
    if (rainy) cats[1].items.push('雨伞 / 雨衣');
    if (snowy || temp <= 5) cats[1].items.push('润唇膏', '护手霜', '暖宝宝');
    if (temp >= 25) cats[1].items.push('驱蚊液', '止痒膏');
    if (temp >= 28 || opts.destType === 'beach') cats[1].items.push('遮阳伞');

    // 出行方式相关
    var travelCats = {
      '自驾': ['驾驶证 / 行驶证', '车载手机支架', '车载充电器'],
      '打车': ['打车软件（提前绑定支付）'],
      '火车': ['车票 / 12306 电子票', '颈枕', '零食饮水'],
      '高铁': ['车票 / 12306 电子票', '颈枕'],
      '飞机': ['机票 / 登机牌', '护照（国际）', '耳塞眼罩', '限100ml液体分装'],
      '邮轮': ['护照 / 船票', '晕船药', '正装（晚宴）'],
      '大巴': ['车票', '晕车药', '垃圾袋']
    };
    var tItems = travelCats[opts.travelMode];
    if (tItems) cats.push({ name: '🚗 出行相关（' + opts.travelMode + '）', items: tItems });

    // 游玩方式相关
    var playCats = {
      '公共交通': ['公交 / 地铁乘车码', '零钱'],
      '打车': ['打车软件'],
      '自驾': ['驾驶证', '导航与离线地图'],
      '包车': ['行程确认单', '司机联系方式'],
      '租车': ['驾驶证', '信用卡（押金）']
    };
    var pItems = playCats[opts.playMode];
    if (pItems) cats.push({ name: '🎒 游玩相关（' + opts.playMode + '）', items: pItems });

    // 目的地类型
    if (opts.destType === 'beach' || opts.destType === 'coastal') {
      cats.push({ name: '🏖️ 海滨', items: ['泳衣泳裤', '防水手机袋', '沙滩拖鞋'] });
    }
    if (opts.destType === 'mountain') {
      cats.push({ name: '⛰️ 山地/高原', items: ['登山鞋', '保温杯', '便携氧气瓶（高原）'] });
    }

    // 通用补充
    cats.push({ name: '📷 其他', items: ['相机 / 自拍杆', '水杯', '少量现金', '便携纸巾'] });

    return cats;
  }

  global.TripWeather = {
    geocodeCity: geocodeCity,
    fetchWeather: fetchWeather,
    wmoInfo: wmoInfo,
    formatDate: formatDate,
    recommendClothing: recommendClothing,
    recommendItems: recommendItems
  };
})(window);
