'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        userNo: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    underscored: true,
    tableName: "user"
  } );
    user.associate = function (models) {
    // associations can be defined here
        user.hasMany(models.chatMember, {foreignKey: "userNo"});
  };
    return user;
};
