/**
 * Configuração de acesso ao banco de dados PostgresSQL
 */
module.exports = {
  username: 'postgres',
  password: 'docker',
  database: 'gympoint',
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
