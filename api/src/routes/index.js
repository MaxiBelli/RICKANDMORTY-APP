const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");//importo
const {Character, Episode, characters_episodes} = require('../db');//me traigo las tablas de la db
const {Op} = require("sequelize");//traigo de sequelize los operadores que necesite

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const data = async () => {
    const apiUrl = await axios.get("https://rickandmortyapi.com/api/characters");
    return apiUrl.data.results;
}
router.get("/characters", async (req, res, next) => {
    const name = req.query.name; ///characters?name=...
    const apiCharacters = await data();
    try {
        let full = await Character.findAll();//si tengo la data
        if(!full.length) await Character.bulkCreate(apiCharacters)//si no la tengo la creo. bulkCreate= Crea e inserta varias instancias de forma masiva
    } catch (error){
        console.log(error)
    }
      if (name) {
        let character = await Character.findAll({
            where: {
                name: {
                    [Op.iLike]: "%" + name + "%"//va a ignorar mayusculas y minusculas
                }
            }
        });
   return  res.json(character)
module.exports = router;
