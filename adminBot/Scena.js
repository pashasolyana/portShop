const { Scenes, Markup } = require("telegraf")
const axios = require('axios')
const service = require('./services');
const services = require("./services");
const fs = require("fs");

class ScenesGenerator {

    username;
    status1;
    status2;
    link;
    size;
    category;
    price;
    from;
    to;

    CostEntryScene() {
        const entry = new Scenes.BaseScene('entry');
        entry.enter(async (ctx) => {
            await ctx.reply('Что будем делать?', Markup.keyboard([
                ['Добавим заказ', 'Статистика за месяц']
            ]).resize().oneTime())
        });
        entry.on('text', async (ctx) => {
            console.log(ctx.message.text)
            if (ctx.message.text == "Добавим заказ") {
                ctx.scene.enter('username')
            }
            else if (ctx.message.text == "Статистика за месяц") {
                ctx.scene.enter('statistic')
            }
            else {
                await ctx.reply('Выберите нужную категорию.')
            }
        })
        return entry;
    }

    getUserName(){
        const username = new Scenes.BaseScene('username');
        username.enter(async (ctx) => {
            await ctx.reply('Введите ник пользователя')
        });
        username.on('text', async (ctx) => {
            this.username = ctx.message.text
            await ctx.reply("Хорошо, спасибо.")
            ctx.scene.enter('link')
        })
        return username;
    }

    getLink(){
        const link = new Scenes.BaseScene('link');
        link.enter(async (ctx) => {
            await ctx.reply('Введите ссылку на товар')
        });
        link.on('text', async (ctx) => {
            this.link = ctx.message.text
            await ctx.reply("Хорошо, спасибо.")
            ctx.scene.enter('status1')
        })
        return link;
    }

    getStatus1(){
        const status1 = new Scenes.BaseScene('status1');
        status1.enter(async (ctx) => {
            await ctx.reply('Укажите статус оплаты',  Markup.keyboard([
                ['Ожидает оплаты', 'Оплачен']
            ]).resize().oneTime()
            )
        });
        status1.on('text', async (ctx) => {
            this.status1 = ctx.message.text
            await ctx.reply("Хорошо, спасибо.")
            ctx.scene.enter('status2')
        })
        return status1;
    }

    getStatus2(){
        const status2 = new Scenes.BaseScene('status2');
        status2.enter(async (ctx) => {
            await ctx.reply('Укажите статус доставки',  Markup.keyboard([
                ['Выкуплен', 'На складе в Китае'],
                ['Отправлен в Россию', 'На Port-складе'],
                ['Ожидает выкупа']
            ]).resize().oneTime()
            )
        });
        status2.on('text', async (ctx) => {
            this.status2 = ctx.message.text
            await ctx.reply("Хорошо, спасибо.")
            ctx.scene.enter('order')
        })
        return status2;
    }
    
    CreateOrder() {
        const order = new Scenes.BaseScene('order');
        order.enter(async (ctx) => {
            await ctx.reply('Выберите нужную категорию товара', Markup.keyboard([
                ["Кроссовки/Верхняя одежда", "Толстовки", "Штаны"],
                ["Сумки", "Шорты", "Футболки"],
                ["Мягкие игрушки", "Носки/Нижнее белье"],
            ]).resize().oneTime())
        });
        order.on('text', async (ctx) => {
            if (ctx.message.text == "Кроссовки/Верхняя одежда") {
                this.category = "Кроссовки/Верхняя одежда"
                ctx.scene.enter('size')
              } else if (ctx.message.text == "Толстовки") {
                this.category = "Толстовки"
                ctx.scene.enter('size')
              } else if (ctx.message.text == "Штаны") {
                this.category = "Штаны"
                ctx.scene.enter('size')
              } else if (ctx.message.text == "Сумки") {
                this.category = "Сумки"
                ctx.scene.enter('size')
              }else if (ctx.message.text == "Шорты") {
                this.category = "Шорты"
                ctx.scene.enter('size')
              }else if (ctx.message.text == "Футболки") {
                this.category = "Футболки"
                ctx.scene.enter('size')
              }else if (ctx.message.text == "Мягкие игрушки") {
                this.category = "Мягкие игрушки"
                ctx.scene.enter('size')
              }else if (ctx.message.text == "Носки/Нижнее белье") {
                this.category = "Носки/Нижнее белье"
                ctx.scene.enter('size')
              }else {
                await ctx.reply("Пожалуйста, выберите корректную категорию товаров.")
            }

        })
        return order;
    } 
    
    getSize(){
        const size = new Scenes.BaseScene('size');
        size.enter(async (ctx) => {
            await ctx.reply('Пожалуйста, введите размер товара')
        });

        size.on('text', async (ctx) => {
            this.size = ctx.message.text
            ctx.scene.enter('title')
        })
        return size
    }

    getTitle(){
        const title = new Scenes.BaseScene('title');
        title.enter(async (ctx) => {
            await ctx.reply('Пожалуйста, введите наименование товара')
        });

        title.on('text', async (ctx) => {
            this.title = ctx.message.text
            ctx.scene.enter('price')
        })
        return title
    }
    
    getPrice(){
        const price = new Scenes.BaseScene('price');
        price.enter(async (ctx) => {
            await ctx.reply('Пожалуйста, введите стоимость товара в юанях')
        });

        price.on('text', async (ctx) => {
            if (Number(ctx.message.text)){
                this.price = Number(ctx.message.text)
                const order = await services.create({username : this.username,size : this.size, status1 : this.status1, status2 : this.status2, link : this.link, title : this.title, price : this.price, category : this.category })
                console.log(order)
                if(order){
                    ctx.scene.enter('check')
                }
            }else {
                await ctx.reply("Пожалуйста, введите корректную стоимость")
            }

        })
        return price
    }

    checkScena(){
        const check = new Scenes.BaseScene('check');
        check.enter(async (ctx) => {
            await ctx.reply('Заказ успешно добавлен, что-то еще?', Markup.keyboard([
                ['Добавить еще вещь', 'Другое']
            ]).resize().oneTime()
            )
        });

        check.on('text', async (ctx) => {
            if(ctx.message.text == "Добавить еще вещь"){
                ctx.scene.enter('link')
            }else{
                ctx.scene.enter('entry')
            }
        })
        return check
    }

    getStatistic(){
        const statistic = new Scenes.BaseScene('statistic');
        statistic.enter(async (ctx) => {
            await ctx.replyWithMarkdown('Пожалуйста, введите желаемый интвервал в формате *2023-02-18 2023-03-18*')
        });

        statistic.on('text', async (ctx) => {
            let dates = (ctx.message.text).split(' ')
            if(new Date(dates[0]) && new Date(dates[1])){
                this.from = new Date(dates[0])
                this.to = new Date(dates[1])
                console.log(isNaN(Date.parse(this.from)))
                if(!isNaN(Date.parse(this.from)) && !isNaN(Date.parse(this.to))){
                    await service.getStatistic(this.from, this.to,ctx)
                }else{
                    await ctx.reply("Пожалуйста, введите корректную дату")
                }
            }else {
                await ctx.reply("Пожалуйста, введите корректную дату")
            }

        })
        return statistic
    }
}
module.exports = ScenesGenerator;

// 2500 - 1100 = доход