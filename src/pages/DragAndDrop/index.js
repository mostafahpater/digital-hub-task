import React, { useRef, useState } from 'react'
import './index.css'
import user from "../../assets/blank-profile-picture-973460_640.png";
import Container from "../../components/global/Container";
import { FaPlus, FaX } from 'react-icons/fa6';
import AddNewTask from './AddNewTask';
function DragAndDrop() {
    const [notStart, setNotStart] = useState([{
        title: "Splash Screen1",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        image: '../../assets/blank-profile-picture-973460_640.png'
    },
    {
        title: "Splash Screen2",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        image: '../../assets/blank-profile-picture-973460_640.png'
    }])
    const [inProgress, setInProgress] = useState([{
        title: "Splash Screen3",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        image: '../../assets/blank-profile-picture-973460_640.png'
    },
    {
        title: "Splash Screen4",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        image: '../../assets/blank-profile-picture-973460_640.png'
    }])
    console.log(notStart)
    const [finished, setFinished] = useState([{
        title: "Splash Screen5",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        image: '../../assets/blank-profile-picture-973460_640.png'
    },
    {
        title: "Splash Screen6",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        image: '../../assets/blank-profile-picture-973460_640.png'
    }])
    const [updateData, setUpdateData] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dragItem = useRef();
    const dragList = useRef();
    const dragListItem = useRef();
    const openModal = (setListName, value, index) => {
        dragListItem.current = setListName;
        dragItem.current = index;
        console.log(value)
        if (value) {
            setUpdateData(value)
        }
        setIsModalOpen(true);
    };

    const closeModal = (value) => {
        if (updateData) {
            console.log(dragItem.current)
            dragListItem.current((e) => {
                console.log(e)
                const newData = e.filter((event) => event !== e[dragItem.current])
                console.log(newData)
                return [
                    ...newData,
                    value
                ]
            });
        } else {
            dragListItem.current((e) => {
                console.log(e)
                return [
                    ...e,
                    value
                ]
            });
        }
        setIsModalOpen(false);
    };
    const dragStart = (listName, event, index) => {
        console.log(event.target)
        console.log(index)
        console.log(listName);
        dragList.current = listName
        dragItem.current = index;
    };
    const dragEnter = (setListName) => {
        dragListItem.current = setListName;
        console.log(setListName);
    };
    const drop = (dataList) => {
        const copyListItems = [...dataList];
        const dragItemContent = copyListItems[dragItem.current];
        console.log(dragItemContent)
        console.log(dragList.current)
        if (dragListItem.current === dragList.current) {
            console.log('this is in the same state')
        } else {

            //add
            dragListItem.current((e) => {
                console.log(e)
                return [
                    ...e,
                    dragItemContent
                ]
            });
            //delete
            dragList.current((e) => {
                console.log(e)
                const newData = dataList.filter((event) => event !== e[dragItem.current])
                console.log(newData)
                return [
                    // ...e,
                    ...newData
                ]
            });
        }
    };
    const handelDelete = (setListName, value, index) => {

        setListName((e) => {
            console.log(e)
            const newData = e.filter((event) => event !== e[index])
            console.log(newData)
            return [
                // ...e,
                ...newData
            ]
        });
    }
    return (
        <div className=' bg-gray-100 min-h-screen p-3'>
            <Container>
                <AddNewTask isOpen={isModalOpen} updateData={updateData} closeModal={closeModal} />
                <div className='flex'>
                    <div className='w-1/3' onDragEnter={(e) => dragEnter(setNotStart)} onDragEnd={() => drop(notStart)}>
                        <h2 className='font-bold text-lg ml-3 inline-block p-2 text-gray-50 rounded-md bg-red-500'>Not Started</h2>
                        <div >
                            {notStart.length === 0 ? <div className=' m-3 border-2 p-3 rounded-lg bg-gray-50 text-lg text-center font-semibold'>Not Have Data</div> : (notStart.map((value, index) => (
                                <div key={index} draggable onDragStart={(e) => dragStart(setNotStart, e, index)} >
                                    <div className=' m-3 border-2 p-3 rounded-lg bg-gray-50  after:rounded-3xl relative after:w-[4px] after:absolute after:top-0  
    after:bg-red-500 after:h-[90%] after:mt-2'>
                                        <div className="flex justify-between items-center ml-3">
                                            <p className='header mb-2 font-bold text-gray-800'>{value.title}</p>
                                            <div onClick={() => handelDelete(setNotStart, value, index)} className='text-red-500 cursor-pointer hover:bg-red-500 hover:text-white p-1 rounded'>
                                                <FaX />
                                            </div>
                                        </div>
                                        <p className='body ml-3'>{value.body}</p>
                                        <div className="flex justify-between items-center mt-3 ml-3">
                                            <div className=' border-2 p-3 rounded-lg flex items-center font-semibold justify-center px-2 py-1 text-white bg-green-500 cursor-pointer hover:bg-green-600' onClick={() => openModal(setNotStart, value, index)}>Edit</div>
                                            <img src={user} className='rounded-full' width={30} height={30} alt='user' />
                                        </div>
                                    </div>
                                </div>
                            )))}
                            {/* <div className=' m-3 border-2 p-3 rounded-lg bg-gray-50 flex items-center text-lg font-semibold justify-center'>Drop<FaPlus className='ml-1 text-lg'/></div> */}
                            <div className=' m-3 border-2 p-3 rounded-lg flex items-center text-lg font-semibold justify-center px-4 py-2 text-white bg-blue-500 cursor-pointer hover:bg-blue-600' onClick={() => openModal(setNotStart)}>Add<FaPlus className='ml-1 text-lg' /></div>
                        </div>
                    </div>
                    <div className='w-1/3' onDragEnter={(e) => dragEnter(setInProgress)} onDragEnd={() => drop(inProgress)}>

                        <h2 className='font-bold text-lg ml-3 inline-block p-2 text-gray-50 rounded-md bg-blue-500'>In Progress</h2>
                        <div>
                            {inProgress.length === 0 ? <div className=' m-3 border-2 p-3 rounded-lg bg-gray-50 text-lg text-center font-semibold'>Not Have Data</div> : (inProgress.map((value, index) => (
                                <div key={index} draggable onDragStart={(e) => dragStart(setInProgress, e, index)}  >
                                    <div className=' m-3 border-2 p-3 rounded-lg bg-gray-50  after:rounded-3xl relative after:w-[4px] after:absolute after:top-0  
    after:bg-blue-500 after:h-[90%] after:mt-2'>
                                        <div className="flex justify-between items-center ml-3">
                                            <p className='header mb-2 font-bold text-gray-800'>{value.title}</p>
                                            <div onClick={() => handelDelete(setInProgress, value, index)} className='text-red-500 cursor-pointer hover:bg-red-500 hover:text-white p-1 rounded'>
                                                <FaX />
                                            </div>
                                        </div>
                                        <p className='body ml-3'>{value.body}</p>
                                        <div className="flex justify-between items-center mt-3 ml-3">
                                            <div className=' border-2 p-3 rounded-lg flex items-center font-semibold justify-center px-2 py-1 text-white bg-green-500 cursor-pointer hover:bg-green-600' onClick={() => openModal(setInProgress, value, index)}>Edit</div>

                                            <img src={user} className='rounded-full' width={30} height={30} alt='user' />
                                        </div>
                                    </div>
                                </div>
                            )))}
                            {/* <div className=' m-3 border-2 p-3 rounded-lg bg-gray-50 flex items-center text-lg font-semibold justify-center'>Drop<FaPlus className='ml-1 text-lg'/></div> */}
                            <div className=' m-3 border-2 p-3 rounded-lg flex items-center text-lg font-semibold justify-center px-4 py-2 text-white bg-blue-500 cursor-pointer hover:bg-blue-600' onClick={() => openModal(setInProgress)}>Add<FaPlus className='ml-1 text-lg' /></div>
                        </div>
                    </div>
                    <div className='w-1/3' onDragEnter={(e) => dragEnter(setFinished)} onDragEnd={() => drop(finished)}>

                        <h2 className='font-bold text-lg ml-3 inline-block p-2 text-gray-50 rounded-md bg-green-500'>Finished</h2>
                        <div>
                            {finished.length === 0 ? <div className=' m-3 border-2 p-3 rounded-lg bg-gray-50 text-lg text-center font-semibold'>Not Have Data</div> : (finished.map((value, index) => (
                                <div key={index} draggable onDragStart={(e) => dragStart(setFinished, e, index)} >
                                    <div className=' m-3 border-2 p-3 rounded-lg bg-gray-50  after:rounded-3xl relative after:w-[4px] after:absolute after:top-0  
    after:bg-green-500 after:h-[90%] after:mt-2'>
                                        <div className="flex justify-between items-center ml-3">
                                            <p className='header mb-2 font-bold text-gray-800'>{value.title}</p>
                                            <div onClick={() => handelDelete(setFinished, value, index)} className='text-red-500 cursor-pointer hover:bg-red-500 hover:text-white p-1 rounded'>
                                                <FaX />
                                            </div>
                                        </div>
                                        <p className='body ml-3'>{value.body}</p>
                                        <div className="flex justify-between items-center mt-3 ml-3">
                                            <div className=' border-2 p-3 rounded-lg flex items-center font-semibold justify-center px-2 py-1 text-white bg-green-500 cursor-pointer hover:bg-green-600' onClick={() => openModal(setFinished, value, index)}>Edit</div>

                                            <img src={user} className='rounded-full' width={30} height={30} alt='user' />
                                        </div>
                                    </div>
                                </div>
                            )))}
                            {/* <div className=' m-3 border-2 p-3 rounded-lg bg-gray-50 flex items-center text-lg font-semibold justify-center'>Drop<FaPlus className='ml-1 text-lg'/></div> */}
                            <div className=' m-3 border-2 p-3 rounded-lg flex items-center text-lg font-semibold justify-center px-4 py-2 text-white bg-blue-500 cursor-pointer hover:bg-blue-600' onClick={() => openModal(setFinished)}>Add<FaPlus className='ml-1 text-lg' /></div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default DragAndDrop