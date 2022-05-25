import { useState } from "react";

const useAdmin = (email) => {
    const [admin, setAdmin] = useState(false)
    fetch(`https://intel-server-azim.herokuapp.com/user/${email}`)
        .then(res => res.json())
        .then(data => {
            if (data.role && data.role === 'admin') {
                setAdmin(true)
            }

        })

    return [admin];
}
export default useAdmin;