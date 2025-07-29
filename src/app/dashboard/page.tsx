'use client';
import { useState } from 'react';
import Link from 'next/link';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('user');
  const [nextId, setNextId] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  const addUser = () => {
    if (userName.trim() && userEmail.trim()) {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail.trim())) {
        alert('Please enter a valid email address');
        return;
      }
      
      const newUser: User = {
        id: nextId,
        name: userName.trim(),
        email: userEmail.trim(),
        role: userRole
      };
      setUsers([...users, newUser]);
      setUserName('');
      setUserEmail('');
      setUserRole('user');
      setNextId(nextId + 1);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const deleteUser = (id: number) => {
    const newUsers = users.filter(user => user.id !== id);
    setUsers(newUsers);
    setShowDeleteConfirm(null);
  };

  const confirmDelete = (id: number) => {
    setShowDeleteConfirm(id);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  const clearAllUsers = () => {
    if (users.length > 0 && confirm('Are you sure you want to delete all users?')) {
      setUsers([]);
      setNextId(1);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Dashboard</h1>
          <p className="text-gray-800">Manage users in your application</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Add New User</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Full Name"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="user-name-input"
            />
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Email Address"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="user-email-input"
            />
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="user-role-select"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
            <button 
              onClick={addUser} 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors"
              data-testid="add-user-button"
            >
              Add User
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Users ({users.length})</h2>
            {users.length > 0 && (
              <button 
                onClick={clearAllUsers}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md transition-colors"
                data-testid="clear-all-button"
              >
                Clear All
              </button>
            )}
          </div>
          
          {users.length > 0 && (
            <div className="mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users by name, email, or role..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="search-input"
              />
            </div>
          )}
          
                      {users.length === 0 ? (
            <div className="text-center py-8 text-gray-700" data-testid="no-users-message">
              No users added yet. Add your first user above!
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-700" data-testid="no-search-results">
              No users found matching your search.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-gray-900 font-medium">ID</th>
                    <th className="px-4 py-2 text-left text-gray-900 font-medium">Name</th>
                    <th className="px-4 py-2 text-left text-gray-900 font-medium">Email</th>
                    <th className="px-4 py-2 text-left text-gray-900 font-medium">Role</th>
                    <th className="px-4 py-2 text-left text-gray-900 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50" data-testid={`user-row-${user.id}`}>
                      <td className="px-4 py-2 text-gray-900">{user.id}</td>
                      <td className="px-4 py-2 font-medium text-gray-900">{user.name}</td>
                      <td className="px-4 py-2 text-gray-900">{user.email}</td>
                      <td className="px-4 py-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          user.role === 'admin' ? 'bg-red-100 text-red-800 border border-red-200' :
                          user.role === 'moderator' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                          'bg-green-100 text-green-800 border border-green-200'
                        }`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {showDeleteConfirm === user.id ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="text-red-600 hover:text-red-800 font-medium text-sm"
                              data-testid={`confirm-delete-user-${user.id}`}
                            >
                              Confirm
                            </button>
                            <button
                              onClick={cancelDelete}
                              className="text-gray-700 hover:text-gray-900 font-medium text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => confirmDelete(user.id)}
                            className="text-red-600 hover:text-red-800 font-medium"
                            data-testid={`delete-user-${user.id}`}
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
