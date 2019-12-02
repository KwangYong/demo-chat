'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatMessage = sequelize.define('ChatMessage', {
    chatMessageNo: DataTypes.BIGINT,
    text: DataTypes.STRING
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: "chat_message"
  });
  ChatMessage.associate = function(models) {

    ChatMessage.belongsTo(models.ChatRoom, {foreignKey: "roomNo"});
    ChatMessage.belongsTo(models.ChatMember, {foreignKey: "memberNo"});
  };
  return ChatMessage;
};
