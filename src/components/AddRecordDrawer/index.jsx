import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react'

import React, { useState } from 'react'


const AddNewRecordDrawer = ({ buttonText }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [titleInput, setTitleInput] = useState('');
    const [notesInput, setNotesInput] = useState('');
    const [ownerSelect, setOwnerSelect] = useState('');
    const [categorySelect, setCategorySelect] = useState('');
    const [assocContactSelect, setAssocContactSelect] = useState('');
    const [assocCompanySelect, setAssocCompanySelect] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const addClientObject = {
            'title': titleInput,
            'owner': ownerSelect,
            'category': categorySelect,
            'contact': assocContactSelect,
            'company': assocCompanySelect,
            'notes': notesInput
        }
        if (notesInput !== '' && ownerSelect !== '' && categorySelect !== '' && assocContactSelect !== '' && assocCompanySelect !== '') {
            console.log(addClientObject);

        }
    }


    return (
        <>
            <button ref={btnRef} onClick={onOpen} className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
                {buttonText}
            </button>


            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Add a Client</DrawerHeader>

                    <DrawerBody>
                        <form onSubmit={(e) => handleSubmit(e)} class="p-4 md:p-5">
                            <div class="grid gap-4 mb-4 grid-cols-2">
                                <div class="col-span-2">
                                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                    <input onChange={(event) => setTitleInput(event.target.value)} type="text" name="title" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type title" required />
                                </div>
                                <div class="col-span-2">
                                    <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Owner</label>
                                    <select onChange={(event) => setOwnerSelect(event.target.value)} id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>
                                        <option disabled selected value> -- select an option -- </option>
                                        <option value="Click Growth Digital">Click Growth Digital</option>
                                        <option value="TV">Placeholder 1</option>
                                        <option value="PH">Placeholder 2</option>
                                    </select>
                                </div>
                                <div class="col-span-2">
                                    <label for="owner" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                    <select onChange={(event) => setCategorySelect(event.target.value)} id="owner" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>
                                        <option disabled selected value> -- select an option -- </option>
                                        <option value="High">High</option>
                                        <option value="TV">Medium</option>
                                        <option value="PH">Low</option>
                                    </select>
                                </div>
                                <div class="col-span-2">
                                    <label for="priority" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Associate Contract</label>
                                    <select onChange={(event) => setAssocContactSelect(event.target.value)} id="priority" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>
                                        <option disabled selected value> -- select an option -- </option>
                                        <option value="P1">Placeholder 1</option>
                                        <option value="P2">Placeholder 2</option>
                                        <option value="P3">Placeholder 3</option>
                                    </select>
                                </div>
                                <div class="col-span-2 ">
                                    <label for="companyAssoc" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Associated Company</label>
                                    <select onChange={(event) => setAssocCompanySelect(event.target.value)} id="companyAssoc" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option disabled selected value> -- select an option -- </option>
                                        <option value="Placeholder 1">Placeholder 1</option>
                                        <option value="Placeholder 2">Placeholder 2</option>
                                        <option value="Placeholder 3">Placeholder 3</option>
                                    </select>
                                </div>
                                <div class="col-span-2">
                                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                                    <textarea onChange={(event) => setNotesInput(event.value)} id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type here" required></textarea>
                                </div>
                            </div>
                            <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-4">
                                <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                Add new Client
                            </button>
                            <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-4">
                                <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                Update Client
                            </button>
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

export default AddNewRecordDrawer;