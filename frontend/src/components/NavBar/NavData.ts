import { NavItem } from "@/types/NavItem"

const adminNavItems: NavItem[] = [
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
    path: '/orders'
  }
]

const supportNavItems: NavItem[] = [
  {
    title: 'Замовлення',
    path: '/orders'
  }
]

const managerNavItems: NavItem[] = [
  {
    title: 'Замовлення',
    path: '/orders'
  }
]

const userNavItems: NavItem[] = [
  {
    title: 'Головна',
    path: '/'
  }
]

export {
  adminNavItems,
  supportNavItems,
  managerNavItems,
  userNavItems
}