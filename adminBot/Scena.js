const { Scenes, Markup } = require("telegraf")
const axios = require('axios')
const service = require('./services');
const services = require("./services");
const fs = require("fs");

class ScenesGenerator {

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
                ctx.scene.enter('order')
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
    
    CreateOrder() {
        const order = new Scenes.BaseScene('order');
        order.enter(async (ctx) => {
            await ctx.reply('Выберите нужную категорию товара', Markup.keyboard([
                ["Обувь/Верхняя одежда  👟", "Толстовки/Штаны  👘"],
                ["Футболка/Шорты  👕", "Носки/Нижнее белье  🧦"],
            ]).resize().oneTime())
        });
        order.on('text', async (ctx) => {
            if (ctx.message.text == "Обувь/Верхняя одежда  👟") {
                this.category = "Обувь/Верхняя одежда"
                ctx.scene.enter('title')
            } else if (ctx.message.text == "Толстовки/Штаны  👘") {
                this.category = "Толстовки/Штаны"
                ctx.scene.enter('title')
            }
            else if (ctx.message.text == "Футболка/Шорты  👕") {
                this.category = "Футболка/Шорты"
                ctx.scene.enter('title')
            }
            else if (ctx.message.text == "Носки/Нижнее белье  🧦") {
                this.category = "Носки/Нижнее белье"
                ctx.scene.enter('title')
            }
            else {
                await ctx.reply("Пожалуйста, выберите корректную категорию товаров.")
            }

        })
        return order;
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
            await ctx.reply('Пожалуйста, введите стоимость товара')
        });

        price.on('text', async (ctx) => {
            
            if (Number(ctx.message.text)){
                this.price = Number(ctx.message.text)
                const order = await services.create({title : this.title, price : this.price, category : this.category })
                console.log(order)
                if(order){
                    await ctx.reply('Заказ успешно добавлен')
                    ctx.scene.enter('entry')
                }
            }else {
                await ctx.reply("Пожалуйста, введите корректную стоимость")
            }

        })
        return price
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