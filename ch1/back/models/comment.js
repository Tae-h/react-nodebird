
// sequelize 에서는 table 을 model  이라고 부름!
module.exports = (sequelize, DataTypes) => {

    const Comment = sequelize.define('Comment', { // Mysql 에는 posts  테이블로 저장
        content: {
            type: DataTypes.TEXT,
            allowNull: false,

        },

    }, {
        charset: 'utf8mb4', // 이모티콘 넣으려면 mb4 추가
        collate: 'utf8mb4_general_ci', // 한글 + 이모티콘 저장

    });
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };
    return Comment;
}