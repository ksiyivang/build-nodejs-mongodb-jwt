
const router = require('express').Router();

const verified = require('../middleware/verifyToken')

router.get('/', verified, (req, res) => {
    res.json({
        posts: {
            title: 'my first post',
            description: `random data you shouldn't aaccess`
        }
    });

});











module.exports = router;