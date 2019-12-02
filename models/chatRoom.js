'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatRoom = sequelize.define('ChatRoom', {
    chatRoomNo: {type: DataTypes.BIGINT, primaryKey: true},
    name: DataTypes.STRING
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: "chat_room"
  });
  ChatRoom.associate = function(models) {
    // associations can be defined here
    ChatRoom.hasMany(models.ChatMessage, {foreignKey: "roomNo"});
    ChatRoom.hasMany(models.ChatMember, {foreignKey: "roomNo"});

  };
  return ChatRoom;
};
