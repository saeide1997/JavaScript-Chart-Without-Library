const math = {}

math.lerp = (a, b, t)=>{
    return a+(b - a)*t
}

math.formatNumber = (n, dec=0) => {
    return n.toFixed(dec)
}

math.remap = (oA, oB, nA, nB, v)=>{
    return math.lerp(nA, nB, math.invLerp(oA, oB, v))
}

math.invLerp = (a, b, v)=>{
    return(v-a)/(b-a)
}

math.remapPoint = (oldBouds, newBounds, point)=>{
    return [
        math.remap(oldBouds.left, oldBouds.right, newBounds.left, newBounds.right, point[0]),
        math.remap(oldBouds.top, oldBouds.bottom, newBounds.top, newBounds.bottom, point[1])
    ]
}