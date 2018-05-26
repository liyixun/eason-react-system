const sidebarMenu = [
  {
    key: 'report',
    name: '统计报表',
    icon: 'pie-chart',
  },
  {
    key: 'rank',
    name: '排行榜',
    icon: 'bar-chart',
  },
  {
    key: 'music',
    name: '歌曲库',
    icon: 'video-camera',
    child: [
      {
        key: 'list',
        name: '歌曲列表',
      },
      {
        key: 'album',
        name: '专辑',
      },
      {
        key: 'sheet',
        name: '歌单',
      },
    ],
  },
  {
    key: 'eason',
    name: '奕逊的一个模块',
    icon: 'smile',
    child: [
      {
        key: 'list',
        name: '商品列表',
        icon: 'play-circle',   // 二级三级菜单也可以带图标
      }
    ]
  }
];

export default sidebarMenu;

