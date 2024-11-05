import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Logo from '../../assets/Logo2.png'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const NavBar = ({ userInfo }) => {
  let navigation;
    if(userInfo){
       navigation = [
        { name: <Link to='/dashboard'>Home</Link>, href: '/dashboard', current: true,target:'_self' },
        { name: 'Shop', href: '/dashboard/products', current: false,target:'_self' },
        { name: 'About Us', href: '/dashboard#aboutus', current: false,target:'_self' },
        { name: <Link to="/dashboard/favourites"><i className='fa-regular fa-heart text-xl'></i></Link>, href: '/dashboard/favourites', current: false,target:'_self' },
        {name:<Link to="/dashboard/cart" className="group -m-2 flex items-center p-2">
          <i
            aria-hidden="true"
            className="bi bi-cart3 h-6 w-6 text-xl flex-shrink-0 text-black  group-hover:text-gray-900"
          />
          <span className="sr-only">items in cart, view bag</span>
        </Link>,href:"#",current:false,target:'_self'}
      ]
    }else{
      navigation = [
        { name: 'Shop', href: "/dashboard/products", current: false,target:'_self' },
        { name: <Link to='/about-us'>About Us</Link>, href: '/about-us', current: false,target:'_self' },
        {name:'Contact Us', href: 'https://wa.me/+2001272795074', current: false,target:'_blank' }
      ]
    }

    const navigate = useNavigate();
    const onlogout = ()=>{
        localStorage.clear()
        navigate("/")
    };
  return ( 
    <Disclosure as="nav" className="bg-slate-50 fixed z-50 w-full top-0">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className={`absolute inset-y-0 left-0 flex items-center ${userInfo ? 'sm:hidden': 'lg:hidden'}`}>
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-slate-300 hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className={`flex flex-1 items-center  sm:items-stretch  ${userInfo  ? 'justify-center sm:justify-start':'justify-end sm:ml-8 lg:justify-center'} `}>
            <div className="flex flex-shrink-0 items-center">
            <Link to={userInfo ? '/dashboard':'/'}><img
                alt="Shoes Store"
                src={Logo}
                className={`h-20 w-auto ${userInfo ? 'mr-28':'lg:mr-24'}`}
              /></Link>
            </div>
            <div className={`hidden sm:ml-6 ${userInfo ? 'sm:flex':'lg:flex'} items-center`}>
              <div className="flex space-x-4 items-center">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href.length > 10 ? item.href :userInfo ? item.href : `/${item.href}`}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-slate-300 text-primary' : 'text-primary  hover:text-gray-700',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    target={item.target}
                  >
                    {item.name}
                  </a>
                ))}
                
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            

                {userInfo ? (
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
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <MenuItem>
                          <span className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                            Your Profile
                          </span>
                        </MenuItem>
                        <MenuItem>
                          <span className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                            Settings
                          </span>
                        </MenuItem>
                        <MenuItem>
                          <button onClick={()=>onlogout()} className="block px-4 w-full text-left py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 cursor-pointer">
                            Logout
                          </button>
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                ):(
                  <div className='mr-24 hidden lg:block'>
                    <Link to="/signup" className='text-white bg-main px-4 py-2 rounded-md ml-4 hover:bg-sky-700'>Join us</Link>
                    <Link to="/login" className='text-white bg-main px-4 py-2 rounded-md ml-4 hover:bg-sky-700'>Login</Link>
                  </div>
                )}
          </div>
        </div>
      </div>

      <DisclosurePanel className={`${userInfo ? 'sm:hidden':'lg:hidden'}`}>
        <div className="mb-2 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-slate-300 text-primary' : 'text-primary  hover:text-gray-700 hover:bg-slate-300',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
            
          ))}
            {!userInfo && (
              <div className='mr-24 my-4'>
                <Link to="/signup" className='text-white bg-main px-4 py-2 rounded-md ml-4 hover:bg-sky-700'>Join us</Link>
                <Link to="/login" className='text-white bg-main px-4 py-2 rounded-md ml-4 hover:bg-sky-700'>login</Link>
              </div>
            )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default NavBar