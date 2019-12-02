'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userNo: {type: DataTypes.BIGINT, primaryKey:true},
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    underscored: true,
    tableName: "user"
  } );
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.ChatMember, {foreignKey: "userNo"});
  };
  return User;
};
