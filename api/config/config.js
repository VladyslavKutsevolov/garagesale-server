require('dotenv').config();

module.exports = {
  development: {
    database: "garage_sale",
    use_env_variables: 'DATABASE_URL',
    dialect: "postgres"
  },
  test: {
    database: "garage_sale_test",
    use_env_variables: 'DATABASE_TEST_URL',
    dialect: "postgres"
  },
  production: {
    database: "garage_sale_prod",
    use_env_variables: 'DATABASE_PROD_URL',
    dialect: "postgres"
  }

}
