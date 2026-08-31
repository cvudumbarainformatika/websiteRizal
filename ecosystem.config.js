module.exports = {
  apps: [
    {
      name: 'master-rizal-web',
      script: './dist/ssr/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
}
