import React, { useState, useEffect } from 'react';
import './Contributors.css';

const useLanyard = (discordId) => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
        const json = await response.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (error) {
        console.error('Lanyard fetch error:', error);
      }
    };
    
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [discordId]);
  
  return data;
};

const ContributorCard = ({ discordId, name, role, isMain }) => {
  const lanyard = useLanyard(discordId);
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#22c55e';
      case 'idle': return '#eab308';
      case 'dnd': return '#ef4444';
      default: return '#6b7280';
    }
  };
  
  const avatarUrl = lanyard?.discord_user?.avatar 
    ? `https://cdn.discordapp.com/avatars/${discordId}/${lanyard.discord_user.avatar}.png?size=256`
    : null;
  
  return (
    <div className={`bento-card ${isMain ? 'bento-main' : 'bento-small'}`}>
      <div className={`contributor-avatar ${isMain ? 'main-avatar' : ''}`}>
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} />
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        )}
        <span 
          className="status-indicator" 
          style={{ backgroundColor: getStatusColor(lanyard?.discord_status) }}
        />
      </div>
      <h2 className="contributor-name">{name}</h2>
      <span className="contributor-role">{role}</span>
      {lanyard?.discord_status && (
        <span className="contributor-status" style={{ color: getStatusColor(lanyard.discord_status) }}>
          {lanyard.discord_status === 'dnd' ? 'Do Not Disturb' : lanyard.discord_status.charAt(0).toUpperCase() + lanyard.discord_status.slice(1)}
        </span>
      )}
    </div>
  );
};

const Contributors = () => {
  return (
    <section className="contributors-page">
      <div className="bento-grid">
        <ContributorCard 
          discordId="1064873061985288232"
          name="Sweven Xu"
          role="Lead Developer & Founder"
          isMain={true}
        />
        
        <div className="bento-right">
          <ContributorCard 
            discordId="1133394968409555089"
            name="CramBix"
            role="Partnership"
            isMain={false}
          />
          
          <ContributorCard 
            discordId="1228726738595614844"
            name="Mallo"
            role="Developer"
            isMain={false}
          />
        </div>
      </div>
    </section>
  );
};

export default Contributors;
