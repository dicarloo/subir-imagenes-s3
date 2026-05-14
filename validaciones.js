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
  return nombre
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9.\-_]/g, '')
}

// function limpiarNombre(nombre) {
//   return nombre.replace(/ /g, '_')
// }

module.exports = { validarTamano, limpiarNombre }
