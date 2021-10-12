import React from 'react';
import {
  Card,
  Box,
  CardContent,
  CardActions,
  Button,
  Typography
} from '@material-ui/core';


const UserDocumentCard = ({ document, handleRemove }) => {
  const { title, slug,createdAt } = document;

  const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2">
        Uploaded at: {createdAt.substring(0,10)}
      </Typography>

    </CardContent>
    <CardActions>
      <Button onClick={()=>alert(document.documents[0].Location)} color="primary" size="medium">Get shareable link</Button>
    </CardActions>
    <CardActions>
      <Button onClick={()=>window.open(document.documents[0].Location)} color="primary" size="medium">Download</Button>

    </CardActions>

    <CardActions>
      <Button onClick={() => handleRemove(slug)}  size="small">Delete</Button>

    </CardActions>
  </React.Fragment>
);
  return (

    <Box sx={{ minWidth: 275 }}>
     <Card variant="outlined">{card}</Card>
   </Box>

  );
};

export default UserDocumentCard;




/*<Card
  actions={[
    <DeleteOutlined
      onClick={() => handleRemove(slug)}
      className="text-danger"
    />
  ]}
>
  <Meta
    title={title}
    description={document.documents[0].Location}
  />
</Card>*/
