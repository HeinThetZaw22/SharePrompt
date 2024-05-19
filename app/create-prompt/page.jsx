"use client";
import {useState} from 'react';
import {useSession} from 'next-auth/react';
import Form from '../../components/Form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


const CreatePrompt = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const {data: session} = useSession();
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })
    const createPrompt = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId : session?.user.id,
                    tag: post.tag,
                })
            })
            if(response.ok){
                router.push('/');
                toast.success("Prompt created successfully")
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }
  return (
    <Form
     type="create"
     post={post}
     setPost={setPost}
     submitting={submitting}
     handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt