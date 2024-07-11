import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify';


const BlogTableItem = ({ authorImg, title, author, date, deleteBlog, mongoId }) => {
    const BlogDate = new Date(date);

    const [showPopup, setShowPopup] = useState(false);
    const [keyCheck, setKeyCheck] = useState(false);
    const [inputCode, setInputCode] = useState('');

    const predefinedSecurityCode = process.env.NEXT_PUBLIC_PASSKEY_FOR_ACCESS_BLOG;

    const matchKey = () => {
        return inputCode === predefinedSecurityCode;
    }

    const handleDeleteClick = () => {
        setShowPopup(true);
    }

    const handleConfirmDeleteClick = () => {
        setShowPopup(false);
        setKeyCheck(true);
    }

    const handleCancelDelete = () => {
        setShowPopup(false);
    }

    const handleSecurityCodeChange = (e) => {
        setInputCode(e.target.value);
    }

    const handleSecurityCodeSubmit = () => {
        if (matchKey()) {
            deleteBlog(mongoId);
        } else {
            toast.error("Can't access blog deletion");
        }
        setKeyCheck(false);
        setInputCode('');
    }
    return (
        <tr className='bg-white border-b'>
            <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                <Image width={40} height={40} src={authorImg ? authorImg : assets.profile_icon} />
                <p>{author ? author : "No author"}</p>
            </th>
            <td className='px-6 py-4'>
                {title ? title : "No Title"}
            </td>
            <td className='px-6 py-4'>
                {BlogDate.toDateString()}
            </td>
            <td onClick={handleDeleteClick} className='px-6 py-4 cursor-pointer'>
                x
            </td>
            {showPopup && (
                <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <div className='bg-white p-6 rounded shadow-lg text-center'>
                        <p>Are you sure you want to delete this Blog?</p>
                        <div className='mt-4'>
                            <button onClick={handleConfirmDeleteClick} className='bg-red-500 text-white px-4 py-2 rounded mr-2'>
                                Yes
                            </button>
                            <button onClick={handleCancelDelete} className='bg-gray-300 text-gray-800 px-4 py-2 rounded'>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {keyCheck && (
                <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <div className='bg-white flex flex-col p-6 rounded shadow-lg text-center'>
                        <input 
                            type="number" 
                            placeholder='Drop the security code' 
                            className='w-full sm:w-[300px] mt-4 px-4 py-3 border' 
                            value={inputCode}
                            onChange={handleSecurityCodeChange}
                        />
                        <button onClick={handleSecurityCodeSubmit} className='bg-blue-500 text-white px-4 py-2 rounded mt-4'>
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </tr>
    )
}

export default BlogTableItem