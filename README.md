# 🧭 旅行攻略生成器 · Trip Planner

一个**纯静态、无需后端、无需注册、无需 API Key** 的旅游攻略生成网页。输入**起点**和**终点**，一键生成一份完整出行攻略，并直接部署到 GitHub Pages。

## ✨ 功能

- **输入**：起点、终点、出发日期
- **可切换模块**（点击即可切换，切换后自动重新生成）：
  - 🚗 出行方式：自驾 / 打车 / 火车 / 高铁 / 飞机 / 邮轮 / 大巴
  - 🎒 游玩方式：公共交通 / 打车 / 自驾 / 包车 / 租车
  - 📅 游玩时长：一天一夜 / 两天一夜 / 三天两夜 / 四天三夜 / 五天四夜 / 六天五夜
- **输出内容**：
  - 🗺️ 行程概览（含**推荐出行方式 / 游玩方式 / 时长**，并给出推荐理由）
  - 🌤️ 目的地天气（当前 + 按行程天数的逐日预报）
  - 👗 推荐穿搭（按气温、雨雪、目的地类型智能生成）
  - 🎒 推荐携带物品清单（按天气、出行方式、游玩方式、时长分类）
  - 🛣️ 旅游路线（按天规划的逐日行程）
  - 🏞️ 途经景点介绍（含建议游玩时长）
  - 🍜 美食推荐
  - 📍 旅行路线图（地图上绘制「起点 → 目的地」行进路线 + 景点游玩路线）

## 🧱 技术栈

| 能力 | 方案 | 是否需密钥 |
| --- | --- | --- |
| 页面 | 原生 HTML / CSS / JavaScript | 否 |
| 地图 | [Leaflet](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/) | 否 |
| 行进路线 | [OSRM](https://project-osrm.org/)（免费演示服务，失败时自动退化为直线） | 否 |
| 天气 | [Open-Meteo](https://open-meteo.com/)（地理编码 + 预报） | 否 |
| 景点兜底 | [Overpass API](https://overpass-api.de/)（未收录目的地时自动检索当地景点） | 否 |
| 攻略内容 | 内置本地知识库 + 规则引擎（20 个热门目的地） | 否 |

> 所有数据源均为免费、无需注册，开箱即用。

## 📁 目录结构

```
.
├── index.html          # 页面结构
├── css/
│   └── style.css       # 样式
├── js/
│   ├── data.js         # 本地知识库（热门目的地：景点坐标、美食、类型）
│   ├── weather.js      # Open-Meteo 天气 + 穿搭/物品规则
│   ├── map.js          # Leaflet 地图 + 路线绘制
│   └── app.js          # 推荐逻辑 + 行程生成 + 渲染
└── README.md
```

## 🚀 本地运行

直接双击 `index.html` 即可在浏览器打开（需要联网加载 CDN 与数据源）。

或者用任意静态服务器：

```bash
# Python
python -m http.server 8080
# 然后访问 http://localhost:8080
```

## 🌐 部署到 GitHub Pages

1. 在 GitHub 新建一个仓库（如 `trip-planner`）。
2. 将本项目文件推送上去：

   ```bash
   git init
   git add .
   git commit -m "init: 旅行攻略生成器"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/trip-planner.git
   git push -u origin main
   ```

3. 在仓库页面进入 **Settings → Pages**，将 **Source** 选为 `Deploy from a branch`，分支选 `main`，目录选 `/ (root)`，保存。
4. 几分钟后即可通过 `https://<你的用户名>.github.io/trip-planner/` 访问。

## 🗂️ 扩充目的地

在 [`js/data.js`](js/data.js) 的 `DB` 对象中按现有格式新增城市即可：

```js
'新城市': {
  name: '新城市', province: '省', type: 'city', region: '地区',
  lat: 0, lng: 0,
  overview: '一句话简介',
  attractions: [
    { name: '景点', lat: 0, lng: 0, category: '类型', duration: '2小时', desc: '介绍' }
  ],
  foods: [ { name: '美食', desc: '介绍' } ],
  tips: '小贴士'
}
```

`type` 可选值：`city`（都市）、`historic`（历史文化）、`coastal`（海滨）、`beach`（海岛度假）、`mountain`（山水/自然）、`oldtown`（古城古镇）。

未收录的目的地会自动走「通用生成」：通过 Overpass 检索当地景点 + 通用行程文案。

## ⚠️ 说明

- 天气、地图、路线、景点等数据来自第三方免费服务，实时获取，出行前请以官方信息为准。
- 攻略内容由本地知识库与规则生成，仅供参考。
- OSRM 演示服务在高峰期可能限流，此时行进路线会退化为「起点—终点」直线示意，不影响其他功能。

## 📄 许可

MIT License
