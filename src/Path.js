const path_regex = /(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g

export default class Path {
  static urlToRelative(absolute) {
    let loc = document.createElement('a')
    loc.href = absolute
    return loc.pathname
  }
  
  static regexp(path, keys, sensitive, strict) {
    if (toString.call(path) === '[object RegExp]') return path
    if (Array.isArray(path)) path = '(' + path.join('|') + ')'
    path = path
        .concat(strict ? '' : '/?')
        .replace(/\/\(/g, '(?:/')
        .replace(path_regex, (_, slash, format, key, capture, optional, star) => {
            keys.push({ name: key, optional: !! optional })
            slash = slash || '';
            return `${(optional ? '' : slash)}(?:${(optional ? slash : '')}${(format || '')}${(capture || (format && '([^/.]+?)' || '([^/]+?)'))})${(optional || '')}${(star ? '(/*)?' : '')}`
        })
        .replace(/([\/.])/g, '\\$1')
        .replace(/\*/g, '(.*)')
    return new RegExp(`^${path}$`, sensitive ? '' : 'i')
}
}
  