const{ Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

const bcrypt = require('bcrypt');  // https://www.npmjs.com/package/bcrypt 


//create our User model

class User extends Model {}

// define table columns and configuration

User.init(
    {
        // TABLE COLUMN DEFINITIONS GO HERE
        // define and id column
        id: {
            // use the special Sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,
            // This si the equivalent of SQL's 'NOT NULL' option
            allowNull: false,
            // instruct that this is the Primary Key
            primaryKey: true,
            // turn on auto increment
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
        
    },
    
    {
        // TABLE CONFIGURATION OPIONS  GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration)
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {        // async/await, works in tandem to make this async function look more like a regular synchronous function expression
                newUserData.password = await bcrypt.hash(newUserData.password, 10)
                return newUserData;
            }
        },
        // pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // don't pluralize name of database table

        freezeTableName: true,
        // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user'
    }
)

module.exports = User


// https://sequelize.org/v5/manual/models-definition.html 
// https://sequelize.org/v5/manual/data-types.html

