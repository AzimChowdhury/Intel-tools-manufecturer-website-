import { useEffect, useState } from "react"

const useToken = user => {
    const [token, setToken] = useState('');
    useEffect(() => {
        const email = user?.user?.email;

        const intelUser = { email: email };
        if (email) {
            fetch(`https://intel-server.vercel.app/user`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(intelUser)
            })
                .then(res => res.json())
                .then(data => {
                    const jwtToken = data.token;
                    // console.log(data.token)
                    localStorage.setItem('JWT-token', jwtToken);
                    setToken(jwtToken);

                })
        }

    }, [user]);
    return [token];
}

export default useToken;