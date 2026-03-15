const express = require("express")
const router = express.Router()
const db = require("../db")

const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../docs/uploads"))
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }

})

const upload = multer({ storage })

// GET all properties
router.get("/", (req, res) => {

    db.all("SELECT * FROM properties", [], (err, rows) => {
        if (err) {
            return res.status(500).json(err)
        }

        res.json(rows)
    })

})

// ADD property
router.post("/", upload.single("image"), (req, res) => {

    const { title, price, category, description } = req.body

    const image = "/uploads/" + req.file.filename

    db.run(
        `INSERT INTO properties (title, price, category, description, image)
         VALUES (?, ?, ?, ?, ?)`,
        [title, price, category, description, image],
        function (err) {

            if (err) {
                return res.status(500).json(err)
            }

            res.json({
                message: "Property added",
                id: this.lastID
            })

        }
    )

})

// DELETE property
router.delete("/:id", (req, res) => {

    db.run(
        "DELETE FROM properties WHERE id = ?",
        [req.params.id],
        function (err) {

            if (err) {
                return res.status(500).json(err)
            }

            res.json({
                message: "Property deleted"
            })

        }
    )

})

router.put("/:id", (req, res) => {

    const { title, price, category, description } = req.body

    db.run(
        `UPDATE properties
SET title=?,price=?,category=?,description=?
WHERE id=?`,
        [title, price, category, description, req.params.id],

        function (err) {

            if (err) return res.status(500).json(err)

            res.json({ message: "Property updated" })

        })

})

module.exports = router