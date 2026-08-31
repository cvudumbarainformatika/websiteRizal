import { watch } from 'vue'
import { useRoute } from 'vue-router'

export function useSeo() {
  const route = useRoute()

  const updateMetaTags = (meta) => {
    // Update title
    document.title = meta.title || 'Master Rizal Rent Car & Motor Bike Probolinggo'

    // Remove existing meta tags
    document.querySelectorAll('meta').forEach(tag => {
      if (tag.getAttribute('data-vue-router-controlled')) {
        tag.remove()
      }
    })

    // Add new meta tags
    if (meta.metaTags) {
      meta.metaTags.forEach(tag => {
        const { name, property, content } = tag
        const meta = document.createElement('meta')

        if (name) meta.setAttribute('name', name)
        if (property) meta.setAttribute('property', property)

        meta.setAttribute('content', content)
        meta.setAttribute('data-vue-router-controlled', '')
        document.head.appendChild(meta)
      })
    }
  }

  // Watch for route changes
  watch(
    () => route.meta,
    (meta) => {
      if (meta) updateMetaTags(meta)
    },
    { immediate: true }
  )
}
