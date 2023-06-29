import React, { useEffect } from 'react';
import Box from '@mui/material/Box';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p:1
};

function Modal({ open, onClose, image }) {

  // Add an event listener to the document to listen for the "keydown" event
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();  // Call the onClose function to close the modal when the "Escape" key is pressed
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // If the modal is not open, render null to hide the modal
  if (!open) {
    return null;
  }

  return (
    <div>
      <Box sx={{ ...modalStyle, maxWidth: '90vw', maxHeight: '90vh' }}>
        <img
          src={`https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
          alt={image.title}
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      </Box>
    </div>
  );
}

export default Modal;
