import { useState } from "react";

const useAdmin = (email) => {
    const [admin, setAdmin] = useState(false);
    const [aLoading, setAloading] = useState(true);

    fetch(`https://intel-server-azim.herokuapp.com/user/${email}`)
        .then(res => res.json())
        .then(data => {
            if (data.role && data.role === 'admin') {
                setAdmin(true)
                setAloading(false)
            }
            else {
                setAdmin(false)
                setAloading(false)
            }

        })

    return [admin, aLoading];
}
export default useAdmin;