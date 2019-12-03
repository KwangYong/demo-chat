'use strict';
module.exports = (sequelize, DataTypes) => {
  const chatRoom = sequelize.define('chatRoom', {
    chatRoomNo: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    name: DataTypes.STRING
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: "chat_room"
  });
  chatRoom.associate = function (models) {
    // associations can be defined here
    chatRoom.hasMany(models.chatMessage, {foreignKey: "roomNo"});
    chatRoom.hasMany(models.chatMember, {foreignKey: "roomNo"});

  };
  return chatRoom;
};
