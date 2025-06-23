let sh,r,c,sl,numAgents,bkcc,bkc,pal,pg={wX:700,wY:1e3,wR:.7,pd:2,ble:30},bord={minX:pg.ble,minY:pg.ble,maxX:pg.wX-pg.ble,maxY:pg.wY-pg.ble},agents=[],acc=[],ft={},snapshot=!1;
function genFeatures(){
  // Store initial values to ensure consistency
  const e = fxrand();
  const t = fxrand();
  const ori = fxrand();
  const oriCheck = fxrand();
  const dotCheck = fxrand();
  const smoothCheck = fxrand();
  const superSize = fxrand();
  const agentNum = fxrand();
  const glitch = fxrand();
  const sFlat = fxrand();
  const pal = fxrand();
  const n = fxrand();
  
  // Use stored values consistently
  ft.horiStep = 1;
  ft.rot = e < .86 || e > .95 ? 4 : 8;
  ft.ori = ori < .1 ? oriCheck < .5 ? .8 : .2 : .5;
  ft.dotThresh = dotCheck < .2 || 4 == ft.rot && 40 == getCom() ? .4 : .15;
  ft.smooth = !(smoothCheck < .96 || smoothCheck > .99);
  ft.superSize = superSize;
  ft.agentNum = agentNum;
  ft.glitch = glitch;
  ft.sFlat = sFlat < .1 ? 100 : 20;
  ft.pal = pal;
  ft.n = Math.floor(50 * n) + 250;
  
  return getPal();
}

function getF(){return 100==ft.sFlat}

function getPathLength(){return Math.floor((ft.n-250)/8)}

function getRot(){return 4==ft.rot?"Ortho":"Iso"}

function getSmooth(){return ft.smooth}

function getOri(){return.8==ft.ori?"Mostly Y":.2==ft.ori?"Mostly X and Dots":"Mix"}

function getVibration(){return(ft.glitch>.12&&ft.glitch<.16||1==getSuperSize())&&4==ft.rot}

function getSuperSize(){return ft.superSize>.12&&ft.superSize<.13}

function setRandom(){
  randomSeed(window.initialSeed);
  // Also reset fxrand to the same seed for consistency
  window.setFxSeed(window.initialSeed);  
}

function getCom(){return ft.agentNum<.03&&ft.agentNum>.01&&4==ft.rot?8:ft.agentNum<.07&&ft.agentNum>.01&&4==ft.rot?60:ft.agentNum<.8&&ft.agentNum>.01&&4==ft.rot?30:40}

