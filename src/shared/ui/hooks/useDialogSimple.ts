import { useState } from "react";

export const useDialogSimple = (): [boolean, () => void, () => void] => {
    const [isOpen, setIsOpen] = useState(false);
    
    const openDialog = () => {
        console.log("Se avrio")
        setIsOpen(true);
    }
    const closeDialog = () => {
        setIsOpen(false);
    }

    return [ 
        isOpen,
        openDialog,
        closeDialog 
    ];
};

