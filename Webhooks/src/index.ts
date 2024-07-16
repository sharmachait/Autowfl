import express from 'express';

const app = express();

//https://domain.com/hooks/catch/{userId}/{zapId}
//add some auth middleware
app.post('/hooks/catch/:userId/:zapId', (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  //we only need to create a trigger event here
  //dont process the trigger here
  //store the trigger into the db
  //push the trigger into a queue
});
