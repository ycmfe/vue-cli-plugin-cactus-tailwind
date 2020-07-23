const fs = require('fs')

module.exports = [
  {
    type: 'list',
    name: 'initConfig',
    message: '生成 tailwind 配置文件模式',
    choices: [
      { name: 'none', value: false },
      { name: 'minimal', value: 'minimal' },
      { name: 'full', value: 'full' },
    ],
    default: 1,
  },
  {
    name: 'replaceConfig',
    type: 'confirm',
    message: 'tailwind.config.js 已经存在！是否替换它?',
    default: false,
    when: (answers) => {
      return answers.initConfig && fs.existsSync('./tailwind.config.js')
    },
  },
]
