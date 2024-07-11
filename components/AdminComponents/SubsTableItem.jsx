import React, { useState } from 'react';
import { toast } from 'react-toastify';

const SubsTableItem = ({ email, mongoId, deleteEmail, date }) => {
    const emailDate = new Date(date);

    const [showPopup, setShowPopup] = useState(false);
    const [keyCheck, setKeyCheck] = useState(false);
    const [inputCode, setInputCode] = useState('');

    const predefinedSecurityCode = process.env.NEXT_PUBLIC_PASSKEY_FOR_ACCESS_EMAIL;

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
            deleteEmail(mongoId);
        } else {
            toast.error("Can't access email deletion");
        }
        setKeyCheck(false);
        setInputCode('');
    }

    return (
        <tr className='bg-white border-b text-left'>
            <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                {email ? email : "No Email"}
            </th>
            <td className='px-6 py-4 hidden sm:block'>{emailDate.toDateString()}</td>
            <td onClick={handleDeleteClick} className='px-6 py-4 cursor-pointer'>
                x
            </td>
            {showPopup && (
                <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <div className='bg-white p-6 rounded shadow-lg text-center'>
                        <p>Are you sure you want to delete this Email?</p>
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
    );
}

export default SubsTableItem;
