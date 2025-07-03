"use client";
import { Heart, Home, LogOut, Menu, Star, User, X, MessageSquare } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { axiosPublic } from "../../base/constant";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [firstName, setFirstName] = useState('User');
  const [unreadChatCount, setUnreadChatCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const storedName = localStorage.getItem('firstName');
    if (storedName) {
      setFirstName(storedName);
    }
  }, []);

  function getNotifyMessages(){
      axiosPublic.get('/chat/get-notify-messages', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          // Set unread chat count from the API response
          setUnreadChatCount(res.data.unreadChatCount || 0);
        }
      })
      .catch(err => {
        console.error('Error fetching unread messages:', err);
      });
  }

  useEffect(() => {
    // Fetch unread message notifications
   getNotifyMessages();
  }, []);

  const router = useRouter();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, path: "/Home" },
    { id: 'matches', label: 'Matches', icon: Heart, path: "/Matches" },
    { id: 'interests', label: 'Interests', icon: Star, path: "/Interests" },
    { id: 'profile', label: 'Profile', icon: User, path: "/Profile" },
    { id: 'chats', label: 'Chats', icon: MessageSquare, path: "/Chats" },
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


  useEffect(()=>{
      if(pathname.startsWith("/Chats/")){
          getNotifyMessages();
      }
  },[pathname])
  // Component to render navigation item with badge
  const NavigationItem = ({ item, isActive, onClick, className, showBadge = true }) => {
    const IconComponent = item.icon;
    const hasUnreadChats = item.id === 'chats' && unreadChatCount > 0;

    return (
      <div className="relative">
        <div className={className}>
          <IconComponent className="w-4 h-4" />
          <span>{item.label}</span>
        </div>
        {/* Unread badge for chats */}
        {showBadge && hasUnreadChats && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">
            {unreadChatCount > 99 ? '99+' : unreadChatCount}
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0" onClick={() => { router.push("/Home", { scroll: true }) }}>
            <h1 className="text-2xl font-bold text-[#FF6B6B] hover:text-[#e55a5a] transition-colors duration-200 cursor-pointer">
              VivaahAI
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                onClick={() => setActiveTab(item.id)}
                className="relative"
              >
                <NavigationItem
                  item={item}
                  isActive={pathname === item.path}
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer ${
                    pathname === item.path
                      ? 'text-[#FF6B6B] shadow-xs'
                      : 'text-gray-700 hover:text-gray-400'
                  }`}
                />
              </Link>
            ))}
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
                {menuItems.map((item) => (
                  <div key={item.id} className="relative">
                    <button
                      onClick={() => {
                        setActiveTab(item.id);
                        router.push(item.path);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                        pathname === item.path
                          ? 'bg-[#FF6B6B] text-white'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-[#FF6B6B]'
                      }`}
                    >
                      <NavigationItem
                        item={item}
                        isActive={pathname === item.path}
                        className="flex items-center space-x-3"
                        showBadge={false}
                      />
                    </button>
                    {/* Mobile badge positioned separately */}
                    {item.id === 'chats' && unreadChatCount > 0 && (
                      <div className="absolute top-2 right-4 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                        {unreadChatCount > 99 ? '99+' : unreadChatCount}
                      </div>
                    )}
                  </div>
                ))}

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
            {menuItems.map((item) => (
              <div key={item.id} className="relative">
                <button
                  onClick={() => { setActiveTab(item.id); router.push(item.path, { scroll: true }) }}
                  className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    pathname === item.path
                      ? 'bg-[#FF6B6B] text-white'
                      : 'text-gray-700 hover:text-[#FF6B6B] hover:bg-gray-50'
                  }`}
                >
                  <NavigationItem
                    item={item}
                    isActive={pathname === item.path}
                    className="flex items-center space-x-1"
                    showBadge={false}
                  />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
                {/* Tablet badge */}
                {item.id === 'chats' && unreadChatCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                    {unreadChatCount > 99 ? '99+' : unreadChatCount}
                  </div>
                )}
              </div>
            ))}
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