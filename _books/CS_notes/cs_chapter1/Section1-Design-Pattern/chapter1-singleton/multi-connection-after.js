const Sequelize = require('sequelize');

let dbInstance = null;

class MySQL {
  // Sequelize를 이용해 MySQL 서버와 연결합니다.
  static connection() {
    if (!dbInstance) {
      // dbInstance가 생성되어 있지 않은경우 인스턴스를 생성하고 반환합니다.
      dbInstance = new Sequelize(
        'singleton_pattern_DB',
        'username',
        'password',
      );
    }

    // dbInstance가 생성되어 있을 경우 인스턴스를 생성하지 않고, 반환합니다.
    return dbInstance;
  }
}

class aModule {
  constructor() {
    // A Module에서 sequelize를 이용해 MySQL과 연결합니다.
    this.sequelize = MySQL.connection();
  }
}

class bModule {
  constructor() {
    // B Module에서 sequelize를 이용해 MySQL과 연결합니다.
    this.sequelize = MySQL.connection();
  }
}
