const { Scenes, Markup } = require("telegraf");
const axios = require("axios");
/*
Markup.keyboard([
                ["Обувь/Верхняя одежда  👟", "Толстовки/Штаны  👘"],
                ["Футболка/Шорты  👕", "Носки/Нижнее белье  🧦"],
                ["Вернуться назад"],
            ]).resize())
*/

class ScenesGenerator {
  CostEntryScene() {
    const entry = new Scenes.BaseScene("entry");
    entry.enter(async (ctx) => {
      await ctx.reply(
        "Выберите категорию товара",
        Markup.keyboard([
          ["Обувь/Верхняя одежда  👟"],
          ["Вернуться назад"],
        ]).resize()
      );
    });
    entry.on("text", async (ctx) => {
      console.log(ctx.message.text);
      if (ctx.message.text == "Обувь/Верхняя одежда  👟") {
        ctx.scene.enter("shoes");
      } else if (ctx.message.text == "Толстовки/Штаны  👘") {
        ctx.scene.enter("pants");
      } else if (ctx.message.text == "Футболка/Шорты  👕") {
        ctx.scene.enter("tshirt");
      } else if (ctx.message.text == "Носки/Нижнее белье  🧦") {
        ctx.scene.enter("socks");
      } else if (ctx.message.text == "Вернуться назад") {
        await ctx.reply(
          "Что будем делать?",
          Markup.keyboard([
            ["Калькулятор цен 💴"],
            ["Курс 💹", "Отзывы 🥇"],
            ["Все, что нужно знать 🤓", "Связь с нами 🤝"],
          ]).resize()
        );
        await ctx.scene.leave();
      } else {
        await ctx.reply("Пожалуйста, выберите корректную категорию товаров.");
      }
    });
    return entry;
  }

  costShoesScene() {
    const shoes = new Scenes.BaseScene("shoes");
    shoes.enter(async (ctx) => {
      ctx.replyWithPhoto(
        { source: "./pics/clothes.jpg" },
        {
          caption:
            "­Пожалуйста, введи цену на товар в ¥. Наш бот покажет цену с учетом доставки до Москвы.\n\n❗️<b><em>ВНИМАНИЕ</em></b>❗️Выбирай цену которая <b><em>ЗАЧЕРКНУТА</em></b> на бирюзовой кнопке. Система отображает скидки для первых покупателей. У нас этих скидок нет",
          parse_mode: "HTML",
        },
        Markup.keyboard([
          ["Обувь/Верхняя одежда  👟", "Толстовки/Штаны  👘"],
          ["Футболка/Шорты  👕", "Носки/Нижнее белье  🧦"],
          ["Вернуться назад"],
        ]).resize()
      );
    });
    shoes.on("text", async (ctx) => {
      console.log(ctx.message.text);
      if (ctx.message.text == "Обувь/Верхняя одежда  👟") {
        ctx.scene.enter("shoes");
      } else if (ctx.message.text == "Толстовки/Штаны  👘") {
        ctx.scene.enter("pants");
      } else if (ctx.message.text == "Футболка/Шорты  👕") {
        ctx.scene.enter("tshirt");
      } else if (ctx.message.text == "Носки/Нижнее белье  🧦") {
        ctx.scene.enter("socks");
      } else if (ctx.message.text == "Вернуться назад") {
        await ctx.reply(
          "Что будем делать?",
          Markup.keyboard([
            ["Калькулятор цен 💴"],
            ["Курс 💹", "Отзывы 🥇"],
            ["Все, что нужно знать 🤓", "Связь с нами 🤝"],
          ]).resize()
        );
        await ctx.scene.leave();
      } else {
        let userValue = ctx.message.text;
        if (!Number(userValue)) {
          await ctx.reply("Пожалуйста укажите корректную стоимость.");
        } else {
          const res = await axios.get(
            "https://www.cbr-xml-daily.ru/daily_json.js"
          );
          let CNY = res.data.Valute.CNY.Value * 1.1;
          let resultValue = Number(userValue) * Number(CNY) + 2150;
          await ctx.reply(
            `💸Итоговая стоимость составит : ${resultValue.toFixed(
              0
            )} ₽💸\n\n Курс ¥ - ${CNY.toFixed(
              1
            )} ₽ \n\n *В итоговую стоимость включена цена товара, доставка и комиссия нашего сервиса.`
          );
          await ctx.replyWithHTML(
            "Готов оформить заказ или остались вопросы?\n\nПиши сюда @PortShop_Admin\n\n Это чат с нашими менеджерами.\n\n Для оформления заказа тебе нужно отправить ссылку на товар + указать свой размер и написать «хочу купить»\n\n ❗️❗️ОБРАТИ ВНИМАНИЕ❗️❗️\n\n Все заказы осуществляются только через один аккаунт @PortShop_Admin"
          );
          await ctx.reply(
            "Что будем делать?",
            Markup.keyboard([
              ["Калькулятор цен 💴"],
              ["Курс 💹", "Отзывы 🥇"],
              ["Все, что нужно знать 🤓", "Связь с нами 🤝"],
            ]).resize()
          );
          await ctx.scene.leave();
        }
      }
    });
    return shoes;
  }

