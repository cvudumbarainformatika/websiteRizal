import _ from 'lodash'

export default async ({ app }) => {
  if (!process.env.SERVER) {
    const globalComponents = import.meta.glob(
      '../components/global/**/*.vue',
      { eager: true }
    )

    Object.entries(globalComponents).forEach(([path, m]) => {
      const componentName = _.upperFirst(
        _.camelCase(path.split('/').pop().replace(/\.\w+$/, ''))
      )
      app.component(componentName, m.default)
    })
  }
}
