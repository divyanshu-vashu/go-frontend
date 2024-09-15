// import React, {SyntheticEvent, useState} from 'react';
// import {Redirect} from "react-router-dom";

// const Login = (props: { setName: (name: string) => void }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [redirect, setRedirect] = useState(false);

//     const submit = async (e: SyntheticEvent) => {
//         e.preventDefault();

//         const response = await fetch('http://localhost:8000/api/login', {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             credentials: 'include',
//             body: JSON.stringify({
//                 email,
//                 password
//             })
//         });

//         const content = await response.json();

//         setRedirect(true);
//         props.setName(content.name);
//     }

//     if (redirect) {
//         return <Redirect to="/"/>;
//     }

//     return (
//         <form onSubmit={submit}>
//             <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
//             <input type="email" className="form-control" placeholder="Email address" required
//                    onChange={e => setEmail(e.target.value)}
//             />

//             <input type="password" className="form-control" placeholder="Password" required
//                    onChange={e => setPassword(e.target.value)}
//             />

//             <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
//         </form>
//     );
// };

// export default Login;



import React, { SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = (props: { setName: (name: string) => void; setLoginStatus: (status: boolean) => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory(); // useHistory hook to programmatically navigate
    

    const submit = async (e: SyntheticEvent) => {
        
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const content = await response.json();
            console.log('Login successful:', content);
            localStorage.setItem('token', content.token); // Store the token
            props.setName(content.name);
            props.setLoginStatus(true); // Set login status to true
            history.push('/'); // Redirect to home page
        } else {
            // Handle login failure (e.g., show an error message)
            alert('Login failed');
            props.setLoginStatus(false); // Ensure login status is false
        }
    };
    
    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <input
                type="email"
                className="form-control"
                placeholder="Email address"
                required
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                className="form-control"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-100 btn btn-lg btn-primary" type="submit">
                Sign in
            </button>
        </form>
    );
};

export default Login;
