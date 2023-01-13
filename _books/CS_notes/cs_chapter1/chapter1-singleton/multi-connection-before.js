const Sequelize = require('sequelize');

class MySQL {
  // Sequelize를 이용해 MySQL 서버와 연결합니다.
  static connection() {
    return new Sequelize('singleton_pattern_DB', 'username', 'password');
  }
}

class aModule {
  constructor() {
    // A Module에서 MySQL과 연결합니다.
    this.sequelize = MySQL.connection();
  }
}

class bModule {
  constructor() {
    // B Module에서 MySQL과 연결합니다.
    this.sequelize = MySQL.connection();
  }
}
