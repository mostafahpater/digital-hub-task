import React, { useEffect, useState } from 'react'

function AddNewTask({isOpen,updateData, closeModal }) {
    const[title,setTitle]=useState("")
    const[body,setBody]=useState("")
    const[error,setError]=useState('')
    console.log(title,body)
    useEffect(()=>{
    
        if (updateData) {
            setTitle(updateData.title)
            setBody(updateData.body)
        }

    },[updateData])
    const handleFormSubmit = (e) => {
    e.preventDefault();
    if (title===undefined||body===undefined) {
        console.log('please fill inputs')
        setError('please fill inputs')
    } else {
        const value={
            title:title,
            body:body
        }
        console.log(value)
        // Handle form submission logic here
        closeModal(value); // Close modal after form submission
        setTitle('')
        setBody('')
        setError('')
    }
  };

  return (
    <>
     {isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-gray-400 opacity-75"></div>
          <form className="bg-white rounded-lg p-8 shadow-lg  z-50">
            <div className="flex items-center mb-4">
              {/* <ExclamationIcon className="w-8 h-8 text-red-500" /> */}
              <h2 className="ml-4 text-lg font-bold">Modal Title</h2>
            </div>
            <div className="space-y-4 flex flex-col">
              <input
                className="border border-gray-300 p-2 rounded"
                type="text"
                name="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder="title"
              />
              <input
                className="border border-gray-300 p-2 rounded"
                type="text"
                name="body"
                value={body}
                onChange={(e)=>setBody(e.target.value)}
                placeholder="body"
              />
            </div>
            <div
                className="text-red-500"
              >
                {error} 
              </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                onClick={handleFormSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
  }
export default AddNewTask