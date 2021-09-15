module.exports = {
    title: '技术博客',
    description: '王海东技术博客',
    themeConfig: {
        logo: '/home-logo.png',
        nav: [
            { text: 'JavaScript', link: '/' },
            { text: 'NodeJs', link: '/nodejs/' },
            { text: 'GitHub', link: 'https://github.com/' },
            {
                text: 'Languages',
                ariaLabel: 'Language Menu',
                items: [
                    { text: 'Chinese', link: '/language/chinese/' },
                    { text: 'Japanese', link: '/language/japanese/' }
                ]
            }

        ],
        sidebar: [
            '/',
            '/nodejs'
          ]
    },

}