const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

let items = [];
let id = 0;

//creating a new item
app.post('/api/items', (req, res) => {
    console.log("in api for adding an item");
    console.log("text", req.body.text);
  id = id + 1;
  let item = {
    id: id,
    text: req.body.text,
    completed: req.body.completed,
  };
  items.push(item);
  res.send(item);
});

app.get('/api/items', (req, res) => {
  res.send(items);
});

//when an item is completed
app.put('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let itemsMap = items.map(item => {
    return item.id;
  });
  let index = itemsMap.indexOf(id);
  if (index === -1) {
    res.status(404)
      .send("Sorry, that item doesn't exist");
    return;
  }
  //let item = items[index];
  items[index].text = req.body.text;
  items[index].completed = req.body.completed;
  res.send(items[index]);
});

app.delete('/api/items/:id', (req, res) => {
    try{
        console.log("in app delete", req.params.id);
        let id = parseInt(req.params.id);
        console.log("let id = ", id);
        let removeIndex = items.map(item => {
        return item.id;
        }).indexOf(id);
        if (removeIndex === -1) {
            res.status(404).send("Sorry, that item doesn't exist");
            return;
        }
        console.log("removeIndex", removeIndex);
        items.splice(removeIndex, 1);
        console.log("exiting app delete");
        res.status(200).json({message: "Item deleted"});
    }catch(error){
        console.log(error);
    }
});

app.listen(4200, () => console.log('Server listening on port 4200!'));