import { getAllInformasi as modelGetAllInformasi, getInformasiByKategori, addInformasi, updateInformasi, deleteInformasi } from '../models/informasiModel.js';
import dotenv from 'dotenv';

dotenv.config();

const getAllInformasi = async (req, res) => {
  try {
      const results = await modelGetAllInformasi();
      if (results.length === 0) {
          res.status(404).json({ message: 'Informasi tidak ditemukan' });
      } else {
          res.json(results);
      }
  } catch (err) {
      res.status(500).send(err);
  }
};

const getInformasiByKategoriHandler = async (req, res) => {
    const { kategori } = req.params;
    console.log(`Kategori: ${kategori}`); 
    try {
        const results = await getInformasiByKategori(kategori);
        console.log(results); 
        if (results.length === 0) {
            res.status(404).json({ message: 'Informasi tidak ditemukan' });
        } else {
            res.json(results);
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

const addInformasiHandler = async (req, res) => {
    const { judul, isi_artikel, kategori, penerbit, tanggal, url, foto_informasi } = req.body;
    try {
        const result = await addInformasi(judul, isi_artikel, kategori, penerbit, foto_informasi, tanggal, url);
        res.status(201).json({ id: result.insertId, judul, isi_artikel, kategori, penerbit, foto_informasi, tanggal, url });
    } catch (err) {
        res.status(500).send(err);
    }
};

const updateInformasiHandler = async (req, res) => {
    const { id_informasi } = req.params;
    const { judul, isi_artikel, kategori, penerbit, tanggal, url, foto_informasi } = req.body;
    try {
        const result = await updateInformasi(id_informasi, judul, isi_artikel, kategori, penerbit, foto_informasi, tanggal, url);
        if (result.affectedRows === 0) {
            return res.status(404).send('Informasi tidak ditemukan');
        }
        res.json({ id_informasi, judul, isi_artikel, kategori, penerbit, foto_informasi, tanggal, url });
    } catch (err) {
        res.status(500).send(err);
    }
};

const deleteInformasiHandler = async (req, res) => {
    const { id_informasi } = req.params;
    try {
        const result = await deleteInformasi(id_informasi);
        if (result.affectedRows === 0) {
            return res.status(404).send('Informasi tidak ditemukan');
        }
        return res.status(200).json({ message: "Informasi sukses terhapus" });
    } catch (err) {
        res.status(500).send(err);
    }
};

export { getAllInformasi, getInformasiByKategoriHandler as getInformasiByKategori, addInformasiHandler as addInformasi, updateInformasiHandler as updateInformasi, deleteInformasiHandler as deleteInformasi };


// import { getAllInformasi as modelGetAllInformasi, getInformasiByKategori, addInformasi, updateInformasi, deleteInformasi } from '../models/informasiModel.js';
// import dotenv from 'dotenv';

// dotenv.config();

// const getAllInformasi = async (req, res) => {
//   try {
//       const results = await modelGetAllInformasi();
//       if (results.length === 0) {
//           res.status(404).json({ message: 'Informasi tidak ditemukan' });
//       } else {
//           res.json(results);
//       }
//   } catch (err) {
//       res.status(500).send(err);
//   }
// };


// const getInformasiByKategoriHandler = async (req, res) => {
//     const { kategori } = req.params;
//     console.log(`Kategori: ${kategori}`); 
//     try {
//         const results = await getInformasiByKategori(kategori);
//         console.log(results); 
//         if (results.length === 0) {
//             res.status(404).json({ message: 'Informasi tidak ditemukan' });
//         } else {
//             res.json(results);
//         }
//     } catch (err) {
//         res.status(500).send(err);
//     }
// };

// const addInformasiHandler = async (req, res) => {
//     const { judul, isi_artikel, kategori, penerbit } = req.body;
//     const foto_informasi = req.file ? req.file.filename : null; 
//     try {
//         const result = await addInformasi(judul, isi_artikel, kategori, penerbit, foto_informasi);
//         res.status(201).json({ id: result.insertId, judul, isi_artikel, kategori, penerbit, foto_informasi });
//     } catch (err) {
//         res.status(500).send(err);
//     }
// };

// const updateInformasiHandler = async (req, res) => {
//     const { id_informasi } = req.params;
//     const { judul, isi_artikel, kategori, penerbit } = req.body;
//     const foto_informasi = req.file ? req.file.filename : null; 
//     try {
//         const result = await updateInformasi(id_informasi, judul, isi_artikel, kategori, penerbit, foto_informasi);
//         if (result.affectedRows === 0) {
//             return res.status(404).send('Informasi tidak ditemukan');
//         }
//         res.json({ id_informasi, judul, isi_artikel, kategori, penerbit, foto_informasi });
//     } catch (err) {
//         res.status(500).send(err);
//     }
// };

// const deleteInformasiHandler = async (req, res) => {
//     const { id_informasi } = req.params;
//     try {
//         const result = await deleteInformasi(id_informasi);
//         if (result.affectedRows === 0) {
//             return res.status(404).send('Informasi tidak ditemukan');
//         }
//         return res.status(200).json({ message: "Informasi sukses terhapus" });
//     } catch (err) {
//         res.status(500).send(err);
//     }
// };

// export { getAllInformasi, getInformasiByKategoriHandler as getInformasiByKategori, addInformasiHandler as addInformasi, updateInformasiHandler as updateInformasi, deleteInformasiHandler as deleteInformasi };