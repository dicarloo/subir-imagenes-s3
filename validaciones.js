// const EXTENSIONES_VALIDAS = ['.jpg', '.jpeg', '.png', '.webp']

// function validarExtension(nombreArchivo) {
//   const ext = path.extname(nombreArchivo).toLowerCase()
//   return EXTENSIONES_VALIDAS.includes(ext)
// }

function validarTamano(bytes, maxMB = 5) {
  const maxBytes = maxMB * 1024 * 1024
  // console.log(`tamano: ${bytes} / max: ${maxBytes}`)
  return bytes <= maxBytes
}

function limpiarNombre(nombre) {
  const sinEspacios = nombre.toLowerCase().replace(/\s+/g, '-')
  const limpio = sinEspacios.replace(/[^a-z0-9.\-_]/g, '')
  // console.log('nombre limpio:', limpio)
  return limpio
}

// function limpiarNombre(nombre) {
//   return nombre.replace(/ /g, '_')
// }

function obtenerExtension(nombre) {
  return nombre.split('.').pop().toLowerCase()
}

module.exports = { validarTamano, limpiarNombre, obtenerExtension }
