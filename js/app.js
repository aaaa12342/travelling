/* ============================================================
 * 主逻辑：推荐 + 行程生成 + 渲染
 * ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };

  var DURATION_MAP = {
    '一天一夜': { days: 1, nights: 1 },
    '两天一夜': { days: 2, nights: 1 },
    '三天两夜': { days: 3, nights: 2 },
    '四天三夜': { days: 4, nights: 3 },
    '五天四夜': { days: 5, nights: 4 },
    '六天五夜': { days: 6, nights: 5 }
  };

  var PLAY_VERB = {
    '公共交通': '乘坐公共交通',
    '打车': '打车',
    '自驾': '自驾',
    '包车': '包车',
    '租车': '租车自驾'
  };
  var ARRIVE_VERB = {
    '自驾': '自驾前往',
    '打车': '打车前往',
    '火车': '乘火车抵达',
    '高铁': '乘高铁抵达',
    '飞机': '乘飞机抵达',
    '邮轮': '乘邮轮抵达',
    '大巴': '乘大巴抵达'
  };

  /* ---------- 工具 ---------- */
  function selectedRadio(name) {
    var el = document.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : null;
  }

  function haversineKm(a, b) {
    var R = 6371;
    var dLat = (b.lat - a.lat) * Math.PI / 180;
    var dLng = (b.lng - a.lng) * Math.PI / 180;
    var la1 = a.lat * Math.PI / 180;
    var la2 = b.lat * Math.PI / 180;
    var h = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(la1) * Math.cos(la2) * Math.pow(Math.sin(dLng / 2), 2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  function fmtKm(km) {
    if (km == null) return '—';
    if (km >= 1000) return km.toFixed(1) + ' 公里';
    return Math.round(km) + ' 公里';
  }

  function showLoading(on) {
    $('loading').hidden = !on;
  }
  function showError(msg) {
    var box = $('errorBox');
    if (msg) { box.textContent = '⚠️ ' + msg; box.hidden = false; }
    else { box.hidden = true; }
  }

  /* ---------- 推荐逻辑 ---------- */
  function recommendTravelMode(km) {
    if (km == null) return { mode: '高铁', reason: '距离未知，默认推荐高铁，长途可选飞机。' };
    if (km < 80) return { mode: '自驾', reason: '两地较近（约' + Math.round(km) + '公里），自驾/打车最灵活省时。' };
    if (km < 300) return { mode: '高铁', reason: '中短途（约' + Math.round(km) + '公里），高铁快速舒适，也可自驾。' };
    if (km < 800) return { mode: '高铁', reason: '约' + Math.round(km) + '公里，高铁是最省心高效的选择。' };
    if (km < 1400) return { mode: '高铁', reason: '约' + Math.round(km) + '公里，高铁直达，比飞机更省候机时间。' };
    return { mode: '飞机', reason: '长途（约' + Math.round(km) + '公里），飞机更高效省时。' };
  }

  function recommendPlayMode(destType) {
    if (destType === 'beach' || destType === 'coastal') {
      return { mode: '自驾', reason: '海滨/海岛景点较分散，自驾或租车更自由。' };
    }
    if (destType === 'mountain' || destType === 'oldtown') {
      return { mode: '包车', reason: '山水/古城景点间距离较远，包车省心省力。' };
    }
    return { mode: '公共交通', reason: '市区地铁公交便利，公共交通性价比高。' };
  }

  function recommendDuration(attrCount) {
    if (attrCount <= 3) return { mode: '两天一夜', reason: '核心景点较少，两天一夜节奏刚好。' };
    if (attrCount <= 5) return { mode: '三天两夜', reason: '景点数量适中，三天两夜舒适从容。' };
    return { mode: '四天三夜', reason: '景点较多，四天三夜玩得更尽兴。' };
  }

  function markRecommended(name, value) {
    document.querySelectorAll('input[name="' + name + '"]').forEach(function (input) {
      var seg = input.closest('.seg');
      if (seg) seg.classList.toggle('rec', input.value === value);
    });
  }

  /* ---------- 附近景点（未手写景点城市：OpenStreetMap 实时检索 + 类型模板） ---------- */
  var CAT_TEMPLATES = {
    '博物馆': { label: '博物馆', desc: '馆藏当地历史与特色文物，是了解城市文化的窗口。', highlights: ['看馆藏代表性文物', '了解当地历史脉络'], duration: '2小时' },
    '寺庙': { label: '寺庙', desc: '香火旺盛的古刹，建筑与宗教文化底蕴深厚。', highlights: ['参拜大殿', '看古建筑与碑刻'], duration: '1-2小时' },
    '公园': { label: '公园', desc: '市民休闲的城市绿地，适合散步放松。', highlights: ['散步休闲', '赏花看景'], duration: '1-2小时' },
    '古城': { label: '古城', desc: '保留老城风貌的历史街区。', highlights: ['逛老街巷', '看古建筑'], duration: '2小时' },
    '历史': { label: '历史', desc: '承载当地历史记忆的名胜古迹。', highlights: ['实地参观', '了解历史典故'], duration: '1-2小时' },
    '自然': { label: '自然', desc: '自然山水风光，适合户外游览。', highlights: ['观景拍照', '徒步游览'], duration: '半天' },
    '游乐园': { label: '游乐园', desc: '主题乐园，适合亲子与娱乐。', highlights: ['玩游乐项目', '看表演'], duration: '半天' },
    '动物园': { label: '动物园', desc: '观赏各种动物，亲子游好去处。', highlights: ['看动物', '亲近自然'], duration: '2-3小时' },
    '海滩': { label: '海滩', desc: '滨海沙滩，适合玩水休闲。', highlights: ['玩水踏浪', '看海景'], duration: '半天' },
    '观景点': { label: '观景点', desc: '俯瞰城市或山水的绝佳位置。', highlights: ['登高望远', '拍全景'], duration: '1小时' },
    '景点': { label: '景点', desc: '当地代表性游览点，值得一逛。', highlights: ['实地游览', '拍照打卡'], duration: '1-2小时' }
  };

  function classifyOsm(tags) {
    var t = tags.tourism;
    if (t === 'museum' || t === 'gallery') return '博物馆';
    if (t === 'theme_park' || t === 'attraction' && (tags.attraction === 'roller_coaster' || tags.leisure === 'water_park')) return '游乐园';
    if (t === 'zoo' || t === 'aquarium') return '动物园';
    if (t === 'viewpoint') return '观景点';
    if (t === 'artwork') return '景点';
    if (tags.historic && /castle|monument|fort|ruins|citywalls|city_gate|memorial/.test(tags.historic)) return '历史';
    if (tags.natural === 'beach' || tags.beach) return '海滩';
    if (tags.leisure === 'park' || tags.landuse === 'recreation_ground') return '公园';
    if (tags.amenity === 'place_of_worship' && /buddhist|taoist|shinto/.test(tags.religion || '')) return '寺庙';
    return '景点';
  }

  async function fetchNearbyAttractions(lat, lng) {
    var query = '[out:json][timeout:25];(' +
      'node["tourism"~"attraction|viewpoint|museum|theme_park|zoo|aquarium|artwork|gallery"](around:25000,' + lat + ',' + lng + ');' +
      'way["tourism"~"attraction|viewpoint|museum|theme_park|zoo"](around:25000,' + lat + ',' + lng + ');' +
      'node["historic"~"castle|monument|fort|ruins|citywalls|city_gate|memorial"](around:25000,' + lat + ',' + lng + ');' +
      'node["natural"="beach"](around:25000,' + lat + ',' + lng + ');' +
      ');out center 60;';
    var url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);
    var res = await fetch(url);
    if (!res.ok) throw new Error('Overpass ' + res.status);
    var json = await res.json();
    var seen = {};
    var out = [];
    (json.elements || []).forEach(function (el) {
      var tags = el.tags || {};
      var name = tags['name:zh'] || tags.name;
      var la = el.lat != null ? el.lat : (el.center && el.center.lat);
      var lo = el.lon != null ? el.lon : (el.center && el.center.lon);
      if (!name || la == null) return;
      if (seen[name]) return;
      seen[name] = 1;
      var tpl = CAT_TEMPLATES[classifyOsm(tags)] || CAT_TEMPLATES['景点'];
      out.push({
        name: name, lat: la, lng: lo,
        category: tpl.label, duration: tpl.duration,
        desc: tpl.desc, highlights: tpl.highlights.slice(),
        metro: null, get: '查询当地公交 / 打车前往'
      });
    });
    // 按距离市中心排序
    out.sort(function (a, b) { return haversineKm({ lat: lat, lng: lng }, a) - haversineKm({ lat: lat, lng: lng }, b); });
    return out.slice(0, 6);
  }

  /* ---------- 车站/机场检索（未手写居住地城市的兜底） ---------- */
  async function fetchTransitHubs(lat, lng) {
    var query = '[out:json][timeout:25];(' +
      'node["railway"="station"](around:40000,' + lat + ',' + lng + ');' +
      'node["aeroway"="aerodrome"](around:100000,' + lat + ',' + lng + ');' +
      'way["aeroway"="aerodrome"](around:100000,' + lat + ',' + lng + ');' +
      ');out center 80;';
    var url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);
    var res = await fetch(url);
    if (!res.ok) throw new Error('Overpass hubs ' + res.status);
    var json = await res.json();
    var stations = [];
    (json.elements || []).forEach(function (el) {
      var tags = el.tags || {};
      var la = el.lat != null ? el.lat : (el.center && el.center.lat);
      var lo = el.lon != null ? el.lon : (el.center && el.center.lon);
      if (la == null) return;
      var isAirport = /aerodrome|airstrip/.test(tags.aeroway || '');
      // 跳过地铁/轻轨站（它们也是 railway=station）
      if (!isAirport && /subway|light_rail|monorail|tram/.test((tags.station || '') + (tags.subway || ''))) return;
      var name = tags['name:zh'] || tags.name || '';
      if (!name) name = isAirport ? '当地机场' : '火车站';
      stations.push({ name: name, lat: la, lng: lo, kind: isAirport ? '机场' : '火车站' });
    });
    var seen = {};
    var dedup = [];
    stations.forEach(function (s) {
      if (seen[s.name]) return;
      seen[s.name] = 1;
      dedup.push(s);
    });
    dedup.sort(function (a, b) { return haversineKm({ lat: lat, lng: lng }, a) - haversineKm({ lat: lat, lng: lng }, b); });
    return dedup.slice(0, 6);
  }

  /* ---------- 居住地推荐 ---------- */
  function buildGenericAreas(center, stations) {
    var areas = [{ name: '市中心/商圈', lat: center.lat, lng: center.lng, desc: '城市中心，商业餐饮集中', env: '购物吃饭方便，去各景点与车站都较均衡' }];
    var rail = stations.filter(function (s) { return s.kind !== '机场'; })[0];
    if (rail) areas.push({ name: '火车站周边', lat: rail.lat, lng: rail.lng, desc: rail.name + '附近', env: '紧邻车站，适合晚到早走的中转旅客' });
    return areas;
  }

  function scoreAreas(areas, stations, attractions) {
    var rail = stations.filter(function (s) { return s.kind !== '机场'; });
    var airport = stations.filter(function (s) { return s.kind === '机场'; })[0] || null;
    var attrs = (attractions || []).filter(function (a) { return a.lat != null; });
    function sum(arr) { return arr.reduce(function (s, v) { return s + v; }, 0); }

    return areas.map(function (area) {
      var dAttrs = attrs.map(function (p) { return haversineKm(area, p); });
      var avgAttr = dAttrs.length ? Math.round(sum(dAttrs) / dAttrs.length * 10) / 10 : null;
      var nearRail = rail.length ? Math.min.apply(null, rail.map(function (s) { return haversineKm(area, s); })) : null;
      var airportDist = airport ? haversineKm(area, airport) : null;
      var score = 100
        - (avgAttr != null ? avgAttr * 6 : 15)
        - (nearRail != null ? nearRail * 2.5 : 8)
        - (airportDist != null ? airportDist * 0.4 : 0);
      return {
        area: area, avgAttr: avgAttr,
        nearRail: nearRail != null ? Math.round(nearRail * 10) / 10 : null,
        airportDist: airportDist != null ? Math.round(airportDist) : null,
        score: Math.max(0, Math.round(score))
      };
    }).sort(function (a, b) { return b.score - a.score; });
  }

  async function buildStayData(destKey, destGeo, attractions) {
    var curated = global.STAY_DATA && global.STAY_DATA[destKey];
    var stations, areas;
    if (curated) {
      stations = curated.stations.slice();
      areas = curated.areas.slice();
    } else {
      stations = [];
      try { stations = await fetchTransitHubs(destGeo.lat, destGeo.lng); } catch (e) { stations = []; }
      areas = buildGenericAreas(destGeo, stations);
    }
    var scored = scoreAreas(areas, stations, attractions);
    return { stations: stations, scored: scored };
  }

  /* ---------- 行程生成 ---------- */
  function distribute(attrs, days) {
    if (!attrs.length) return [];
    var per = Math.ceil(attrs.length / days);
    var chunks = [];
    for (var i = 0; i < days; i++) chunks.push(attrs.slice(i * per, i * per + per));
    return chunks;
  }

  function buildItinerary(opts) {
    var days = opts.days;
    var attrs = opts.attractions || [];
    var playVerb = PLAY_VERB[opts.playMode] || '乘坐公共交通';
    var arriveVerb = ARRIVE_VERB[opts.travelMode] || '前往';
    var chunks = distribute(attrs, days);
    var itinerary = [];

    for (var d = 0; d < days; d++) {
      var title = '第 ' + (d + 1) + ' 天';
      var list = chunks[d] || [];
      var text;
      if (!attrs.length) {
        text = genericDayText(d, days, opts, arriveVerb);
      } else if (!list.length) {
        text = '自由活动 / 休闲调整：可逛当地街区、购物或补充休息。';
      } else {
        var names = list.map(function (a) { return a.name; }).join(' → ');
        if (d === 0) {
          text = '从' + opts.startName + '出发，' + arriveVerb + ' ' + opts.destName + '，办理入住后，' + playVerb + '依次游览：' + names + '。';
        } else {
          text = playVerb + '依次游览：' + names + '。';
        }
        if (d === days - 1) {
          text += ' 游览结束后，' + arriveVerb + '返程回' + opts.startName + '。';
        }
      }
      itinerary.push({ title: title, text: text, stops: list.map(function (a) { return a.name; }) });
    }
    return itinerary;
  }

  function genericDayText(d, days, opts, arriveVerb) {
    var playVerb = PLAY_VERB[opts.playMode] || '乘坐公共交通';
    if (d === 0) {
      return '从' + opts.startName + '出发，' + arriveVerb + ' ' + opts.destName + '，办理入住后，' + playVerb + '游览市区核心地标与代表性街区，感受城市风貌。';
    }
    if (d === days - 1) {
      return '上午自由活动或购买伴手礼，之后' + arriveVerb + '返程回' + opts.startName + '，结束愉快旅程。';
    }
    return playVerb + '深度游览当地热门景点与周边风光，可结合当地攻略灵活安排。';
  }

  /* ---------- 渲染 ---------- */
  function renderSummary(s, rec, destData) {
    $('sumRoute').textContent = s.startName + ' → ' + s.destName;
    $('sumTravel').textContent = s.travelMode;
    $('sumPlay').textContent = s.playMode;
    $('sumDuration').textContent = s.duration + '（' + s.days + '天' + (s.nights ? s.nights + '晚' : '') + '）';
    $('sumDistance').textContent = fmtKm(s.km);
    $('sumDest').textContent = destData ? (destData.name + (destData.province ? ' · ' + destData.province : '') + ' · ' + destData.typeName) : s.destName;

    var notes = [];
    notes.push('推荐出行方式：<b>' + rec.travel.mode + '</b> — ' + rec.travel.reason);
    notes.push('推荐游玩方式：<b>' + rec.play.mode + '</b> — ' + rec.play.reason);
    notes.push('推荐时长：<b>' + rec.duration.mode + '</b> — ' + rec.duration.reason);
    if (destData) notes.push('目的地速览：' + destData.overview);
    if (destData && destData.tips) notes.push('💡 实用贴士：' + destData.tips);
    $('sumNote').innerHTML = notes.join('<br>');
  }

  function renderWeather(weather, days) {
    var cur = weather.current || {};
    var daily = weather.daily || {};
    var html = '';
    if (cur.temperature_2m != null) {
      var info = TripWeather.wmoInfo(cur.weather_code);
      html += '<div class="weather-now">' +
        '<div><span class="temp">' + Math.round(cur.temperature_2m) + '°C</span></div>' +
        '<div class="desc">' + info.icon + ' ' + info.desc + '</div>' +
        '<div class="meta">体感 ' + Math.round(cur.apparent_temperature) + '°C · 湿度 ' +
        (cur.relative_humidity_2m != null ? cur.relative_humidity_2m : '—') + '% · 风速 ' +
        Math.round(cur.wind_speed_10m) + ' km/h</div>' +
        '</div>';
    }
    var times = daily.time || [];
    var n = Math.min(times.length, days);
    for (var i = 0; i < n; i++) {
      var code = daily.weather_code && daily.weather_code[i] != null ? daily.weather_code[i] : 0;
      var inf = TripWeather.wmoInfo(code);
      var maxT = daily.temperature_2m_max && daily.temperature_2m_max[i] != null ? Math.round(daily.temperature_2m_max[i]) : '—';
      var minT = daily.temperature_2m_min && daily.temperature_2m_min[i] != null ? Math.round(daily.temperature_2m_min[i]) : '—';
      var prec = daily.precipitation_probability_max && daily.precipitation_probability_max[i] != null ? daily.precipitation_probability_max[i] : null;
      html += '<div class="weather-day">' +
        '<div class="d-name">' + TripWeather.formatDate(times[i]) + '</div>' +
        '<div class="d-icon">' + inf.icon + '</div>' +
        '<div class="d-temp">' + maxT + '° / ' + minT + '°</div>' +
        '<div class="d-prec">' + inf.desc + (prec != null ? ' · 降水 ' + prec + '%' : '') + '</div>' +
        '</div>';
    }
    if (!html) html = '<p class="empty">暂未获取到天气数据。</p>';
    $('weatherWrap').innerHTML = html;
  }

  function renderClothing(cloth) {
    var html = '<div class="clothing-list">' +
      '<div class="clothing-row"><span class="ck">上装</span><span class="cv">' + cloth.upper + '</span></div>' +
      '<div class="clothing-row"><span class="ck">下装</span><span class="cv">' + cloth.lower + '</span></div>' +
      '<div class="clothing-row"><span class="ck">配饰</span><span class="cv">' + cloth.accessory + '</span></div>' +
      '</div>';
    if (cloth.tips && cloth.tips.length) {
      html += '<div class="clothing-tip">💡 ' + cloth.tips.join('　') + '</div>';
    }
    $('clothingWrap').innerHTML = html;
  }

  function renderItems(cats) {
    var html = '';
    cats.forEach(function (cat) {
      html += '<div class="items-cat"><h4>' + cat.name + '</h4><ul>' +
        cat.items.map(function (it) { return '<li>' + it + '</li>'; }).join('') +
        '</ul></div>';
    });
    $('itemsWrap').innerHTML = html;
  }

  function renderRoute(itinerary) {
    var html = '';
    itinerary.forEach(function (day) {
      html += '<div class="route-day"><h4>🗓️ ' + day.title + '</h4><p>' + day.text + '</p>' +
        (day.stops && day.stops.length ? '<div class="r-stops">途经：' + day.stops.join('、') + '</div>' : '') +
        '</div>';
    });
    $('routeWrap').innerHTML = html;
  }

  function accessText(a) {
    if (a.metro) return a.metro.line + '·' + a.metro.station + '（' + a.metro.walk + '）';
    if (a.get) return a.get;
    return '查询当地公交 / 打车前往';
  }

  function renderAttractions(attrs) {
    var wrap = $('attractionsWrap');
    if (!attrs || !attrs.length) {
      wrap.innerHTML = '<p class="empty">未能获取该地景点信息，可参考上方路线图或结合当地旅游平台进一步了解。</p>';
      return;
    }
    var html = '';
    attrs.forEach(function (a, i) {
      var hl = (a.highlights && a.highlights.length)
        ? '<div class="attr-hl"><strong>✨ 具体玩点</strong><ul>' +
          a.highlights.map(function (h) { return '<li>' + h + '</li>'; }).join('') + '</ul></div>'
        : '';
      var searchUrl = 'https://www.baidu.com/s?wd=' + encodeURIComponent(a.name + ' 景点介绍 游玩攻略');
      html += '<div class="attr-card">' +
        '<div class="attr-head" onclick="toggleAttr(this.parentNode)">' +
          '<h4><span class="idx">' + (i + 1) + '</span>' + a.name + ' <span class="tag">' + (a.category || '景点') + '</span></h4>' +
          '<span class="attr-toggle">▾</span>' +
        '</div>' +
        '<p class="attr-desc">' + a.desc + '</p>' +
        '<div class="attr-body">' +
          hl +
          '<div class="attr-meta">' +
            (a.duration ? '<div>⏱ 建议游玩：' + a.duration + '</div>' : '') +
            '<div>🚇 交通：' + accessText(a) + '</div>' +
          '</div>' +
          '<a class="attr-link" target="_blank" rel="noopener" href="' + searchUrl + '">🔍 查看详细介绍 →</a>' +
        '</div>' +
        '</div>';
    });
    wrap.innerHTML = html;
  }

  function renderTransit(attrs) {
    var wrap = $('transitWrap');
    if (!attrs || attrs.length < 2) {
      wrap.innerHTML = '<p class="empty">景点较少，无需跨景点交通衔接。</p>';
      return;
    }
    var html = '';
    for (var i = 0; i < attrs.length - 1; i++) {
      var a = attrs[i], b = attrs[i + 1];
      var km = haversineKm(a, b);
      var sameLine = a.metro && b.metro && a.metro.line === b.metro.line;
      var routeHint;
      if (sameLine) {
        routeHint = '乘 <b>' + a.metro.line + '</b>（' + a.metro.station + ' → ' + b.metro.station + '）可直达';
      } else if (a.metro && b.metro) {
        routeHint = '乘 ' + a.metro.line + '（' + a.metro.station + '）→ 换乘 ' + b.metro.line + '（' + b.metro.station + '），具体换乘请查地图';
      } else {
        routeHint = '两景点间建议按地图查询公交/地铁，或打车前往';
      }
      var searchUrl = 'https://www.baidu.com/s?wd=' + encodeURIComponent(a.name + ' 到 ' + b.name + ' 地铁 公交 怎么坐');
      html += '<div class="transit-leg">' +
        '<div class="tl-title"><span class="idx">' + (i + 1) + '→' + (i + 2) + '</span> ' + a.name + ' → ' + b.name +
          ' <span class="tl-dist">约 ' + fmtKm(km) + '</span></div>' +
        '<div class="tl-acc">🚇 ' + a.name + '：' + accessText(a) + '</div>' +
        '<div class="tl-acc">🚇 ' + b.name + '：' + accessText(b) + '</div>' +
        '<div class="tl-route">🛤️ ' + routeHint + '</div>' +
        '<a class="attr-link" target="_blank" rel="noopener" href="' + searchUrl + '">🔍 查完整换乘方案 →</a>' +
        '</div>';
    }
    wrap.innerHTML = html;
  }

  function renderFood(foods, destName) {
    var wrap = $('foodWrap');
    if (!foods || !foods.length) {
      wrap.innerHTML = '<p class="empty">暂未收录「' + destName + '」的特色美食，建议到当地口碑餐厅或美食街现场探寻。</p>';
      return;
    }
    var html = '';
    foods.forEach(function (f) {
      html += '<div class="food-card"><h4>' + f.name + '</h4><p>' + f.desc + '</p></div>';
    });
    wrap.innerHTML = html;
  }

  function renderMap(plan) {
    var m = TripMap.drawPlan('map', plan);
    if (m) {
      setTimeout(function () { m.invalidateSize(); }, 60);
    }
  }

  function renderStay(stations, scored) {
    var wrap = $('stayWrap');
    if (!scored || !scored.length) {
      wrap.innerHTML = '<p class="empty">未能获取居住地信息，建议住在市中心或火车站附近。</p>';
      return;
    }
    var top = scored[0];
    var html = '';
    if (stations && stations.length) {
      html += '<p class="stay-hubs">🚉 主要车站/机场：' +
        stations.slice(0, 6).map(function (s) { return s.name + '（' + s.kind + '）'; }).join('、') + '</p>';
    }
    html += '<div class="stay-top">' +
      '<div class="stay-top-head"><span class="stay-badge">首选</span><strong>' + top.area.name + '</strong>' +
        '<span class="stay-score">综合便利度 ' + top.score + '</span></div>' +
      '<p class="stay-desc">' + top.area.desc + '</p>' +
      '<p class="stay-env">🌿 环境：' + top.area.env + '</p>' +
      '<div class="stay-metrics">' +
        (top.avgAttr != null ? '<span>📍 距景点平均约 ' + top.avgAttr + ' km</span>' : '') +
        (top.nearRail != null ? '<span>🚉 距车站约 ' + top.nearRail + ' km</span>' : '') +
        (top.airportDist != null ? '<span>✈️ 距机场约 ' + top.airportDist + ' km</span>' : '') +
      '</div>' +
    '</div>';

    if (scored.length > 1) {
      html += '<div class="stay-alt">';
      scored.slice(1, 3).forEach(function (s) {
        html += '<div class="stay-alt-item">' +
          '<strong>' + s.area.name + '</strong> <span class="stay-score">' + s.score + '</span>' +
          '<p>' + s.area.desc + '（' + s.area.env + '）</p>' +
          '<div class="stay-metrics">' +
            (s.avgAttr != null ? '<span>📍 景点 ' + s.avgAttr + 'km</span>' : '') +
            (s.nearRail != null ? '<span>🚉 车站 ' + s.nearRail + 'km</span>' : '') +
          '</div>' +
        '</div>';
      });
      html += '</div>';
    }
    wrap.innerHTML = html;
  }

  var TYPE_NAME = {
    city: '都市', historic: '历史文化', coastal: '海滨', beach: '海岛度假',
    mountain: '山水/自然', oldtown: '古城古镇'
  };

  // 景点卡片展开/收起
  window.toggleAttr = function (card) { card.classList.toggle('open'); };

  /* ---------- 主流程 ---------- */
  async function generate() {
    var startName = $('startInput').value.trim();
    var destName = $('destInput').value.trim();
    var travelMode = selectedRadio('travelMode');
    var playMode = selectedRadio('playMode');
    var duration = selectedRadio('duration');
    var startDate = $('dateInput').value || null;

    if (!startName || !destName) {
      showError('请填写「起点」和「终点」。');
      return;
    }
    showError(null);
    showLoading(true);
    $('generateBtn').disabled = true;

    try {
      var dur = DURATION_MAP[duration] || { days: 3, nights: 2 };

      // 1) 地理编码
      var geo = await Promise.all([
        TripWeather.geocodeCity(startName),
        TripWeather.geocodeCity(destName)
      ]);
      var startGeo = geo[0], destGeo = geo[1];
      var km = haversineKm(startGeo, destGeo);

      // 2) 天气
      var weather = await TripWeather.fetchWeather(destGeo.lat, destGeo.lng, dur.days, startDate);

      // 3) 目的地知识库 / 兜底
      var found = findDestination(destName);
      var destData = found ? found.data : null;
      var destType = destData ? destData.type : 'city';
      var attractions = (destData && destData.attractions) ? destData.attractions.slice() : [];
      var foods = (destData && destData.foods) ? destData.foods.slice() : [];
      if (!attractions.length) {
        try { attractions = await fetchNearbyAttractions(destGeo.lat, destGeo.lng); } catch (e) { attractions = []; }
      }

      // 4) 推荐
      var rec = {
        travel: recommendTravelMode(km),
        play: recommendPlayMode(destType),
        duration: recommendDuration(attractions.length)
      };
      $('travelModeRec').textContent = '⭐ 推荐：' + rec.travel.mode;
      $('playModeRec').textContent = '⭐ 推荐：' + rec.play.mode;
      $('durationRec').textContent = '⭐ 推荐：' + rec.duration.mode;
      $('travelModeRec').hidden = false;
      $('playModeRec').hidden = false;
      $('durationRec').hidden = false;
      markRecommended('travelMode', rec.travel.mode);
      markRecommended('playMode', rec.play.mode);
      markRecommended('duration', rec.duration.mode);

      // 5) 行进路线（OSRM，失败则直线）
      var travelRoute = null;
      if (km > 1 && km < 8000) {
        try { travelRoute = await TripMap.fetchTravelRoute(startGeo, destGeo); } catch (e) { travelRoute = null; }
      }

      // 6) 行程
      var itinerary = buildItinerary({
        startName: startName, destName: destName,
        travelMode: travelMode, playMode: playMode,
        days: dur.days, attractions: attractions
      });

      // 7) 穿搭 / 物品 / 居住地
      var cloth = TripWeather.recommendClothing(weather, destType, dur.days);
      var items = TripWeather.recommendItems({
        weather: weather, destType: destType, region: destData ? destData.region : '',
        travelMode: travelMode, playMode: playMode, tripDays: dur.days
      });
      var stay = await buildStayData(found ? found.key : null, destGeo, attractions);

      // 8) 渲染
      $('results').hidden = false;
      renderSummary({
        startName: startName, destName: destName,
        travelMode: travelMode, playMode: playMode, duration: duration,
        days: dur.days, nights: dur.nights, km: km
      }, rec, destData ? {
        name: destData.name,
        province: destData.province,
        typeName: TYPE_NAME[destType] || '目的地',
        overview: destData.overview,
        tips: destData.tips
      } : null);

      renderWeather(weather, dur.days);
      renderClothing(cloth);
      renderItems(items);
      renderStay(stay.stations, stay.scored);
      renderRoute(itinerary);
      renderTransit(attractions);
      $('transitCard').hidden = playMode !== '公共交通';
      renderAttractions(attractions);
      renderFood(foods, destData ? destData.name : destName);

      renderMap({
        start: { name: startName, lat: startGeo.lat, lng: startGeo.lng },
        dest: { name: destData ? destData.name : destName, lat: destGeo.lat, lng: destGeo.lng },
        attractions: attractions,
        travelRoute: travelRoute
      });

      // 滚动到结果
      $('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (e) {
      console.error(e);
      showError('生成失败：' + (e && e.message ? e.message : '网络或数据异常，请稍后重试。'));
      $('results').hidden = true;
    } finally {
      showLoading(false);
      $('generateBtn').disabled = false;
    }
  }

  /* ---------- 事件绑定 ---------- */
  function init() {
    // 默认出发日期 = 今天
    var d = new Date();
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    $('dateInput').value = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());

    $('plannerForm').addEventListener('submit', function (ev) {
      ev.preventDefault();
      generate();
    });

    $('resetBtn').addEventListener('click', function () {
      $('startInput').value = '';
      $('destInput').value = '';
      document.querySelectorAll('#plannerForm input[type=radio]').forEach(function (r) { r.checked = false; });
      // 恢复默认勾选
      document.querySelector('input[name="travelMode"][value="自驾"]').checked = true;
      document.querySelector('input[name="playMode"][value="公共交通"]').checked = true;
      document.querySelector('input[name="duration"][value="三天两夜"]').checked = true;
      ['travelModeRec', 'playModeRec', 'durationRec'].forEach(function (id) { $(id).hidden = true; });
      document.querySelectorAll('.seg.rec').forEach(function (s) { s.classList.remove('rec'); });
      $('results').hidden = true;
      showError(null);
    });

    $('swapBtn').addEventListener('click', function () {
      var a = $('startInput').value, b = $('destInput').value;
      $('startInput').value = b; $('destInput').value = a;
    });

    // 三个可切换模块：切换后若已有结果则自动重新生成（防抖）
    var debounceTimer = null;
    function onSwitch() {
      if ($('results').hidden) return;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(generate, 450);
    }
    ['travelMode', 'playMode', 'duration'].forEach(function (name) {
      document.querySelectorAll('input[name="' + name + '"]').forEach(function (r) {
        r.addEventListener('change', onSwitch);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
