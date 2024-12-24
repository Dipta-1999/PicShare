import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextProps {
    username: string;
    setUsernameContext: (username: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUsernameContext] = useState("");

    return (
        <UserContext.Provider value={{ username, setUsernameContext }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
