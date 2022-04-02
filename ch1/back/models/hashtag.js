
// sequelize 에서는 table 을 model  이라고 부름!
module.exports = (sequelize, DataTypes) => {

    const Hashtag = sequelize.define('Hashtag', { // Mysql 에는 posts  테이블로 저장
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },

    }, {
        charset: 'utf8mb4', // 이모티콘 넣으려면 mb4 추가
        collate: 'utf8mb4-general-ci', // 한글 + 이모티콘 저장

    });
    Hashtag.associate = (db) => {};
    return Hashtag;
}