import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import Logo from '../../assets/rideup-logo.png';
import { cn } from '@/lib/utils';
import { Link } from 'react-router';
import { ModeToggle } from './ModeToggler';
import { authApi, useLogoutMutation, useUserInfoQuery } from '@/redux/features/auth/auth.api';
import { role } from '@/constants/role';
import { TbLayoutDashboard } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { useAppDispatch } from '@/redux/features/hook';

const menuItems = [
    { name: 'Home', to: '/' },
    { name: 'About Us', to: 'about-us' },
    { name: 'Features', to: 'features' },
    { name: 'FAQ', to: 'faq' },
    { name: 'Contact', to: 'contact' },
]

const GuestNavBar = () => {
    const [menuState, setMenuState] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const { data } = useUserInfoQuery(undefined);
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();

    console.log(data);

    const handleLogout = async () => {
        await logout(undefined);
        dispatch(authApi.util.resetApiState());
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-20 w-full px-2">
                <div className={cn('mx-auto mt-2 max-w-[1300px] px-6 transition-all duration-300', isScrolled && 'bg-white dark:bg-[#18181B] max-w-5xl rounded-2xl border border-gray-300 dark:border-gray-800 backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                to="/"
                                aria-label="home"
                                className="flex items-center space-x-2 max-w-32">
                                <img src={Logo} alt="RideUp" />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="dark:text-white in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="dark:text-white in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            to={item.to}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                to={item.to}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 lg:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <ModeToggle />

                                {data?.data?.email && (
                                    <>
                                        <Link to={`${data?.data?.role === role.rider && '/user' || data?.data?.role === role.admin && '/admin'}`} className='flex items-center gap-1 text-sm font-semibold text-[#004AAD] dark:text-blue-400 duration-300'><TbLayoutDashboard size={16} />Dashboard</Link>
                                        <span className='w-[2px] h-9 bg-gray-300 dark:bg-gray-700 hidden lg:block'></span>
                                        <button className='flex items-center gap-1 text-sm font-semibold bg-gray-50 dark:bg-gray-800 text-gray-400 border border-gray-100 dark:border-gray-800 px-3 py-1 rounded-full duration-300 cursor-pointer' onClick={handleLogout}>Log Out <IoMdLogOut size={16} /></button>
                                    </>

                                )}
                                {!data?.data?.email && (
                                    <>
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm"
                                            className={`dark:text-gray-100 ${cn(isScrolled && 'lg:hidden')}`}>
                                            <Link to="/login">
                                                <span>Login</span>
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            size="sm"
                                            className={`text-white ${cn(isScrolled && 'lg:hidden')}`}>
                                            <Link to="/registration">
                                                <span>Sign Up</span>
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            size="sm"
                                            className={`text-white ${cn(isScrolled ? 'lg:inline-flex' : 'hidden')}`}>
                                            <Link to="/login">
                                                <span>Get Started</span>
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default GuestNavBar