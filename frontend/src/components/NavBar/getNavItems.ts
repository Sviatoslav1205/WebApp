import * as NavData from "./NavData"

export default (role: string) => {
  switch (role) {
    case 'admin':
      return [...NavData.adminNavItems, ...NavData.navItems]
    default: 
      return [...NavData.navItems]
  }
}