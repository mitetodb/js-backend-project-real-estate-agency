const router = require('express').Router();
const { isGuest, isUser } = require('../middlewares/guards');
const { parseError } = require('../util/parsers');

router.get('/', async (req, res) => {
    const housing = await req.storage.getAllHousing();
    
    res.render('housing/housing', { pageTitle: 'Catalog', housing });
});

router.get('/create', isUser(), (req, res) => {
    res.render('housing/create', { pageTitle: 'Create Page' });
});

router.post('/create', isUser(), async (req, res) => {
    
    try {
        const housingData = {
            name: req.body.name.trim(),
            type: req.body.type.trim(),
            year: req.body.year,
            city: req.body.city.trim(),
            homeImage: req.body.homeImage.trim(),
            propertyDescription: req.body.propertyDescription.trim(),
            availablePieces: req.body.availablePieces,
            owner: req.user._id
        };

        const housing = await req.storage.createHousing(housingData);
        res.redirect('/');

    } catch (err) {

        const ctx = {
            pageTitle: 'Create Page',
            errors: parseError(err),
            housingData: {
                name: req.body.name,
                type: req.body.type,
                year: req.body.year,
                city: req.body.city,
                homeImage: req.body.homeImage,
                propertyDescription: req.body.propertyDescription,
                availablePieces: req.body.availablePieces
            }
        };
        res.render('housing/create', ctx);
    }

});

router.get('/details/:id', async (req, res) => {
    const housing = await req.storage.getHousingById(req.params.id);

    housing.hasUser = Boolean(req.user);
    housing.isOwner = req.user && req.user._id == housing.owner;
    housing.rented = req.user && housing.rentedAHome.find(u => u._id == req.user._id);
    housing.isAvailable = Boolean(housing.availablePieces - housing.rentedAHome.length > 0);
    housing.numAvailable = housing.availablePieces - housing.rentedAHome.length;
    housing.people = housing.rentedAHome.map(u => u.name).join(', ');

    res.render('housing/details', { pageTitle: 'Details Page', housing });
});

router.get('/edit/:id', isUser(), async (req, res) => {
    try {
        const housing = await req.storage.getHousingById(req.params.id);

        if(housing.owner != req.user._id) {
            throw new Error('Cannot edit house you haven\'t created');
        }

        res.render('housing/edit', { pageTitle: 'Edit Page', housing });

    } catch (err) {
        console.log(err.message);
        res.redirect('/housing/details/' + req.params.id);
    }
});

router.post('/edit/:id', isUser(), async (req, res) => {
    try {
        const housing = await req.storage.getHousingById(req.params.id);

        if(housing.owner != req.user._id) {
            throw new Error('Cannot edit house you haven\'t created');
        }

        await req.storage.updateHousing(req.params.id, req.body);
        res.redirect('/housing/details/' + req.params.id);

    } catch (err) {
        console.log(err.message);

        const ctx = {
            pageTitle: 'Edit Page',
            errors: parseError(err),
            housing: {
                name: req.body.name,
                type: req.body.type,
                year: req.body.year,
                city: req.body.city,
                homeImage: req.body.homeImage,
                propertyDescription: req.body.propertyDescription,
                availablePieces: req.body.availablePieces,
                _id: req.params.id
            }
        };
        res.render('housing/edit', ctx);
    }
});


router.get('/delete/:id', isUser(), async (req, res) => {
    try {
        const housing = await req.storage.getHousingById(req.params.id);

        if(housing.owner != req.user._id) {
            throw new Error('Cannot delete house you haven\'t created');
        }

        await req.storage.deleteHousing(req.params.id);
        res.redirect('/');

    } catch (err) {
        console.log(err.message);
        res.redirect('/housing/details/' + req.params.id);

    }
});

router.get('/rent/:id', isUser(), async (req, res) => {
    try {
        const housing = await req.storage.getHousingById(req.params.id);

        if(housing.owner == req.user._id) {
            throw new Error('Cannot rent your own house');
        }

        await req.storage.rentHousing(req.params.id, req.user._id);
        res.redirect('/housing/details/' + req.params.id);

    } catch (err) {
        console.log(err.message);
        res.redirect('/housing/details/' + req.params.id);

    }
});

module.exports = router;