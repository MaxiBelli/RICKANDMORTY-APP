const { DataTypes, UUID } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("character", {
    // id: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   primaryKey: true,
    //   defaultValue: DataTypes.UUIDV4,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Alive","Dead","unknown"),
    },
    // species: {
    //   type: DataTypes.STRING,
    // },
    // origin: {
    //   type: DataTypes.STRING,
    // },
    image: {
      type: DataTypes.STRING,
      defaultValue:
        "https://images-na.ssl-images-amazon.com/images/I/91MteSqsrJL.jpg",
      allowNull: false,
    },
    mine: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};