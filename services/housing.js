const Housing = require('../models/Housing');

async function getHousing() {
    return await Housing.find({}).sort({ createdAt: -1 }).limit(3).lean();
}

async function getAllHousing() {
    const housing = await Housing.find({}).lean();

    return housing;
}

async function getHousingById(id) {
    const housing = await Housing.findById(id).populate('rentedAHome').lean();

    return housing;
}

async function createHousing(housingData) {
    const pattern = new RegExp(`^${housingData.title}$`, 'i');
    const existing = await Housing.findOne({ title: { $regex: pattern } });

    if (existing) {
        throw new Error('A House with this name already exists');
    }

    const housing = new Housing(housingData);
    await housing.save();

    return housing;
}

async function updateHousing(id, housingData) {
    const housing = await Housing.findById(id);

    housing.name = housingData.name.trim();
    housing.type = housingData.type.trim();
    housing.year = housingData.year;
    housing.city = housingData.city.trim();
    housing.homeImage = housingData.homeImage.trim();
    housing.propertyDescription = housingData.propertyDescription.trim();
    housing.availablePieces = housingData.availablePieces;

    await housing.save(id);
}

async function deleteHousing(id) {
    return Housing.findByIdAndDelete(id);
}

async function rentHousing(housingId, userId) {
    const housing = await Housing.findById(housingId);
    housing.rentedAHome.push(userId);
    return housing.save();
}

async function searchHousing(query) {
    const pattern = new RegExp(query, 'i');
    const housing = await Housing.find({ name: { $regex: pattern } }).lean();
    
    return housing;
}

module.exports = {
    getHousing,
    getAllHousing,
    getHousingById,
    createHousing,
    updateHousing,
    deleteHousing,
    rentHousing,
    searchHousing
};