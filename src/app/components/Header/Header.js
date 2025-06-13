"use client";
import { Heart, Home, LogOut, Menu, Star, User, X,MessageSquare } from "lucide-react";
import React,{useState,useEffect} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const[firstName, setFirstName] = useState('User');
  const pathname = usePathname();

   useEffect(() => {
    const storedName = localStorage.getItem('firstName');
    if (storedName) {
      setFirstName(storedName);
    }
  }, []);
 
  const router = useRouter();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
 
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home,path:"/Home" },
    { id: 'matches', label: 'Matches', icon: Heart,path :"/Matches" },
    { id: 'interests', label: 'Interests', icon: Star,path:"/Interests" },
    { id: 'profile', label: 'Profile', icon: User,path:"/Profile"  },
    { id: 'chats', label: 'Chats', icon: MessageSquare,path:"/Chats"  },
  ];

  function handleLogout() {
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    localStorage.removeItem('primaryContact');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    router.push("/");
  }

  return(
     <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0" onClick={()=>{router.push("/Home",{scroll:true})}}>
            <h1 className="text-2xl font-bold text-[#FF6B6B] hover:text-[#e55a5a] transition-colors duration-200 cursor-pointer onClick={() => router.push('/')}">
              VivaahAI
            </h1>
          </div>
 
          {/* Navigation */}
          <nav className="flex space-x-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                // <Link href={`/${item.label}`} key={item.id}>
                <Link
              key={item.id}
              href={item.path}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer ${
                    pathname === item.path
                      ? 'text-[#FF6B6B] shadow-xs'
                      : 'text-gray-700  hover:text-gray-400'
                  }
              }`}
            >
                <IconComponent className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
              );
            })}
          </nav>
 
          {/* User Section */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 hidden xl:block">
              Hi, {firstName}
            </span>
            <button className="bg-[#FF6B6B] hover:bg-[#e55a5a] text-white px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 flex items-center cursor-pointer space-x-1" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
 
        {/* Mobile Header */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <h1 className="text-xl font-bold text-[#FF6B6B]">
              VivaahAI
            </h1>
 
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-600 hover:text-[#FF6B6B] hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
 
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg">
              <div className="px-4 py-4 space-y-2">
                {/* Navigation */}
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        router.push(`/${item.label}`);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                        pathname === item.path
                          ? 'bg-[#FF6B6B] text-white'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-[#FF6B6B]'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
               
                {/* User Section Mobile */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <div className="text-sm text-gray-600 px-4">
                    Hi, {firstName}
                  </div>
                  <button className="bg-[#FF6B6B] hover:bg-[#e55a5a] text-white px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 flex items-center cursor-pointer space-x-1" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
                </div>
              </div>
            </div>
          )}
        </div>
 
        {/* Tablet Header */}
        <div className="hidden md:flex lg:hidden items-center justify-between h-16">
          {/* Logo */}
          <h1 className="text-xl font-bold text-[#FF6B6B]">
            VivaahAI
          </h1>
 
          {/* Navigation */}
          <nav className="flex space-x-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {setActiveTab(item.id);router.push(`/${item.label}`,{ scroll: true })}}
                  className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    pathname === item.path
                      ? 'bg-[#FF6B6B] text-white'
                      : 'text-gray-700 hover:text-[#FF6B6B] hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>
 
          {/* User Section */}
         <button className="bg-[#FF6B6B] hover:bg-[#e55a5a] text-white px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 flex items-center cursor-pointer space-x-1" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
        </div>
      </div>
 
     
    </header>
  );
}