import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Nav from './components/Nav';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';

const App: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [loginStatus, setLoginStatus] = useState<boolean>(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/user', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add Authorization header
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const content = await response.json();
                    setName(content.name);
                    setLoginStatus(true);
                } else {
                    setName('');
                    setLoginStatus(false);
                }
            } catch (error) {
                console.error('Failed to fetch user', error);
                setName('');
                setLoginStatus(false);
            }
        };

        fetchUser();
    }, [loginStatus]);

    return (
        <div className="App">
            <BrowserRouter>
                <Nav name={name} setName={setName} setLoginStatus={setLoginStatus} />

                <main className="form-signin">
                    <Switch>
                        <Route path="/" exact render={() => loginStatus ? <Home name={name} /> : <Login setName={setName} setLoginStatus={setLoginStatus} />} />
                        <Route path="/login" render={() => !loginStatus ? <Login setName={setName} setLoginStatus={setLoginStatus} /> : <Home name={name} />} />
                        <Route path="/register" component={Register} />
                    </Switch>
                </main>
            </BrowserRouter>
        </div>
    );
};

export default App;
