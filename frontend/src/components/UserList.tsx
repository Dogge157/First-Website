import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({ username: '', email: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error: any) {
      setError('Failed to load users');
      console.error('Users fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await axios.delete(`/api/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error: any) {
      setError('Failed to delete user');
      console.error('Delete error:', error);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setEditForm({ username: user.username, email: user.email });
  };

  const handleUpdate = async () => {
    if (!editingUser) return;

    try {
      const response = await axios.put(`/api/users/${editingUser.id}`, editForm);
      setUsers(users.map(user => 
        user.id === editingUser.id ? response.data : user
      ));
      setEditingUser(null);
      setEditForm({ username: '', email: '' });
    } catch (error: any) {
      setError('Failed to update user');
      console.error('Update error:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditForm({ username: '', email: '' });
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="header">
        <h1>User Management</h1>
        <p>Manage all registered users in the system</p>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <div className="card">
        <h3>👥 All Users ({users.length})</h3>
        
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              marginTop: '1rem'
            }}>
              <thead>
                <tr style={{ 
                  background: '#f8fafc',
                  borderBottom: '2px solid #e2e8f0'
                }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>ID</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Username</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Created</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.75rem' }}>{user.id}</td>
                    <td style={{ padding: '0.75rem' }}>
                      {editingUser?.id === user.id ? (
                        <input
                          type="text"
                          value={editForm.username}
                          onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                          className="form-input"
                          style={{ width: '100%' }}
                        />
                      ) : (
                        user.username
                      )}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {editingUser?.id === user.id ? (
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                          className="form-input"
                          style={{ width: '100%' }}
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {editingUser?.id === user.id ? (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            onClick={handleUpdate}
                            className="btn btn-primary"
                            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                          >
                            Save
                          </button>
                          <button 
                            onClick={handleCancelEdit}
                            className="btn btn-secondary"
                            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            onClick={() => handleEdit(user)}
                            className="btn btn-secondary"
                            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(user.id)}
                            className="btn btn-danger"
                            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card" style={{ marginTop: '1rem' }}>
        <h3>📊 User Statistics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f0f9ff', borderRadius: '0.375rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0369a1' }}>
              {users.length}
            </div>
            <p style={{ margin: 0, color: '#0c4a6e' }}>Total Users</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f0fdf4', borderRadius: '0.375rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a' }}>
              {users.filter(user => new Date(user.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
            </div>
            <p style={{ margin: 0, color: '#15803d' }}>New This Week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList; 