type DrawLineProps = Draw 
  
  export const drawLine = ({ prevPoint, currentPoint, ctx }: DrawLineProps) => {
    const {x:currx,y:curry}=currentPoint
    const lineColor='#000'
    const lineWidth=5
    let startPoint=prevPoint?? currentPoint
    ctx.beginPath()
    ctx.lineWidth=lineWidth
    ctx.strokeStyle=lineColor
    ctx.moveTo(startPoint.x,startPoint.y)
    ctx.lineTo(currx,curry)
    ctx.stroke()
    ctx.fillStyle=lineColor
    ctx.arc(startPoint.x,startPoint.y,2,0,2*Math.PI)
    ctx.fill()
  }