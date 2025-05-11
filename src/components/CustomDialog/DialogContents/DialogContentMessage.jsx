import React from 'react';

const DialogContentMessage = ({ icon: Icon, title, description }) => {
  return (
    <div
      className="dialog-content"
      style={{
        display: 'flex',
        paddingBottom: '40px',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '80%',
        margin: '0 auto',
      }}
    >
      {Icon && (
        <Icon
          sx={{
            color: '#4caf50',
            fontSize: '5rem',
            marginBottom: '10px',
            backgroundColor: '#E3FFE3',
            borderRadius: '30%',
            padding: '5px',
          }}
        />
      )}
      {title && (
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '10px',
          }}
        >
          {title}
        </h2>
      )}
      {description && (
        <p
          style={{
            fontSize: '16px',
            fontWeight: 'normal',
            color: '#555',
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default DialogContentMessage;