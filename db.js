import pgPromisse from 'pg-promise';

let db;

module.exports = server => {
  if (!db) {
      const config = server.libs.config;

      const pgp = pgPromisse();
      const dbConfig = {
          host: config.dbHost,
          port: config.dbPort,
          database: config.database,
          user: config.dbUser,
          password: config.dbPassword,
      };

      db = pgp(dbConfig);
  }

  return db;
};