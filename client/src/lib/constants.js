// export const API_URL    = process.env.NEXT_PUBLIC_API_URL    || 'http://localhost:5000/api'
// export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000'
// export const XAI_KEY    = process.env.NEXT_PUBLIC_XAI_API_KEY
// export const XAI_BASE   = process.env.NEXT_PUBLIC_XAI_BASE_URL || 'https://api.x.ai/v1'
// export const XAI_MODEL  = process.env.NEXT_PUBLIC_XAI_MODEL  || 'grok-3'

// export const ROLES = { STUDENT: 'student', ADMIN: 'admin' }

// export const ROUTES = {
//   LOGIN:       '/login',
//   REGISTER:    '/register',
//   REGISTER2:   '/register/academic',
//   ADMIN_LOGIN: '/admin/login',

//   DASHBOARD:   '/dashboard',
//   TEAM_ROOMS:  '/team-rooms',
//   LIBRARY:     '/library',
//   COURSES:     '/courses',
//   BATTLE:      '/battle',
//   AI_TWIN:     '/ai-twin',
//   REVISION:    '/revision',
//   SETTINGS:    '/settings',
//   SUPPORT:     '/support',

//   ADMIN:              '/admin',
//   ADMIN_SESSION:      '/admin/session',
//   ADMIN_NOTIFS:       '/admin/notifications',
//   ADMIN_SETTINGS:     '/admin/settings',
//   ADMIN_REPAIR:       '/admin/repair',
//   ADMIN_SUPPORT:      '/admin/support',

//   UNAUTHORIZED: '/unauthorized',
// }

// export const ACADEMIC_LEVELS = [
//   'High School',
//   'Undergraduate – Year 1',
//   'Undergraduate – Year 2',
//   'Undergraduate – Year 3',
//   'Undergraduate – Year 4',
//   'Postgraduate – Masters',
//   'Postgraduate – PhD',
//   'Professional / Other',
// ]

// export const BATTLE_DURATIONS = [
//   { label: '5 min',  value: 300  },
//   { label: '10 min', value: 600  },
//   { label: '15 min', value: 900  },
//   { label: '20 min', value: 1200 },
// ]

// export const XP_PER_CORRECT = 120
// export const XP_PER_SPEED   = 30

// export const SIDEBAR_NAV = [
//   { label: 'Dashboard',   path: '/dashboard',  icon: 'LayoutDashboard' },
//   { label: 'Team Rooms',  path: '/team-rooms', icon: 'Users' },
//   { label: 'Smart Library',path: '/library',    icon: 'BookOpen' },
//   { label: 'My Courses',  path: '/courses',    icon: 'GraduationCap' },
//   { label: 'Study Battle', path: '/battle',     icon: 'Swords' },
//   { label: 'AI Twin',      path: '/ai-twin',    icon: 'Bot' },
//   { label: 'Revision',     path: '/revision',   icon: 'RotateCcw' },
//   { label: 'Admin Portal', path: '/admin/login',icon: 'ShieldAlert' },
// ]

// export const ADMIN_NAV = [
//   { label: 'Admin Panel',   path: '/admin',               icon: 'LayoutDashboard' },
//   { label: 'Add Session',   path: '/admin/session',        icon: 'PlusCircle' },
//   { label: 'Notifications', path: '/admin/notifications',  icon: 'Bell' },
//   { label: 'Settings',      path: '/admin/settings',       icon: 'Settings' },
//   { label: 'Repair',        path: '/admin/repair',         icon: 'Wrench' },
//   { label: 'Support',       path: '/admin/support',        icon: 'LifeBuoy' },
// ]




// Default to the backend host when /api is not proxied by Next.js.
export const API_URL    = process.env.NEXT_PUBLIC_API_URL    || 'http://localhost:5000/api'
export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://127.0.0.1:5000'
export const XAI_KEY    = process.env.NEXT_PUBLIC_XAI_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY
export const XAI_BASE   = process.env.NEXT_PUBLIC_XAI_BASE_URL || process.env.NEXT_PUBLIC_GROQ_BASE_URL || 'https://api.x.ai/v1'
export const XAI_MODEL  = process.env.NEXT_PUBLIC_XAI_MODEL  || 'grok-3'

export const ROLES = { STUDENT: 'student', ADMIN: 'admin' }

export const ROUTES = {
  LOGIN:       '/login',
  REGISTER:    '/register/step1',
  REGISTER2:   '/register/academic',
  ADMIN_LOGIN: '/admin-login',

  // Student Section Nesting paths matching physical App folder locations
  DASHBOARD:   '/student/dashboard',
  TEAM_ROOMS:  '/student/team-rooms',
  LIBRARY:     '/student/smart-library',
  COURSES:     '/student/my-courses',
  BATTLE:      '/student/study-battle',
  AI_TWIN:     '/student/ai-twin',
  REVISION:    '/student/revision',
  SETTINGS:    '/student/settings',
  SUPPORT:     '/student/support',

  // Admin Section Nesting paths matching physical App folder locations
  ADMIN:          '/admin/dashboard',
  ADMIN_SESSION:  '/admin/add-session',
  ADMIN_NOTIFS:   '/admin/notifications',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_REPAIR:   '/admin/repair',
  ADMIN_SUPPORT:  '/admin/support',

  UNAUTHORIZED: '/errors/unauthorized',
}

export const ACADEMIC_LEVELS = [
  'High School',
  'Undergraduate – Year 1',
  'Undergraduate – Year 2',
  'Undergraduate – Year 3',
  'Undergraduate – Year 4',
  'Postgraduate – Masters',
  'Postgraduate – PhD',
  'Professional / Other',
]

export const BATTLE_DURATIONS = [
  { label: '5 min',  value: 300  },
  { label: '10 min', value: 600  },
  { label: '15 min', value: 900  },
  { label: '20 min', value: 1200 },
]

export const XP_PER_CORRECT = 120
export const XP_PER_SPEED   = 30

export const SIDEBAR_NAV = [
  { label: 'Dashboard',     path: ROUTES.DASHBOARD,   icon: 'LayoutDashboard' },
  { label: 'Team Rooms',    path: ROUTES.TEAM_ROOMS,   icon: 'Users' },
  { label: 'Smart Library', path: ROUTES.LIBRARY,      icon: 'BookOpen' },
  { label: 'My Courses',    path: ROUTES.COURSES,      icon: 'GraduationCap' },
  { label: 'Study Battle',  path: ROUTES.BATTLE,       icon: 'Swords' },
  { label: 'AI Twin',       path: ROUTES.AI_TWIN,      icon: 'Bot' },
  { label: 'Revision',      path: ROUTES.REVISION,     icon: 'RotateCcw' },
  { label: 'Admin Portal',  path: ROUTES.ADMIN_LOGIN,  icon: 'ShieldAlert' },
]

export const ADMIN_NAV = [
  { label: 'Admin Panel',   path: ROUTES.ADMIN,          icon: 'LayoutDashboard' },
  { label: 'Add Session',   path: ROUTES.ADMIN_SESSION,  icon: 'PlusCircle' },
  { label: 'Notifications', path: ROUTES.ADMIN_NOTIFS,   icon: 'Bell' },
  { label: 'Settings',      path: ROUTES.ADMIN_SETTINGS, icon: 'Settings' },
  { label: 'Repair',        path: ROUTES.ADMIN_REPAIR,   icon: 'Wrench' },
  { label: 'Support',       path: ROUTES.ADMIN_SUPPORT,  icon: 'LifeBuoy' },
]