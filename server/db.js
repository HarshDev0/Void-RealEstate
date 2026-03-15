const sqlite3 = require("sqlite3").verbose()
const path = require("path")

const dbPath = path.join(__dirname, "..", "database", "realestate.db")

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Database error:", err.message)
    } else {
        console.log("Connected to SQLite database")
    }
})

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS properties (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            price TEXT,
            category TEXT,
            description TEXT,
            image TEXT
        )
    `)

})

module.exports = db