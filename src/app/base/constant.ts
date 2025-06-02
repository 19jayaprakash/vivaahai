'use client'
import axios from 'axios';

   export const axiosPublic = axios.create({
        baseURL: "https://stu.globalknowledgetech.com:445",
        // baseURL:"https://digital.globalknowledgetech.com:8343/stuV3/stu/",
        headers: {
          "Content-Type": "application/json",
        },
      });
  