  costPantsScene() {
    const pants = new Scenes.BaseScene("pants");
    pants.enter(async (ctx) => {
      ctx.replyWithPhoto(
        { source: "./pics/clothes.jpg" },
        {
          caption:
            "­Пожалуйста, введи цену на товар в ¥. Наш бот покажет цену с учетом доставки до Москвы.\n\n❗️<b><em>ВНИМАНИЕ</em></b>❗️Выбирай цену которая <b><em>ЗАЧЕРКНУТА</em></b> на бирюзовой кнопке. Система отображает скидки для первых покупателей. У нас этих скидок нет",
          parse_mode: "HTML",
        },
        Markup.keyboard([
          ["Обувь/Верхняя одежда  👟", "Толстовки/Штаны  👘"],
          ["Футболка/Шорты  👕", "Носки/Нижнее белье  🧦"],
          ["Вернуться назад"],
        ]).resize()
      );
    });
    pants.on("text", async (ctx) => {
      console.log(ctx.message.text);
      if (ctx.message.text == "Обувь/Верхняя одежда  👟") {
        ctx.scene.enter("shoes");
      } else if (ctx.message.text == "Толстовки/Штаны  👘") {
        ctx.scene.enter("pants");
      } else if (ctx.message.text == "Футболка/Шорты  👕") {
        ctx.scene.enter("tshirt");
      } else if (ctx.message.text == "Носки/Нижнее белье  🧦") {
        ctx.scene.enter("socks");
      } else if (ctx.message.text == "Вернуться назад") {
        await ctx.reply(
          "Что будем делать?",
          Markup.keyboard([
            ["Калькулятор цен 💴"],
            ["Курс 💹", "Отзывы 🥇"],
            ["Все, что нужно знать 🤓", "Связь с нами 🤝"],
          ]).resize()
        );
        await ctx.scene.leave();
      } else {
        let userValue = ctx.message.text;
        if (!Number(userValue)) {
          await ctx.reply("Пожалуйста укажите корректную стоимость.");
        } else {
          await ctx.reply(
            "В разработке...",
            Markup.keyboard([
              ["Калькулятор цен 💴"],
              ["Курс 💹", "Отзывы 🥇"],
              ["Все, что нужно знать 🤓", "Связь с нами 🤝"],
            ]).resize()
          );
          await ctx.scene.leave();
        }
      }
    });
    return pants;
  }

