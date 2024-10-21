import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Disclosure,  Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Logo from '../../assets/Logo.png'
import SideBar from '../SideBar/SideBar'

const AdminNavbar = () => {
    const navigate = useNavigate();
    const onlogout = ()=>{
        localStorage.clear()
        navigate("/login")
    };


  return (
    <Disclosure as="nav" className="bg-primary">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
        <SideBar />
          <div className='flex flex-1 items-center  sm:items-stretch justify-center'>
            <div className="flex flex-shrink-0 items-center">
            <img
                alt="Your Company"
                src={Logo}
                className='h-20 w-auto mr-28'
              />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className="relative mx-8">
                <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full"
                    />
                </MenuButton>
                </div>
                <MenuItems
                transition
                className="absolute right-0 text-white z-10 mt-2 w-48 origin-top-right rounded-md bg-primary py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm  data-[focus]:bg-black">
                    Your Profile
                    </a>
                </MenuItem>
                <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm  data-[focus]:bg-black">
                    Settings
                    </a>
                </MenuItem>
                <MenuItem>
                    <a href="#" onClick={()=>onlogout()} className="block px-4 py-2 text-sm data-[focus]:bg-black">
                    Sign out
                    </a>
                </MenuItem>
                </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}

export default AdminNavbar