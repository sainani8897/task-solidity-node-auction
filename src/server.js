const express = require("express");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");
const port = 3000;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/** Mongo Client */
const client = new MongoClient("mongodb://localhost:27017/test_crud");

const collection = client.db().collection("users");

const baseUrl = `http://localhost:${port}/`;

app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.post("/user", async (req, res) => {
  try {
    if (req.body) {
      const data = req.body;

      const user = await collection.findOne({
        email: data.email,
      });

      if (data) {
        const response = await collection.insertOne(data);
        return res.send({
          status: 200,
          data: response,
        });
      } else {
        return res.send({
          error: "give a Data",
        });
      }
    }
  } catch (error) {
    return res.status(500).send({error});
  }
  
});

app.get("/user", async (req, res) => {
  try {

      const users = await collection.find().toArray();
      console.log(users);
      if (users) {
        return res.send({
          status: 200,
          data: users,
        });
      } else {
        return res.send({
          error: "No Data Found",
        });
      }
  } catch (error) {
    return res.status(500).send({error});
  }
  
});


client
  .connect()
  .then(function (client) {
    app.listen(port, () => {
      console.log("Server Started at Port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });