import { NavItem } from "@/types/NavItem"

const adminNavItems: NavItem[] = [
  // {
  //   title: 'Панель адміністрування',
  //   path: '/admin'
  // }
  {
    title: 'Розсилка',
    path: '/admin/mailing'
  },
  {
    title: 'Користувачі',
    path: '/admin/users'
  },
  {
    title: 'Меню',
    path: '/admin/menu'
  },
  {
    title: 'Замовлення',
    path: '/admin'
  }
]

const navItems: NavItem[] = [
  {
    title: 'Головна',
    path: '/'
  },
  {
    title: 'Second',
    path: '/'
  },
  {
    title: 'Third',
    path: '/'
  },
]

export {
  adminNavItems,
  navItems
}