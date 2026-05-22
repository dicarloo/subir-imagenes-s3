// middleware sencillo pa ver las peticiones en consola

// const morgan = require('morgan')
// module.exports = morgan('dev')

function logger(req, res, next) {
  const ahora = new Date().toLocaleTimeString()
  console.log(`[${ahora}] ${req.method} ${req.path}`)
  next()
}

module.exports = { logger }
