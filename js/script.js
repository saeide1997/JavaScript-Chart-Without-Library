const N = 1000

const samples = []

for (let i = 1; i <= N; i++) {
    const type = Math.random() < 0.5 ? "basic" : "sport"
    const km = math.lerp(3000, 300000, Math.random())
    // const t = math.invLerp(3000, 300000, km)
    const price = math.remap(3000, 300000, 9000, 900, km) + math.lerp(-2000, 2000, Math.random())

    samples.push({
        id: i,
        label: type,
        point: [km, price]
    })
}

const header = dataTable.createTHead()
const tr = header.insertRow()

tr.insertCell().innerHTML = "Id"
tr.insertCell().innerHTML = "Type"
tr.insertCell().innerHTML = "Km"
tr.insertCell().innerHTML = "Price"

const body = dataTable.createTBody()

for (const sample of samples) {
    const tr = body.insertRow()
    tr.insertCell().innerHTML = sample.id
    tr.insertCell().innerHTML = sample.label
    tr.insertCell().innerHTML = math.formatNumber(sample.point[0])
    tr.insertCell().innerHTML = math.formatNumber(sample.point[1])
}