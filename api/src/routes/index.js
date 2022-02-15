const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios"); //importo
const { Character, Episode, characters_episodes } = require("../db"); // me traigo las tablas de la db
const { Op } = require("sequelize"); //traigo de sequelize los operadores que necesite

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const data = async () => {
  const apiUrl = await axios.get("https://rickandmortyapi.com/api/character");
  console.log("API: ", apiUrl.data.results);
  return apiUrl.data.results;
};

// const data = async () => {
//   var output = [];

//   var page = 1;
//   var pages = 42;

//   if(page < pages){
//     for(var i = 1; i <= 42; i++){
//       var requestURL = await axios.get(
//         "https://rickandmortyapi.com/api/character?$page=" +
//           page 
//       );
//       var allUrl = output.push(requestURL.data)
//       const totalCharacters = allUrl.results

//     }
//     return totalCharacters
//   }

router.get("/characters", async (req, res) => {
  const name = req.query.name; ///characters?name=...
  const apiCharacters = await data();
  try {
    let full = await Character.findAll(); //si tengo la data
    if (!full.length) await Character.bulkCreate(apiCharacters); //si no la tengo la creo. bulkCreate= Crea e inserta varias instancias de forma masiva
  } catch (error) {
    console.log(error);
  }
  if (name) {
    try {
      let characters = await Character.findAll({
        where: {
          name: {
            [Op.iLike]: "%" + name + "%", //va a ignorar mayusculas y minusculas
          },
        },
      });
      return res.json(characters);
    } catch (error) {
      console.log(error);
    }
  } else if (req.query.filter) {
    try {
      let characters = await Character.findAll({
        where: {
          status: req.query.filter,
        },
        limit: 6,
        offset: req.query.page,
        order: [["name", req.query.order]],
        include: { model: Episode },
      });
      return res.json(characters);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      let characters = await Character.findAll({
        limit: 6,
        offset: req.query.page,
        order: [["name", req.query.order]],
        include: { model: Episode },
      });
      return res.json(characters);
    } catch (error) {
      console.log(error);
    }
  }
});

//GET-CHARACTERS/ID
router.get("/characters/:id", async (req, res) => {
  const id = req.params.id;

  try {
    let characterId = await Character.findByPk(id);

    return res.status(200).json(characterId);
  } catch (error) {
    console.log(error);
  }
});

//POST-CHARACTERS
router.post("/characters", async (req, res) => {
  //post con todo lo q me va a llegar x body
  const character = req.body;
  try {
    let characterCreated = await findOrCreate({
      where: {
        name: character.name,
        image: character.image,
        status: character.status,
        mine: character.mine,
      },
    });
    return res.json(characterCreated);
  } catch (error) {
    console.log(error);
  }
});

//POST-EPISODE
router.post("/episode", async (req, res) => {
  const episode = req.body;
  try {
    let [epi, created] = await Episode.findOrCreate({
      where: {
        name: episode.name,
      },
    });
    console.log(created);
    await epi.setCharacters(episode.charid);

    return res.json(epi);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
