type Draw={
    ctx:CanvasRenderingContext2D
    currentPoint:Pointer
    prevPoint:Point | null
}
type Point={x:number,y:number}