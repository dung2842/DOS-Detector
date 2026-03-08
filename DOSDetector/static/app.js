let running=false
let scanTimer=0
let timerInterval=null
let attackCount=0
let alerts=[]

let maxPoints=30
let maxScanTime=30

const ctx=document.getElementById("trafficChart").getContext("2d")

const chart=new Chart(ctx,{
type:"line",
data:{
labels:[],
datasets:[{
label:"Packets/sec",
data:[],
borderColor:"#38bdf8",
backgroundColor:"rgba(56,189,248,0.2)",
fill:true,
tension:0.4
}]
},
options:{
animation:false,
responsive:true,
scales:{
y:{beginAtZero:true}
}
}
})

function startSystem(){

if(running) return

running=true

timerInterval=setInterval(()=>{

scanTimer++
document.getElementById("timer").innerText=scanTimer

if(scanTimer>=maxScanTime){
stopSystem()
}

},1000)

}

function stopSystem(){

running=false
clearInterval(timerInterval)

}

function clearSystem(){

running=false
scanTimer=0
attackCount=0
alerts=[]

clearInterval(timerInterval)

document.getElementById("timer").innerText=0
document.getElementById("attackCount").innerText=0
document.getElementById("attackType").innerText="None"

chart.data.labels=[]
chart.data.datasets[0].data=[]
chart.update()

updateTable()

}

function changeRange(){

let val=parseInt(document.getElementById("timeRange").value)

maxPoints=val
maxScanTime=val

}

function updateTable(){

const table=document.getElementById("alertTable")
table.innerHTML=""

alerts.forEach(a=>{

table.innerHTML+=`
<tr>
<td>${a.ip}</td>
<td>${a.country}</td>
<td>${a.packets}</td>
<td>${a.time}</td>
</tr>
`

})

}

function randomIP(){

return Math.floor(Math.random()*255)+"."+
Math.floor(Math.random()*255)+"."+
Math.floor(Math.random()*255)+"."+
Math.floor(Math.random()*255)

}

setInterval(()=>{

if(!running) return

let packets=Math.floor(Math.random()*200)

chart.data.labels.push("")
chart.data.datasets[0].data.push(packets)

if(chart.data.labels.length>maxPoints){

chart.data.labels.shift()
chart.data.datasets[0].data.shift()

}

chart.update("none")

if(packets>150){

attackCount++

document.getElementById("attackCount").innerText=attackCount
document.getElementById("attackType").innerText="Possible DoS"

alerts.unshift({

ip:randomIP(),
country:"Unknown",
packets:packets,
time:new Date().toLocaleTimeString()

})

updateTable()

}

},1000)