const graphics = {}

graphics.drawPoint = (ctx, loc, color = 'purple', size = 8) => {
    ctx.beginPath() //شروع یک مسیر جدید برای رسم
    ctx.fillStyle = color
    // ...loc: spread loc array to two value
    ctx.arc(...loc) //arc(x, y, radius, startAngle, endAngle, anticlockwise): ctx.arc(100, 100, 50, 0, Math.PI * 2); // رسم دایره کامل
    ctx.fill() // پر کردن داخل مسیر با رنگی که در fillStyle تنظیم شده است.
}

graphics.drawText = (ctx, {text, loc, align = 'center', vAlign = 'middle', size= 10 , color= 'black'})=>{
    ctx.textAlign = align
    ctx.textBaseline = vAlign
    ctx.font = 'bold' + size + 'px Courier'
    ctx.fillStyle = color
    ctx.fillText(text, ...loc)
}

