import React from 'react';

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    //AlertDialogCloseButton,
  } from '@chakra-ui/react'

  import {Button} from '@chakra-ui/react'

  const DeleteAlert = ({ title, data, visible,  onActionCancel, onActionDelete }) => {
      
    const cancelRef = React.useRef()
  
    return (
      <> 
        <AlertDialog
          isOpen={visible}
          leastDestructiveRef={cancelRef}
          onClose={onActionCancel}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                {title}
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onActionCancel}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={() => onActionDelete(data)} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }


  export default DeleteAlert;