module.exports = {
  title: '王海东技术博客',
  description: '技术博客',
  themeConfig: {
    logo: '/home-logo.png',
    nav: [
      { text: 'JavaScript', link: '/javascript/' },
      { text: 'NodeJs', link: '/nodejs/' },
      { text: 'Css', link: '/css/' },
      { text: 'React', link: '/react/'},
      { text: '设计模式', link: '/designpatterns/' },
      { text: '数据结构', link: '/datastructure/' },
      { text: '算法', link: '/algorithm/' },
      {
        text: '其他',
        ariaLabel: 'Other',
        items: [
          { text: 'docker', link: '/docker/' },
          { text: 'WebAssembly', link: '/webassembly/' },
          { text: 'linux', link: '/linux/' },
          { text: '软件工具', link: '/softwaretools/' },
        ]
      }
    ],
    sidebar: {
      '/css/': [
        'one',
        'two',
        {
          title: 'Group 1',
          sidebarDepth: 6,
          collapsable: true,
          children: [
            'cssthree/',
            'children1/'
          ]
        }
      ],
      '/react/': [
        '',
        'reactDiff/'
      ],
      '/javascript/': [
        '',
        'higherOrderFunction/'
      ],
      '/designpatterns/': [
        '',
        'singletonMode/',
        'cacheMode/',
        'strategymode/'
      ],
      '/datastructure/': [''],
      '/algorithm/': [''],
      '/nodejs/': [
        ''
      ],
      '/docker/': [''],
      '/nodejs/': [
        ''
      ],
      '/linux/': [''],
      '/nodejs/': [
        ''
      ],
      '/softwaretools/': [''],
      '/nodejs/': [
        ''
      ],
      '/webassembly/': [''],
      '/': [''],
      sidebarDepth: 6
    }
  }

}