    import { createContext, useState } from "react";

    const Store = createContext(null);

    function Section({ children }) {


        const [user, setuser] = useState(null)
        const [accessToken, setaccessToken] = useState(null)

        console.log("accessToken",accessToken)

        const contextData = {
            user,
            setuser,
            accessToken,
            setaccessToken
        }

        return (
            <Store.Provider value={contextData}>
                {children}
            </Store.Provider>
        )

    }

    Section.store = Store;

    export default Section