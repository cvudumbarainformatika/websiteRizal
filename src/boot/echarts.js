// src/boot/echarts.js
import { boot } from 'quasar/wrappers'
import { defineAsyncComponent } from 'vue'

export default boot(({ app }) => {
  if (process.env.CLIENT) {
    app.component('v-chart', defineAsyncComponent(() => 
      import('vue-echarts').then(ECharts => {
        // Register the required components only on client side
        return import('echarts/core').then(echarts => {
          return Promise.all([
            import('echarts/renderers'),
            import('echarts/charts'),
            import('echarts/components')
          ]).then(([renderers, charts, components]) => {
            echarts.use([
              renderers.CanvasRenderer,
              charts.BarChart,
              charts.LineChart,
              components.TitleComponent,
              components.TooltipComponent,
              components.GridComponent,
              components.LegendComponent
            ])
            console.log('✅ boot echarts dynamically loaded on client')
            return ECharts.default
          })
        })
      })
    ))
  }
})
