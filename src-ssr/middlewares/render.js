import { defineSsrMiddleware } from '#q-app/wrappers'

export default defineSsrMiddleware(({ app, resolve, render, serve }) => {
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain')
    res.send(`
User-agent: *
Allow: /

Sitemap: https://masterrizal.com/sitemap.xml
    `.trim())
  })

  app.get(resolve.urlPath('*'), (req, res) => {
    res.setHeader('Content-Type', 'text/html')

    render({ req, res })
      .then(html => {
        res.send(html)
      })
      .catch(err => {
        if (err.url) {
          if (err.code) {
            res.redirect(err.code, err.url)
          } else {
            res.redirect(err.url)
          }
        } else if (err.code === 404) {
          res.status(404).send('404 | Page Not Found')
        } else if (process.env.DEV) {
          serve.error({ err, req, res })
        } else {
          res.status(500).send('500 | Internal Server Error')
        }
      })
  })
})
