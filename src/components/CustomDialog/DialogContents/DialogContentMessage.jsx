import React from 'react';

const DialogContentMessage = ({
  icon: Icon,
  title,
  description,
  iconColor,
  iconBgColor,
}) => {
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
            color: iconColor,
            fontSize: '5rem',
            marginBottom: '10px',
            backgroundColor: iconBgColor,
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