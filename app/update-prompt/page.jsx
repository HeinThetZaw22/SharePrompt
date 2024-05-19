"use client";
import {useState, useEffect} from 'react';
// import {useSession} from 'next-auth/react';
import Form from '../../components/Form';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';


const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const [submitting, setSubmitting] = useState(false);
    // const {data: session} = useSession();
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })
    console.log(promptId);

    useEffect(()=>{
        const getPromptDetail = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            console.log(data);
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if(promptId) getPromptDetail();
    },[promptId])
    const editPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        if(!promptId) return alert('Prompt Id not found');
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })
            if(response.ok){
                router.push('/');
                toast.success("Prompt edited successfully")
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }
  return (
    <Form
     type="Edit"
     post={post}
     setPost={setPost}
     submitting={submitting}
     handleSubmit={editPrompt}
    />
  )
}

export default EditPrompt