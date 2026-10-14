import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('LOST');

  // Fetch all items from backend
  const fetchItems = () => {
    fetch('http://localhost:8080/api/items')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error('Error fetching items:', err));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Handle submitting a new Lost/Found item
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { title, description, location, type };

    fetch('http://localhost:8080/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then(() => {
        fetchItems(); // Refresh the item list
        setTitle('');
        setDescription('');
        setLocation('');
      })
      .catch((err) => console.error('Error adding item:', err));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Lost and Found Portal</h1>

      {/* Form to Report Lost or Found Item */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h3>Report an Item</h3>
        
        <div style={{ marginBottom: '10px' }}>
          <label>Status: </label>
          <select value={type} onChange={(e) => setType(e.target.value)} style={{ padding: '5px', marginLeft: '10px' }}>
            <option value="LOST">Lost</option>
            <option value="FOUND">Found</option>
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Item Name: </label>
          <input 
            type="text" 
            placeholder="e.g. Black Wallet" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            style={{ padding: '5px', width: '250px', marginLeft: '10px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Where was it lost/found?: </label>
          <input 
            type="text" 
            placeholder="e.g. Library / Cafeteria" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            style={{ padding: '5px', width: '250px', marginLeft: '10px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Description: </label>
          <input 
            type="text" 
            placeholder="e.g. Contains ID and cash" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            style={{ padding: '5px', width: '250px', marginLeft: '10px' }}
          />
        </div>

        <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
          Submit Item
        </button>
      </form>

      {/* Item List Display */}
      <h2>Posted Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: '8px' }}>
            <strong>[{item.type || 'ITEM'}] {item.title}</strong> - {item.description} {item.location && `(Location: ${item.location})`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;