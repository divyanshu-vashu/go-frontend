import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './Home.css'; // Import your CSS file

interface HomeProps {
    name: string;
}

const Home: React.FC<HomeProps> = ({ name }) => {
    const [file, setFile] = useState<File | null>(null);
    const [files, setFiles] = useState<any[]>([]);
    const [search, setSearch] = useState('');
   
    const token = localStorage.getItem('token');

    // Log the token when the component mounts
    useEffect(() => {
        console.log('Token after page refresh:', token);
    }, [token]);

    if (!name) {
        return <Redirect to="/login" />;
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleFileUpload = async () => {
        // Retrieve the token from local storage
        const token = localStorage.getItem('token');
    
        // Check if token is available
        if (!token) {
            alert('User is not logged in. Please log in to continue.');
            return;
        }
    
        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        } else {
            alert('No file selected');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`, // Ensure the token is correctly added
                },
            });
    
            alert(`File uploaded successfully: ${response.data.file_url}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error uploading file:', error.response ? error.response.data : error.message);
                alert(`Error uploading file: ${error.response?.data?.error || 'Unknown error'}`);
            } else {
                console.error('Error uploading file:', error);
                alert('Error uploading file: Unknown error');
            }
        }
    };
    
    
    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/files');
            const results = response.data.filter((file: any) =>
                file.name.includes(search) || file.file_type.includes(search)
            );
            setFiles(results);
        } catch (error) {
            console.error('Error searching files:', error);
        }
    };

    return (
        <div className="home-container">
            <h1>Hi {name}</h1>
            <div className="controls">
                <div className="search-section">
                    <input
                        type="text"
                        placeholder="Search files..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div className="upload-section">
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleFileUpload}>Upload File</button>
                </div>
            </div>

            <div className="files-list">
                <h2>Files</h2>
                <ul>
                    {files.map((file) => (
                        <li key={file.id}>
                            <a href={`http://localhost:8000/uploads/${file.name}`}>{file.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
