import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserById, deleteUserById, getCurrentUser } from '../../services/client';
import './userprofile.css';


// Interface for UserProfileProps
interface UserProfileProps{
    userId: string;
}
// UserProfile component displays the user's profile
const UserProfile: React.FC<UserProfileProps> = () => {
    const [user, setUser] = useState({ _id: '', firstname: '', lastname: '', email: '' }); 
    const [editData, setEditData] = useState({ firstname: '', lastname: '', email: '', password: '', confirmPassword: '' });
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    // Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
                setEditData({ 
                    firstname: currentUser.firstname, 
                    lastname: currentUser.lastname, 
                    email: currentUser.email,
                    password: '', 
                    confirmPassword: '' 
                });
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        fetchUser();
    }, []);

     // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

     // Handle update user data
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (editData.password !== editData.confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        const dataToUpdate = {
            firstname: editData.firstname,
            lastname: editData.lastname,
            email: editData.email,
        };

        if (editData.password) {
            dataToUpdate.password = editData.password;
        }


        try {
            const updatedUser = await updateUserById(user._id, dataToUpdate);
            setUser(updatedUser);
            setEditMode(false);
           
        } catch (error) {
            console.error('Error updating user:', error);
           
        }
    };

    // Handle delete user account
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete your account? This cannot be undone.');
        if (confirmDelete) {
            try {
                await deleteUserById(user._id);
                // redirecting to a login page
                navigate('/signin');
            } catch (error) {
                console.error('Error deleting user:', error);
                
            }
        }
    };

    return (
        <div className="user-profile-wrapper">
        <div className="user-profile-container">
            {editMode ? (
                <form onSubmit={handleUpdate} className="user-profile-form">
                     <div className="form-group">
                     <label htmlFor="firstname" className="form-label">First Name</label>

                    <input
                        type="text"
                        name="firstname"
                        value={editData.firstname}
                        onChange={handleInputChange}
                        required
                        className="user-profile-input"
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="lastname" className="form-label">Last Name</label>

                    <input
                        type="text"
                        name="lastname"
                        value={editData.lastname}
                        onChange={handleInputChange}
                        required
                        className="user-profile-input"
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>

                    <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleInputChange}
                        required
                        className="user-profile-input"
                    />
                    </div>

                    <div className="form-group">
                            <label htmlFor="password" className="form-label">New Password</label>
                            <input
                                type="password"
                                name="password"
                                value={editData.password}
                                onChange={handleInputChange}
                                className="user-profile-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={editData.confirmPassword}
                                onChange={handleInputChange}
                                className="user-profile-input"
                            />
                        </div>

                    <div className="user-profile-actions">
                    <button type="submit" className="user-profile-button save">Save Changes</button>
                    <button onClick={() => setEditMode(false)} className="user-profile-button cancel">Cancel</button>
                    </div>
                </form>
            ) : (
                <div className="user-profile-details">
                    <p>First Name: {user.firstname}</p>
                    <p>Last Name: {user.lastname}</p>
                    <p>Email: {user.email}</p>
                    <button onClick={() => setEditMode(true)} className="user-profile-button edit">Edit Profile</button>
                </div>
            )}
            <button onClick={handleDelete} className="user-profile-button delete">Delete Account</button>
        </div>
        </div>
    );
};

export default UserProfile;