function getPal(){return ft.pal<.18?"🔴 🟠 / 🔵 / 🟢":ft.pal<.3?"🔴 🟠 / 🔵 / 🟢 🟠":ft.pal<.44?"🔵 / 🔵 / 🔴":ft.pal<.52?"🔴 / 🔵 / 🟢":ft.pal<.58?"🔵 / 🔴 / 🟢":ft.pal<.72?"🔵 / 🟢 / 🔴":ft.pal<.78?"🔴 / 🟠 / ⚫":ft.pal<.88?"🟢 🟠":ft.pal<.95?"🔴 🟠 ⚪ ⚫":"🔵 🟠 🟣 ⚫"}function setupCanvas(){sh=createGraphics(pg.wX,pg.wY,P2D),pg.dY=windowWidth<windowHeight*pg.wR?windowWidth/pg.wR:windowHeight,pg.dX=pg.dY*pg.wR,sh.pixelDensity(pixelDensity())}function updateImageSize(){pg.dY=windowWidth<windowHeight*pg.wR?windowWidth/pg.wR:windowHeight,pg.dX=pg.dY*pg.wR}function createAgents(e){for(let e=0;e<numAgents;e++){let t=createVector(r(pg.ble,pg.wX-pg.ble),r(pg.ble,pg.wY-pg.ble)),n=createVector(r(-1,1),r(-1,1));agents[e]=new Trail(t,n,e,acc[e])}}function collectAgents(e){for(let t=0;t<e;t++)for(let e=0;e<numAgents;e++)agents[e].run(agents,t)}function clean(){for(let e=0;e<agents.length;e++)agents[e].cleanup()}function drawScanlines(){sl=new Scanline;for(let e=bord.minX;e<bord.maxX;e++)sl.scan(e),sl.drawSL(e)}function extend(){for(let e=0;e<agents.length;e++)agents[e].extendPoints()}function drawEdges(){for(let e=0;e<agents.length;e++)agents[e].drawEdges()}function drawOutline(){for(let e=0;e<agents.length;e++)agents[e].drawOutline()}function back(){let e=red(bkc)+5,t=green(bkc)+5,n=blue(bkc)+5;sh.strokeWeight(1);for(let a=bord.minX;a<bord.maxX;a+=2){let i=r(8,15);sh.stroke(e,t,n,180),sh.line(a,bord.minY,a,bord.maxY),sh.stroke(e-i,t-i,n-i,180),sh.line(a+1,bord.minY,a+1,bord.maxY)}}function setup(){createCanvas(windowWidth,windowHeight,P2D),pixelDensity(2),imageMode(CENTER),r=random,c=concat,setupCanvas(),setRandom(),loadCol(),sh.background(bkc),back(),ImpressionsOfOrder(),console.log("Features:",window.$fxhashFeatures)}function draw(){noLoop(),updateImageSize(),image(sh,width/2,height/2,pg.dX,pg.dY),snapshot||(fxpreview(),snapshot=!0)}function reup(){noLoop(),updateImageSize(),setRandom(),loadCol(),sh.background(bkc),back(),setRandom(),drawEdges(),drawScanlines(),drawOutline(),2==sh.pixelDensity()&&addGrain(10),4==sh.pixelDensity()&&addGrain(20),6==sh.pixelDensity()&&addGrain(30),image(sh,width/2,height/2,pg.dX,pg.dY),console.log("Features:",window.$fxhashFeatures)}function ImpressionsOfOrder(){numAgents=4==ft.rot?getCom():24;
  createAgents(ft.n),collectAgents(ft.n),extend(),clean(),setRandom(),drawEdges(),drawScanlines(),drawOutline(),addGrain(10)}function windowResized(){resizeCanvas(windowWidth,windowHeight)}function addGrain(e){sh.loadPixels();for(let t=0;t<sh.width*sh.pixelDensity()*(sh.height*sh.pixelDensity())*4;t+=4){let n=map(fxrand(),0,1,-e,e);r(1)<.001&&(n*=2),r(1)<.001&&(n*=4),sh.pixels[t]=sh.pixels[t]+n,sh.pixels[t+1]=sh.pixels[t+1]+n,sh.pixels[t+2]=sh.pixels[t+2]+n}sh.updatePixels()}function loadCol(){let e=["#e32057","#f52c4a","#f5072b","#f5074a","#ff3b5f"],t=["#1066a5","#0b4873","#0b3d73","#1066a5","#0b4873","#0b4873","#0b3d73"],n=["#e32057","#ff8737","#e32057","#f52c4a","#f5072b","#f5074a"],a=["#ff7a37","#ff6637","#ff583b","#ff8737"],i=["#266341","#56c498","#56c4ac","#43a892"],o=["#c5c5d1"],r=["#ff9971","#ff6c32","#ff5232","#ff8737","#27488d","#1a3978","#2f2f2f","#b3437f","#952f66","#212121","#c2b5ac","#f7a286","#f7a286","#6d8ac9","#27488d"],l=["#a3b3b3","#d79d7b","#8f9f82","#5a7575","#4f6666","#324e4e","#449e7a","#42ad82","#277556","#27a875","#5c724b","#434750","#434750","#e1b69d","#b2bca9","#ff5232","#ff8737"],s=["#f52c4a","#fd3c37","#c8302c","#881714","#a3aab4","#7d889b","#566272","#464f60","#0d0f0f","#494e57","#434954"];"🔴 / 🔵 / 🟢"==getPal()&&(pal=new Pal(o,[e[0]],!1,t,e,i,[],-50,30,30,15,30,40,10,30,8,20,1,1)),"🔵 / 🔴 / 🟢"==getPal()&&(pal=new Pal(o,[t[0]],!1,e,t,i,[],-50,30,30,15,30,40,10,30,8,20,1,1)),"🔵 / 🟢 / 🔴"==getPal()&&(pal=new Pal(o,[t[0]],!1,i,t,e,[],-60,30,20,35,30,40,10,30,8,30,1,1.1)),"🟢 🟠"==getPal()&&(pal=new Pal(o,[l[3]],!0,[],[],[],l,-120,30,60,25,30,40,10,30,25,35,1,1)),"🔴 / 🟠 / ⚫"==getPal()&&(pal=new Pal(o,[e[0]],!1,e,a,["#413F42"],[],-70,40,30,15,30,40,20,30,8,30,1,1)),"🔴 🟠 ⚪ ⚫"==getPal()&&(pal=new Pal(o,[s[1]],!0,[],[],[],s,-90,30,50,15,30,40,20,30,20,40,1,1)),"🔴 🟠 / 🔵 / 🟢 🟠"==getPal()&&(pal=new Pal(o,[t[0]],!1,n,t,c(c(c(i,a),["#ed8637"]),e[0]),[],-70,30,40,35,30,40,10,20,8,20,1,1)),"🔵 🟠 🟣 ⚫"==getPal()&&(pal=new Pal(o,[r[0]],!0,[],[],[],r,-120,30,45,25,30,40,20,30,20,30,1,1)),"🔴 🟠 / 🔵 / 🟢"==getPal()&&(pal=fxrand()<.5?new Pal(o,[a[0]],!1,t,c(n,e),i,[],-60,30,40,25,30,40,10,20,8,20,1,1):new Pal(o,[e[0]],!1,t,c(e,a),subset(i,1,3),[],-60,30,40,45,30,40,10,20,8,10,1,1)),"🔵 / 🔵 / 🔴"==getPal()&&(pal=fxrand()<.5?new Pal(o,[t[0]],!1,t,t,e,[],-90,40,30,35,30,40,20,30,8,30,1,1):new Pal(o,[t[0]],!1,t,t,e,[],-120,30,40,35,30,40,20,30,8,30,1,1)),bkc=pal.getbk()}function getCol(e){return color(e[floor(r(e.length))])}function keyPressed(){"2"==key&&(sh.pixelDensity(2),pixelDensity(2),reup(),console.log("Resolution = 1400 x 2000 pixels")),"4"==key&&(sh.pixelDensity(4),pixelDensity(4),reup(),console.log("Resolution = 2800 x 4000 pixels")),"6"==key&&(sh.pixelDensity(6),pixelDensity(6),reup(),console.log("Resolution = 4200 x 6000 pixels")),"s"!=key&&"S"!=key||sh.save("Impressions_of_Order.png")}class Pal{constructor(e,t,n,a,i,o,r,l,s,f,g,h,d,c,p,u,w,x,b){this.bk=e,this.bsk=t,this.mix=n,this.verPal=i,this.horPal=a,this.dotPal=o,this.alPal=r,this.denMin=l,this.denMax=s,this.rShift=f,this.bShift=g,this.hminA=h,this.hmaxA=d,this.vmi=u,this.vma=w,this.hmi=c,this.hma=p,this.va=x,this.ha=b}getCol(e){return 0==e&&0==this.mix?color(this.verPal[floor(r(this.verPal.length))]):1==e&&0==this.mix?color(this.horPal[floor(r(this.horPal.length))]):2==e&&0==this.mix?color(this.dotPal[floor(r(this.dotPal.length))]):color(this.alPal[floor(r(this.alPal.length))])}getBSK(){return color(this.bsk[floor(r(this.bsk.length))])}getbk(){return color(this.bk[floor(r(this.bk.length))])}}