import React from 'react';

const DialogContentButton = ({
  icon: Icon,
  iconProps = {},
  text,
  buttonLabel,
  buttonIcon: ButtonIcon,
  onButtonClick,
  buttonProps = {},
  containerStyle = {},
  textStyle = {},
}) => {
  return (
    <div
      className="dialog-content"
      style={{
        display: 'flex',
        paddingBottom: '25px',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        ...containerStyle,
      }}
    >
      {Icon && (
        <Icon
          {...iconProps}
        />
      )}
      {text && (
        <p
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
            ...textStyle,
          }}
        >
          {text}
        </p>
      )}
      {buttonLabel && (
        <button
          className="dialog-button"
          onClick={onButtonClick}
          style={{
            backgroundColor: '#67121B',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '15px 40px',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            ...buttonProps.style,
          }}
          {...buttonProps}
        >
          {ButtonIcon && <ButtonIcon />}
          {buttonLabel}
        </button>
      )}
    </div>
  );
};

export default DialogContentButton;