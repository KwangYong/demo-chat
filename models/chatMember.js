'use strict';

module.exports = (sequelize, DataTypes) => {
  const chatMember = sequelize.define('chatMember', {
    memberNo: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true}
  }, {
    underscored: true,
    tableName: "chat_member"
  });
  chatMember.associate = function (models) {
    // associations can be defined here
    chatMember.belongsTo(models.chatRoom, {foreignKey: "roomNo"});
    chatMember.belongsTo(models.user, {foreignKey: "userNo"});
    chatMember.hasMany(models.chatMessage, {foreignKey: "memberNo"});
    chatMember.hasMany(models.chatMember, {
      as: 'members',
      foreignKey: 'roomNo',
      sourceKey: 'roomNo',
      useJunctionTable: false
    })
  };
  return chatMember;
};