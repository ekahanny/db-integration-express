const express = require("express");
const router = express.Router();
const conn = require("../config/config");

// GET
router.get("/get-customers", async function (req, res) {
  try {
    const queryStr = "SELECT * FROM customers";
    const [rows, fields] = await conn.query(queryStr);
    if (rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Data customers tidak ditemukan",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Sukses menampilkan data",
        data: rows,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        err.sqlMessage || "Terjadi kesalahan saat mengambil data customers",
    });
  }
});

// POST
router.post("/store-customer", async function (req, res) {
  try {
    const {
      customerNumber,
      customerName,
      contactLastName,
      contactFirstName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      salesRepEmployeeNumber,
      creditLimit,
    } = req.body;

    const queryStr = `INSERT INTO customers (customerNumber, customerName, contactLastName, contactFirstName, phone, addressLine1, addressLine2, city, state, postalCode, country, salesRepEmployeeNumber, creditLimit) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      customerNumber,
      customerName,
      contactLastName,
      contactFirstName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      salesRepEmployeeNumber,
      creditLimit,
    ];

    await conn.query(queryStr, values);

    res.status(200).json({
      success: true,
      message: "Customer created successfully",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        err.sqlMessage || "Terjadi kesalahan saat menyimpan data customer",
    });
  }
});

// PUT
router.put("/update-customer/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const {
      customerName,
      contactLastName,
      contactFirstName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      salesRepEmployeeNumber,
      creditLimit,
    } = req.body;

    const queryStr = `UPDATE customers 
                      SET customerName = ?, contactLastName = ?, contactFirstName = ?, phone = ?, addressLine1 = ?, addressLine2 = ?, city = ?, state = ?, postalCode = ?, country = ?, salesRepEmployeeNumber = ?, creditLimit = ?
                      WHERE customerNumber = ?`;
    const values = [
      customerName,
      contactLastName,
      contactFirstName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      salesRepEmployeeNumber,
      creditLimit,
      id,
    ];

    const [results] = await conn.query(queryStr, values);

    if (results.affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Customer updated successfully",
        data: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        err.sqlMessage || "Terjadi kesalahan saat mengubah data customer",
    });
  }
});

// DELETE
router.delete("/delete-customer/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const queryStr = "DELETE FROM customers WHERE customerNumber = ?";

    const [results] = await conn.query(queryStr, [id]);

    if (results.affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Customer deleted successfully",
        data: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        err.sqlMessage || "Terjadi kesalahan saat menghapus data customer",
    });
  }
});

module.exports = router;
