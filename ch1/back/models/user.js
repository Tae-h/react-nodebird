
// sequelize 에서는 table 을 model  이라고 부름!
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', { // Mysql 에는 users 테이블로 저장
        //id: {}, mysql 에 기본적으로 들어있다..
        // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME 데이터 타입

        email: {
            type: DataTypes.STRING(30),
            allowNull: false, // 필수
            unique: true, // 고유한 값
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false, // 필수
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false, // 필수
        },

    }, {
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,

    });
    User.associate = (db) => {};
    return User;
}