  costTshirtScene() {
    const tshirt = new Scenes.BaseScene("tshirt");
    tshirt.enter(async (ctx) => {
      ctx.replyWithPhoto(
        { source: "./pics/clothes.jpg" },
        {
          caption:
            "­Пожалуйста, введи цену на товар в ¥. Наш бот покажет цену с учетом доставки до Москвы.\n\n❗️<b><em>ВНИМАНИЕ</em></b>❗️Выбирай цену которая <b><em>ЗАЧЕРКНУТА</em></b> на бирюзовой кнопке. Система отображает скидки для первых покупателей. У нас этих скидок нет",
          parse_mode: "HTML",
        },
        Markup.keyboard([
          ["Обувь/Верхняя одежда  👟", "Толстовки/Штаны  👘"],
          ["Футболка/Шорты  👕", "Носки/Нижнее белье  🧦"],
          ["Вернуться назад"],
        ]).resize()
      );
    });
    tshirt.on("text", async (ctx) => {
      console.log(ctx.message.text);
      if (ctx.message.text == "Обувь/Верхняя одежда  👟") {
        ctx.scene.enter("shoes");
      } else if (ctx.message.text == "Толстовки/Штаны  👘") {
        ctx.scene.enter("pants");
      } else if (ctx.message.text == "Футболка/Шорты  👕") {
        ctx.scene.enter("tshirt");
      } else if (ctx.message.text == "Носки/Нижнее белье  🧦") {
        ctx.scene.enter("socks");
      } else if (ctx.message.text == "Вернуться назад") {
        await ctx.reply(
          "Что будем делать?",
          Markup.keyboard([
            ["Калькулятор цен 💴"],
            ["Курс 💹", "Отзывы 🥇"],
            ["Все, что нужно знать 🤓", "Связь с нами 🤝"],
          ]).resize()
        );
        await ctx.scene.leave();
      } else {
        let userValue = ctx.message.text;
        if (!Number(userValue)) {
          await ctx.reply("Пожалуйста укажите корректную стоимость.");
        } else {
          await ctx.reply(
            "В разработке...",
            Markup.keyboard([
              ["Калькулятор цен 💴"],
              ["Курс 💹", "Отзывы 🥇"],
              ["Все, что нужно знать 🤓", "Связь с нами 🤝"],
            ]).resize()
          );
          await ctx.scene.leave();
        }
      }
    });
    return tshirt;
  }

  costSocksScene() {
    const socks = new Scenes.BaseScene("socks");
    socks.enter(async (ctx) => {
      console.log("socks");
      ctx.replyWithPhoto(
        { source: "./pics/clothes.jpg" },
        {
          caption:
            "­Пожалуйста, введи цену на товар в ¥. Наш бот покажет цену с учетом доставки до Москвы.\n\n❗️<b><em>ВНИМАНИЕ</em></b>❗️Выбирай цену которая <b><em>ЗАЧЕРКНУТА</em></b> на бирюзовой кнопке. Система отображает скидки для первых покупателей. У нас этих скидок нет",
          parse_mode: "HTML",
        },
        Markup.keyboard([
          ["Обувь/Верхняя одежда  👟", "Толстовки/Штаны  👘"],
          ["Футболка/Шорты  👕", "Носки/Нижнее белье  🧦"],
          ["Вернуться назад"],
        ]).resize()
      );
    });
    socks.on("text", async (ctx) => {
      console.log(ctx.message.text);
      if (ctx.message.text == "Обувь/Верхняя одежда  👟") {
        ctx.scene.enter("shoes");
      } else if (ctx.message.text == "Толстовки/Штаны  👘") {
        ctx.scene.enter("pants");
      } else if (ctx.message.text == "Футболка/Шорты  👕") {
        ctx.scene.enter("tshirt");
      } else if (ctx.message.text == "Носки/Нижнее белье  🧦") {
        ctx.scene.enter("socks");
      } else if (ctx.message.text == "Вернуться назад") {
        await ctx.reply(
          "Что будем делать?",
          Markup.keyboard([
            ["Курс 💹", "Отзывы 🥇"],
            ["Все, что нужно знать 🤓", "Связь с нами 🤝"],
            ["Калькулятор цен 💴"],
          ]).resize()
        );
        await ctx.scene.leave();
      } else {
        let userValue = ctx.message.text;
        if (!Number(userValue)) {
          await ctx.reply("Пожалуйста укажите корректную стоимость.");
        } else {
          await ctx.reply(
            "В разработке...",
            Markup.keyboard([
              ["Калькулятор цен 💴"],
              ["Курс 💹", "Отзывы 🥇"],
              ["Все, что нужно знать 🤓", "Связь с нами 🤝"],
            ]).resize()
          );
          await ctx.scene.leave();
        }
      }
    });
    return socks;
  }
}
module.exports = ScenesGenerator;
