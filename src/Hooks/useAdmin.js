import { useState } from "react";

const useAdmin = (email) => {
    const [admin, setAdmin] = useState(false)
    fetch(`http://localhost:5000/user/${email}`)
        .then(res => res.json())
        .then(data => {
            if (data.role && data.role === 'admin') {
                setAdmin(true)
            }

        })

    return [admin];
}
export default useAdmin;