import { useState, useEffect } from 'react';
import './RandomUserList.css'; 

function RandomUserList() {
    const [userList, setUserList] = useState([]);
    const [expandedUsers, setExpandedUsers] = useState([]); 

    useEffect(() => {
        fetch('https://randomuser.me/api/?results=10')
            .then(response => response.json())
            .then(data => setUserList(data.results));
    }, []);

    const toggleDetails = (index) => {
        setExpandedUsers(prev => 
            prev.includes(index) 
                ? prev.filter(i => i !== index) 
                : [...prev, index]
        );
    };

    return (
        <div>
            <h2>Random Avatar:</h2>
            <div className="user-grid">
                {userList.map((user, index) => (
                    <div key={index} className="user-card">
                        <img 
                            src={user.picture.large} 
                            alt={`${user.name.first} ${user.name.last}`} 
                            className="user-avatar"
                        />
                        <h3>{user.name.first} {user.name.last}</h3>
                        <p>Genre: {user.gender === 'male' ? 'Masculin' : 'Féminin'}</p>
                        
                        
                        <p className="user-email">Email: {user.email}</p>

                        {expandedUsers.includes(index) && (
                            <div className="user-details">
                                <p>Phone: {user.phone}</p>
                                <p>Adresse :</p> {user.location.street.number}{" "}
                                {user.location.street.name}, {user.location.city},{" "}
                                {user.location.state}, {user.location.country}
                            </div>
                        )}
                        <button onClick={() => toggleDetails(index)}>
                            {expandedUsers.includes(index) ? '-' : '+'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RandomUserList;
