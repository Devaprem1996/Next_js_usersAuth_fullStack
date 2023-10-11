"use client"

import react from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import Link  from 'next/link';

const ProfilePage = () => {

  const router = useRouter();
  const [data,setData] = react.useState("nothing")
    

  const logout = async () => {
    try {
      await axios.get("api/users/logout");
      toast.success("You have successfully logged out");
      router.push("/login");


    } catch (error: any) {
      console.log("Failed to log out")
      toast.error("Failed to log out", error);
    }
      
  }

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);


    } catch (error: any) {
      console.log("Failed to get user details", error)
      toast.error("Failed to get user details", error)
    }
  
  }

    


      return (
        <>
          <div className="flex  items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <h2 className='text-2xl font-bold leading-tight text-black'>
              Profile Page
            </h2>
          </div>
          <div className="flex  border-2 px-3 py-2 rounded-md bg-green-500  items-center justify-center px-2 py-2 "  >
          <h2 >
              {data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
            </h2>
          </div>
          <div className="flex items-center justify-center px- 4 py-10 sm:px  lg" >
            <button className='border-2 px-3 py-2 rounded-md bg-red-500' onClick={logout}>
              <span className='text-2xl font-bold leading-tight text-black' 
              >Logout</span> 
            </button>
          </div>
          <div className="flex items-center justify-center px-3 py-2 sm:px  lg">
          <button className='  border-2 px-3 py-2 rounded-md bg-orange-500'  onClick={getUserDetails}>
              <span className='text-2xl font-bold leading-tight text-black'
              >GetDataFromToken</span> 
            </button>
          </div>
        </>
        
      );
}

export default profilePage