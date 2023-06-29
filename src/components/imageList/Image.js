
import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding:"8px",
  textAlign: 'center',
  color: theme.palette.text.secondary,
  margin:"10px",
  display:"flex",
  boxShadow:".5px .5px 5px"
}));
function Image({ image, onClick }) {

  return (
    <Item>
    <img
      src={`https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
      alt={image.title}
      onClick={onClick}
      height={'280px'}
      width = {'250px'}
    />
     </Item>
  );
}

export default Image;
