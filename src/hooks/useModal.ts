import { useState } from "react";

export const useModal = () => {
    const [visble, setVisible] = useState(false);
    const [edit, setEdit] = useState(false);

    return {
        visble,
        setVisible,
        edit,
        setEdit,
    };
}