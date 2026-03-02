'use client'
import {
  Dashboard,
  CalendarToday,
  Schedule,
  Person,
  Settings,
  ConfirmationNumber,
} from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import { useRouter } from 'next/navigation'

const MobileBottomNav = ({ activeItem = 'dashboard' }) => {
  const router = useRouter()

  const navItems = [
    { id: 'dashboard', icon: Dashboard, label: 'Dashboard', path: '/doc-dashboard' },
    {
      id: 'appointments',
      icon: ConfirmationNumber,
      label: 'Appointments',
      path: '/doc-dashboard/appointments',
    },
    { id: 'booking', icon: Schedule, label: 'Booking', path: '/doc-dashboard/booking' },
    // { id: 'timetable', icon: CalendarToday, label: 'Time Table', path: '/doc-dashboard/timetable' },
    { id: 'profile', icon: Person, label: 'Profile', path: '/doc-dashboard/profile' },
  ]

  const handleNavigation = (path) => {
    router.push(path)
  }

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        display: { xs: 'block', md: 'none' },
      }}
      elevation={3}
    >
      <BottomNavigation
        value={activeItem}
        sx={{
          backgroundColor: '#008bb2',
          borderRadius: '12px 12px 0 0',
          '& .MuiBottomNavigationAction-root': {
            color: '#ffffff',
            '&.Mui-selected': {
              color: 'white',
            },
          },
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <BottomNavigationAction
              key={item.id}
              value={item.id}
              label={item.label}
              icon={<Icon />}
              onClick={() => handleNavigation(item.path)}
            />
          )
        })}
      </BottomNavigation>
    </Paper>
  )
}

export default MobileBottomNav
