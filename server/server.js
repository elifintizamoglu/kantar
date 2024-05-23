const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const { sequelize } = require('./models')
const authRoutes = require('./auth')

const app = express() 
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:8080'
}));  
const port = 5000

app.use('/auth', authRoutes);

const connection = mysql.createConnection({ 
    host: "localhost",
    user: "root",
    password: "sec382mSL",
    database: "weighbridge"
})

connection.connect(err => {
    if (err) {
        console.error('Veritabani bağlantisi başarisiz:', err);
    }
    console.log('Veritabanina başariyla bağlandi.');
});

app.post('/api/addData', (req, res) => {

    const { plate, entry_date, entry_time, entry_weight, exit_date, exit_time, exit_weight } = req.body;
    sql = "INSERT INTO weighbridge.weight_track (`plate`, `entry_date`, `entry_time`,`entry_weight`, `exit_date`, `exit_time`, `exit_weight` ) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [plate, entry_date, entry_time, entry_weight, exit_date, exit_time, exit_weight];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Veritabanına veri eklenirken hata oluştu:', err);
            res.status(500).json({ error: 'Veritabanına veri eklenirken hata oluştu.' });
        } else {
            console.log('Veritabanına veri başarıyla eklendi.');
            res.status(200).json({ message: 'Veri başarıyla eklendi.' });
        }
    });

});


app.get('/api/getAllData', (req, res) => {

    const sql = 'SELECT * FROM weight_track';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Verileri çekerken hata oluştu:', err);
            res.status(500).json({ error: 'Veritabanından veri çekerken hata oluştu.' });
            return;
        }
        res.status(200).json(results);
    });

});

app.get('/api/getById/:id', (req, res) => {
    const dataId = req.params.id;
    const sql = 'SELECT * FROM weight_track WHERE id = ?';
    const values = [dataId];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Veri çekerken hata oluştu:', err);
            res.status(500).json({ error: 'Veri çekerken hata oluştu.' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Veri bulunamadı.' })
        } else {
            res.status(200).json(results[0]);
        }
    });
});

app.delete('/api/delete/:id', (req, res) => {
    const dataId = req.params.id;

    const sql = "DELETE FROM weight_track WHERE id = ?";
    const values = [dataId];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Veri silinirken hata oluştu:', err);
            res.status(500).json({ error: 'Veri silinirken hata oluştu.' });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Silinecek kullanıcı bulunamadı.' });
        } else {
            res.status(200).json({ message: 'Kullanıcı başarıyla silindi.' });
        }
    });
});

app.put('/api/update/:id', (req, res) => {
    const dataId = req.params.id; 
    const { plate, entry_date, entry_time, entry_weight, exit_date, exit_time, exit_weight } = req.body; 
    const sql = 'UPDATE weight_track SET plate = ?, entry_date = ?, entry_time = ?, entry_weight = ?, exit_date = ?, exit_time = ?, exit_weight = ? WHERE id = ?';
    const values = [plate, entry_date, entry_time, entry_weight, exit_date, exit_time, exit_weight, dataId];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Veri güncellenirken hata oluştu:', err);
            res.status(500).json({ error: 'Veri güncellenirken hata oluştu.' });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Güncellenecek kullanıcı bulunamadı.' });
        } else {
            res.status(200).json({ message: 'Kullanıcı başarıyla güncellendi.' });
        }
    });
});


app.listen(port, async() => {
    console.log('listening');
    await sequelize.sync();
})