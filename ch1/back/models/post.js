
// sequelize 에서는 table 을 model  이라고 부름!
module.exports = (sequelize, DataTypes) => {

    const Post = sequelize.define('Post', { // Mysql 에는 posts  테이블로 저장
        content: {
            type: DataTypes.TEXT,
            allowNull: false,

        },

    }, {
        charset: 'utf8mb4', // 이모티콘 넣으려면 mb4 추가
        collate: 'utf8mb4_general_ci', // 한글 + 이모티콘 저장

    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User); // 다대일 관계
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.Hashtag,{through: 'PostHashtag'}); // 다대다
        db.Post.belongsToMany(db.User, {
            through: 'Like',
            as: 'Likers',
        });
        db.Post.belongsTo(db.Post, {as: 'Retweet'})
    };
    return Post;
}