
// sequelize 에서는 table 을 model  이라고 부름!
module.exports = (sequelize, DataTypes) => {

    const Image = sequelize.define('Image', { // Mysql 에는 posts  테이블로 저장
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },

    }, {
        charset: 'utf8', // 이모티콘 넣으려면 mb4 추가
        collate: 'utf8-general-ci', // 한글 + 이모티콘 저장

    });
    Image.associate = (db) => {};
    return Image;
}