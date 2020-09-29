const fs = require('fs')
const path = require('path')

function loadModule(src, filename) {
  var Module = module.constructor
  var m = new Module()
  m._compile(src, filename)
  return m.exports
}

function readPostcssConfig(generator) {
  const filename = 'postcss.config.js'
  const file = generator.files[filename]

  if (file) {
    const filePath = path.join(generator.context, filename)
    fs.writeFileSync(filePath, '')
    return loadModule(file, filename)
  }

  const config = generator.originalPkg.postcss
  if (config) {
    const copy = { ...config }
    delete config.plugins
    return copy
  }

  return {}
}

module.exports = (api, options) => {
  const postcss = readPostcssConfig(api.generator)
  const configs = {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  }

  configs.postcss.plugins = { ...configs.postcss.plugins, ...postcss.plugins }

  api.extendPackage(configs)

  api.injectImports(api.entryFile, `import '@/styles/tailwind.css'`)
  api.render('./template')
}
