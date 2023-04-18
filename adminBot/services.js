const Order = require('./models/Order/ordersModel')
var xl = require('excel4node');
const { uuid } = require('uuidv4');

module.exports = {
    create : async(body) => {
        try{
            const order = await Order.create({title : body.title, value : body.price, category : body.category})
            return order
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
                  color: 'black',
                  size: 12,
                  bold : true,
                },
                alignment: {
                    horizontal: 'center',
                    shrinkToFit: true, 
                    wrapText: true
                  },
                numberFormat: '$#,##0.00; ($#,##0.00); -',
              });
              var style2 = wb.createStyle({
                font: {
                  color: 'black',
                  size: 12,
                },
                alignment: {
                    horizontal: 'left',
                    shrinkToFit: true, 
                    wrapText: true
                }
              });
            let date = (from.toISOString()).split('T')
            let date2 = (to.toISOString()).split('T')
            console.log(date, date2)
            ws.cell(1, 1, 1, 2, true).string(`Продажи`).style(style);
            ws.cell(1, 3, 1, 4, true).string(`Расходы`).style(style);
            ws.cell(1, 5, 1, 6, true).string(`Доходы`).style(style);
            ws.cell(2,1).string(`Номер`).style(style);
            ws.cell(2,2).string(`Цена`).style(style);
            ws.cell(2,3).string(`Дроп (коммисия Саше)`).style(style);
            ws.cell(2,4).string(`Доставка`).style(style);
            ws.cell(2, 5, 2, 6, true).string(``).style(style);
            let index = 3
            for(let i = 0; i < orders.length; i++){
                ws.cell(index, 1).string(`${i + 1}. ${orders[i].title}`).style(style2)
                ws.cell(index, 2).number(orders[i].value).style(style2)
                ws.cell(index, 3).number(300).style(style2)
                ws.cell(index, 4).number(1100).style(style2)
                ws.cell(index, 5, index, 6, true).number(750).style(style2)
                index = index + 1
            }
            ws.cell(index +1, 1).formula(`ROWS(A3:A${index - 1})`)
            ws.cell(index +1, 2).formula(`=SUM(B3:B${index})`)
            ws.cell(index +1, 3).formula(`=SUM(C3:C${index})`)
            ws.cell(index +1, 4).formula(`=SUM(D3:D${index})`)
            ws.cell(index +1, 5, index + 1, 6, true).formula(`=SUM(E3:E${index})`)
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

// 2500 - фулл
// 300 - дроп
// 1100 - доставка
// 2500 - 300 - 1100 = профит (1100)