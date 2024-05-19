"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter} from 'next/navigation';
import Profile from '@components/Profile'

const Myprofile = () => {
  const router = useRouter();
    const [posts ,setPosts] = useState([]);
    const {data: session} = useSession();
    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    };
    const handleDelete = async (post) => {
      const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
      if(hasConfirmed){
        try {
          await fetch(`/api/prompt/${post._id.toString()}`,{
            method: "DELETE",
          });
          // const filteredPosts = posts.filter((p) => p._id !== post._id);
          setPosts((posts) => posts.filter((p) => p._id !== post._id));
        } catch (error) {
          
        }
      }
    }
    useEffect(() => {
      console.log(session?.user.id);
        const fetchPosts = async () => {
           const response = await fetch(`api/users/${session?.user.id}/post`);
           const data = await response.json();
           console.log(data);
           
           setPosts(data);
        }
        if(session?.user.id){
          fetchPosts();
        }
        
     },[])
     if (!session) {
      router.push('/'); // Redirect to login if not authenticated
      return null;
  }
     console.log(posts);
  return (
    <Profile 
        name="My"
        desc="Welcome to your profile"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default Myprofile