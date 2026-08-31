import { defineSsrMiddleware } from '#q-app/wrappers'
import { createProxyMiddleware } from 'http-proxy-middleware'

export default defineSsrMiddleware(({ app }) => {
  const target = process.env.API_TARGET || 'http://localhost:8000'

  app.use('/api', createProxyMiddleware({
    target: target + '/api',
    changeOrigin: true,
    pathRewrite: { '^/api': '' }
  }))
})
