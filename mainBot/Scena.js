const { Scenes, Markup } = require("telegraf");
const axios = require("axios");

/*

 ["Кроссовки/Верхняя одежда + ", "Толстовки +", "Штаны +"],
  ["Сумки", "Шорты", "Футболки"],
  ["Мягкие игрушки", "Носки/Нижнее белье"]
  ["Вернуться назад"],

*/

const MarkupKeyboard = [
  ["Кроссовки/Верхняя одежда", "Толстовки", "Штаны"],
  ["Сумки", "Шорты", "Футболки"],
  ["Мягкие игрушки", "Носки/Нижнее белье"],
  ["Вернуться назад"],
]

const returnMarkupKeyboard = [
    ["Калькулятор цен 💴"],
    ["Курс 💹", "Отзывы 🥇"],
    ["Все, что нужно знать 🤓", "Связь с нами 🤝"],
]

class ScenesGenerator {
  CostEntryScene() {
    const entry = new Scenes.BaseScene("entry");
    entry.enter(async (ctx) => {
      await ctx.reply(
        "Выберите категорию товара",
        Markup.keyboard(MarkupKeyboard).resize()
      );
    });
    entry.on("text", async (ctx) => {
      if (ctx.message.text == "Кроссовки/Верхняя одежда") {
        ctx.scene.enter("shoes");
      } else if (ctx.message.text == "Толстовки") {
        ctx.scene.enter("Hoodies");
      } else if (ctx.message.text == "Штаны") {
        ctx.scene.enter("pants");
      } else if (ctx.message.text == "Сумки") {
        ctx.scene.enter("bag");
      }else if (ctx.message.text == "Шорты") {
        ctx.scene.enter("short");
      }else if (ctx.message.text == "Футболки") {
        ctx.scene.enter("shirt");
      }else if (ctx.message.text == "Мягкие игрушки") {
        ctx.scene.enter("toys");
      }else if (ctx.message.text == "Носки/Нижнее белье") {
        ctx.scene.enter("under");
      }else if (ctx.message.text == "Вернуться назад") {
        await ctx.reply(
          "Что будем делать?",
          Markup.keyboard(returnMarkupKeyboard).resize()
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
        Markup.keyboard(MarkupKeyboard).resize()
      );
    });
    shoes.on("text", async (ctx) => {
      if (ctx.message.text == "Кроссовки/Верхняя одежда") {
        ctx.scene.enter("shoes");
      } else if (ctx.message.text == "Толстовки") {
        ctx.scene.enter("Hoodies");
      } else if (ctx.message.text == "Штаны") {
        ctx.scene.enter("pants");
      } else if (ctx.message.text == "Сумки") {
        ctx.scene.enter("bag");
      }else if (ctx.message.text == "Шорты") {
        ctx.scene.enter("short");
      }else if (ctx.message.text == "Футболки") {
        ctx.scene.enter("shirt");
      }else if (ctx.message.text == "Мягкие игрушки") {
        ctx.scene.enter("toys");
      }else if (ctx.message.text == "Носки/Нижнее белье") {
        ctx.scene.enter("under");
      }else if (ctx.message.text == "Вернуться назад") {
        await ctx.reply(
          "Что будем делать?",
          Markup.keyboard(returnMarkupKeyboard).resize()
        );
        await ctx.scene.leave();
      } else {
        let userValue = ctx.message.text;
        if (!Number(userValue)) {
          await ctx.reply("Пожалуйста укажите корректную стоимость.");
        } else {
         // const res = await axios.get(
       //     "https://www.cbr-xml-daily.ru/daily_json.js"
       //   );
        //  let CNY = res.data.Valute.CNY.Value * 1.1;
          let CNY = 12.5
          let resultValue = (Number(userValue) + 0.05) * Number(CNY) + 2950;
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
            Markup.keyboard(returnMarkupKeyboard).resize()
          );
          await ctx.scene.leave();
        }
      }
    });
    return shoes;
  }

