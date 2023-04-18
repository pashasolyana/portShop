
const { Scenes, session, Telegraf, Markup } = require('telegraf');
const token = "6077263859:AAF4kXit_xgl563wb-_8fxBbSliOsjXBrKI"
const bot = new Telegraf(token);
const mongoose = require("mongoose");
const SceneGenerator = require('./Scena')
const currScene = new SceneGenerator();
const costScena = currScene.CostEntryScene()
const orderScena = currScene.CreateOrder()
const priceScena = currScene.getPrice()
const titleScena = currScene.getTitle()
const statisticScena = currScene.getStatistic()
const stage = new Scenes.Stage([costScena,orderScena, titleScena, priceScena, statisticScena])

bot.use(session())
bot.use(stage.middleware())

bot.start(async (ctx) => {
    try {
        ctx.scene.enter('entry');
    } catch (error) {
        console.log(error)
    }
})

mongoose.connect('mongodb://127.0.0.1:27017/portShop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
}).then(() => {
    console.log('mongodb connected')
    bot.launch()
})

