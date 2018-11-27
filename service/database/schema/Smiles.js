const mongoose = require('mongoose')
const Schema = mongoose.Schema

const smilesSchema = new Schema({
    ID: { unique: true, type: String },
    GOODS_SERIAL_NUMBER: String,
    goodsId: String,
    SUB_ID: String,
    GOOD_TYPE: Number,
    STATE: Number,
    NAME: String,
    ORI_PRICE: Number,
    PRESENT_PRICE: Number,
    AMOUNT: Number,
    DETAIL: String,
    BRIEF: String,
    SALES_COUNT: Number,
    image: String,
    IMAGE2: String,
    IMAGE3: String,
    IMAGE4: String,
    IMAGE5: String,
    ORIGIN_PLACE: String,
    GOOD_SCENT: String,
    CREATE_TIME: String,
    UPDATE_TIME: String,
    IS_RECOMMEND: Number,
    PICTURE_COMPERSS_PATH: String
}, {
    collections: 'smiles'
})

mongoose.model('Smiles', smilesSchema)