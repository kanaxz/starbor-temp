module.exports = {
  youtube: {
    type: 'lang',
    filter: (s) => {
      return s.replace(/\{% youtube(?:\(([)]+)\))? (.+) %\}/g, (all, attrs, url) => {
        let width
        let height

        if (attrs) {
          const d = attrs.split(',').map((el) => parseInt(el))
          if (d.every((el) => el) && d.length === 2) {
            width = d[0]
            height = d[1]
          }

          if (!width || !height) {
            const dict = eqdict(attrs)
            width = parseInt(dict.width)
            height = parseInt(dict.height)
          }
        }

        try {
          url = (() => {
            const u = new URL(url)
            const v = u.searchParams.get('v')

            if (v) {
              return v
            }

            return u.pathname.replace(/$.*\//, '')
          })()
        } catch (e) { }

        const div = document.createElement('div')
        div.innerHTML = `<iframe width="${width || 560}" height="${height || 315}"
                src="https://www.youtube.com/embed/${url}"
                frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>`
        return div.outerHTML
      })
    }
  }
}