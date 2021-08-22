const router = require('express').Router();

router.get('/', async (req, res) => {
    const housing = await req.storage.getHousing();
    
    res.render('home', { pageTitle: 'Home Page', housing });
});

router.get('/search', (req, res) => {
    res.render('search', { pageTitle: 'Search Page' });
});


router.post('/search', async (req, res) => {
    if (req.body.search == '') {
        res.render('search', { pageTitle: 'Search Page' });
    }

    const housing = await req.storage.searchHousing(req.body.search);
    
    res.render('search', { pageTitle: 'Search Page', housing });
});

module.exports = router;