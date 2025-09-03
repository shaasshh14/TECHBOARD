import React, { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTilt } from './UseTilt'; // We'll create this custom hook
import '../ProfileCard.css';

// Default values and constants
const DEFAULT_AVATAR = 'https://via.placeholder.com/300';
const DEFAULT_GRADIENT = 'linear-gradient(145deg, #60496e8c 0%, #71C4FF44 100%)';

const ProfileCardComponent = ({
  avatarUrl = DEFAULT_AVATAR,
  name = 'Javi A. Torres',
  title = 'Software Engineer',
  handle = 'javicodes',
  status = 'Online',
  contactText = 'Contact',
  className = '',
  enableTilt = true,
  onContactClick,
}) => {
  const cardRef = useRef(null);
  
  // The complex logic is now neatly contained in our custom hook
  const { wrapperProps, glareStyle, shineStyle } = useTilt(cardRef, { enableTilt });

  // Memoize styles to prevent re-calculations on every render
  const cardStyle = useMemo(() => ({
    '--inner-gradient': DEFAULT_GRADIENT,
  }), []);

  return (
    <div 
      ref={cardRef} 
      className={`pc-card-wrapper ${className}`.trim()} 
      style={cardStyle}
      {...wrapperProps} // Props from the hook (event handlers, style)
    >
      <section className="pc-card">
        <div className="pc-inside">
          {/* These elements are for the holographic effect */}
          <div className="pc-shine" style={shineStyle} />
          <div className="pc-glare" style={glareStyle} />

          <div className="pc-content">
            <div className="pc-details">
              <h3>{name}</h3>
              <p>{title}</p>
            </div>
            
            <div className="pc-avatar-container">
              <img
                className="pc-avatar"
                src={avatarUrl}
                alt={`${name}'s avatar`}
                loading="lazy"
              />
            </div>

            <div className="pc-user-info-bar">
              <div className="pc-user-details">
                <div className="pc-mini-avatar">
                  <img
                    src={avatarUrl}
                    alt={`${name}'s mini avatar`}
                    loading="lazy"
                  />
                </div>
                <div className="pc-user-text">
                  <div className="pc-handle">@{handle}</div>
                  <div className="pc-status">{status}</div>
                </div>
              </div>
              
              {onContactClick && (
                <button className="pc-contact-btn" onClick={onContactClick}>
                  {contactText}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Add prop-types for better development experience
ProfileCardComponent.propTypes = {
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  handle: PropTypes.string,
  status: PropTypes.string,
  contactText: PropTypes.string,
  className: PropTypes.string,
  enableTilt: PropTypes.bool,
  onContactClick: PropTypes.func,
};

const ProfileCard = React.memo(ProfileCardComponent);

export default ProfileCard;