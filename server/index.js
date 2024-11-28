const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const port = 8000;

let conn = null;

const initMYSQL = async () => {
  conn = await mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'root',
   database: 'webdb',
   port: 8700
})
}

// ฟังก์ชันการตรวจสอบข้อมูล
const validateData = (informationsData) => {
    let errors = [];
    if (!informationsData.location){
        errors.push("กรุณากรอกที่ตั้ง")
    }
    if (!informationsData.size){
        errors.push("กรุณากรอกขนาด")
    }
    if(!informationsData.status){
        errors.push("กรุณาเลือกสถานะ")
    }
    if(!informationsData.person){
        errors.push("กรุณาเลือกผู้เช่า/ซื้อ")
    }
    if (!informationsData.purchasedetails){
        errors.push("กรุณากรอกรายละเอียดผู้เช่า/ซื้อ")
    }
    if (!informationsData.rentalterms){
        errors.push("กรุณากรอกเงื่อนไขการเช่า/ซื้อ")
    }
    if (!informationsData.maintenance){
        errors.push("กรุณากรอกการซ่อมบำรุง")
    }
    if (!informationsData.monthlypayment){
        errors.push("กรุณากรอกค่าไช้จ่ายประจำเดือน")
    }
    return errors
}

// รับข้อมูลผู้ใช้ทั้งหมด
app.get('/informations',async (req,res) => {
    const results = await conn.query('SELECT * FROM informations');
    res.json(results[0]);
  })
// สร้างผู้ใช้ใหม่
app.post('/informations', async(req, res ) => {
    try{
      let user = req.body
  
      const errors = validateData(user)
       if (errors.length > 0){
          throw {
            message: "กรอกข้อมูลไม่ครบถ้วน",
            errors : errors
          }
       }
    const results = await conn.query("INSERT INTO informations SET ?",user)
    res.json({
      message: "Create new user successfully",
      data : results[0]
    })
    }catch(error){
      const errorMessage = error.message|| 'Something wrong'
      const errors = error.errors || []
      console.log('errorMessage',error.message);
      res.status(500).json({
        message: errorMessage,
        errors: errors
      })
    }
  })

// รับข้อมูลผู้ใช้โดย ID
app.get('/informations/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await conn.query('SELECT * FROM informations WHERE id = ?', id);
        if (rows.length === 0) {
            throw { statusCode: 404, message: 'ไม่พบผู้ใช้งาน' };
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียกข้อมูลผู้ใช้:', error);
        res.status(error.statusCode || 500).json({ message: error.message || 'เกิดข้อผิดพลาดบางอย่าง' });
    }
});

// อัปเดตข้อมูลผู้ใช้โดย ID
app.put('/informations/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateinformations = req.body;
        const [result] = await conn.query("UPDATE informations SET ? WHERE id = ?", [updateinformations, id]);
        res.json({ message: "อัปเดตข้อมูลผู้ใช้งานเรียบร้อยแล้ว", data: result });
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้งาน:', error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดบางอย่าง' });
    }
});

// ลบผู้ใช้โดย ID
app.delete('/informations/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const [result] = await conn.query('DELETE FROM informations WHERE id = ?', id);
        res.json({ message: 'ลบผู้ใช้งานเรียบร้อยแล้ว', data: result });
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการลบผู้ใช้งาน:', error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดบางอย่าง' });
    }
});

app.listen(port, async () => {
    await initMYSQL();
    console.log('http server running on', + port);
});
