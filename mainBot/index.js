const { Scenes, session, Telegraf, Markup } = require('telegraf');
const token = "6133423256:AAGZbniWXddiiTTqMvfBJCoJ10ZRWWCJpsg"
const bot = new Telegraf(token);
const CC = require('currency-converter-lt')
const axios = require('axios')

bot.use(session())

const SceneGenerator = require('./Scena')
const currScene = new SceneGenerator();
const costScena = currScene.CostEntryScene()
const shoesScena = currScene.costShoesScene()
const hoodieScena = currScene.costHoodiesScene()
const pantsScena = currScene.costPantsScene()
const bagScena = currScene.costBagScene()
const shortScena = currScene.costShortScene()
const shirtScena = currScene.costShirtScene()
const toyScena = currScene.costToysScene()
const underScena = currScene.costUnderScene()
const stage = new Scenes.Stage([costScena, shoesScena, hoodieScena, pantsScena, bagScena, shortScena, shirtScena, toyScena, underScena])

bot.use(session())
bot.use(stage.middleware())

bot.start(async (ctx) => {
    try {
        return ctx.replyWithMarkdown('*Привет,* этот бот создан, чтобы устроить более качественное взаимодейтсвие между нами!').then(() => {
            ctx.reply('Если ты готов оформить заказ и знаешь как и что у нас происходит, можешь сразу писать сюда @PortShop_Admin').then(() => {
                ctx.reply('Что будем делать?', Markup.keyboard([
                    ["Калькулятор цен 💴"], // Row2 with 2 buttons
                    ["Курс 💹","Отзывы 🥇"], // Row1 with 2 buttons
                    ["Все, что нужно знать 🤓", "Связь с нами 🤝"],
                ]).resize())
            })
        })

    } catch (error) {
        console.log(error)
    }
})

bot.hears("Калькулятор цен 💴", async (ctx) => {
    ctx.scene.enter('entry');
});

bot.hears('Все, что нужно знать 🤓', async(ctx) => {
    await ctx.replyWithHTML("https://t.me/PortShopPoizon/46")
})

bot.hears("Курс 💹", async (ctx) => {
    try {
        axios.get("https://www.cbr-xml-daily.ru/daily_json.js").then((res) => {
            let CNY = res.data.Valute.CNY.Value * 1.10
            ctx.replyWithPhoto({ source: './pics/currency.jpg' }, { caption: '<b>Курс на сегодня:</b>' + '\n\n' + '<b>1¥ = ' + CNY.toFixed(1) + '₽</b>\n\n' + "Подробнее про курс можно почитать <a href='https://telegra.ph/Kurs-03-28-2'>здесь</a>", parse_mode: 'HTML' })
            
        })
    } catch (e) {
        console.log(e)
    }

})
//
bot.hears("Отзывы 🥇", async (ctx) => await ctx.replyWithHTML('Здесь мы собираем отзывы наших покупателей⬇ \n\n https://t.me/PortShopReview \n\n По ссылке ты можешь посмотреть реальные фотографии и отзывы наших клиентов, а так же написать свое мнение, кстати, твое мнение очень важно для нас 💙 \n\n Хочешь заказать или задать вопросы, то ждём тебя @PortShop_Admin'));

bot.hears("Связь с нами 🤝", async (ctx) => await ctx.replyWithHTML("Готов оформить заказ или остались вопросы?\n\nПиши сюда @PortShop_Admin\n\n Это чат с нашими менеджерами.\n\n Для оформления заказа тебе нужно отправить ссылку на товар + указать свой размер и написать «хочу купить»\n\n ❗️❗️ОБРАТИ ВНИМАНИЕ❗️❗️\n\n Все заказы осуществляются только через один аккаунт @PortShop_Admin"));

bot.launch()

