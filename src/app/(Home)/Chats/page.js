'use client';
import React, { useState,useEffect } from 'react';
import { Search, MoreVertical, MessageCircle, Phone, Video, User } from 'lucide-react';
import { axiosPublic } from '../../base/constant';
import { useRouter } from 'next/navigation';

const ChatListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const[chatData,setChatData] = useState([]);
  const router = useRouter();
  
  // Mock chat data - in a real app, this would come from your API/database
//   const chatData = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
//       lastMessage: "Hey! How's your project going?",
//       timestamp: "2 min ago",
//       unreadCount: 2,
//       isOnline: true
//     },
//     {
//       id: 2,
//       name: "Mike Chen",
//       avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
//       lastMessage: "Thanks for the help yesterday 👍",
//       timestamp: "1 hour ago",
//       unreadCount: 0,
//       isOnline: true
//     },
//     {
//       id: 3,
//       name: "Emma Wilson",
//       avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
//       lastMessage: "Can we schedule a meeting for tomorrow?",
//       timestamp: "3 hours ago",
//       unreadCount: 1,
//       isOnline: false
//     },
//     {
//       id: 4,
//       name: "David Rodriguez",
//       avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
//       lastMessage: "Perfect! See you at 3 PM",
//       timestamp: "Yesterday",
//       unreadCount: 0,
//       isOnline: false
//     },
//     {
//       id: 5,
//       name: "Lisa Park",
//       avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
//       lastMessage: "The design looks amazing! 🎨",
//       timestamp: "Yesterday",
//       unreadCount: 0,
//       isOnline: true
//     },
//     {
//       id: 6,
//       name: "Alex Thompson",
//       avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
//       lastMessage: "Let me know when you're free to chat",
//       timestamp: "2 days ago",
//       unreadCount: 3,
//       isOnline: false
//     },
//     {
//       id: 7,
//       name: "Maya Patel",
//       avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
//       lastMessage: "Great job on the presentation!",
//       timestamp: "3 days ago",
//       unreadCount: 0,
//       isOnline: true
//     },
//     {
//       id: 8,
//       name: "James Williams",
//       avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
//       lastMessage: "I'll send you the files shortly",
//       timestamp: "1 week ago",
//       unreadCount: 0,
//       isOnline: false
//     }
//   ];


useEffect(()=>{
    axiosPublic.get(`/chat/allchats`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
    .then(res =>{
        if(res.status === 200){
            setChatData(res.data);
        }
    })
},[]);
  const filteredChats = chatData.filter(chat =>
    chat?.firstName?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  const formatTimestamp = (timestamp) => {
    return timestamp;
  };

  const handleChatClick = (chatId) => {
    router.push(`/Chats/${chatId}`)
    // In a real app, you'd navigate to the chat page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
                <p className="text-sm text-gray-500">{filteredChats.length} conversations</p>
              </div>
            </div>
            {/* <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button> */}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 text-black transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-black bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Chat List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredChats.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No conversations found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleChatClick(chat.chatId)}
                  className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0 mr-4">
                    {/* <img
                      src={User}
                      alt={chat.firstName}
                      className="w-12 h-12 rounded-full object-cover"
                    /> */}
                    <User className="w-10 h-10 text-black rounded-full object-cover" />
                    {chat.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {chat.firstName + " "+chat.lastName ||''}
                      </h3>
                      {/* <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {formatTimestamp(chat.timestamp)}
                        </span>
                        {chat.unreadCount > 0 && (
                          <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {chat.unreadCount}
                          </div>
                        )}
                      </div> */}
                    </div>
                    {/* <p className="text-sm text-gray-600 truncate">
                      {chat.lastMessage}
                    </p> */}
                  </div>

                  {/* Action Buttons (visible on hover) */}
                  {/* <div className="hidden group-hover:flex items-center space-x-2 ml-4">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                      <Video className="w-4 h-4" />
                    </button>
                  </div> */}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {/* <div className="mt-6 flex flex-wrap gap-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>New Chat</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <span>Mark All as Read</span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ChatListPage;