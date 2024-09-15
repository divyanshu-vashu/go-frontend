// import React from 'react';
// import {Link} from "react-router-dom";

// const Nav = (props: { name: string, setName: (name: string) => void }) => {
//     const logout = async () => {
//         await fetch('http://localhost:8000/api/logout', {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             credentials: 'include',
//         });

//         props.setName('');
//     }

//     let menu;

//     if (props.name === '') {
//         menu = (
//             <ul className="navbar-nav me-auto mb-2 mb-md-0">
//                 <li className="nav-item active">
//                     <Link to="/login" className="nav-link">Login</Link>
//                 </li>
//                 <li className="nav-item active">
//                     <Link to="/register" className="nav-link">Register</Link>
//                 </li>
//             </ul>
//         )
//     } else {
//         menu = (
//             <ul className="navbar-nav me-auto mb-2 mb-md-0">
//                 <li className="nav-item active">
//                     <Link to="/login" className="nav-link" onClick={logout}>Logout</Link>
//                 </li>
//             </ul>
//         )
//     }

//     return (
//         <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
//             <div className="container-fluid">
//                 <Link to="/" className="navbar-brand">Home</Link>

//                 <div>
//                     {menu}
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Nav;




import React from 'react';
import { useHistory } from 'react-router-dom';

interface NavProps {
    name: string;
    setName: (name: string) => void;
    setLoginStatus: (status: boolean) => void;
}

const Nav: React.FC<NavProps> = ({ name, setName, setLoginStatus }) => {
    const history = useHistory();

    const handleLogout = async () => {
        const response = await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (response.ok) {
            setName('');
            setLoginStatus(false); // Update login status
            history.push('/login'); // Redirect to login page
        } else {
            console.error('Logout failed');
        }
    };

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <a href="/" className="navbar-brand">Home</a>

                <div className="navbar-nav">
                    {name ? (
                        <>
                            <span className="navbar-text">Welcome, {name}</span>
                            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <a href="/login" className="nav-link">Login</a>
                            <a href="/register" className="nav-link">Register</a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Nav;
