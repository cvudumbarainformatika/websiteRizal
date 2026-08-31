import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: 'Server configuration missing. SUPABASE_SERVICE_ROLE_KEY not set.' })
  }

  // Create admin client
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  // 1. Verify caller's JWT
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid Authorization header' })
  }

  const token = authHeader.split(' ')[1]
  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token)

  if (userError || !userData?.user) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' })
  }

  // At this point, the caller is an authenticated user.
  // We allow them to manage accounts.

  try {
    if (req.method === 'GET') {
      // List all users
      const { data: users, error } = await supabaseAdmin.auth.admin.listUsers({
        page: 1,
        perPage: 1000
      })

      if (error) throw error
      return res.status(200).json(users)
    } 
    
    else if (req.method === 'POST') {
      // Create user
      const { email, password } = req.body
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' })
      }

      const { data: user, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      })

      if (error) throw error
      return res.status(201).json(user)
    } 
    
    else if (req.method === 'DELETE') {
      // Delete user
      const { id } = req.body
      if (!id) {
        return res.status(400).json({ error: 'User ID required' })
      }
      
      // Prevent deleting self
      if (id === userData.user.id) {
        return res.status(400).json({ error: 'Cannot delete your own account' })
      }

      const { data, error } = await supabaseAdmin.auth.admin.deleteUser(id)

      if (error) throw error
      return res.status(200).json({ message: 'User deleted successfully', data })
    } 
    
    else {
      res.status(405).json({ error: 'Method Not Allowed' })
    }
  } catch (error) {
    console.error('Manage Users Error:', error)
    return res.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}
