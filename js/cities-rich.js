/* ============================================================
 * 精选深度库：20 个新增热门目的地的手写景点详情
 * 结构同 data.js 的 DB（含 desc / highlights / metro / get）
 * ============================================================ */
(function (global) {
  'use strict';

  global.CITY_RICH = {
    '天津': {
      name: '天津', province: '天津市', type: 'city', region: '华北',
      lat: 39.0842, lng: 117.2009,
      overview: '海河穿城的直辖市，中西合璧的近代建筑、相声与小吃。',
      attractions: [
        { name: '天津之眼', lat: 39.1510, lng: 117.1820, category: '地标', duration: '1小时',
          desc: '架在海河永乐桥上的巨型摩天轮，夜晚灯光璀璨。',
          highlights: ['坐摩天轮俯瞰海河夜景', '在金刚桥拍全景'],
          metro: { line: '地铁2号线', station: '建国道站', walk: '约800米' } },
        { name: '五大道', lat: 39.1090, lng: 117.1990, category: '街区', duration: '2小时',
          desc: '两千余栋小洋楼，万国建筑博览。',
          highlights: ['骑共享单车逛洋楼', '看疙瘩楼、庆王府', '乘马车听讲解'],
          metro: { line: '地铁1号线', station: '小白楼站', walk: '约600米' } },
        { name: '意式风情区', lat: 39.1320, lng: 117.1970, category: '街区', duration: '1-2小时',
          desc: '原意大利租界，欧式建筑与酒吧咖啡馆。',
          highlights: ['看马可波罗广场', '逛梁启超故居', '喝咖啡听驻唱'],
          metro: { line: '地铁2号线', station: '建国道站', walk: '约300米' } },
        { name: '古文化街', lat: 39.1390, lng: 117.1900, category: '街区', duration: '2小时',
          desc: '津门故里，泥人张、杨柳青年画。',
          highlights: ['逛泥人张、杨柳青年画', '吃耳朵眼炸糕', '听一场相声'],
          metro: { line: '地铁2号线', station: '东南角站', walk: '约500米' } },
        { name: '瓷房子', lat: 39.1220, lng: 117.1950, category: '建筑', duration: '1小时',
          desc: '用数亿古瓷片砌成的法式洋楼。',
          highlights: ['看瓷器外墙', '拍网红打卡照'],
          metro: { line: '地铁3号线', station: '和平路站', walk: '约700米' } }
      ],
      foods: [
        { name: '狗不理包子', desc: '皮薄馅大，天津三绝之一。' },
        { name: '煎饼馃子', desc: '绿豆面摊饼夹馃子，早餐经典。' },
        { name: '十八街麻花', desc: '酥脆香甜的老字号。' },
        { name: '耳朵眼炸糕', desc: '外酥里糯的津门小吃。' }
      ],
      tips: '五大道建议骑行；海河夜游可乘游船，意式风情区傍晚最有氛围。'
    },

    '大同': {
      name: '大同', province: '山西省', type: 'historic', region: '华北',
      lat: 40.0768, lng: 113.3001,
      overview: '北魏古都，云冈石窟与悬空寺，边塞风情。',
      attractions: [
        { name: '云冈石窟', lat: 40.1110, lng: 113.1320, category: '历史', duration: '半天',
          desc: '北魏皇家石窟，世界文化遗产。',
          highlights: ['看第20窟露天大佛', '看昙曜五窟', '逛云冈博物馆'],
          metro: null, get: '市区公交3路/旅游专线，约30分钟' },
        { name: '悬空寺', lat: 39.6590, lng: 113.7080, category: '历史', duration: '2小时',
          desc: '建在悬崖上的千年古寺。',
          highlights: ['看"三教合一"悬空建筑', '登寺俯瞰峡谷'],
          metro: null, get: '市区包车/拼车约1.5小时' },
        { name: '华严寺', lat: 40.0940, lng: 113.3030, category: '寺庙', duration: '1-2小时',
          desc: '辽代皇家寺院，大雄宝殿宏伟。',
          highlights: ['看合掌露齿菩萨', '登华严宝塔俯瞰古城'],
          metro: null, get: '古城内步行可达' },
        { name: '大同古城墙', lat: 40.0890, lng: 113.2990, category: '历史', duration: '1-2小时',
          desc: '明代城墙，可骑行环城。',
          highlights: ['骑自行车环城墙', '看城门与角楼', '赏夜景'],
          metro: null, get: '古城内步行可达' },
        { name: '恒山', lat: 39.6740, lng: 113.7440, category: '山', duration: '半天',
          desc: '五岳之一，悬空寺就在其峭壁。',
          highlights: ['登恒山主峰', '看悬空寺', '赏北岳庙'],
          metro: null, get: '市区包车/班车约1小时' }
      ],
      foods: [
        { name: '刀削面', desc: '山西面食代表，外滑内筋。' },
        { name: '大同羊杂', desc: '羊杂汤配粉条，暖胃。' },
        { name: '大同凉粉', desc: '酸辣爽滑的地方小吃。' }
      ],
      tips: '云冈石窟距市区约16公里；悬空寺与恒山可安排同一天。'
    },

    '晋中': {
      name: '晋中', province: '山西省', type: 'oldtown', region: '华北',
      lat: 37.6870, lng: 112.7520,
      overview: '平遥古城与晋商大院，晋商文化发祥地。',
      attractions: [
        { name: '平遥古城', lat: 37.2010, lng: 112.1780, category: '古城', duration: '1天',
          desc: '保存最完整的明清县城。',
          highlights: ['登城墙俯瞰古城', '逛县衙、日昇昌票号', '看《又见平遥》演出'],
          metro: null, get: '平遥古城站乘接驳/打车约10分钟' },
        { name: '乔家大院', lat: 37.3130, lng: 112.5120, category: '历史', duration: '2-3小时',
          desc: '晋商大院，《大红灯笼高高挂》取景地。',
          highlights: ['看晋商民居建筑', '了解乔家经商史'],
          metro: null, get: '平遥/太原包车约1小时' },
        { name: '王家大院', lat: 36.8970, lng: 111.8710, category: '历史', duration: '2-3小时',
          desc: '民间故宫，规模宏大。',
          highlights: ['看红门堡与高家崖', '登堡墙俯瞰院落'],
          metro: null, get: '平遥/介休包车约1小时' },
        { name: '双林寺', lat: 37.1690, lng: 112.1320, category: '寺庙', duration: '1-2小时',
          desc: '东方彩塑艺术宝库。',
          highlights: ['看韦驮像等彩塑', '赏明代壁画'],
          metro: null, get: '平遥古城打车约15分钟' },
        { name: '绵山', lat: 36.8700, lng: 111.9950, category: '山', duration: '半天',
          desc: '寒食清明发源地。',
          highlights: ['看抱腹岩', '走天桥栈道'],
          metro: null, get: '介休包车约40分钟' }
      ],
      foods: [
        { name: '平遥牛肉', desc: '咸香耐嚼，平遥特产。' },
        { name: '碗托', desc: '荞面蒸制的凉食，酸辣爽口。' },
        { name: '莜面栲栳栳', desc: '晋北莜面卷，蘸酱吃。' }
      ],
      tips: '平遥古城可逛一天；乔家、王家大院各需半天，可择一参观。'
    },

    '济南': {
      name: '济南', province: '山东省', type: 'city', region: '华东',
      lat: 36.6512, lng: 117.1201,
      overview: '泉城，趵突泉、大明湖与千佛山，家家泉水。',
      attractions: [
        { name: '趵突泉', lat: 36.6640, lng: 117.0080, category: '自然', duration: '2小时',
          desc: '天下第一泉，泉水喷涌。',
          highlights: ['看趵突泉三股水', '逛李清照纪念堂', '看泉水锦鲤'],
          metro: null, get: '泉城广场附近，公交/打车可达' },
        { name: '大明湖', lat: 36.6710, lng: 117.0160, category: '自然', duration: '2小时',
          desc: '城中湖泊，夏雨荷的浪漫。',
          highlights: ['乘船游湖', '看历下亭', '沿湖散步赏荷花'],
          metro: null, get: '与趵突泉相邻，公交可达' },
        { name: '千佛山', lat: 36.6440, lng: 117.0330, category: '山', duration: '2-3小时',
          desc: '济南三大名胜之一。',
          highlights: ['登顶俯瞰济南城', '看兴国禅寺', '赏万佛洞'],
          metro: null, get: '公交/打车约20分钟' },
        { name: '芙蓉街·曲水亭街', lat: 36.6670, lng: 117.0200, category: '街区', duration: '2小时',
          desc: '老济南泉水人家。',
          highlights: ['吃把子肉、油旋', '看泉水人家院落', '逛文庙'],
          metro: null, get: '泉城路步行可达' },
        { name: '黑虎泉', lat: 36.6660, lng: 117.0220, category: '自然', duration: '1小时',
          desc: '护城河畔，市民打水的地方。',
          highlights: ['看黑虎泉三石虎头', '接泉水品尝'],
          metro: null, get: '护城河边步行可达' }
      ],
      foods: [
        { name: '把子肉', desc: '酱香软烂，配米饭。' },
        { name: '甜沫', desc: '咸香浓稠的济南早餐。' },
        { name: '油旋', desc: '葱油香酥的烧饼。' },
        { name: '九转大肠', desc: '酸甜苦辣咸五味俱全。' }
      ],
      tips: '趵突泉、大明湖、芙蓉街、黑虎泉集中在泉城路一带，可步行串游。'
    },

    '济宁': {
      name: '济宁', province: '山东省', type: 'historic', region: '华东',
      lat: 35.4150, lng: 116.5870,
      overview: '孔孟之乡，曲阜三孔与微山湖。',
      attractions: [
        { name: '孔庙', lat: 35.5960, lng: 116.9840, category: '历史', duration: '2-3小时',
          desc: '祭祀孔子的祠庙。',
          highlights: ['看大成殿与杏坛', '看十三碑亭', '感受儒家文化'],
          metro: null, get: '曲阜市区步行可达' },
        { name: '孔府', lat: 35.5990, lng: 116.9880, category: '历史', duration: '1-2小时',
          desc: '孔子后裔的府邸。',
          highlights: ['看衍圣公府建筑', '逛后花园'],
          metro: null, get: '与孔庙相邻' },
        { name: '孔林', lat: 35.6150, lng: 116.9930, category: '历史', duration: '2小时',
          desc: '孔子及后裔的家族墓地。',
          highlights: ['看孔子墓', '走神道古柏林'],
          metro: null, get: '孔庙北行约1公里' },
        { name: '尼山圣境', lat: 35.5250, lng: 117.1800, category: '文化', duration: '半天',
          desc: '孔子诞生地，大学堂与孔子像。',
          highlights: ['看72米孔子像', '看《金声玉振》演出'],
          metro: null, get: '曲阜包车/班车约30分钟' },
        { name: '微山湖', lat: 34.8600, lng: 117.1200, category: '自然', duration: '半天',
          desc: '北方最大淡水湖，荷花与铁道游击队。',
          highlights: ['乘船赏荷花', '看微山岛'],
          metro: null, get: '济宁乘车约1小时' }
      ],
      foods: [
        { name: '孔府宴', desc: '儒家文化宴席，讲究礼仪。' },
        { name: '曲阜煎饼', desc: '卷大葱蘸酱，山东味。' },
        { name: '熏豆腐', desc: '曲阜特色豆制品。' }
      ],
      tips: '三孔集中在曲阜老城，可一日游；尼山圣境需半天。'
    },

    '泰安': {
      name: '泰安', province: '山东省', type: 'mountain', region: '华东',
      lat: 36.2000, lng: 117.0870,
      overview: '泰山所在地，五岳之首，登顶看日出。',
      attractions: [
        { name: '泰山风景区', lat: 36.2560, lng: 117.1000, category: '山', duration: '1天',
          desc: '五岳之首，登顶看日出。',
          highlights: ['夜爬/清晨登玉皇顶', '看十八盘', '观日出云海'],
          metro: null, get: '泰安站乘旅游专线/打车至红门' },
        { name: '岱庙', lat: 36.1920, lng: 117.1250, category: '历史', duration: '2小时',
          desc: '泰山第一行宫，帝王封禅地。',
          highlights: ['看天贶殿壁画', '看汉柏与石碑'],
          metro: null, get: '泰安市区步行可达' },
        { name: '天外村', lat: 36.2100, lng: 117.1000, category: '山', duration: '1-2小时',
          desc: '登山起点，可乘车至中天门。',
          highlights: ['乘车上山省体力', '看黑龙潭'],
          metro: null, get: '市区打车约10分钟' }
      ],
      foods: [
        { name: '泰山三美', desc: '白菜豆腐水，清淡鲜美。' },
        { name: '煎饼卷大葱', desc: '山东特色主食。' },
        { name: '泰山赤鳞鱼', desc: '泰山名产，肉质细嫩。' }
      ],
      tips: '登山可选红门步行或天外村乘车；看日出需凌晨出发并注意保暖。'
    },

    '黄山': {
      name: '黄山', province: '安徽省', type: 'mountain', region: '华东',
      lat: 29.7147, lng: 118.3376,
      overview: '天下第一奇山，奇松怪石云海温泉，徽派古村环绕。',
      attractions: [
        { name: '黄山风景区', lat: 30.1320, lng: 118.1660, category: '山', duration: '1-2天',
          desc: '天下第一奇山，奇松怪石云海温泉。',
          highlights: ['登光明顶看日出', '看迎客松', '走西海大峡谷'],
          metro: null, get: '黄山北站乘大巴约1小时' },
        { name: '宏村', lat: 30.0040, lng: 117.9840, category: '古镇', duration: '半天',
          desc: '画里乡村，徽派建筑与水系。',
          highlights: ['看月沼与南湖', '逛承志堂', '拍写生照'],
          metro: null, get: '黄山/黟县包车约40分钟' },
        { name: '西递', lat: 29.9070, lng: 117.9900, category: '古镇', duration: '2-3小时',
          desc: '世界文化遗产徽派古村落。',
          highlights: ['看牌楼与古民居', '了解徽商文化'],
          metro: null, get: '与宏村相距约20公里' },
        { name: '屯溪老街', lat: 29.7110, lng: 118.3380, category: '街区', duration: '2小时',
          desc: '黄山市区明清老街。',
          highlights: ['逛徽州老店', '吃毛豆腐、臭鳜鱼'],
          metro: null, get: '黄山市区步行可达' }
      ],
      foods: [
        { name: '臭鳜鱼', desc: '徽菜名品，闻臭吃香。' },
        { name: '毛豆腐', desc: '发酵豆腐，煎制蘸酱。' },
        { name: '徽州烧饼', desc: '梅干菜肉馅，酥脆。' }
      ],
      tips: '黄山门票需预约；山上住宿紧张，看日出建议住山顶。'
    },

    '洛阳': {
      name: '洛阳', province: '河南省', type: 'historic', region: '华中',
      lat: 34.6197, lng: 112.4540,
      overview: '十三朝古都，龙门石窟与牡丹花城。',
      attractions: [
        { name: '龙门石窟', lat: 34.5590, lng: 112.4680, category: '历史', duration: '半天',
          desc: '石刻艺术宝库，卢舍那大佛。',
          highlights: ['看奉先寺卢舍那大佛', '看万佛洞', '夜游龙门'],
          metro: null, get: '市区公交/打车约30分钟' },
        { name: '白马寺', lat: 34.7150, lng: 112.6000, category: '寺庙', duration: '2小时',
          desc: '中国第一古刹。',
          highlights: ['看齐云塔与白马', '逛缅甸/印度风格佛殿'],
          metro: null, get: '市区公交约40分钟' },
        { name: '洛阳博物馆', lat: 34.6710, lng: 112.4480, category: '博物馆', duration: '2小时',
          desc: '十三朝古都的珍宝。',
          highlights: ['看三彩黑釉马等镇馆之宝', '了解河洛文明'],
          metro: null, get: '市区公交可达' },
        { name: '丽景门·老城', lat: 34.6860, lng: 112.4680, category: '街区', duration: '2小时',
          desc: '洛阳老城与十字街夜市。',
          highlights: ['登丽景门', '吃洛阳水席', '逛十字街'],
          metro: null, get: '市区步行/公交' },
        { name: '洛邑古城', lat: 34.6800, lng: 112.4850, category: '街区', duration: '2小时',
          desc: '仿古街区，汉服打卡。',
          highlights: ['穿汉服拍照', '看文峰塔灯光'],
          metro: null, get: '市区公交可达' }
      ],
      foods: [
        { name: '洛阳水席', desc: '24道汤菜，牡丹燕菜是头菜。' },
        { name: '牛肉汤', desc: '洛阳人的早餐灵魂。' },
        { name: '不翻汤', desc: '酸辣开胃的老城小吃。' },
        { name: '牡丹饼', desc: '以牡丹入馅的花香点心。' }
      ],
      tips: '龙门石窟需提前预约；4月牡丹花会期间住宿紧张。'
    },

    '开封': {
      name: '开封', province: '河南省', type: 'historic', region: '华中',
      lat: 34.7970, lng: 114.3070,
      overview: '八朝古都，清明上河园与大宋文化。',
      attractions: [
        { name: '清明上河园', lat: 34.8200, lng: 114.3400, category: '主题', duration: '半天',
          desc: '仿《清明上河图》的宋代园林。',
          highlights: ['看水上实景演出', '逛宋代街市', '看斗鸡杂耍'],
          metro: null, get: '市区公交可达' },
        { name: '开封府', lat: 34.7960, lng: 114.3550, category: '历史', duration: '2小时',
          desc: '包公断案的开封府衙。',
          highlights: ['看包公升堂表演', '逛府衙建筑'],
          metro: null, get: '市区公交可达' },
        { name: '大相国寺', lat: 34.7980, lng: 114.3490, category: '寺庙', duration: '1-2小时',
          desc: '北宋皇家寺院。',
          highlights: ['看千手千眼观音', '看八角琉璃殿'],
          metro: null, get: '市区步行/公交' },
        { name: '铁塔公园', lat: 34.8230, lng: 114.3630, category: '历史', duration: '1-2小时',
          desc: '开封铁塔，千年不倒。',
          highlights: ['登铁塔', '看琉璃砖雕'],
          metro: null, get: '市区公交可达' },
        { name: '龙亭公园', lat: 34.8120, lng: 114.3510, category: '历史', duration: '2小时',
          desc: '北宋皇宫遗址。',
          highlights: ['登龙亭看古城', '看潘杨二湖'],
          metro: null, get: '市区公交可达' }
      ],
      foods: [
        { name: '灌汤包', desc: '先开窗后喝汤。' },
        { name: '桶子鸡', desc: '咸香有嚼劲。' },
        { name: '炒凉粉', desc: '夜市名小吃。' },
        { name: '花生糕', desc: '酥香传统点心。' }
      ],
      tips: '清明上河园演出场次多；开封景点集中在老城区，可串游。'
    },

    '张家界': {
      name: '张家界', province: '湖南省', type: 'mountain', region: '华中',
      lat: 29.1170, lng: 110.4790,
      overview: '三千奇峰，阿凡达悬浮山取景地。',
      attractions: [
        { name: '张家界国家森林公园', lat: 29.3170, lng: 110.4430, category: '山', duration: '1-2天',
          desc: '三千奇峰，阿凡达悬浮山取景地。',
          highlights: ['看袁家界乾坤柱', '走金鞭溪', '登天子山'],
          metro: null, get: '市区乘旅游专线约1小时' },
        { name: '天门山', lat: 29.0480, lng: 110.4830, category: '山', duration: '半天',
          desc: '天门洞与玻璃栈道。',
          highlights: ['乘世界最长索道', '走玻璃栈道', '看天门洞'],
          metro: null, get: '市区步行至索道站' },
        { name: '张家界大峡谷', lat: 29.4300, lng: 110.6670, category: '山', duration: '半天',
          desc: '玻璃桥与峡谷。',
          highlights: ['走云天渡玻璃桥', '看峡谷瀑布'],
          metro: null, get: '市区包车约1小时' },
        { name: '黄龙洞', lat: 29.2900, lng: 110.5100, category: '溶洞', duration: '2小时',
          desc: '溶洞奇观，地下河。',
          highlights: ['乘船游地下河', '看石笋钟乳石'],
          metro: null, get: '武陵源景区附近' }
      ],
      foods: [
        { name: '三下锅', desc: '腊肉、豆腐、萝卜同锅。' },
        { name: '岩耳炖鸡', desc: '悬崖岩耳炖土鸡。' },
        { name: '葛根粉', desc: '清热解暑的地方小吃。' }
      ],
      tips: '森林公园、天门山、大峡谷均需预约购票；建议住武陵源区。'
    },

    '南宁': {
      name: '南宁', province: '广西壮族自治区', type: 'city', region: '华南',
      lat: 22.8170, lng: 108.3665,
      overview: '绿城南宁，青秀山与东盟风情。',
      attractions: [
        { name: '青秀山', lat: 22.7860, lng: 108.3860, category: '自然', duration: '半天',
          desc: '南宁绿肺，俯瞰邕江。',
          highlights: ['登龙象塔看城市', '逛兰园', '看南湖'],
          metro: { line: '地铁3号线', station: '青秀山站', walk: '约500米' } },
        { name: '南湖公园', lat: 22.8160, lng: 108.3600, category: '公园', duration: '2小时',
          desc: '城中湖，散步骑行。',
          highlights: ['环湖散步', '看夜景'],
          metro: null, get: '市区公交可达' },
        { name: '广西民族博物馆', lat: 22.7860, lng: 108.4190, category: '博物馆', duration: '2小时',
          desc: '铜鼓与民族风情。',
          highlights: ['看铜鼓王', '了解壮族文化'],
          metro: null, get: '市区公交可达' },
        { name: '中山路夜市', lat: 22.8180, lng: 108.3180, category: '街区', duration: '2小时',
          desc: '南宁夜市，老友粉酸嘢。',
          highlights: ['吃老友粉', '尝酸嘢', '逛夜市'],
          metro: null, get: '市区步行可达' }
      ],
      foods: [
        { name: '老友粉', desc: '酸辣鲜香，南宁代表。' },
        { name: '螺蛳粉', desc: '酸笋汤底，柳州传入。' },
        { name: '柠檬鸭', desc: '酸香开胃的南宁菜。' },
        { name: '酸嘢', desc: '腌制水果，酸甜解腻。' }
      ],
      tips: '青秀山地铁可达；中山路夜市晚上最热闹。'
    },

    '海口': {
      name: '海口', province: '海南省', type: 'coastal', region: '华南',
      lat: 20.0440, lng: 110.1999,
      overview: '椰城海口，骑楼老街与滨海休闲。',
      attractions: [
        { name: '骑楼老街', lat: 20.0460, lng: 110.3440, category: '街区', duration: '2小时',
          desc: '南洋骑楼建筑群。',
          highlights: ['看骑楼建筑', '吃清补凉、海南粉'],
          metro: null, get: '市区步行可达' },
        { name: '假日海滩', lat: 20.0330, lng: 110.3260, category: '海滩', duration: '半天',
          desc: '海口海滨浴场。',
          highlights: ['游泳踏浪', '看日落'],
          metro: null, get: '公交/打车' },
        { name: '火山口公园', lat: 19.9360, lng: 110.2140, category: '自然', duration: '2-3小时',
          desc: '雷琼火山群地质。',
          highlights: ['看火山口', '逛火山村落'],
          metro: null, get: '市区打车约40分钟' },
        { name: '五公祠', lat: 20.0120, lng: 110.3720, category: '历史', duration: '1小时',
          desc: '纪念唐代五公的祠堂。',
          highlights: ['看古建筑与碑刻'],
          metro: null, get: '市区公交可达' }
      ],
      foods: [
        { name: '海南粉', desc: '细粉配卤汁，海口早餐。' },
        { name: '清补凉', desc: '椰奶配红豆薏米，消暑。' },
        { name: '椰子鸡', desc: '椰青水煮鸡，清甜。' },
        { name: '文昌鸡', desc: '海南四大名菜之一。' }
      ],
      tips: '骑楼老街与假日海滩可串联；海口是进出海南的门户。'
    },

    '昆明': {
      name: '昆明', province: '云南省', type: 'city', region: '西南',
      lat: 25.0389, lng: 102.7183,
      overview: '春城昆明，石林与滇池，四季如春。',
      attractions: [
        { name: '石林', lat: 24.8200, lng: 103.3220, category: '自然', duration: '1天',
          desc: '喀斯特石林奇观。',
          highlights: ['看阿诗玛石峰', '逛大小石林'],
          metro: null, get: '昆明乘高铁/大巴约1.5小时' },
        { name: '滇池·海埂大坝', lat: 24.9600, lng: 102.6700, category: '湖泊', duration: '半天',
          desc: '高原明珠，冬季喂红嘴鸥。',
          highlights: ['海埂大坝喂海鸥', '看西山睡美人'],
          metro: null, get: '公交/打车约30分钟' },
        { name: '翠湖公园', lat: 25.0470, lng: 102.7070, category: '公园', duration: '1-2小时',
          desc: '昆明城心公园。',
          highlights: ['冬季看海鸥', '赏荷花'],
          metro: null, get: '市区步行可达' },
        { name: '西山龙门', lat: 24.9500, lng: 102.6300, category: '山', duration: '半天',
          desc: '龙门石窟与滇池全景。',
          highlights: ['登龙门看滇池', '坐索道'],
          metro: null, get: '公交/打车' },
        { name: '云南民族村', lat: 24.9700, lng: 102.6600, category: '主题', duration: '半天',
          desc: '25个民族风情。',
          highlights: ['看民族歌舞', '逛村寨'],
          metro: null, get: '海埂附近公交可达' }
      ],
      foods: [
        { name: '过桥米线', desc: '云南名吃，滚汤烫熟。' },
        { name: '汽锅鸡', desc: '汽锅蒸制，汤鲜肉嫩。' },
        { name: '野生菌', desc: '夏季云南限定。' },
        { name: '鲜花饼', desc: '玫瑰花瓣入馅。' }
      ],
      tips: '石林距市区约80公里；冬季滇池海埂大坝海鸥成群。'
    },

    '贵阳': {
      name: '贵阳', province: '贵州省', type: 'city', region: '西南',
      lat: 26.6470, lng: 106.6302,
      overview: '避暑之都，黔灵山与酸辣黔味。',
      attractions: [
        { name: '甲秀楼', lat: 26.5740, lng: 106.7090, category: '地标', duration: '1小时',
          desc: '南明河上明代名楼。',
          highlights: ['看甲秀楼夜景', '逛南明河畔'],
          metro: null, get: '市区步行可达' },
        { name: '黔灵山公园', lat: 26.5980, lng: 106.6990, category: '公园', duration: '2-3小时',
          desc: '城中公园，看猕猴。',
          highlights: ['看野生猕猴', '登黔灵山', '看弘福寺'],
          metro: null, get: '市区公交可达' },
        { name: '青岩古镇', lat: 26.3400, lng: 106.6790, category: '古镇', duration: '半天',
          desc: '明清军事古镇。',
          highlights: ['走青石板街', '吃卤猪脚、玫瑰糖'],
          metro: null, get: '市区包车/公交约1小时' },
        { name: '天河潭', lat: 26.4480, lng: 106.6020, category: '自然', duration: '2-3小时',
          desc: '溶洞与瀑布。',
          highlights: ['乘船游溶洞', '看瀑布'],
          metro: null, get: '市区包车约40分钟' }
      ],
      foods: [
        { name: '丝娃娃', desc: '薄饼卷菜，蘸酸汤。' },
        { name: '肠旺面', desc: '肥肠血旺面，贵阳代表。' },
        { name: '酸汤鱼', desc: '苗家酸汤煮鱼。' },
        { name: '恋爱豆腐果', desc: '烤豆腐夹折耳根。' }
      ],
      tips: '夏季凉爽避暑；黔灵山猕猴较多，注意保管食物。'
    },

    '乐山': {
      name: '乐山', province: '四川省', type: 'mountain', region: '西南',
      lat: 29.5521, lng: 103.7656,
      overview: '乐山大佛与峨眉山，佛国仙山。',
      attractions: [
        { name: '乐山大佛', lat: 29.5470, lng: 103.7690, category: '历史', duration: '半天',
          desc: '世界最大石刻坐佛。',
          highlights: ['看71米大佛', '走九曲栈道', '乘船看全貌'],
          metro: null, get: '乐山市区公交可达' },
        { name: '峨眉山', lat: 29.5190, lng: 103.3310, category: '山', duration: '1-2天',
          desc: '佛教四大名山，金顶云海。',
          highlights: ['登金顶看十方普贤', '看日出云海', '看灵猴'],
          metro: null, get: '乐山乘车约40分钟，或乘观光车/索道' },
        { name: '东方佛都', lat: 29.5430, lng: 103.7740, category: '文化', duration: '2小时',
          desc: '与乐山大佛相邻的佛像群。',
          highlights: ['看千佛洞'],
          metro: null, get: '与乐山大佛相邻' }
      ],
      foods: [
        { name: '跷脚牛肉', desc: '牛杂清汤锅，乐山名吃。' },
        { name: '甜皮鸭', desc: '外皮甜脆，乐山特色。' },
        { name: '乐山烧烤', desc: '串串烧烤，夜宵首选。' },
        { name: '峨眉雪芽', desc: '峨眉山名茶。' }
      ],
      tips: '乐山大佛与峨眉山可安排两天；峨眉山金顶看日出需住山上。'
    },

    '迪庆': {
      name: '迪庆', province: '云南省', type: 'mountain', region: '西南',
      lat: 27.8250, lng: 99.7030,
      overview: '香格里拉，藏区高原风光。',
      attractions: [
        { name: '独克宗古城', lat: 27.8240, lng: 99.7040, category: '古城', duration: '2小时',
          desc: '月光之城，藏式古城。',
          highlights: ['转世界最大转经筒', '逛藏式老屋'],
          metro: null, get: '香格里拉市区步行可达' },
        { name: '松赞林寺', lat: 27.8600, lng: 99.6920, category: '寺庙', duration: '2小时',
          desc: '小布达拉宫。',
          highlights: ['看金顶与大殿', '了解藏传佛教'],
          metro: null, get: '市区打车约15分钟' },
        { name: '普达措国家公园', lat: 27.8800, lng: 99.8900, category: '自然', duration: '半天',
          desc: '高原湖泊与草甸。',
          highlights: ['看属都湖、碧塔海', '走栈道看湿地'],
          metro: null, get: '市区包车约40分钟' },
        { name: '纳帕海', lat: 27.8800, lng: 99.6700, category: '湖泊', duration: '2小时',
          desc: '季节性高原湖泊湿地。',
          highlights: ['环湖看草原', '骑马'],
          metro: null, get: '市区包车约30分钟' }
      ],
      foods: [
        { name: '牦牛肉火锅', desc: '高原牦牛肉，暖身。' },
        { name: '酥油茶', desc: '抵御高原的传统饮品。' },
        { name: '藏式酸奶', desc: '浓稠酸香。' }
      ],
      tips: '海拔约3300米，注意高反与防晒；早晚温差大。'
    },

    '阿坝': {
      name: '阿坝', province: '四川省', type: 'mountain', region: '西南',
      lat: 31.8990, lng: 102.2240,
      overview: '九寨沟与黄龙，川西北高原秘境。',
      attractions: [
        { name: '九寨沟', lat: 33.2600, lng: 103.9180, category: '自然', duration: '1-2天',
          desc: '人间仙境，翠海叠瀑彩林。',
          highlights: ['看五花海、五彩池', '看诺日朗瀑布', '走树正沟'],
          metro: null, get: '成都乘高铁/大巴，或飞机至九黄机场' },
        { name: '黄龙', lat: 32.7500, lng: 103.8300, category: '自然', duration: '半天',
          desc: '彩池钙华奇观。',
          highlights: ['看五彩池', '走栈道看钙华池'],
          metro: null, get: '九寨沟乘车约2小时' },
        { name: '若尔盖草原', lat: 33.5800, lng: 102.9600, category: '自然', duration: '半天',
          desc: '川西北大草原。',
          highlights: ['看花湖', '骑马'],
          metro: null, get: '包车前往' }
      ],
      foods: [
        { name: '藏餐', desc: '糌粑、酥油茶。' },
        { name: '牦牛肉', desc: '高原特产。' },
        { name: '青稞饼', desc: '高原主食。' }
      ],
      tips: '九寨沟、黄龙均需提前预约；海拔较高，注意高反。'
    },

    '兰州': {
      name: '兰州', province: '甘肃省', type: 'city', region: '西北',
      lat: 36.0611, lng: 103.8343,
      overview: '黄河穿城，牛肉面与黄河风情线。',
      attractions: [
        { name: '中山桥', lat: 36.0640, lng: 103.8200, category: '地标', duration: '1小时',
          desc: '黄河第一桥。',
          highlights: ['走过百年铁桥', '看黄河与白塔山'],
          metro: { line: '地铁1号线', station: '西关站', walk: '约600米' } },
        { name: '白塔山公园', lat: 36.0650, lng: 103.8140, category: '公园', duration: '2小时',
          desc: '俯瞰兰州城。',
          highlights: ['登白塔山看城市', '看白塔'],
          metro: null, get: '中山桥北侧' },
        { name: '黄河母亲雕塑', lat: 36.0710, lng: 103.8360, category: '地标', duration: '1小时',
          desc: '兰州标志性雕塑。',
          highlights: ['打卡黄河母亲'],
          metro: null, get: '滨河路步行可达' },
        { name: '甘肃省博物馆', lat: 36.0640, lng: 103.7730, category: '博物馆', duration: '2小时',
          desc: '铜奔马出土地。',
          highlights: ['看马踏飞燕(铜奔马)', '看彩陶'],
          metro: { line: '地铁1号线', station: '西站十字站', walk: '约500米' } },
        { name: '正宁路夜市', lat: 36.0580, lng: 103.8260, category: '街区', duration: '2小时',
          desc: '兰州夜市，牛奶鸡蛋醪糟。',
          highlights: ['吃牛奶鸡蛋醪糟', '吃烤串、酿皮'],
          metro: null, get: '市区步行可达' }
      ],
      foods: [
        { name: '兰州牛肉面', desc: '一清二白三红四绿五黄。' },
        { name: '酿皮', desc: '酸辣爽滑的凉皮。' },
        { name: '牛奶鸡蛋醪糟', desc: '夜市人气甜品。' },
        { name: '灰豆子', desc: '豆香浓郁的甜汤。' }
      ],
      tips: '中山桥、白塔山、黄河母亲沿黄河风情线可步行串游。'
    },

    '西宁': {
      name: '西宁', province: '青海省', type: 'city', region: '西北',
      lat: 36.6171, lng: 101.7782,
      overview: '高原古城，塔尔寺与青海湖门户。',
      attractions: [
        { name: '塔尔寺', lat: 36.4760, lng: 101.5830, category: '寺庙', duration: '半天',
          desc: '藏传佛教格鲁派六大寺。',
          highlights: ['看酥油花、壁画、堆绣', '转经筒'],
          metro: null, get: '西宁乘车约30分钟' },
        { name: '东关清真大寺', lat: 36.6160, lng: 101.7950, category: '寺庙', duration: '1小时',
          desc: '西北最大清真寺。',
          highlights: ['看清真寺建筑'],
          metro: null, get: '市区步行可达' },
        { name: '青海省博物馆', lat: 36.6180, lng: 101.7780, category: '博物馆', duration: '2小时',
          desc: '了解青海历史。',
          highlights: ['看民族文物'],
          metro: null, get: '市区公交可达' },
        { name: '莫家街', lat: 36.6200, lng: 101.7920, category: '街区', duration: '2小时',
          desc: '西宁美食街。',
          highlights: ['吃手抓羊肉、酸奶', '吃酿皮'],
          metro: null, get: '市区步行可达' }
      ],
      foods: [
        { name: '手抓羊肉', desc: '青海羊肉，鲜嫩。' },
        { name: '青海老酸奶', desc: '浓稠酸甜。' },
        { name: '酿皮', desc: '西北凉皮。' },
        { name: '尕面片', desc: '青海面食。' }
      ],
      tips: '西宁是青海湖、茶卡盐湖的出发地；市区海拔约2260米。'
    },

    '酒泉': {
      name: '酒泉', province: '甘肃省', type: 'historic', region: '西北',
      lat: 39.7320, lng: 98.4940,
      overview: '敦煌莫高窟与鸣沙山，丝路明珠。',
      attractions: [
        { name: '莫高窟', lat: 40.0370, lng: 94.8110, category: '历史', duration: '半天',
          desc: '世界文化遗产，石窟艺术宝库。',
          highlights: ['看九层楼与藏经洞', '看壁画与彩塑(需预约)'],
          metro: null, get: '敦煌市区乘车约25分钟，需提前预约' },
        { name: '鸣沙山月牙泉', lat: 40.0880, lng: 94.6680, category: '自然', duration: '半天',
          desc: '沙漠与泉水共生。',
          highlights: ['骑骆驼', '滑沙', '看月牙泉日落'],
          metro: null, get: '市区乘车约15分钟' },
        { name: '玉门关', lat: 40.3530, lng: 93.8640, category: '历史', duration: '2小时',
          desc: '丝绸之路关隘。',
          highlights: ['看汉代关城遗址'],
          metro: null, get: '敦煌包车约1.5小时' },
        { name: '雅丹魔鬼城', lat: 40.5400, lng: 93.1800, category: '自然', duration: '半天',
          desc: '雅丹地貌。',
          highlights: ['看风蚀地貌', '看日落'],
          metro: null, get: '敦煌包车约2小时' },
        { name: '沙洲夜市', lat: 40.1400, lng: 94.6650, category: '街区', duration: '2小时',
          desc: '敦煌夜市。',
          highlights: ['吃驴肉黄面', '买夜光杯'],
          metro: null, get: '市区步行可达' }
      ],
      foods: [
        { name: '驴肉黄面', desc: '敦煌特色面食。' },
        { name: '杏皮水', desc: '杏干熬制，解暑。' },
        { name: '敦煌臊子面', desc: '酸香面食。' }
      ],
      tips: '莫高窟门票需提前数日预约；鸣沙山日落时分最美。'
    }
  };
})(window);
