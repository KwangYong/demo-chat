'use strict';
module.exports = (sequelize, DataTypes) => {
  const chatMessage = sequelize.define('chatMessage', {
    chatMessageNo: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    text: DataTypes.STRING
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: "chat_message"
  });
  chatMessage.associate = function (models) {

    chatMessage.belongsTo(models.chatRoom, {foreignKey: "roomNo"});
    chatMessage.belongsTo(models.chatMember, {foreignKey: "memberNo"});
  };
  return chatMessage;
};
