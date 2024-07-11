'use client'
import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Jon John",
    authorImg: "/author_img.png",
  });
  const [showPasskeyPopup, setShowPasskeyPopup] = useState(false);
  const [inputPasskey, setInputPasskey] = useState("");

  const predefinedPasskey = process.env.NEXT_PUBLIC_PASSKEY_FOR_ACCESS_BLOG_CREATION;

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setShowPasskeyPopup(true);
  }

  const handlePasskeySubmit = async () => {
    if (inputPasskey === predefinedPasskey) {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("author", data.author);
      formData.append("authorImg", data.authorImg);
      formData.append("image", image);

      const response = await axios.post('/api/blog', formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(false);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Jon John",
          authorImg: "/author_img.png",
        });
      } else {
        toast.error("Error");
      }
      setShowPasskeyPopup(false);
      setInputPasskey("");
    } else {
      toast.error("Can't access Blog Creation");
    }
  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <Image className='mt-4' src={!image ? assets.upload_area : URL.createObjectURL(image)} width={140} height={70} alt='' />
        </label>
        <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        <p className='text-xl mt-4'>Blog title</p>
        <input name='title' onChange={onChangeHandler} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Type here' required />
        <p className='text-xl mt-4'>Blog Description</p>
        <textarea name='description' onChange={onChangeHandler} value={data.description} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' placeholder='Write content here' required />
        <p className='text-xl mt-4'>Blog category</p>
        <select name="category" onChange={onChangeHandler} value={data.category} className='w-40 mt-4 px-4 py-3 border text-gray-500'>
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type="submit" className='mt-8 w-40 h-12 bg-black text-white'>ADD</button>
      </form>

      {showPasskeyPopup && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50'>
          <div className='bg-white flex flex-col p-6 rounded shadow-lg text-center'>
            <p>Please enter the passkey to upload the blog</p>
            <input
              type="password"
              placeholder='Enter passkey'
              className='w-full sm:w-[300px] mt-4 px-4 py-3 border'
              value={inputPasskey}
              onChange={(e) => setInputPasskey(e.target.value)}
            />
            <button onClick={handlePasskeySubmit} className='bg-blue-500 text-white px-4 py-2 rounded mt-4'>
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
