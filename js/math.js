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