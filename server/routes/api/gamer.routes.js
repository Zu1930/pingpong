const router = require('express').Router();
const { Gamer } = require('../../db/models');
// const fileuploadMiddeleware = require('../../middleware/fileuploadMiddeleware');

router.get('/', async (req, res) => {
  try {
    const gamers = await Gamer.findAll({
      order: [['id', 'ASC']],
    });
    res.status(200).json(gamers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    // if (!req.files || Object.keys(req.files).length === 0) {
    //   return res.status(400).send('Нет фала для загрузки');
    // }
    const { name, select } = req.body;
    const name1 = name.replace(/\s/g, '');

    if (!name || !select || name1 === '' || select === '') {
      res.status(400).json({ message: 'Заполнены не все поля' });
      console.log('nooooo');
      return;
    }

    let gamer = await Gamer.findOne({ where: { name } });

    if (!gamer) {
      gamer = await Gamer.create({
        name,
        select,
      });
      res.status(200).json(gamer);
    } else {
      res.status(400).json({ message: 'Игрок с таким именем уже существует' });
    }
    // const { file } = req.files;
    // const fileName = file.name.split(' ')[0];
    // const URL = await fileuploadMiddeleware(file);

    // file.mv(`./public/img/${fileName}`, (error) => {
    //   if (error) {
    //     return res.status(500).send(error);
    //   }
    // });
  } catch (e) {
    const message = e.message;
    res.status(400).json({ message });
  }
});

router.put('/:gamerId', async (req, res) => {
  try {
    const { gamerId } = req.params;
    const { status } = req.body;
    console.log(gamerId, status);
    if (req.session.userId) {
      const candidate = await Gamer.findOne({ where: { id: gamerId } });
      if (candidate) {
        candidate.status = status;
        console.log(candidate);
        candidate.save();

        res.status(200).json(candidate);
      }
    }
  } catch (e) {
    const message = e.message;
    res.status(400).json({ message });
  }
});

module.exports = router;