  costHoodiesScene() {
    const Hoodies = new Scenes.BaseScene("Hoodies");
    Hoodies.enter(async (ctx) => {
      ctx.replyWithPhoto(
        { source: "./pics/clothes.jpg" },
        {
          caption:
            "­Пожалуйста, введи цену на товар в ¥. Наш бот покажет цену с учетом доставки до Москвы.\n\n❗️<b><em>ВНИМАНИЕ</em></b>❗️Выбирай цену которая <b><em>ЗАЧЕРКНУТА</em></b> на бирюзовой кнопке. Система отображает скидки для первых покупателей. У нас этих скидок нет",
          parse_mode: "HTML",
        },
        Markup.keyboard(MarkupKeyboard).resize()
      );
    });
    Hoodies.on("text", async (ctx) => {
      if (ctx.message.text == "Кроссовки/Верхняя одежда") {
        ctx.scene.enter("shoes");
      } else if (ctx.message.text == "Толстовки") {
        ctx.scene.enter("Hoodies");
      } else if (ctx.message.text == "Штаны") {
        ctx.scene.enter("pants");
      } else if (ctx.message.text == "Сумки") {
        ctx.scene.enter("bag");
      }else if (ctx.message.text == "Шорты") {
        ctx.scene.enter("short");
      }else if (ctx.message.text == "Футболки") {
        ctx.scene.enter("shirt");
      }else if (ctx.message.text == "Мягкие игрушки") {
        ctx.scene.enter("toys");
      }else if (ctx.message.text == "Носки/Нижнее белье") {
        ctx.scene.enter("under");
      }else if (ctx.message.text == "Вернуться назад") {
        await ctx.reply(
          "Что будем делать?",
          Markup.keyboard(returnMarkupKeyboard).resize()
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
          let CNY = 12.5;
          let USD = Number(res.data.Valute.USD.Value)
          let dropValue = Number(userValue) * 0.05 // drop
          let logisticValue = Number(userValue) * 0.03 
          let dropPercentage = 6.02  * Number(USD)// * dollar - процент дропа
          let chinaDrop = 11// юань
          let portshopCom = 800
          console.log(CNY, USD, dropValue, logisticValue, dropPercentage, chinaDrop)
          let resultValue = (Number(userValue) + 0.05) * Number(CNY) + 2500;
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
            Markup.keyboard(returnMarkupKeyboard).resize()
          );
          await ctx.scene.leave();
        }
      }
    });
    return Hoodies;
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
        Markup.keyboard(MarkupKeyboard).resize()
      );
    });
    pants.on("text", async (ctx) => {
      if (ctx.message.text == "Кроссовки/Верхняя одежда") {
        ctx.scene.enter("shoes");
      } else if (ctx.message.text == "Толстовки") {
        ctx.scene.enter("Hoodies");
      } else if (ctx.message.text == "Штаны") {
        ctx.scene.enter("pants");
      } else if (ctx.message.text == "Сумки") {
        ctx.scene.enter("bag");
      }else if (ctx.message.text == "Шорты") {
        ctx.scene.enter("short");
      }else if (ctx.message.text == "Футболки") {
        ctx.scene.enter("shirt");
      }else if (ctx.message.text == "Мягкие игрушки") {
        ctx.scene.enter("toys");
      }else if (ctx.message.text == "Носки/Нижнее белье") {
        ctx.scene.enter("under");
      }else if (ctx.message.text == "Вернуться назад") {
        await ctx.reply(
          "Что будем делать?",
          Markup.keyboard(returnMarkupKeyboard).resize()
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
          let CNY = 12.5;
          let USD = Number(res.data.Valute.USD.Value)
          let dropValue = Number(userValue) * 0.05 // drop
          let logisticValue = Number(userValue) * 0.03 
          let dropPercentage = 5.42  * Number(USD)// * dollar - процент дропа
          let chinaDrop = 9 // юань
          let portshopCom = 800
          console.log(CNY, USD, dropValue, logisticValue, dropPercentage, chinaDrop)
          let resultValue = ((Number(userValue) + Number(dropValue) + Number(logisticValue) + Number(chinaDrop)) * Number(CNY)) + Number(dropPercentage) + portshopCom
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
            Markup.keyboard(returnMarkupKeyboard).resize()
          );
          await ctx.scene.leave();
        }
      }
    });
    return pants;
  }

  costBagScene() {
    const bag = new Scenes.BaseScene("bag");
    bag.enter(async (ctx) => {
      ctx.replyWithPhoto(
        { source: "./pics/clothes.jpg" },
        {
          caption:
            "­Пожалуйста, введи цену на товар в ¥. Наш бот покажет цену с учетом доставки до Москвы.\n\n❗️<b><em>ВНИМАНИЕ</em></b>❗️Выбирай цену которая <b><em>ЗАЧЕРКНУТА</em></b> на бирюзовой кнопке. Система отображает скидки для первых покупателей. У нас этих скидок нет",
          parse_mode: "HTML",
        },
        Markup.keyboard(MarkupKeyboard).resize()
      );
    });
    bag.on("text", async (ctx) => {
      if (ctx.message.text == "Кроссовки/Верхняя одежда") {
        ctx.scene.enter("shoes");
      } else if (ctx.message.text == "Толстовки") {
        ctx.scene.enter("Hoodies");
      } else if (ctx.message.text == "Штаны") {
        ctx.scene.enter("pants");
      } else if (ctx.message.text == "Сумки") {
        ctx.scene.enter("bag");
      }else if (ctx.message.text == "Шорты") {
        ctx.scene.enter("short");
      }else if (ctx.message.text == "Футболки") {
        ctx.scene.enter("shirt");
      }else if (ctx.message.text == "Мягкие игрушки") {
        ctx.scene.enter("toys");
      }else if (ctx.message.text == "Носки/Нижнее белье") {
        ctx.scene.enter("under");
      }else if (ctx.message.text == "Вернуться назад") {
        await ctx.reply(
          "Что будем делать?",
          Markup.keyboard(returnMarkupKeyboard).resize()
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
          let CNY =  12.5;
          let USD = Number(res.data.Valute.USD.Value)
          let dropValue = Number(userValue) * 0.05 // drop
          let logisticValue = Number(userValue) * 0.03 
          let dropPercentage = 4.24  * Number(USD)// * dollar - процент дропа
          let chinaDrop = 7.5
          let portshopCom = 500
          console.log(CNY, USD, dropValue, logisticValue, dropPercentage, chinaDrop)
          console.log(chinaDrop, 'chinaDrop') 
          console.log(dropPercentage, 'dropPercentage') 
          let resultValue = ((Number(userValue) + Number(dropValue) + Number(logisticValue) + Number(chinaDrop)) * Number(CNY)) + Number(dropPercentage) + portshopCom
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
            Markup.keyboard(returnMarkupKeyboard).resize()
          );
          await ctx.scene.leave();
        }
      }
    });
    return bag;
  }

  costShortScene() {
    const short = new Scenes.BaseScene("short");
    short.enter(async (ctx) => {
      ctx.replyWithPhoto(
        { source: "./pics/clothes.jpg" },
        {
          caption:
            "­Пожалуйста, введи цену на товар в ¥. Наш бот покажет цену с учетом доставки до Москвы.\n\n❗️<b><em>ВНИМАНИЕ</em></b>❗️Выбирай цену которая <b><em>ЗАЧЕРКНУТА</em></b> на бирюзовой кнопке. Система отображает скидки для первых покупателей. У нас этих скидок нет",
          parse_mode: "HTML",
        },
        Markup.keyboard(MarkupKeyboard).resize()
      );
    });
    short.on("text", async (ctx) => {
      if (ctx.message.text == "Кроссовки/Верхняя одежда") {
        ctx.scene.enter("shoes");
      } else if (ctx.message.text == "Толстовки") {
        ctx.scene.enter("Hoodies");
      } else if (ctx.message.text == "Штаны") {
        ctx.scene.enter("pants");
      } else if (ctx.message.text == "Сумки") {
        ctx.scene.enter("bag");
      }else if (ctx.message.text == "Шорты") {
        ctx.scene.enter("short");
      }else if (ctx.message.text == "Футболки") {
        ctx.scene.enter("shirt");
      }else if (ctx.message.text == "Мягкие игрушки") {
        ctx.scene.enter("toys");
      }else if (ctx.message.text == "Носки/Нижнее белье") {
        ctx.scene.enter("under");
      }else if (ctx.message.text == "Вернуться назад") {
        await ctx.reply(
          "Что будем делать?",
          Markup.keyboard(returnMarkupKeyboard).resize()
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
          let CNY =  12.5;
          let USD = Number(res.data.Valute.USD.Value)
          let dropValue = Number(userValue) * 0.05 // drop
          let logisticValue = Number(userValue) * 0.03 
          let dropPercentage = 2.42  * Number(USD)// * dollar - процент дропа
          let chinaDrop = 4
          let portshopCom = 400
          console.log(CNY, USD, dropValue, logisticValue, dropPercentage, chinaDrop)
          let resultValue = ((Number(userValue) + Number(dropValue) + Number(logisticValue) + Number(chinaDrop)) * Number(CNY)) + Number(dropPercentage) + portshopCom
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
            Markup.keyboard(returnMarkupKeyboard).resize()
          );
          await ctx.scene.leave();
        }
      }
    });
    return short;
  }

  
  costShirtScene() {
    const shirt = new Scenes.BaseScene("shirt");
    shirt.enter(async (ctx) => {
      ctx.replyWithPhoto(
        { source: "./pics/clothes.jpg" },
        {
          caption:
            "­Пожалуйста, введи цену на товар в ¥. Наш бот покажет цену с учетом доставки до Москвы.\n\n❗️<b><em>ВНИМАНИЕ</em></b>❗️Выбирай цену которая <b><em>ЗАЧЕРКНУТА</em></b> на бирюзовой кнопке. Система отображает скидки для первых покупателей. У нас этих скидок нет",
          parse_mode: "HTML",
        },
        Markup.keyboard(MarkupKeyboard).resize()
      );
    });
    shirt.on("text", async (ctx) => {
      if (ctx.message.text == "Кроссовки/Верхняя одежда") {
        ctx.scene.enter("shoes");
      } else if (ctx.message.text == "Толстовки") {
        ctx.scene.enter("Hoodies");
      } else if (ctx.message.text == "Штаны") {
        ctx.scene.enter("pants");
      } else if (ctx.message.text == "Сумки") {
        ctx.scene.enter("bag");
      }else if (ctx.message.text == "Шорты") {
        ctx.scene.enter("short");
      }else if (ctx.message.text == "Футболки") {
        ctx.scene.enter("shirt");
      }else if (ctx.message.text == "Мягкие игрушки") {
        ctx.scene.enter("toys");
      }else if (ctx.message.text == "Носки/Нижнее белье") {
        ctx.scene.enter("under");
      }else if (ctx.message.text == "Вернуться назад") {
        await ctx.reply(
          "Что будем делать?",
          Markup.keyboard(returnMarkupKeyboard).resize()
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
          let CNY =  12.5;
          let USD = Number(res.data.Valute.USD.Value)
          let dropValue = Number(userValue) * 0.05 // drop
          let logisticValue = Number(userValue) * 0.03 
          let dropPercentage = 2.42  * Number(USD)// * dollar - процент дропа
          let chinaDrop = 4// юань
          let portshopCom = 500
          console.log(CNY, USD, dropValue, logisticValue, dropPercentage, chinaDrop)
          let resultValue = ((Number(userValue) + Number(dropValue) + Number(logisticValue) + Number(chinaDrop)) * Number(CNY)) + Number(dropPercentage) + portshopCom
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
            Markup.keyboard(returnMarkupKeyboard).resize()
          );
          await ctx.scene.leave();
        }
      }
    });
    return shirt;
  }

  costToysScene() {
    const toys = new Scenes.BaseScene("toys");
    toys.enter(async (ctx) => {
      ctx.replyWithPhoto(
        { source: "./pics/clothes.jpg" },
        {
          caption:
            "­Пожалуйста, введи цену на товар в ¥. Наш бот покажет цену с учетом доставки до Москвы.\n\n❗️<b><em>ВНИМАНИЕ</em></b>❗️Выбирай цену которая <b><em>ЗАЧЕРКНУТА</em></b> на бирюзовой кнопке. Система отображает скидки для первых покупателей. У нас этих скидок нет",
          parse_mode: "HTML",
        },
        Markup.keyboard(MarkupKeyboard).resize()
      );
    });
    toys.on("text", async (ctx) => {
      if (ctx.message.text == "Кроссовки/Верхняя одежда") {
        ctx.scene.enter("shoes");
      } else if (ctx.message.text == "Толстовки") {
        ctx.scene.enter("Hoodies");
      } else if (ctx.message.text == "Штаны") {
        ctx.scene.enter("pants");
      } else if (ctx.message.text == "Сумки") {
        ctx.scene.enter("bag");
      }else if (ctx.message.text == "Шорты") {
        ctx.scene.enter("short");
      }else if (ctx.message.text == "Футболки") {
        ctx.scene.enter("shirt");
      }else if (ctx.message.text == "Мягкие игрушки") {
        ctx.scene.enter("toys");
      }else if (ctx.message.text == "Носки/Нижнее белье") {
        ctx.scene.enter("under");
      }else if (ctx.message.text == "Вернуться назад") {
        await ctx.reply(
          "Что будем делать?",
          Markup.keyboard(returnMarkupKeyboard).resize()
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
          let CNY =  12.5;
          let USD = Number(res.data.Valute.USD.Value)
          let dropValue = Number(userValue) * 0.05 // drop
          let logisticValue = Number(userValue) * 0.03 
          let dropPercentage = 2.42  * Number(USD)// * dollar - процент дропа
          let chinaDrop = 4 // юань
          let portshopCom = 300
          console.log(CNY, USD, dropValue, logisticValue, dropPercentage, chinaDrop)
          let resultValue = ((Number(userValue) + Number(dropValue) + Number(logisticValue) + Number(chinaDrop)) * Number(CNY)) + Number(dropPercentage) + portshopCom
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
            Markup.keyboard(returnMarkupKeyboard).resize()
          );
          await ctx.scene.leave();
        }
      }
    });
    return toys;
  }

  costUnderScene() {
    const under = new Scenes.BaseScene("under");
    under.enter(async (ctx) => {
      ctx.replyWithPhoto(
        { source: "./pics/clothes.jpg" },
        {
          caption:
            "­Пожалуйста, введи цену на товар в ¥. Наш бот покажет цену с учетом доставки до Москвы.\n\n❗️<b><em>ВНИМАНИЕ</em></b>❗️Выбирай цену которая <b><em>ЗАЧЕРКНУТА</em></b> на бирюзовой кнопке. Система отображает скидки для первых покупателей. У нас этих скидок нет",
          parse_mode: "HTML",
        },
        Markup.keyboard(MarkupKeyboard).resize()
      );
    });
    under.on("text", async (ctx) => {
      if (ctx.message.text == "Кроссовки/Верхняя одежда") {
        ctx.scene.enter("shoes");
      } else if (ctx.message.text == "Толстовки") {
        ctx.scene.enter("Hoodies");
      } else if (ctx.message.text == "Штаны") {
        ctx.scene.enter("pants");
      } else if (ctx.message.text == "Сумки") {
        ctx.scene.enter("bag");
      }else if (ctx.message.text == "Шорты") {
        ctx.scene.enter("short");
      }else if (ctx.message.text == "Футболки") {
        ctx.scene.enter("shirt");
      }else if (ctx.message.text == "Мягкие игрушки") {
        ctx.scene.enter("toys");
      }else if (ctx.message.text == "Носки/Нижнее белье") {
        ctx.scene.enter("under");
      }else if (ctx.message.text == "Вернуться назад") {
        await ctx.reply(
          "Что будем делать?",
          Markup.keyboard(returnMarkupKeyboard).resize()
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
          let CNY =  12.5;
          let USD = Number(res.data.Valute.USD.Value)
          let dropValue = Number(userValue) * 0.05 // drop
          let logisticValue = Number(userValue) * 0.03 
          let dropPercentage = 1.81  * Number(USD)// * dollar - процент дропа
          let chinaDrop = 3// юань
          let portshopCom = 250
          console.log(CNY, USD, dropValue, logisticValue, dropPercentage, chinaDrop)
          let resultValue = ((Number(userValue) + Number(dropValue) + Number(logisticValue) + Number(chinaDrop)) * Number(CNY)) + Number(dropPercentage) + portshopCom
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
            Markup.keyboard(returnMarkupKeyboard).resize()
          );
          await ctx.scene.leave();
        }
      }
    });
    return under;
  }

}
module.exports = ScenesGenerator;
