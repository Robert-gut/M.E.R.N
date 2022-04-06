const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

//api/auth/login, register
router.post('/register',
    [
        check('email', 'Некоректний email!').isEmail(),
        check('password', 'Мінімальна довжина 6 символів').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректні дані при реєстрації'
                })
            }

            const { email, password } = req.body

            const condidate = await User.findOne({ email })

            if (condidate) {
                return res.status(400).json({ message: 'Такий користувач уже є.' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword })

            await user.save()

            res.status(201).json({ message: 'Користувач успішно створений' })


        } catch (e) {
            res.status(500).json({ message: 'Шось пішло не так!' })
        }
    })



router.post('/login',
    [
        check('email', 'Введіть коректний email').normalizeEmail().isEmail(),
        check('password', 'Введіть пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректні дані при вході в систему'
                })
            }

            const { email, password } = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'Користувач не найдений!' })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ message: 'Неправельний пароль, спробуйте ще раз.' })
            }

            const token = jwt.sign(
                { userId: user.Id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id, email })

        } catch (e) {
            res.status(500).json({ message: 'Шось пішло не так!' })
        }
    })

module.exports = router