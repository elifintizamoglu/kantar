const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')

const app = express() // creating an instance of the express application which server as the backbone of our server
app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, "public"))) // set up middleware functions to serve static files, a crucial aspect of handling client-side assets like CSS and JavaScript
app.use(cors());  // address security concerns by implementing cors to manage and control web security. 
//app.use(express.json()) // parsing json data from incoming HHTp requests which is essential for processing data sent from the client

const port = 5000 // set the port, specify where the server will listen for incoming requests.

const connection = mysql.createConnection({ // establish a connection to the MySQL, ensuring that our server can interact with the db
    host: "localhost",
    user: "root",
    password: "sec382mSL",
    database: "kantar"
})

connection.connect(err => {
    if (err) {
        console.error('Veritabani bağlantisi başarisiz:', err);
    }
    console.log('Veritabanina başariyla bağlandi.');
});



app.post('/api/addData', (req, res) => {

    const { plaka, giris_agirlik, giris_saati, cikis_agirlik, cikis_saati } = req.body;
    sql = "INSERT INTO kantar.arac_giris_cikis (`plaka`, `giris_agirlik`, `giris_saati`,`cikis_agirlik`, `cikis_saati` ) VALUES (?, ?, ?, ?, ?)";
    const values = [plaka, giris_agirlik, giris_saati, cikis_agirlik, cikis_saati];

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

    const sql = 'SELECT * FROM arac_giris_cikis';
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
    const sql = 'SELECT * FROM arac_giris_cikis WHERE id = ?';
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

    const sql = "DELETE FROM arac_giris_cikis WHERE id = ?";
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
    const dataId = req.params.id; // URL'den gelen ":id" parametresini al
    const { plaka, giris_agirlik, giris_saati, cikis_agirlik, cikis_saati } = req.body; // PUT isteği ile gönderilen verileri al
    // Veritabanında kullanıcıyı ID'ye göre güncelleyen SQL sorgusu

    const sql = 'UPDATE arac_giris_cikis SET plaka = ?, giris_agirlik = ?, giris_saati = ?, cikis_agirlik = ?, cikis_saati = ? WHERE id = ?';
    const values = [plaka, giris_agirlik, giris_saati, cikis_agirlik, cikis_saati, dataId];

    // Veritabanı sorgusunu yürütme
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




app.listen(port, () => {
    console.log('listening')
})  // start the server, making it ready to respond to incomşng requests and serve as the backbone for our full-stack app