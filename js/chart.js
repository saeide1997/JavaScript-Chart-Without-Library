class Chart{
    constructor(container, samples, options){
        this.samples = samples

        this.axesLabels = options.axesLabels
        this.styles = options.styles

        this.canvas = document.createElement("canvas")
        this.canvas.width = options.size
        this.canvas.height = options.size
        this.canvas.style = "background-color: white"

        container.appendChild(this.canvas)

        this.ctx = this.getContext("2d")

        this.margin = options.size*0.1
        this.transparency = 0.5

        this.pixelBounds = this.#getPixelBounds()
        this.dataBounds = this.#getDataBounds()

        this.#draw()
    }

    #getPixelBounds(){
        const {canvas, margin} = this //dont repeat all the time this.canvas&this.margin
        const bounds = {left:margin, right:canvas.width-margin, top:margin, bottom:canvas.height-margin,}
        return bounds
    }

    #getDataBounds(){
        const {samples} = this
        const x = samples.map(s => s.point[0])
        const y = samples.map(s => s.point[1])

        const minX = Math.min(...x)
        const maxX = Math.max(...x)

        const minY = Math.min(...y)
        const maxY = Math.max(...y)

        const bounds = {
            lext: minX,
            right: maxX,
            top: maxY,
            bottom: minY
        }

        return bounds
    }

    #draw(){
        const {ctx, canvas} = this
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.#drawAxes()
        ctx.globalAlpha = this.transparency
        this.#drawSamples()
        ctx.globalAlpha = 1
    }

    #drawSamples(){
        const {ctx, samples, dataBounds, pixelBounds} = this

        for(const sample of samples){
            const {point} = sample
            const pixelLoc = math.remapPoint(dataBounds, pixelBounds, point)
            graphics.drawPoint(ctx, pixelLoc)
        }
    }

    #drawAxes(){
        const {ctx, canvas, axesLabels, margin} = this
        const {left, right, top, bottom} = this.pixelBounds

        graphics.drawText(ctx, {
            text: axesLabels[0],
            loc: [canvas.width/2, bottom+margin/2],
            size: margin * 0.6
        })

        ctx.save()
        ctx.translate(left-margin/2, canvas.height/2)
        ctx.rotate(-Math.PI/2)

        graphics.drawText(ctx,{
            text: axesLabels[1],
            loc: [0, 0],
            size: margin * 0.6
        })

        ctx.restore() //بازیابی وضعیت فعلی context (شامل رنگ‌ها، مسیرها و تغییرات دیگر). این متد برای ایجاد تغییرات موقتی در
        ctx.beginPath()
        ctx.moveTo(left, top)// حرکت به مختصات (x, y) بدون رسم یک خط. این متد برای شروع مسیر خطی از یک نقطه به نقطه دیگر استفاده می‌شود
        ctx.lineTo(left, bottom )//رسم یک خط از موقعیت جاری به مختصات (x, y).
        ctx.lineTo(right, bottom )//رسم یک خط از موقعیت جاری به مختصات (x, y).
        ctx.setLineDash([5,4])//setLineDash([length, gap]) تنظیم خط چین یا الگوی خط برای رسم خطوط. length طول هر خط و gap فاصله بین خطوط را تعیین می‌کند.
        ctx.lineWidth =2
        ctx.strokeStyle = 'lightgray' //تنظیم رنگ خط مرزی (stroke) برای رسم خطوط
        ctx.stroke()
        ctx.setLineDash([])
    }
}