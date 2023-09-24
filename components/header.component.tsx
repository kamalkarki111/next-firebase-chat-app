'use client'
import { AuthContext } from '@/context/auth.context';
import { getAvatarName } from '@/lib/utils';
import { Avatar } from '@mui/joy';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';


function Header() {

    const { auth, setAuth } = useContext(AuthContext);
    const [openUserDropdown, setOpenUserDropdown] = useState(false);

    const { push } = useRouter()

    function logout() {
        setAuth({});
        push('/login');
        setOpenUserDropdown(false)
    }

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/home" className="flex items-center">
                    <Image
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-8 mr-3"
                        alt="Flowbite Logo"
                        width={40}
                        height={40}
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        ChitChat
                    </span>
                </Link>
                <div className="flex items-center md:order-2">
                    {auth.username && <button
                        onClick={() => setOpenUserDropdown(!openUserDropdown)}
                        type="button"
                        className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        id="user-menu-button"
                        aria-expanded="false"
                        data-dropdown-toggle="user-dropdown"
                        data-dropdown-placement="bottom"
                    >
                        <span className="sr-only">Open user menu</span>
                        <Avatar>{getAvatarName(auth.fname)}</Avatar>
                    </button>}
                    {/* Dropdown menu */}
                    {openUserDropdown && <div style={{ top: '50px', right: '15px' }}
                        className=" absolute z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                        id="user-dropdown"
                    >
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">
                                <strong>Name</strong> {auth.fname}
                            </span>
                        </div>
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">
                                <strong>User Name</strong> {auth.username}
                            </span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <a
                                    onClick={logout}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                    Sign out
                                </a>
                            </li>
                        </ul>
                    </div>}
                </div>
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-user"
                >
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a
                                href="#"
                                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                aria-current="page"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://calendly.com/kamalkarki8979/30min?month=2023-09"
                                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
}
export default Header;