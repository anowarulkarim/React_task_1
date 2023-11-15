import React, { useState, useEffect } from 'react';
import './data.css';

const SpaceXCapsules = () => {
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firstElement, setFirstElement] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.spacexdata.com/v3/capsules');
        const data = await response.json();
        if (data && data.length > 0) {
          setFirstElement(data[0]);
        }
        setCapsules(data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCapsules = filterStatus !== 'All'
    ? capsules.filter(capsule => capsule.status === filterStatus)
    : capsules;

  const handleStatusFilter = (data) => {
    setFilterStatus(data.target.value);
  };

  return (
    <div>
      <h1>SpaceX Capsules</h1>
      <select value={filterStatus} onChange={handleStatusFilter} class="select1">
        <option value="All">All</option>
        <option value="retired">Retired</option>
        <option value="active">Active</option>
        <option value="unknown">Unknown</option>
        <option value="destroyed">Destroyed</option>
      </select>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <table border={2} className="table1">
          <tr>
            {Object.entries(firstElement).map(([key]) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
          {filteredCapsules.map((capsule, index) => (
            <tr key={index}>
              {Object.entries(capsule).map(([key, value]) => (
                <td key={key}>{JSON.stringify(value)}</td>
              ))}
            </tr>
          ))}
        </table>
      )}
    </div>
  );
};

export default SpaceXCapsules;
