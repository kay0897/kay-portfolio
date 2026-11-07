const WORKS = [
  {cat:'photo', img:'kansai-2.jpg', title:'鹿群 · 雨季关西', meta:'摄影 / 2025', note:'奈良公园，撑伞跑过草坪的人与鹿。', tagline:'关西雨日系列 02'},
  {cat:'poster', img:'poster-kansai-type-v2.jpg', title:'雨季关西', meta:'海报 / 2026', note:'RAINY KANSAI：以上下双联呈现摄影素材与字体设计，雨伞、人物和鹿群与大号衬线标题前后穿插。AI 辅助视觉设计。', tagline:'RAINY KANSAI · 图字实验'},
  {cat:'photo', img:'kansai-6.jpg', title:'雨藤 · 雨季关西', meta:'摄影 / 2025', note:'雨天藤架下的石灯笼群。', tagline:'关西雨日系列 06'},
  {cat:'video', data:true, title:'抖音 · 影视方向单条', meta:'短视频 / 数据', nums:[['18.4W','播放量'],['9548','点赞量'],['2018','分享量'],['1227','收藏量']], note:'后台数据截图存档；完播与跳出指标见创作者中心。'},
  {cat:'photo', img:'f1-4.jpg', title:'近影 · F1 上海', meta:'摄影 / 2026', note:'上海国际赛车场追焦近影。', tagline:'F1 上海站系列'},
  {cat:'poster', img:'poster-speed-type-v2.jpg', title:'时速', meta:'海报 / 2026', note:'FULL SPEED：赛车摄影上下双联，车身、轮胎与英文标题形成前后遮挡，保留现场追焦的速度感。AI 辅助视觉设计。', tagline:'FULL SPEED · 图字实验'},
  {cat:'photo', img:'kansai-3.jpg', title:'石灯笼 · 雨季关西', meta:'摄影 / 2025', note:'春日大社参道旁覆苔的石灯笼。', tagline:'关西雨日系列 03'},
  {cat:'photo', img:'geo-1.jpg', title:'留白练习', meta:'摄影 / 2026', note:'白色体块、蓝天与一丛三角梅的几何练习。', tagline:'建筑 · 几何'},
  {cat:'poster', img:'poster-white-type-v2.jpg', title:'留白', meta:'海报 / 2026', note:'WHITE SPACE：以白色建筑、蓝天和三角梅为底图，通过屋顶轮廓与衬线字形的前后关系组织画面。AI 辅助视觉设计。', tagline:'WHITE SPACE · 图字实验'},
  {cat:'photo', img:'kansai-5.jpg', title:'檐下 · 雨季关西', meta:'摄影 / 2025', note:'檐下避雨的学生与庭园。', tagline:'关西雨日系列 05'},
  {cat:'video', data:true, title:'抖音 · 音乐方向单条', meta:'短视频 / 数据', nums:[['8585','播放量'],['389','点赞量'],['42','分享量'],['19','收藏量']], note:'音乐向剪辑单条后台数据存档。'},
  {cat:'photo', img:'nature-1.jpg', title:'湖与山', meta:'摄影 / 2026', note:'湖面天鹅与远处的雪山。', tagline:'自然 · 生态'},
  {cat:'poster', img:'poster-lake-type-v2.jpg', title:'湖山', meta:'海报 / 2026', note:'STILL WATERS：湖景摄影与大号英文标题上下对照，让天鹅与山体轮廓参与字形的空间层次。AI 辅助视觉设计。', tagline:'STILL WATERS · 图字实验'},
  {cat:'photo', img:'kansai-7.jpg', title:'车窗 · 雨季关西', meta:'摄影 / 2025', note:'列车车窗内外的绿色流速。', tagline:'关西雨日系列 07'},
  {cat:'photo', img:'kansai-1.jpg', title:'手水舍 · 雨季关西', meta:'摄影 / 2025', note:'苔庭里的水音。', tagline:'关西雨日系列 01'},
  {cat:'poster', img:'poster-way-type-v2.jpg', title:'途中', meta:'海报 / 2026', note:'IN TRANSIT：车窗摄影上下双联，让窗框、吊环与标题交错，保留车厢内外的流动感。AI 辅助视觉设计。', tagline:'IN TRANSIT · 图字实验'},
  {cat:'photo', img:'f1-1.jpg', title:'追焦 · 直道', meta:'摄影 / 2026', note:'直道高速追焦。', tagline:'F1 上海站系列'},
  {cat:'photo', img:'kansai-8.jpg', title:'回廊 · 雨季关西', meta:'摄影 / 2025', note:'雨后回廊与白砂。', tagline:'关西雨日系列 08'},
  {cat:'poster', img:'poster-grid-type-v2.jpg', title:'雨季关西 · 静庭', meta:'海报 / 2026', note:'SILENT GARDEN：以关西庭园摄影作上下双联，枝干与石灯笼遮住部分标题笔画，延续整组纸白与苔绿的视觉。AI 辅助视觉设计。', tagline:'SILENT GARDEN · 图字实验'},
  {cat:'photo', img:'kansai-4.jpg', title:'参道 · 雨季关西', meta:'摄影 / 2025', note:'石阶尽头的社殿。', tagline:'关西雨日系列 04'},
  {cat:'photo', img:'f1-2.jpg', title:'弯心 · F1 上海', meta:'摄影 / 2026', note:'弯心处的车身姿态。', tagline:'F1 上海站系列'},
  {cat:'photo', img:'f1-3.jpg', title:'出弯 · F1 上海', meta:'摄影 / 2026', note:'出弯瞬间的摇摄。', tagline:'F1 上海站系列'},
];

const JOURNAL_WORKS = [
  {cat:'photo',img:'journal-window.jpg',title:'窗边绿意',meta:'摄影 / 光影手记',note:'窗光穿过枝叶，照亮室内的绿色植物。',tagline:'光影手记 · 01'},
  {cat:'photo',img:'journal-dome.jpg',title:'林间金顶',meta:'摄影 / 光影手记',note:'从树枝与树影之间望见暖金色的建筑穹顶。',tagline:'光影手记 · 02'},
  {cat:'photo',img:'journal-street.jpg',title:'树影街巷',meta:'摄影 / 光影手记',note:'浓密树冠、停泊的汽车与街道上的斑驳阳光。',tagline:'光影手记 · 03'},
  {cat:'photo',img:'journal-mist.jpg',title:'雾中水线',meta:'摄影 / 光影手记',note:'雾气中的绿色草地与一小段弯曲水线。',tagline:'光影手记 · 04'},
];

