'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatMember = sequelize.define('ChatMember', {
    memberNo: {type: DataTypes.BIGINT, primaryKey: true}
  }, {
    underscored: true,
    tableName: "chat_member"
  });
  ChatMember.associate = function(models) {
    // associations can be defined here
    ChatMember.belongsTo(models.ChatRoom, {foreignKey: "roomNo"});
    ChatMember.belongsTo(models.User, {foreignKey: "userNo"});
    ChatMember.hasMany(models.ChatMessage, {foreignKey: "memberNo"});
  };
  return ChatMember;
};