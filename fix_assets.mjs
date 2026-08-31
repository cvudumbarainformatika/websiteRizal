import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'

// 1. Move the folders
const srcAssets = path.join(process.cwd(), 'src/assets/images')
const srcLogos = path.join(process.cwd(), 'src/assets/logos')
const publicAssets = path.join(process.cwd(), 'public/assets')
const publicImages = path.join(publicAssets, 'images')
const publicLogos = path.join(publicAssets, 'logos')

if (!fs.existsSync(publicAssets)) fs.mkdirSync(publicAssets, { recursive: true })

if (fs.existsSync(srcAssets) && !fs.existsSync(publicImages)) {
  fs.cpSync(srcAssets, publicImages, { recursive: true })
}
if (fs.existsSync(srcLogos) && !fs.existsSync(publicLogos)) {
  fs.cpSync(srcLogos, publicLogos, { recursive: true })
}

// 2. Fix the DB
const supabaseUrl = 'https://nebjxmsfjbefmekgfnsi.supabase.co'
const supabaseKey = 'sb_publishable_u0mTLlHrxZAsTpyFP-PnsA_SlTbKC6h'
const supabase = createClient(supabaseUrl, supabaseKey)

async function fixDB() {
  // Fix settings
  const { data: settings } = await supabase.from('settings').select('*')
  for (const setting of settings || []) {
    if (setting.value && setting.value.includes('/src/assets/images/')) {
      const newValue = setting.value.replace('/src/assets/images/', '/assets/images/')
      await supabase.from('settings').update({ value: newValue }).eq('key', setting.key)
      console.log(`Updated setting ${setting.key} to ${newValue}`)
    }
  }

  // Fix vehicles
  const { data: vehicles } = await supabase.from('vehicles').select('*')
  for (const vehicle of vehicles || []) {
    if (vehicle.image_url && vehicle.image_url.includes('/src/assets/images/')) {
      const newUrl = vehicle.image_url.replace('/src/assets/images/', '/assets/images/')
      await supabase.from('vehicles').update({ image_url: newUrl }).eq('id', vehicle.id)
      console.log(`Updated vehicle ${vehicle.name} to ${newUrl}`)
    }
  }
}

// 3. Fix Vue Files (Simple replace)
function replaceInDir(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath)
    } else if (fullPath.endsWith('.vue') || fullPath.endsWith('.sql')) {
      let content = fs.readFileSync(fullPath, 'utf8')
      if (content.includes('/src/assets/images/')) {
        content = content.replace(/\/src\/assets\/images\//g, '/assets/images/')
        fs.writeFileSync(fullPath, content)
        console.log(`Replaced in ${fullPath}`)
      }
    }
  }
}

async function run() {
  replaceInDir(path.join(process.cwd(), 'src'))
  replaceInDir(process.cwd()) // for sql files in root
  await fixDB()
  console.log('All done!')
}

run()
