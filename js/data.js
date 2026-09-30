/* ============================================================
 * 本地知识库：热门目的地（景点坐标、美食、类型等）
 * 纯静态、离线可用；未收录目的地会走「通用生成」逻辑。
 * ============================================================ */
(function (global) {
  'use strict';

  /**
   * type 说明：
   *  - city      城市 / 都市
   *  - historic  历史文化名城
   *  - coastal   海滨城市
   *  - beach     海滨度假（热带海岛）
   *  - mountain  山水 / 高原 / 自然
   *  - oldtown   古城古镇
   */
  var DB = {
    '北京': {
      name: '北京', province: '北京市', type: 'historic', region: '华北',
      lat: 39.9042, lng: 116.4074,
      overview: '六朝古都，历史与现代交融，故宫、长城、胡同是必打卡的文化符号。',
      attractions: [
        { name: '故宫博物院', lat: 39.9163, lng: 116.3972, category: '历史', duration: '3-4小时', desc: '明清两代皇宫，世界现存规模最大的木结构古建筑群，红墙黄瓦气势恢宏。' },
        { name: '天安门广场', lat: 39.9087, lng: 116.3975, category: '地标', duration: '1-2小时', desc: '首都中心广场，看升旗、人民英雄纪念碑、国家博物馆。' },
        { name: '八达岭长城', lat: 40.3592, lng: 116.0202, category: '历史', duration: '半天', desc: '“不到长城非好汉”，山势险峻、视野开阔，是长城最具代表性的一段。' },
        { name: '颐和园', lat: 39.9996, lng: 116.2755, category: '园林', duration: '3小时', desc: '皇家园林，昆明湖与万寿山相映成趣，长廊彩绘精美。' },
        { name: '天坛公园', lat: 39.8822, lng: 116.4066, category: '历史', duration: '2小时', desc: '明清皇帝祭天祈谷之所，祈年殿是北京的标志性建筑。' }
      ],
      foods: [
        { name: '北京烤鸭', desc: '皮脆肉嫩，配薄饼、甜面酱、葱丝，代表名店全聚德、便宜坊。' },
        { name: '老北京炸酱面', desc: '手擀面配黄酱肉丁炸酱与菜码，咸香浓郁。' },
        { name: '豆汁儿配焦圈', desc: '地道老北京风味，酸香独特，值得一试。' },
        { name: '卤煮火烧', desc: '猪肠、火烧、豆腐同煮，酱香醇厚，胡同里的烟火气。' }
      ],
      tips: '故宫需提前线上预约；长城可乘市郊铁路或公交前往，建议早出避峰。'
    },

    '上海': {
      name: '上海', province: '上海市', type: 'city', region: '华东',
      lat: 31.2304, lng: 121.4737,
      overview: '国际大都会，外滩万国建筑与陆家嘴天际线同框，弄堂市井与时尚潮流并存。',
      attractions: [
        { name: '外滩', lat: 31.2400, lng: 121.4900, category: '地标', duration: '1-2小时', desc: '黄浦江畔万国建筑群，隔江对望陆家嘴“三件套”，夜景最佳。' },
        { name: '东方明珠', lat: 31.2397, lng: 121.4998, category: '地标', duration: '2小时', desc: '上海标志性电视塔，透明悬空观光廊俯瞰全城。' },
        { name: '豫园', lat: 31.2274, lng: 121.4921, category: '园林', duration: '2小时', desc: '明代江南园林，九曲桥、湖心亭与城隍庙小吃街相邻。' },
        { name: '上海迪士尼乐园', lat: 31.1433, lng: 121.6574, category: '乐园', duration: '1天', desc: '内地首座迪士尼，奇幻童话城堡、花车巡游与烟花秀。' },
        { name: '田子坊', lat: 31.2118, lng: 121.4692, category: '街区', duration: '2小时', desc: '石库门里弄改造的创意街区，手作小店与咖啡馆林立。' }
      ],
      foods: [
        { name: '南翔小笼包', desc: '皮薄汁多，先开窗后喝汤，城隍庙排队名吃。' },
        { name: '生煎馒头', desc: '底脆、汁鲜、肉香，配咖喱牛肉汤更地道。' },
        { name: '本帮红烧肉', desc: '浓油赤酱，入口即化，甜咸适口。' },
        { name: '葱油拌面', desc: '葱香四溢的简单美味，上海人的家常味道。' }
      ],
      tips: '地铁网络发达，建议公共交通出行；外滩夜景约18:00后亮灯。'
    },

    '杭州': {
      name: '杭州', province: '浙江省', type: 'city', region: '华东',
      lat: 30.2741, lng: 120.1551,
      overview: '“上有天堂，下有苏杭”，西湖山水、茶园灵隐，温润江南的代表。',
      attractions: [
        { name: '西湖', lat: 30.2433, lng: 120.1433, category: '自然', duration: '半天', desc: '苏堤春晓、断桥残雪、三潭印月，环湖十景步步皆画。' },
        { name: '灵隐寺', lat: 30.2400, lng: 120.0975, category: '寺庙', duration: '2-3小时', desc: '千年古刹，飞来峰石窟造像精美，香火鼎盛。' },
        { name: '雷峰塔', lat: 30.2305, lng: 120.1470, category: '历史', duration: '1-2小时', desc: '《白蛇传》传说地，登塔俯瞰西湖全景。' },
        { name: '西溪国家湿地公园', lat: 30.2720, lng: 120.0610, category: '自然', duration: '3小时', desc: '城中湿地，摇橹船穿行芦苇荡，清幽宜人。' },
        { name: '龙井村', lat: 30.2190, lng: 120.1060, category: '茶园', duration: '2小时', desc: '西湖龙井产地，茶园叠翠，可品明前新茶。' }
      ],
      foods: [
        { name: '西湖醋鱼', desc: '草鱼烹制，酸甜鲜嫩，杭帮菜代表。' },
        { name: '东坡肉', desc: '肥而不腻，酥烂醇香，以黄酒慢炖。' },
        { name: '龙井虾仁', desc: '龙井茶香配河虾仁，清鲜爽口。' },
        { name: '定胜糕', desc: '软糯米糕，寓意吉祥，湖滨老字号有售。' }
      ],
      tips: '西湖景区建议骑行或步行；旺季灵隐寺、雷峰塔需提前预约。'
    },

    '成都': {
      name: '成都', province: '四川省', type: 'city', region: '西南',
      lat: 30.5728, lng: 104.0668,
      overview: '天府之国、美食之都，慢生活的代名词，火锅、熊猫与茶馆文化令人流连。',
      attractions: [
        { name: '成都大熊猫繁育研究基地', lat: 30.7330, lng: 104.1460, category: '动物', duration: '半天', desc: '看国宝大熊猫吃竹玩耍，建议上午前往，熊猫最活跃。' },
        { name: '宽窄巷子', lat: 30.6667, lng: 104.0550, category: '街区', duration: '2小时', desc: '宽巷子、窄巷子、井巷子，明清老街里的川西院落与小吃。' },
        { name: '武侯祠·锦里', lat: 30.6486, lng: 104.0470, category: '历史', duration: '2-3小时', desc: '纪念诸葛亮的祠庙，隔壁锦里古街红灯笼夜景很有氛围。' },
        { name: '杜甫草堂', lat: 30.6630, lng: 104.0260, category: '历史', duration: '2小时', desc: '诗圣杜甫故居，园林清幽，茅屋与诗碑引人怀古。' },
        { name: '都江堰', lat: 31.0020, lng: 103.6180, category: '工程', duration: '半天', desc: '两千多年的无坝引水工程，至今仍灌溉成都平原。' }
      ],
      foods: [
        { name: '四川火锅', desc: '牛油红锅麻辣鲜香，毛肚、黄喉、鸭肠是标配。' },
        { name: '串串香', desc: '竹签串菜，按签计费，街头巷尾的平民美食。' },
        { name: '担担面', desc: '肉臊、花生碎、红油拌面，麻辣开胃。' },
        { name: '兔头', desc: '五香与麻辣双味，本地人的夜宵心头好。' }
      ],
      tips: '市区公共交通便利；熊猫基地距市区约10公里，可地铁+接驳车。'
    },

    '重庆': {
      name: '重庆', province: '重庆市', type: 'city', region: '西南',
      lat: 29.5630, lng: 106.5516,
      overview: '8D魔幻山城，江景、夜景与麻辣火锅闻名，轻轨穿楼、立体交通独具魅力。',
      attractions: [
        { name: '洪崖洞', lat: 29.5630, lng: 106.5820, category: '街区', duration: '2小时', desc: '吊脚楼建筑群，夜晚灯火璀璨如《千与千寻》场景。' },
        { name: '解放碑', lat: 29.5580, lng: 106.5740, category: '地标', duration: '1-2小时', desc: '重庆商业中心与抗战胜利纪功碑，周边商圈繁华。' },
        { name: '磁器口古镇', lat: 29.5800, lng: 106.4480, category: '古镇', duration: '2-3小时', desc: '千年古镇，麻花、陈昌银小吃，青石板街巷。' },
        { name: '长江索道', lat: 29.5560, lng: 106.5860, category: '体验', duration: '1小时', desc: '横跨长江的空中索道，感受山城立体交通。' },
        { name: '武隆天生三桥', lat: 29.4450, lng: 107.7970, category: '自然', duration: '1天', desc: '世界自然遗产，喀斯特天坑地缝，电影《满城尽带黄金甲》取景地。' }
      ],
      foods: [
        { name: '重庆火锅', desc: '九宫格牛油锅，麻辣鲜香，越煮越入味。' },
        { name: '重庆小面', desc: '麻辣鲜香的一碗面，早餐灵魂。' },
        { name: '酸辣粉', desc: '红薯粉条配红油酸汤，酸辣开胃。' },
        { name: '毛血旺', desc: '鸭血、毛肚、午餐肉麻辣一锅，下饭利器。' }
      ],
      tips: '山城坡多，穿舒适平底鞋；洪崖洞免费但人流大，注意错峰。'
    },

    '西安': {
      name: '西安', province: '陕西省', type: 'historic', region: '西北',
      lat: 34.3416, lng: 108.9398,
      overview: '十三朝古都，兵马俑、城墙、钟鼓楼，处处是穿越千年的历史现场。',
      attractions: [
        { name: '秦始皇兵马俑博物馆', lat: 34.3841, lng: 109.2785, category: '历史', duration: '半天', desc: '世界第八大奇迹，数千陶俑气势震撼。' },
        { name: '大雁塔', lat: 34.2180, lng: 108.9640, category: '历史', duration: '2小时', desc: '玄奘译经之地，北广场音乐喷泉夜晚美轮美奂。' },
        { name: '西安城墙', lat: 34.2550, lng: 108.9440, category: '历史', duration: '2-3小时', desc: '保存最完整的古城墙，可骑行环游一周。' },
        { name: '钟鼓楼', lat: 34.2610, lng: 108.9420, category: '地标', duration: '1-2小时', desc: '西安城中心地标，晨钟暮鼓，回民街近在咫尺。' },
        { name: '华清宫', lat: 34.3610, lng: 109.2080, category: '历史', duration: '2-3小时', desc: '唐代皇家温泉行宫，杨贵妃故事与骊山风光。' }
      ],
      foods: [
        { name: '肉夹馍', desc: '腊汁肉夹白吉馍，肥瘦相间、馍酥肉香。' },
        { name: '羊肉泡馍', desc: '手掰馍配羊肉汤，暖胃顶饱的西北风味。' },
        { name: '凉皮', desc: '酸辣爽滑，夏天来一碗最解暑。' },
        { name: 'Biangbiang面', desc: '裤带面配油泼辣子，筋道十足。' }
      ],
      tips: '兵马俑距市区约40公里，可乘游5路公交或地铁+摆渡车。'
    },

    '广州': {
      name: '广州', province: '广东省', type: 'city', region: '华南',
      lat: 23.1291, lng: 113.2644,
      overview: '千年商都、美食天堂，“食在广州”，早茶文化与珠江夜景不容错过。',
      attractions: [
        { name: '广州塔（小蛮腰）', lat: 23.1066, lng: 113.3246, category: '地标', duration: '2小时', desc: '广州新地标，450米观景台与摩天轮俯瞰全城。' },
        { name: '白云山', lat: 23.1820, lng: 113.2940, category: '自然', duration: '半天', desc: '“羊城第一秀”，登摩星岭可眺望市区全景。' },
        { name: '陈家祠', lat: 23.1290, lng: 113.2460, category: '建筑', duration: '1-2小时', desc: '岭南建筑艺术明珠，砖雕、木雕精美绝伦。' },
        { name: '沙面', lat: 23.1080, lng: 113.2430, category: '街区', duration: '1-2小时', desc: '欧陆风情历史街区，百年建筑与老树浓荫。' },
        { name: '长隆旅游度假区', lat: 23.0060, lng: 113.3290, category: '乐园', duration: '1天', desc: '长隆野生动物世界与欢乐世界，亲子游首选。' }
      ],
      foods: [
        { name: '广式早茶', desc: '虾饺、烧卖、凤爪、肠粉，一盅两件叹早茶。' },
        { name: '白切鸡', desc: '皮爽肉滑，蘸姜葱蓉，粤菜经典。' },
        { name: '肠粉', desc: '米浆蒸制，薄滑鲜嫩，浇豉油更香。' },
        { name: '深井烧鹅', desc: '皮脆肉嫩多汁，配酸梅酱解腻。' }
      ],
      tips: '地铁四通八达；珠江夜游可看两岸灯光。'
    },

    '深圳': {
      name: '深圳', province: '广东省', type: 'city', region: '华南',
      lat: 22.5431, lng: 114.0579,
      overview: '年轻活力的创新之城，主题公园、海滨与都市天际线并存。',
      attractions: [
        { name: '世界之窗', lat: 22.5350, lng: 113.9740, category: '乐园', duration: '半天', desc: '浓缩全球著名景观的主题公园，一园游世界。' },
        { name: '欢乐谷', lat: 22.5480, lng: 113.9740, category: '乐园', duration: '1天', desc: '大型游乐场，过山车与水上项目刺激过瘾。' },
        { name: '大梅沙海滨公园', lat: 22.6010, lng: 114.3170, category: '海滨', duration: '半天', desc: '深圳最热闹的免费海滩，游泳踏浪好去处。' },
        { name: '莲花山公园', lat: 22.5480, lng: 114.0590, category: '公园', duration: '2小时', desc: '山顶可俯瞰福田 CBD 天际线，登高远眺。' }
      ],
      foods: [
        { name: '海鲜', desc: '盐田海鲜街现捞现做，生猛新鲜。' },
        { name: '椰子鸡', desc: '椰青水煮文昌鸡，清甜滋补。' },
        { name: '广式烧腊', desc: '烧鹅、叉烧、烧肉，街边烧腊店最地道。' }
      ],
      tips: '地铁覆盖主要景点；大梅沙旺季需预约入场。'
    },

    '南京': {
      name: '南京', province: '江苏省', type: 'historic', region: '华东',
      lat: 32.0603, lng: 118.7969,
      overview: '六朝古都、十朝都会，梧桐大道与秦淮河畔尽显金陵气韵。',
      attractions: [
        { name: '中山陵', lat: 32.0600, lng: 118.8480, category: '历史', duration: '2-3小时', desc: '孙中山先生陵寝，392级石阶庄严肃穆。' },
        { name: '夫子庙·秦淮河', lat: 32.0230, lng: 118.7840, category: '街区', duration: '半天', desc: '秦淮灯影、文庙古建，夜游画舫最有意境。' },
        { name: '总统府', lat: 32.0450, lng: 118.7920, category: '历史', duration: '2小时', desc: '近代史重要遗址，中西合璧建筑群。' },
        { name: '玄武湖', lat: 32.0720, lng: 118.7970, category: '自然', duration: '2小时', desc: '城中湖泊，环湖步道与五洲风光宜人。' },
        { name: '明孝陵', lat: 32.0580, lng: 118.8510, category: '历史', duration: '2小时', desc: '明太祖朱元璋陵寝，神道石象路秋色绝美。' }
      ],
      foods: [
        { name: '盐水鸭', desc: '桂花鸭，皮白肉嫩，咸香清爽。' },
        { name: '鸭血粉丝汤', desc: '鸭血、鸭肠、粉丝，汤鲜味浓。' },
        { name: '牛肉锅贴', desc: '外皮金黄酥脆，肉馅多汁。' },
        { name: '小笼包', desc: '金陵汤包，皮薄汁足。' }
      ],
      tips: '中山陵需预约；秦淮河夜游建议傍晚前往。'
    },

    '武汉': {
      name: '武汉', province: '湖北省', type: 'city', region: '华中',
      lat: 30.5928, lng: 114.3055,
      overview: '九省通衢、江城武汉，长江与汉江交汇，黄鹤楼与热干面名声在外。',
      attractions: [
        { name: '黄鹤楼', lat: 30.5470, lng: 114.3050, category: '地标', duration: '2小时', desc: '“天下江山第一楼”，登楼可望长江与武汉三镇。' },
        { name: '东湖风景区', lat: 30.5590, lng: 114.4100, category: '自然', duration: '半天', desc: '城中大湖，绿道骑行、樱园赏花，四季皆宜。' },
        { name: '户部巷', lat: 30.5490, lng: 114.2980, category: '街区', duration: '1-2小时', desc: '汉味小吃一条街，热干面、豆皮、糊汤粉。' },
        { name: '江汉路步行街', lat: 30.5820, lng: 114.2930, category: '街区', duration: '2小时', desc: '百年商业街，欧式老建筑林立，夜景热闹。' }
      ],
      foods: [
        { name: '热干面', desc: '芝麻酱拌碱水面，武汉人的早餐灵魂。' },
        { name: '周黑鸭/精武鸭脖', desc: '麻辣卤味，追剧夜宵好伴侣。' },
        { name: '三鲜豆皮', desc: '糯米豆皮包鲜肉香菇，外脆内软。' },
        { name: '糊汤粉', desc: '鱼糊汤配米粉，鲜辣暖胃。' }
      ],
      tips: '武汉三镇分散，跨江可乘地铁或轮渡。'
    },

    '厦门': {
      name: '厦门', province: '福建省', type: 'coastal', region: '华东',
      lat: 24.4798, lng: 118.0894,
      overview: '海上花园城市，鼓浪屿琴声、环岛路海风与文艺小巷，浪漫悠闲。',
      attractions: [
        { name: '鼓浪屿', lat: 24.4470, lng: 118.0620, category: '海岛', duration: '1天', desc: '万国建筑博物馆，日光岩、菽庄花园，需乘轮渡上岛。' },
        { name: '厦门大学', lat: 24.4380, lng: 118.1010, category: '校园', duration: '2小时', desc: '依山傍海的美丽校园，芙蓉隧道涂鸦墙是网红打卡点。' },
        { name: '南普陀寺', lat: 24.4430, lng: 118.0950, category: '寺庙', duration: '1-2小时', desc: '闽南名刹，紧邻厦大，可登五老峰看海。' },
        { name: '曾厝垵', lat: 24.4280, lng: 118.1280, category: '街区', duration: '2小时', desc: '环岛路旁的小渔村，文艺小店与小吃云集。' },
        { name: '中山路步行街', lat: 24.4560, lng: 118.0820, category: '街区', duration: '2小时', desc: '骑楼老街，闽南小吃与伴手礼集中地。' }
      ],
      foods: [
        { name: '沙茶面', desc: '沙茶汤底配海鲜、豆腐，浓郁鲜香。' },
        { name: '海蛎煎', desc: '新鲜海蛎配蛋液煎制，外酥里嫩。' },
        { name: '土笋冻', desc: '星虫熬制的胶冻，蘸芥末酱油，清甜Q弹。' },
        { name: '花生汤', desc: '花生熬煮浓汤，加蛋更香，配油条最佳。' }
      ],
      tips: '鼓浪屿船票需提前在官网/公众号预约；岛上靠步行，穿舒适鞋。'
    },

    '青岛': {
      name: '青岛', province: '山东省', type: 'coastal', region: '华东',
      lat: 36.0671, lng: 120.3826,
      overview: '红瓦绿树、碧海蓝天的啤酒之城，海滨栈桥与德式老建筑别具风情。',
      attractions: [
        { name: '栈桥', lat: 36.0600, lng: 120.3200, category: '地标', duration: '1小时', desc: '青岛标志，回澜阁伸入海中，海鸥盘旋。' },
        { name: '八大关', lat: 36.0560, lng: 120.3520, category: '街区', duration: '2小时', desc: '红瓦绿树间遍布各国风格别墅，婚纱照圣地。' },
        { name: '崂山', lat: 36.1900, lng: 120.6200, category: '自然', duration: '1天', desc: '海上第一名山，道教名山，山海相连景色壮阔。' },
        { name: '五四广场', lat: 36.0650, lng: 120.3820, category: '地标', duration: '1小时', desc: '“五月的风”雕塑与奥帆中心相邻，看海好去处。' },
        { name: '青岛啤酒博物馆', lat: 36.0780, lng: 120.3490, category: '博物馆', duration: '2小时', desc: '百年青啤发源地，可品鉴原浆啤酒。' }
      ],
      foods: [
        { name: '青岛啤酒', desc: '原浆扎啤清爽，配海鲜最地道。' },
        { name: '海鲜', desc: '蛤蜊、海螺、螃蟹，辣炒蛤蜊是招牌。' },
        { name: '锅贴', desc: '皮脆馅鲜，海鲜锅贴别有风味。' },
        { name: '脂渣', desc: '五花肉炼油后的香脆小吃。' }
      ],
      tips: '夏季海滨紫外线强，注意防晒；啤酒节期间住宿紧张需提前订。'
    },

    '三亚': {
      name: '三亚', province: '海南省', type: 'beach', region: '华南',
      lat: 18.2528, lng: 109.5119,
      overview: '热带滨海度假胜地，碧海白沙、椰风海韵，冬季避寒首选。',
      attractions: [
        { name: '亚龙湾', lat: 18.2130, lng: 109.6500, category: '海滩', duration: '半天', desc: '“天下第一湾”，海水清澈、沙滩细腻，适合游泳潜水。' },
        { name: '天涯海角', lat: 18.2960, lng: 109.3530, category: '地标', duration: '2小时', desc: '“天涯”“海角”巨石，浪漫的地标打卡点。' },
        { name: '蜈支洲岛', lat: 18.3180, lng: 109.7660, category: '海岛', duration: '1天', desc: '潜水胜地，海水能见度高，可玩水上项目。' },
        { name: '大东海', lat: 18.2170, lng: 109.5150, category: '海滩', duration: '半天', desc: '市区附近的开放海滩，餐饮配套齐全。' },
        { name: '南山文化旅游区', lat: 18.2960, lng: 109.2010, category: '文化', duration: '半天', desc: '108米海上观音像，佛教文化园区。' }
      ],
      foods: [
        { name: '海鲜', desc: '第一市场选购后加工，或海鲜餐厅现点。' },
        { name: '椰子饭', desc: '椰肉糯米蒸制，清甜椰香。' },
        { name: '文昌鸡', desc: '海南四大名菜之一，皮薄肉嫩。' },
        { name: '清补凉', desc: '椰奶配红豆、薏米、水果，消暑甜品。' }
      ],
      tips: '紫外线强烈，务必防晒；旺季机票住宿紧张，建议提前预订。'
    },

    '丽江': {
      name: '丽江', province: '云南省', type: 'oldtown', region: '西南',
      lat: 26.8721, lng: 100.2299,
      overview: '纳西族古城，雪山古城、茶马古道，慢节奏的文艺与民族风情。',
      attractions: [
        { name: '丽江古城', lat: 26.8721, lng: 100.2299, category: '古城', duration: '半天', desc: '世界文化遗产，四方街、木府、小桥流水人家。' },
        { name: '玉龙雪山', lat: 27.0980, lng: 100.1750, category: '雪山', duration: '1天', desc: '纳西族神山，冰川公园与蓝月谷，缆车登顶壮观。' },
        { name: '束河古镇', lat: 26.9230, lng: 100.2090, category: '古镇', duration: '2-3小时', desc: '比大研古城更安静，纳西民居与马帮文化。' },
        { name: '拉市海', lat: 26.8600, lng: 100.1600, category: '自然', duration: '半天', desc: '高原湿地，骑马、划船，冬季可观候鸟。' },
        { name: '泸沽湖', lat: 27.7200, lng: 100.7600, category: '湖泊', duration: '1-2天', desc: '摩梭人“女儿国”，湖水湛蓝，走婚桥与草海。' }
      ],
      foods: [
        { name: '腊排骨火锅', desc: '纳西族传统，腊排骨炖汤，鲜香浓郁。' },
        { name: '鸡豆凉粉', desc: '丽江特产鸡豆制成，酸辣爽口。' },
        { name: '纳西烤鱼', desc: '炭火烤鱼，外焦里嫩。' },
        { name: '鲜花饼', desc: '玫瑰花瓣入馅，香甜酥软。' }
      ],
      tips: '丽江海拔约2400米，注意高反与防晒；玉龙雪山需提前购票。'
    },

    '大理': {
      name: '大理', province: '云南省', type: 'oldtown', region: '西南',
      lat: 25.6065, lng: 100.2676,
      overview: '风花雪月之地，苍山洱海之间，白族风情与田园风光令人心旷神怡。',
      attractions: [
        { name: '大理古城', lat: 25.6930, lng: 100.1620, category: '古城', duration: '半天', desc: '南诏国都，五华楼、人民路，闲适文艺。' },
        { name: '洱海', lat: 25.7520, lng: 100.1880, category: '湖泊', duration: '1天', desc: '环洱海骑行，双廊、喜洲、小普陀沿岸风光。' },
        { name: '苍山', lat: 25.6800, lng: 100.1000, category: '山', duration: '半天', desc: '洗马潭索道登顶，俯瞰洱海全景。' },
        { name: '崇圣寺三塔', lat: 25.7050, lng: 100.1480, category: '历史', duration: '2小时', desc: '大理标志性建筑，三塔倒影是经典画面。' },
        { name: '喜洲古镇', lat: 25.8550, lng: 100.1260, category: '古镇', duration: '2-3小时', desc: '白族民居与稻田风光，喜洲粑粑闻名。' }
      ],
      foods: [
        { name: '乳扇', desc: '牛奶制成的白族小吃，可炸可烤，奶香浓郁。' },
        { name: '酸辣鱼', desc: '洱海鱼配酸辣汤，开胃下饭。' },
        { name: '喜洲破酥粑粑', desc: '炭火烤制的酥脆饼，甜咸两味。' },
        { name: '饵丝', desc: '米制细条，配肉臊或焖肉，爽滑。' }
      ],
      tips: '环洱海约120公里，建议租车或包车；洱海生态廊道禁止机动车。'
    },

    '桂林': {
      name: '桂林', province: '广西壮族自治区', type: 'mountain', region: '华南',
      lat: 25.2736, lng: 110.2900,
      overview: '“桂林山水甲天下”，喀斯特峰林与漓江碧水，如诗如画。',
      attractions: [
        { name: '漓江', lat: 25.0700, lng: 110.4200, category: '自然', duration: '1天', desc: '乘船或竹筏游漓江，九马画山、黄布倒影（20元人民币背景）。' },
        { name: '阳朔西街', lat: 24.7780, lng: 110.4960, category: '街区', duration: '2小时', desc: '中西合璧的老街，啤酒鱼与酒吧夜生活。' },
        { name: '象鼻山', lat: 25.2730, lng: 110.2930, category: '地标', duration: '1-2小时', desc: '桂林城徽，形似巨象饮水，可登岛观景。' },
        { name: '龙脊梯田', lat: 25.7500, lng: 110.1350, category: '自然', duration: '1天', desc: '层层叠叠的梯田，金秋稻浪与晨雾云海绝美。' },
        { name: '两江四湖', lat: 25.2730, lng: 110.2900, category: '夜景', duration: '2小时', desc: '夜游环城水系，日月双塔灯光璀璨。' }
      ],
      foods: [
        { name: '桂林米粉', desc: '卤菜粉配锅烧、酸豆角，干拌最地道。' },
        { name: '啤酒鱼', desc: '漓江鱼配啤酒番茄焖煮，鲜嫩入味。' },
        { name: '荔浦芋扣肉', desc: '荔浦芋头夹五花肉，软糯香浓。' }
      ],
      tips: '桂林到阳朔可乘船或大巴；夏季多雨，备好雨具。'
    },

    '苏州': {
      name: '苏州', province: '江苏省', type: 'city', region: '华东',
      lat: 31.2989, lng: 120.5853,
      overview: '园林之城、水乡古镇，小桥流水与昆曲评弹，尽显江南风雅。',
      attractions: [
        { name: '拙政园', lat: 31.3230, lng: 120.6290, category: '园林', duration: '2-3小时', desc: '中国四大名园之一，亭台楼阁、水榭回廊。' },
        { name: '苏州博物馆', lat: 31.3250, lng: 120.6310, category: '博物馆', duration: '2小时', desc: '贝聿铭封山之作，白墙黛瓦的现代水墨。' },
        { name: '虎丘', lat: 31.3400, lng: 120.5780, category: '历史', duration: '2小时', desc: '“到苏州不游虎丘乃憾事”，云岩寺塔千年斜塔。' },
        { name: '平江路', lat: 31.3110, lng: 120.6300, category: '街区', duration: '2小时', desc: '沿河历史街区，评弹茶馆与小桥流水。' },
        { name: '周庄古镇', lat: 31.1130, lng: 120.8450, category: '古镇', duration: '半天', desc: '中国第一水乡，双桥、沈厅，摇橹船游古镇。' }
      ],
      foods: [
        { name: '松鼠桂鱼', desc: '花刀炸制的桂鱼浇酸甜汁，外酥里嫩。' },
        { name: '苏式汤面', desc: '细面配焖肉、爆鱼浇头，汤清味鲜。' },
        { name: '糖粥', desc: '赤豆糊配糯米粥，甜而不腻。' },
        { name: '碧螺虾仁', desc: '碧螺春茶香炒河虾仁，清鲜雅致。' }
      ],
      tips: '园林多需预约；古城内步行或骑行最方便。'
    },

    '长沙': {
      name: '长沙', province: '湖南省', type: 'city', region: '华中',
      lat: 28.2282, lng: 112.9388,
      overview: '网红之城、美食不夜城，岳麓山、橘子洲与湘菜的火辣热情。',
      attractions: [
        { name: '橘子洲', lat: 28.1910, lng: 112.9540, category: '地标', duration: '2小时', desc: '湘江中的长岛，青年毛泽东雕像，烟花与夜景。' },
        { name: '岳麓山', lat: 28.1810, lng: 112.9340, category: '自然', duration: '半天', desc: '爱晚亭、岳麓书院，秋赏红枫，人文荟萃。' },
        { name: '太平街', lat: 28.1940, lng: 112.9700, category: '街区', duration: '2小时', desc: '千年老街，臭豆腐、茶颜悦色、文和友。' },
        { name: '湖南省博物馆', lat: 28.2160, lng: 112.9890, category: '博物馆', duration: '2-3小时', desc: '马王堆汉墓出土文物，辛追夫人与素纱襌衣。' }
      ],
      foods: [
        { name: '臭豆腐', desc: '外焦里嫩，浇辣椒蒜汁，闻着臭吃着香。' },
        { name: '口味虾', desc: '麻辣小龙虾，夜宵界的顶流。' },
        { name: '剁椒鱼头', desc: '鲜辣入味，湘菜代表作。' },
        { name: '茶颜悦色', desc: '长沙本土新式茶饮，幽兰拿铁必点。' }
      ],
      tips: '橘子洲周末烟花需关注公告；热门餐厅饭点需排队。'
    },

    '哈尔滨': {
      name: '哈尔滨', province: '黑龙江省', type: 'city', region: '东北',
      lat: 45.8038, lng: 126.5349,
      overview: '冰城夏都，欧式建筑与冰雪文化交融，冬季冰雪大世界举世闻名。',
      attractions: [
        { name: '中央大街', lat: 45.7700, lng: 126.6170, category: '街区', duration: '2小时', desc: '百年面包石大街，俄式建筑与马迭尔冰棍。' },
        { name: '圣索菲亚教堂', lat: 45.7680, lng: 126.6160, category: '建筑', duration: '1小时', desc: '拜占庭式东正教堂，洋葱头穹顶，哈尔滨地标。' },
        { name: '冰雪大世界', lat: 45.7780, lng: 126.5600, category: '乐园', duration: '半天', desc: '冬季限定的冰雕雪雕王国，夜晚灯光梦幻。' },
        { name: '太阳岛', lat: 45.7950, lng: 126.5980, category: '公园', duration: '半天', desc: '松花江北岸的风景区，夏季避暑、冬季雪博会。' }
      ],
      foods: [
        { name: '哈尔滨红肠', desc: '蒜香浓郁，烟熏风味，秋林里道斯最出名。' },
        { name: '锅包肉', desc: '外酥里嫩，酸甜口，东北名菜。' },
        { name: '马迭尔冰棍', desc: '百年老字号，奶香浓郁，冬天吃更带感。' },
        { name: '大列巴', desc: '俄式大面包，麦香十足，配红肠吃。' }
      ],
      tips: '冬季气温低，务必做好保暖；冰雪大世界夜场更美，注意防滑。'
    },

    '拉萨': {
      name: '拉萨', province: '西藏自治区', type: 'mountain', region: '西南',
      lat: 29.6520, lng: 91.1721,
      overview: '日光之城、雪域圣城，布达拉宫与大昭寺是藏文化的灵魂。',
      attractions: [
        { name: '布达拉宫', lat: 29.6579, lng: 91.1173, category: '历史', duration: '半天', desc: '世界上海拔最高的宫殿，藏传佛教圣地，需提前预约。' },
        { name: '大昭寺', lat: 29.6530, lng: 91.1320, category: '寺庙', duration: '2小时', desc: '藏传佛教信徒朝拜的中心，释迦牟尼12岁等身像。' },
        { name: '八廓街', lat: 29.6540, lng: 91.1320, category: '街区', duration: '2小时', desc: '围绕大昭寺的转经道，藏式小店与甜茶馆。' },
        { name: '纳木错', lat: 30.7700, lng: 90.8800, category: '湖泊', duration: '1天', desc: '西藏三大圣湖之一，天湖湛蓝，雪山环抱。' },
        { name: '色拉寺', lat: 29.6990, lng: 91.1340, category: '寺庙', duration: '2小时', desc: '可看辩经，藏传佛教格鲁派六大寺之一。' }
      ],
      foods: [
        { name: '藏面', desc: '牦牛骨汤配青稞面条，清淡暖胃。' },
        { name: '酥油茶', desc: '酥油、砖茶、盐打制，抵御高反的传统饮品。' },
        { name: '糌粑', desc: '青稞炒面，配酥油茶捏食。' },
        { name: '牦牛肉', desc: '风干或炖煮，高蛋白、耐饿。' }
      ],
      tips: '海拔约3650米，注意高反、避免剧烈运动；进藏前可先适应几天。'
    }
  };

  /** 别名 / 简称映射，方便输入识别 */
  var ALIASES = {
    '京城': '北京', '首都': '北京',
    '魔都': '上海', '沪': '上海',
    '蓉城': '成都', '锦官城': '成都',
    '山城': '重庆', '渝': '重庆',
    '长安': '西安',
    '羊城': '广州', '穗': '广州',
    '鹏城': '深圳',
    '金陵': '南京',
    '江城': '武汉',
    '鹭岛': '厦门',
    '鹿城': '三亚', '天涯': '三亚',
    '姑苏': '苏州',
    '星城': '长沙',
    '冰城': '哈尔滨',
    '日光城': '拉萨'
  };

  /**
   * 在知识库中查找目的地（支持别名，忽略“市/省”等后缀）。
   */
  function normalizeCity(name) {
    if (!name) return '';
    var s = String(name).trim();
    s = s.replace(/(市|省|自治区|特别行政区|地区|州)$/, '');
    return s;
  }

  function findDestination(name) {
    var key = normalizeCity(name);
    if (ALIASES[key]) key = ALIASES[key];
    if (DB[key]) return { key: key, data: DB[key] };
    // 模糊匹配：名字包含
    var keys = Object.keys(DB);
    for (var i = 0; i < keys.length; i++) {
      if (key && (keys[i].indexOf(key) === 0 || key.indexOf(keys[i]) === 0)) {
        return { key: keys[i], data: DB[keys[i]] };
      }
    }
    return null;
  }

  global.DEST_DB = DB;
  global.findDestination = findDestination;
  global.normalizeCity = normalizeCity;
})(window);
