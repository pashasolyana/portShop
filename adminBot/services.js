const Order = require('./models/Order/ordersModel')
var xl = require('excel4node');
const { uuid } = require('uuidv4');
const axios = require('axios');

module.exports = {
    create : async(body) => {
        try{
            //{username : this.username, link : this.link, title : this.title, price : this.price, category : this.category }
            
                const res = await axios.get(
                "https://www.cbr-xml-daily.ru/daily_json.js"
                );
                let CNY = res.data.Valute.CNY.Value * 1.1;
                let cnyCourse = Number(CNY)
                let usdCurse = Number(res.data.Valute.USD.Value)
                let dropValue;
                let logisticValue;
                let dropPercentage;
                let chinaDrop;
                let portShopCom;
                let result;
                let profit;
              if (body.category == "Кроссовки/Верхняя одежда") {
                    dropValue = Number(body.price) * 0.05 // drop
                    logisticValue = Number(body.price) * 0.03
                    dropPercentage = 7.86  * Number(usdCurse)
                    chinaDrop = 14
                    portShopCom = 1100
                    result = ((Number(body.price) + Number(dropValue) + Number(logisticValue) + Number(chinaDrop)) * Number(cnyCourse)) + Number(dropPercentage) + portShopCom
              } else if (body.category == "Толстовки") {
                dropValue = Number(body.price) * 0.05 // drop
                logisticValue = Number(body.price) * 0.03
                dropPercentage = 6.02  * Number(usdCurse)
                chinaDrop = 11
                portShopCom = 800
                result = ((Number(body.price) + Number(dropValue) + Number(logisticValue) + Number(chinaDrop)) * Number(cnyCourse)) + Number(dropPercentage) + portShopCom
              } else if (body.category == "Штаны") {
                dropValue = Number(body.price) * 0.05 // drop
                logisticValue = Number(body.price) * 0.03
                dropPercentage = 5.42  * Number(usdCurse)
                chinaDrop = 9
                portShopCom = 800
                result = ((Number(body.price) + Number(dropValue) + Number(logisticValue) + Number(chinaDrop)) * Number(cnyCourse)) + Number(dropPercentage) + portShopCom
              } else if (body.category == "Сумки") {
                dropValue = Number(body.price) * 0.05 // drop
                logisticValue = Number(body.price) * 0.03
                dropPercentage = 4.24  * Number(usdCurse)
                chinaDrop = 7.5
                console.log(chinaDrop, 'chinaDrop') 
                console.log(dropPercentage, 'dropPercentage') 
                portShopCom = 500
                result = ((Number(body.price) + Number(dropValue) + Number(logisticValue) + Number(chinaDrop)) * Number(cnyCourse)) + Number(dropPercentage) + portShopCom
              }else if (body.category == "Шорты") {
                dropValue = Number(body.price) * 0.05 // drop
                logisticValue = Number(body.price) * 0.03
                dropPercentage = 2.42  * Number(usdCurse)
                chinaDrop = 4 
                portShopCom = 400
                result = ((Number(body.price) + Number(dropValue) + Number(logisticValue) + Number(chinaDrop)) * Number(cnyCourse)) + Number(dropPercentage) + portShopCom
              }else if (body.category == "Футболки") {
                dropValue = Number(body.price) * 0.05 // drop
                logisticValue = Number(body.price) * 0.03
                dropPercentage = 2.42  * Number(usdCurse)
                chinaDrop = 4 
                portShopCom = 500
                result = ((Number(body.price) + Number(dropValue) + Number(logisticValue) + Number(chinaDrop)) * Number(cnyCourse)) + Number(dropPercentage) + portShopCom
              }else if (body.category == "Мягкие игрушки") {
                dropValue = Number(body.price) * 0.05 // drop
                logisticValue = Number(body.price) * 0.03
                dropPercentage =  2.42  * Number(usdCurse)
                chinaDrop = 4 
                portShopCom = 300
                result = ((Number(body.price) + Number(dropValue) + Number(logisticValue) + Number(chinaDrop)) * Number(cnyCourse)) + Number(dropPercentage) + portShopCom
              }else if (body.category == "Носки/Нижнее белье") {
                dropValue = Number(body.price) * 0.05 // drop
                logisticValue = Number(body.price) * 0.03
                dropPercentage = 1.81  * Number(usdCurse)
                chinaDrop = 3 
                portShopCom = 250
                result = ((Number(body.price) + Number(dropValue) + Number(logisticValue) + Number(chinaDrop)) * Number(cnyCourse)) + Number(dropPercentage) + portShopCom
              } else {
                  return null
              }
              console.log(cnyCourse, usdCurse, dropValue, logisticValue, dropPercentage, chinaDrop)
            let isOrder = await Order.findOne({username : body.username})
            if(!isOrder){
                const order = await Order.create({username : body.username})
                order.items.push({
                    link : body.link,
                    category : body.category,
                    title : body.title,
                    size : body.size,
                    status1 : body.status1,
                    status2 : body.status2,
                    poizonPrice : body.price,
                    course : cnyCourse,
                    drop : dropValue,
                    Alex : logisticValue,
                    profit : 0,
                    value : result,
                })
                await order.save()
                return order
            }else{
                console.log(isOrder)
                isOrder.items.push({
                    link : body.link,
                    category : body.category,
                    title : body.title,
                    size : body.size,
                    status1 : body.status1,
                    status2 : body.status2,
                    poizonPrice : body.price,
                    course : cnyCourse,
                    drop : dropValue,
                    Alex : logisticValue,
                    profit : 0,
                    value : result,
                })
                await isOrder.save()
                return isOrder
            }
        }catch(e){
            console.log(e)
        }
    },
    getStatistic : async(from, to, ctx) => {
        try{
            
            const orders = await Order.find({createdAt: {$gte : from, $lte : to}})
            var wb = new xl.Workbook();
            var ws = wb.addWorksheet('Sheet 1');
            var style = wb.createStyle({
                font: {
                name: 'Arial',
                  color: 'black',
                  size: 10,
                  bold : false,
                },
                alignment: {
                    horizontal: 'center',
                    shrinkToFit: true, 
                    vertical: 'center', 
                    wrapText: true
                },
                numberFormat: '##0.00; (##0.00); -',
              });
              const bgStyleGreen = wb.createStyle({
                fill: {
                  type: 'pattern',
                  patternType: 'solid',
                  bgColor: '#00B050',
                  fgColor: '#00B050',
                },
                font: {
                    name: 'Arial',
                    color: 'black',
                    size: 10,
                    bold : false,
                    wrapText: true,
                },
                alignment: {
                    horizontal: 'center',
                    shrinkToFit: true, 
                    vertical: 'center', 
                    wrapText: true,
                },
              });

              const bgStyleOrange = wb.createStyle({
                fill: {
                  type: 'pattern',
                  patternType: 'solid',
                  bgColor: '#FDD868',
                  fgColor: '#FDD868',
                },
                font: {
                      name: 'Arial',
                      color: 'black',
                      size: 10,
                      bold : false,
                  },
                  alignment: {
                    horizontal: 'center',
                    shrinkToFit: true, 
                    vertical: 'center', 
                    wrapText: true
                },
              });
                ws.cell(1, 1).string(`Заказчик`).style(style);
                ws.cell(1, 2).string(`Ссылка`).style(style);
                ws.cell(1, 3).string(`Категория`).style(style);
                ws.cell(1,4).string(`Название`).style(style);
                ws.cell(1,5).string(`Размер`).style(style);
                ws.cell(1,6).string(`Статус 1`).style(style);
                ws.cell(1,7).string(`Статус 2`).style(style);
                ws.cell(1,8).string(`Цена POIZON`).style(style);
                ws.cell(1,9).string(`Курс`).style(style);
                ws.cell(1,10).string(`5% Дропа`).style(style);
                ws.cell(1,11).string(`3%/300р Саша`).style(style);
                ws.cell(1,12).string(`Мы доход`).style(style);
                ws.cell(1,13).string(`Итого`).style(style);
                let nextUserNameIndex = 2
                let index = 2
                for(let i = 0; i < orders.length; i++){
                    let obj = orders[i]
                    ws.cell(nextUserNameIndex, 1).string(`${obj.username}`).style(style)
                    for(let j = 0; j < obj.items.length; j++){
                        ws.cell(index, 2).link(obj.items[j].link).style(style)
                        ws.cell(index, 3).string(obj.items[j].category).style(style)
                        ws.cell(index, 4).string(obj.items[j].title).style(style)
                        ws.cell(index, 5).string(obj.items[j].size).style(style)
                        console.log(obj.items[j].status1)
                        if(obj.items[j].status1 == "Оплачен"){
                            ws.cell(index, 6).string(obj.items[j].status1).style(bgStyleGreen)
                        }else{
                            ws.cell(index, 6).string(obj.items[j].status1).style(bgStyleOrange)
                        }
                        ws.cell(index, 7).string(obj.items[j].status2).style(style)
                        ws.cell(index, 8).number(obj.items[j].poizonPrice).style(style)
                        ws.cell(index, 9).number(obj.items[j].course).style(style)
                        ws.cell(index, 10).number(obj.items[j].drop).style(style)
                        ws.cell(index, 11).number(obj.items[j].Alex).style(style)
                        ws.cell(index, 12).number(obj.items[j].profit).style(style)
                        ws.cell(index, 13).number(obj.items[j].value).style(style)
                        index = index + 1
                        nextUserNameIndex += 1
                    }
                }
                let fileName = uuid()
                        wb.write(`${fileName}.xlsx`, () => {
                            ctx.replyWithDocument({source : `./${fileName}.xlsx`}, {caption : "Статистика за выбранный промежуток"}).then(data => {
                                ctx.scene.enter('entry')
                            })
                        }); 
                        return true
        }catch(e){
            console.log(e)
        }
    }
}