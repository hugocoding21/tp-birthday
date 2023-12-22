const csvtojson = require("csvtojson");
const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;

mongoose.connect("mongodb://0.0.0.0:27017/birthday", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => {
  console.error("Erreur de connexion à MongoDB:", err);
});

db.once("open", async () => {
  console.log("Connexion à MongoDB réussie");

  await importData("quotes.csv", "quotes", ["CITATION", "AUTEUR"]);

  uniqueIdCounter = await getMaxId("quotes");

  await importData("users.csv", "users", [
    "LASTNAME",
    "FIRSTNAME",
    "BIRTHDATE",
    "EMAIL",
  ]);
});

async function getMaxId(collectionName) {
  const collection = db.collection(collectionName);
  const result = await collection.find().sort({ _id: -1 }).limit(1).toArray();

  if (result.length === 0) {
    return new ObjectId();
  }

  return new ObjectId(result[0]._id).inc(1);
}

async function importData(fileName, collectionName, fields) {
  const collection = db.collection(collectionName);

  csvtojson()
    .fromFile(fileName)
    .then((source) => {
      const arrayToInsert = source.map((item, index) => {
        const document = {
          _id: new ObjectId(),
        };

        fields.forEach((field) => {
          document[field.toLowerCase()] = item[field];
        });

        return document;
      });

      collection.insertMany(arrayToInsert, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(
            `Imported into collection "${collectionName}" successfully.`
          );
        }
      });
    });
}
