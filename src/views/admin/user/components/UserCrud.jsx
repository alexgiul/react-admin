import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    //useDisclosure,
    Button,
} from '@chakra-ui/react'

import React, { useState} from 'react'


const UserCrud = ({ data, title, visible, onClose, onSubmit }) => {

    //const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const [op, setOp] = useState('insert');// operation= insert/update
    const [id, setId] = useState('');
    const [usernameInput, setUsernameInput] = useState('');


    // Better: Adjust the state while rendering
    const [prevData, setPrevData] = useState(data);

    if (data !== prevData) {
        console.log("render ClientCrud");
        console.log(data);

        if (data) {
            setOp('update');
            setId(data.id);
            setUsernameInput(data.name);

        } else {
            setOp('insert');
            setId(null);
            setUsernameInput('');
        }
        setPrevData(data);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const addClientObject = {
            'op': op,
            'id': data ? data.id : null,
            'username': usernameInput            
        }
        // some checks
        /*
        if (notesInput !== '' && ownerSelect !== '' && categorySelect !== '' && assocContactSelect !== '' && assocCompanySelect !== '') {
            console.log(addClientObject);
        }
        */

        if (onSubmit)
            onSubmit(addClientObject);
    }


    return (
        <>
            <Drawer
                isOpen={visible}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{title}</DrawerHeader>

                    <DrawerBody>
                        <form onSubmit={(e) => handleSubmit(e)} class="p-4 md:p-5">
                            <div class="grid gap-4 mb-4 grid-cols-2">
                                 {/* Hidden field for additional data */}
                                <input type="hidden" name="_id" value={id} />

                                <div class="col-span-2">
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input onChange={(event) => setUsernameInput(event.target.value)} type="text" name="username" id="username" value={usernameInput} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type name" required />
                                </div>


                            </div>

                            {data === null ? (
                                // Render insert button when data is null
                                <button type="submit" visible={data == null ? 'true' : 'false'} class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-4">
                                    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                    Add new Client
                                </button>
                            ) : (
                                // Render edit button when data is not null
                                <button type="submit" visible={data !== null ? 'true' : 'false'} class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-4">
                                    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                    Update Client
                                </button>

                            )}


                            <Button variant='outline' mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                        </form>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default UserCrud;