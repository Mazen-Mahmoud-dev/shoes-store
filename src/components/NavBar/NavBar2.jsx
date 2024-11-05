
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import Logo from '../../assets/Logo2.png'
import { Link, useNavigate } from "react-router-dom";

export default function NavBar2({userInfo}) {
    let navigation;
    if(userInfo){
       navigation = [
        { name: <Link to='/dashboard'>Home</Link>, href: '/dashboard' },
        { name: 'Shop', href: '/dashboard/products' },
        { name: 'About Us', href: '/dashboard#aboutus'},
        { name: <Link to="/dashboard/favourites"><i className='fa-regular fa-heart text-xl'></i></Link>, href: '/dashboard/favourites' },
        {name:<Link to="/dashboard/cart" className="group -m-2 flex items-center p-2">
          <i
            aria-hidden="true"
            className="bi bi-cart3 h-6 w-6 text-xl flex-shrink-0 text-black  group-hover:text-gray-900"
          />
          <span className="sr-only">items in cart, view bag</span>
        </Link>,href:"#"}
      ]
    }else{
      navigation = [
        {name: <Link to='/'>Home</Link>, href: '/'},
        { name: 'Shop', href: "/dashboard/products" },
        { name: <Link to='/about-us'>About Us</Link>, href: '/about-us'},
        {name:'Contact Us', href: 'https://wa.me/+2001272795074' }
      ]
    }
    const navigate = useNavigate();
    const onlogout = ()=>{
        localStorage.clear()
        navigate("/")
    };
  return (
    <Navbar fluid rounded className="fixed top-0 w-full z-50 border-b-2  border-b-cyan-300">
      <Navbar.Brand href={userInfo ? "/dashboard": "/"}>
        <img src={Logo} className="mr-3 h-6 sm:h-14 w-full" alt="Website Logo" loading="lazy" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Shoes Store</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {userInfo ? 
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">{`${userInfo.firstName} ${userInfo.lastName}`}</span>
                            <span className="block truncate text-sm font-medium">{userInfo.email}</span>
                        </Dropdown.Header>
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={()=> onlogout()}>Sign out</Dropdown.Item>
                    </Dropdown>
            :
                <Link to="/login"><Button className="mr-3 bg-main">Log In</Button></Link>

            
        }
        <Navbar.Toggle className="ml-8" />
      </div>
      <Navbar.Collapse>
        {navigation.map((link)=>{
            return(
                <Navbar.Link href={link.href}>{link.name}</Navbar.Link>
            )
        })}   
      </Navbar.Collapse>
    </Navbar>
  );
}
