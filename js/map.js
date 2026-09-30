/* ============================================================
 * 地图模块：Leaflet（无需 API Key）
 *  - 默认 CARTO Voyager 瓦片（CDN 分发，403/加载失败率更低）
 *  - 备用 OpenStreetMap 瓦片 + 图层切换
 *  - 瓦片加载失败自动回退到备用源
 *  - 起点 → 目的地行进路线（OSRM，失败退化为直线）
 *  - 景点游玩路线（序号标记 + 连线）
 * ============================================================ */
(function (global) {
  'use strict';

  var OSRM_URL = 'https://router.project-osrm.org/route/v1/driving/';

  // 瓦片源：优先 CARTO（CDN），失败自动回退 OSM
  var BASELAYERS = {
    'CARTO 简洁地图': L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd', maxZoom: 20
    }),
    'OpenStreetMap': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    })
  };

  /** OSRM 行进路线（GeoJSON LineString） */
  async function fetchTravelRoute(start, dest) {
    var url = OSRM_URL +
      start.lng + ',' + start.lat + ';' + dest.lng + ',' + dest.lat +
      '?overview=full&geometries=geojson&alternatives=false';
    var res = await fetch(url);
    if (!res.ok) throw new Error('OSRM 状态 ' + res.status);
    var json = await res.json();
    if (json.code !== 'Ok' || !json.routes || !json.routes.length) {
      throw new Error('OSRM 无可用路线');
    }
    return json.routes[0].geometry;
  }

  function numberIcon(i) {
    return L.divIcon({
      className: '',
      html: '<div class="num-marker">' + i + '</div>',
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });
  }

  function drawPlan(containerId, plan) {
    var container = document.getElementById(containerId);
    if (!container) return null;

    // 销毁旧实例
    if (container._leaflet_id && global.__tripMap) {
      try { global.__tripMap.remove(); } catch (e) { /* ignore */ }
      global.__tripMap = null;
    }

    var points = [];
    var start = plan.start, dest = plan.dest;
    var attrs = plan.attractions || [];

    var map = L.map(containerId, { scrollWheelZoom: true });
    global.__tripMap = map;

    // 默认图层 + 失败自动回退
    var primary = BASELAYERS['CARTO 简洁地图'];
    var fallback = BASELAYERS['OpenStreetMap'];
    primary.addTo(map);
    var switched = false;
    var errCount = 0;
    primary.on('tileerror', function () {
      errCount++;
      if (!switched && errCount >= 4) {
        switched = true;
        map.removeLayer(primary);
        fallback.addTo(map);
        rebuildControl(map, fallback, primary);
      }
    });

    addLayerControl(map, primary, fallback);

    // 起点 / 终点
    if (start && start.lat != null) {
      points.push([start.lat, start.lng]);
      L.circleMarker([start.lat, start.lng], {
        radius: 9, color: '#16a34a', weight: 3, fillColor: '#16a34a', fillOpacity: 0.9
      }).addTo(map).bindPopup('<b>起点</b><br>' + (start.name || ''));
    }
    if (dest && dest.lat != null) {
      points.push([dest.lat, dest.lng]);
      L.circleMarker([dest.lat, dest.lng], {
        radius: 9, color: '#dc2626', weight: 3, fillColor: '#dc2626', fillOpacity: 0.9
      }).addTo(map).bindPopup('<b>目的地</b><br>' + (dest.name || ''));
    }

    // 行进路线（蓝）
    if (plan.travelRoute && plan.travelRoute.coordinates && plan.travelRoute.coordinates.length) {
      var latlngs = plan.travelRoute.coordinates.map(function (c) { return [c[1], c[0]]; });
      L.polyline(latlngs, { color: '#2f6bff', weight: 4, opacity: 0.85, dashArray: '8 6' }).addTo(map);
      plan.travelRoute.coordinates.forEach(function (c) { points.push([c[1], c[0]]); });
    } else if (start && start.lat != null && dest && dest.lat != null) {
      L.polyline([[start.lat, start.lng], [dest.lat, dest.lng]], {
        color: '#2f6bff', weight: 4, opacity: 0.85, dashArray: '8 6'
      }).addTo(map);
    }

    // 景点游玩路线（橙）+ 序号
    if (attrs.length) {
      attrs.forEach(function (a) { if (a.lat != null) points.push([a.lat, a.lng]); });
      var attrLatLngs = attrs.filter(function (a) { return a.lat != null; })
        .map(function (a) { return [a.lat, a.lng]; });
      if (attrLatLngs.length > 1) {
        L.polyline(attrLatLngs, { color: '#ff8a2a', weight: 4, opacity: 0.9 }).addTo(map);
      }
      attrs.forEach(function (a, i) {
        if (a.lat == null) return;
        L.marker([a.lat, a.lng], { icon: numberIcon(i + 1) })
          .addTo(map)
          .bindPopup('<b>' + (i + 1) + '. ' + a.name + '</b><br>' + (a.category ? ('[' + a.category + '] ') : ''));
      });
    }

    if (points.length) {
      map.fitBounds(L.latLngBounds(points), { padding: [30, 30] });
    } else if (dest && dest.lat != null) {
      map.setView([dest.lat, dest.lng], 12);
    }

    return map;
  }

  function addLayerControl(map, primary, fallback) {
    var control = L.control.layers(
      { 'CARTO 简洁地图': primary, 'OpenStreetMap': fallback },
      null, { position: 'topright' }
    );
    control.addTo(map);
    map._controlLayers = control;
  }

  function rebuildControl(map, a, b) {
    try { if (map._controlLayers) map.removeControl(map._controlLayers); } catch (e) { /* ignore */ }
    map._controlLayers = null;
    addLayerControl(map, a, b);
  }

  global.TripMap = { fetchTravelRoute: fetchTravelRoute, drawPlan: drawPlan };
})(window);
