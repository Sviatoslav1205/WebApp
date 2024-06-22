import * as NavData from "./NavData"

export default (role: string) => {
  switch (role) {
    case 'admin':
      return [...NavData.adminNavItems, ...NavData.userNavItems]
    case 'support':
      return [...NavData.supportNavItems, ...NavData.userNavItems]
    case 'manager':
      return [...NavData.managerNavItems, ...NavData.userNavItems]
    default: 
      return [...NavData.userNavItems]
  }
}