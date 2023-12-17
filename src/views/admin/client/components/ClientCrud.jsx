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


const ClientCrud = ({ data, title, visible, onClose, onSubmit }) => {

    //const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const [op, setOp] = useState('insert');// operation= insert/update
    const [id, setId] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [nameSpouseInput, setNameSpouseInput] = useState('');

    const [birthDate, setBirthDate] = useState('');
    const [birthDate2, setBirthDate2] = useState('');
    const [endDate, setEndDate] = useState('');
    const [taxRate, setTaxRate] = useState('');
    const [pirRate, setPirRate] = useState('');
    const [investmentAssets, setInvestmentAssets] = useState('');
    const [notesInput, setNotesInput] = useState('');


    // Better: Adjust the state while rendering
    const [prevData, setPrevData] = useState(data);

    if (data !== prevData) {
        console.log("render ClientCrud");
        console.log(data);

        if (data) {
            setOp('update');
            setId(data.id);
            setNameInput(data.name);
            setNameSpouseInput(data.name_spouse);
            setBirthDate(data.birth_date);
            setBirthDate2(data.birth_date_2);
            setEndDate(data.end_date);
            setTaxRate(data.tax_rate);
            setPirRate(data.pir_rate);
            setInvestmentAssets(data.investment_assets);
            setNotesInput(data.notes);

        } else {
            setOp('insert');
            setId(null);
            setNameInput('');
            setNameSpouseInput('');
            setBirthDate(null);
            setBirthDate2(null);
            setEndDate(null);
            setTaxRate(null);
            setPirRate(null);
            setInvestmentAssets('');
            setNotesInput('');
        }
        setPrevData(data);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const addClientObject = {
            'op': op,
            'id': data ? data.id : null,
            'name': nameInput,
            'name_spouse': nameSpouseInput,
            'birth_date': birthDate,
            'birth_date_2': birthDate2,
            'end_date': endDate,
            'tax_rate': taxRate,
            'pir_rate': pirRate,
            'investment_assets': investmentAssets,
            'notes': notesInput
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
                                    <input onChange={(event) => setNameInput(event.target.value)} type="text" name="name" id="name" value={nameInput} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type name" required />
                                </div>

                                <div class="col-span-2">
                                    <label for="name_spouse" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Spouse Name (optional)</label>
                                    <input onChange={(event) => setNameSpouseInput(event.target.value)} type="text" name="name_spouse" id="name_spouse" value={nameSpouseInput} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type spouse name" />
                                </div>

                                <div class="col-span-2">
                                    <label for="birth_date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birth Date</label>
                                    <input onChange={(event) => setBirthDate(event.target.value)} type="date" name="birth_date" id="birth_date" value={birthDate} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type spouse name" />
                                </div>

                                <div class="col-span-2">
                                    <label for="birth_date2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birth Date Spouse (optional)</label>
                                    <input onChange={(event) => setBirthDate2(event.target.value)} type="date" name="birth_date2" id="birth_date2" value={birthDate2} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type spouse name" />
                                </div>


                                <div class="col-span-2">
                                    <label for="end_date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End date</label>
                                    <input onChange={(event) => setEndDate(event.target.value)} type="date" name="end_date" id="end_date" value={endDate} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type name" required />
                                </div>

                                <div class="col-span-2">
                                    <label for="tax_rate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tax Rate</label>
                                    <input onChange={(event) => setTaxRate(event.target.value)} type="number" name="tax_rate" id="tax_rate" value={taxRate} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type tax rate" />
                                </div>

                                <div class="col-span-2">
                                    <label for="pir_rate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pir Rate</label>
                                    <input onChange={(event) => setPirRate(event.target.value)} type="number" name="pir_rate" id="pir_rate" value={pirRate} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type tax rate" />
                                </div>

                                <div class="col-span-2">
                                    <label for="investment_assets" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Investment assets</label>
                                    <input onChange={(event) => setInvestmentAssets(event.target.value)} type="number" name="investment_assets" id="investment_assets" value={investmentAssets} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Investment assets" />
                                </div>

                                <div class="col-span-2">
                                    <label for="notes" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                                    <textarea onChange={(event) => setNotesInput(event.value)} id="notes" value={notesInput} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type here notes"></textarea>
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

export default ClientCrud;