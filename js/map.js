/* ============================================================
 * 地图模块：Leaflet + OpenStreetMap（无需 API Key）
 *  - 起点 → 目的地行进路线（尝试 OSRM 免费路线服务，失败则直线）
 *  - 目的地景点游玩路线（序号标记 + 连线）
 * ============================================================ */
(function (global) {
  'use strict';

  var TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var OSRM_URL = 'https://router.project-osrm.org/route/v1/driving/';

  var OSM_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  /**
   * 请求 OSRM 路线（GeoJSON LineString）
   */
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
    return json.routes[0].geometry; // { type: 'LineString', coordinates: [[lng,lat], ...] }
  }

  function numberIcon(i) {
    return L.divIcon({
      className: '',
      html: '<div class="num-marker">' + i + '</div>',
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });
  }

  /**
   * 绘制旅行路线图
   * plan: {
   *   start: { name, lat, lng },
   *   dest:  { name, lat, lng },
   *   attractions: [ { name, lat, lng }, ... ],
   *   travelRoute: LineString | null   (起点→目的地)
   * }
   */
  function drawPlan(containerId, plan) {
    var container = document.getElementById(containerId);
    if (!container) return null;

    // 销毁旧实例，避免重复初始化
    if (container._leaflet_id) {
      var old = global.__tripMap;
      if (old) { old.remove(); old = null; }
    }

    var points = [];
    var start = plan.start, dest = plan.dest;
    var attrs = plan.attractions || [];

    var map = L.map(containerId, { scrollWheelZoom: true });
    global.__tripMap = map;

    L.tileLayer(TILE_URL, { attribution: OSM_ATTRIBUTION, maxZoom: 19 }).addTo(map);

    // 起点 / 终点标记
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

    // 起点 → 目的地行进路线（蓝色）
    if (plan.travelRoute && plan.travelRoute.coordinates && plan.travelRoute.coordinates.length) {
      var latlngs = plan.travelRoute.coordinates.map(function (c) { return [c[1], c[0]]; });
      L.polyline(latlngs, { color: '#2f6bff', weight: 4, opacity: 0.85, dashArray: '8 6' }).addTo(map);
      plan.travelRoute.coordinates.forEach(function (c) { points.push([c[1], c[0]]); });
    } else if (start && start.lat != null && dest && dest.lat != null) {
      L.polyline([[start.lat, start.lng], [dest.lat, dest.lng]], {
        color: '#2f6bff', weight: 4, opacity: 0.85, dashArray: '8 6'
      }).addTo(map);
    }

    // 景点游玩路线（橙色） + 序号标记
    if (attrs.length) {
      attrs.forEach(function (a) {
        if (a.lat == null) return;
        points.push([a.lat, a.lng]);
      });
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

    // 自适应视野
    if (points.length) {
      map.fitBounds(L.latLngBounds(points), { padding: [30, 30] });
    } else if (dest && dest.lat != null) {
      map.setView([dest.lat, dest.lng], 12);
    }

    return map;
  }

  global.TripMap = { fetchTravelRoute: fetchTravelRoute, drawPlan: drawPlan };
})(window);
