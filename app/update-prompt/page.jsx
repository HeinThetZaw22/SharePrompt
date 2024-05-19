"use client";
import { useState, useEffect, Suspense} from "react";
import Form from "../../components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  // console.log(promptId);

  useEffect(() => {
    const getPromptDetail = async () => {
      if(!promptId) return ;
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch prompt details");
        }
        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.error("An error occurred while fetching the prompt details:", error);
        toast.error("Failed to load prompt details");
      }

      // const response = await fetch(`/api/prompt/${promptId}`);
      // const data = await response.json();
      // // console.log(data);
      // setPost({
      //   prompt: data.prompt,
      //   tag: data.tag,
      // });

    };
    if (promptId) getPromptDetail();
  }, [promptId]);
  const editPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId){
      console.error("Prompt Id not found");
    }
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
        toast.success("Prompt edited successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  // if (!promptId) {
  //   return <div>Loading...</div>;
  // }
  return (
    <Suspense fallback={<>loading...</>}>
      <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
    </Suspense>
    
  );
  
};

export default EditPrompt;
