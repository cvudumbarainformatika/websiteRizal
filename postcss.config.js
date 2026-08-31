// postcss.config.js
import autoprefixer from 'autoprefixer'
// import postcssRtlcss from 'postcss-rtlcss'; // Uncomment jika menggunakan postcss-rtlcss

import tailwindcss from 'tailwindcss'

export default {
  plugins: [
    tailwindcss(),
    autoprefixer({
      overrideBrowserslist: [
        'last 4 Chrome versions',
        'last 4 Firefox versions',
        'last 4 Edge versions',
        'last 4 Safari versions',
        'last 4 Android versions',
        'last 4 ChromeAndroid versions',
        'last 4 FirefoxAndroid versions',
        'last 4 iOS versions'
      ]
    })
    // postcssRtlcss(), // Uncomment jika menggunakan postcss-rtlcss
  ]
}
