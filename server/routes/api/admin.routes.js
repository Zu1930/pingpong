const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Admin } = require('../../db/models');

router.post('/auth', async (req, res) => {
  try {
    const { password } = req.body;
    const user = await Admin.findOne();
    let compare = false;

    if (user) {
      compare = await bcrypt.compare(password, user.password);
    }

    if (!user || !compare) {
      res
        .status(400)
        .json({ message: 'Администратора не существует или пароль неверный' });
      return;
    }

    if (!password) {
      res.status(400).json({ message: 'Заполнены не все поля' });
      return;
    }

    req.session.userId = user.id;

    res.status(200).json(user);
  } catch (e) {
    const message = e.message;
    res.status(400).json({ message });
  }
});

router.get('/check', async (req, res) => {
  try {
    if (req.session.userId) {
      const user = await Admin.findOne({ where: { id: req.session.userId } });
      res.json(user);
      return;
    }
    res.status(200).json(undefined);
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  if (!req.session) {
    res.clearCookie('user_sid').redirect('/');
    res.status(200).json({ message: 'ok' });
  } else {
    return res.status(500).json({ message: 'Ошибка при удалении сессии' });
  }
});

module.exports = router;
