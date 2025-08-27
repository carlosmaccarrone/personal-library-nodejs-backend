const sequelize = require("./config/db");
const app = require("./app");

const PORT = 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
})();