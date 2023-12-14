// MenuContext.js
import { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [selectedMenuItem, setSelectedMenuItem] = useState('default');

    const setMenuItem = (item) => {
        setSelectedMenuItem(item);
    };

    return (
        <MenuContext.Provider value={{ selectedMenuItem, setMenuItem }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
};
