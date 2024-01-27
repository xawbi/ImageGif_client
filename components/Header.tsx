import Navigation from "@/components/Navigation";
import {checkAdmin, checkVerify} from "@/api/checkVerify";

export default async function Header() {
  let navItems = []
  if (checkVerify() && await checkAdmin()) {
    navItems = [
      {label: 'Home', href: '/'},
      {label: 'AdminPanel', href: '/admin'},
      {label: 'Profile', href: '/profile'},
    ]
  } else if (checkVerify()) {
    navItems = [
      {label: 'Home', href: '/'},
      {label: 'Profile', href: '/profile'},
    ]
  } else {
    navItems = [
      {label: 'Home', href: '/'},
      {label: 'Login', href: '/auth'},
    ]
  }

  return (
    <>
      <header className="bg-gray-900 py-3 px-6 flex justify-between items-center">
        <Navigation navLinks={navItems}/>
      </header>
    </>
  )
}