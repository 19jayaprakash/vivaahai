'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Smile, Paperclip, Phone, Video, MoreVertical, User, Info, X } from 'lucide-react';
import {useRouter, useParams } from 'next/navigation';
import { axiosPublic } from '../../../base/constant';

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();
  const[userName,setUserName] = useState("User");
  const[loggedInUserId,setLoggedInUserId] = useState(null);
  const[chatPersonalization,setChatPersonalization] = useState(0);

  useEffect(()=>{
    const storedId = localStorage.getItem("userId");
    if(storedId){
        setLoggedInUserId(Number(storedId));
    }
  },[]);

  

  const params = useParams();
    const id = params.id;

    useEffect(()=>{
      axiosPublic.get(`/conversation/score/${id}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      .then(res =>{
        if(res.status === 200){
        setChatPersonalization(res.data.data);
        }
      })
      .catch(err => {
        console.error("Error fetching chat personalization score:", err);
      });
  },[]);

    useEffect(()=>{
        axiosPublic.get(`/chat/${id}/getmessages`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
        .then(res =>{
            if(res.status === 200){
                setMessages(res.data.chats);
                setUserName(res.data.name)
            }
        })
    },[]);

  // Mock chat data
  const chatUser = {
    id: 2,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    isOnline: true,
    lastSeen: "Active now"
  };

  const currentUser = {
    id: 1,
    name: "You"
  };


  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(new Date(timestamp));
  };

  const formatDate = (timestamp) => {
    const today = new Date();
    const messageDate = new Date(timestamp);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    return messageDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    axiosPublic.post(`/chat/${id}/message`,{
        message : message
    },{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
    .then(res =>{
        if(res.status === 201){
            setMessages(prev => [...prev,res.data]);
            setMessage("");
        }
    })
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBackClick = () => {
    // In a real app, you'd navigate back to the chat list
    console.log('Navigate back to chat list');
    router.back();
  };

  const groupMessagesByDate = (messages) => {
    const grouped = {};
    messages.forEach(message => {
      const dateKey = formatDate(message.sentAt);
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(message);
    });
    return grouped;
  };

  const groupedMessages = groupMessagesByDate(messages);
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  const toggleInfoPopup = () => {
    setShowInfoPopup(!showInfoPopup);
  };

  return (
    <>
    <div className="flex flex-col h-screen relative bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleBackClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors lg:hidden"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleBackClick}
              className="hidden lg:flex p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="relative">
              <User className="w-10 h-10 rounded-full object-cover" />
              {chatUser.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-semibold text-gray-900 truncate">
                  {userName}
                </h1>
                <button
                  onClick={toggleInfoPopup}
                  className="p-1 hover:bg-gray-100 cursor-pointer rounded-full transition-colors"
                  title="View chat info"
                >
                  <Info className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                </button>
              </div>
              <p className="text-sm text-gray-500">
                {chatUser.isOnline ? chatUser.lastSeen : 'Offline'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Video className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>


    

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {Object.entries(groupedMessages).map(([date, dayMessages]) => (
          <div key={date}>
            {/* Date Separator */}
            <div className="flex items-center justify-center my-6">
              <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                {date}
              </div>
            </div>

            {/* Messages for this date */}
            {dayMessages.map((msg, index) => {
              const isCurrentUser = msg.senderId === loggedInUserId;
              const showAvatar = !isCurrentUser && (
                index === dayMessages.length - 1 || 
                dayMessages[index + 1]?.senderId !== msg.senderId
              );

              return (
                <div
                  key={msg.id}
                  className={`flex items-end space-x-2 mt-2 ${
                    isCurrentUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {!isCurrentUser && (
                    <div className="w-8 h-8 flex-shrink-0">
                      {showAvatar && (
                        // <img
                        //   src={chatUser.avatar}
                        //   alt={chatUser.name}
                        //   className="w-8 h-8 rounded-full object-cover"
                        // />
                        <User className="w-8 h-8 rounded-full text-black object-cover" />
                      )}
                    </div>
                  )}

                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      isCurrentUser
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-white text-gray-900 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {formatTime(msg.sentAt)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-end space-x-2">
            <div className="w-8 h-8 flex-shrink-0">
              {/* <img
                src={chatUser.avatar}
                alt={chatUser.name}
                className="w-8 h-8 rounded-full object-cover"
              /> */}
              <User className="w-8 h-8 rounded-full object-cover" />
            </div>
            <div className="bg-white px-4 py-2 rounded-2xl rounded-bl-sm shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t sticky bottom-0 border-gray-200 px-4 py-3">
        <div className="flex items-end space-x-3">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>

          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-4 py-3 bg-gray-100 rounded-2xl text-black border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none max-h-32 overflow-y-auto"
              style={{ minHeight: '44px' }}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 transition-colors">
              <Smile className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
       
    </div>

     {showInfoPopup && (
      <div className="fixed inset-0 top-10 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 shadow-xl rounded-lg w-full max-w-sm sm:max-w-md">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Chat Info</h3>
                <button
                  onClick={toggleInfoPopup}
                  className="p-1 hover:bg-gray-100 cursor-pointer rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Chat Score */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Chat Score
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${chatPersonalization?.compatibilityScore}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {chatPersonalization?.compatibilityScore}/100
                    </span>
                  </div>
                </div>

                {/* Personalized Comment */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Personalized Comment
                  </label>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {chatPersonalization?.personalizedComment || "No personalized comment available."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      )}

      {showInfoPopup && (
        <div 
          className="fixed inset-0 bg-black/30 bg-opacity-25 z-40"
          onClick={toggleInfoPopup}
        ></div>
      )}
    </>
  );
};

export default ChatInterface;