

let x = new Array(9);

for (let i = 0; i < 9; i++) {
  x[i] = new Array(9);
  for (let j = 0; j < 9; j++) {
    x[i][j] = -1;
  }
}

let count=0;
for (let i = 0; i < 9; i+=3) {
  for (let j = 0; j < 9; j+=3) {
    count++;
    for(let a=i;a<i+3;a++){
      for(let b=j;b<j+3;b++){
    if(count%2==0){
      let xp = document.getElementById(a.toString() + b.toString());
      xp.style.backgroundColor="#c8ebf9";
    }
  }
}
  }
}
function magic(cur) {
  let g = calpos(cur);
  if (g === null) return null;
  if(!g)return null;
  let v1=0, v2=0, mn = 10;
var cg=0;
  for (let a = 0; a < 9; a++) {
    for (let b = 0; b < 9; b++) {
      if (g[a][b]?.length > 0) {
        cg=1;
        if (mn > g[a][b].length) {
          mn = Math.min(g[a][b].length, mn);
          v1 = a;
          v2 = b;
        }
      }
    }
  }
  if(cg==0)return cur;
  if(!g[v1][v2])return null;
  for (let e of g[v1][v2]) {
    let nw = [...cur.map(row => [...row])];
    nw[v1][v2] = e;
    let po = magic(nw);
    if (po !== null) {
      return po;
    }
  }
  return null;
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

function calpos(xxp) {
  let pos = new Array(9);
  for (let i = 0; i < 9; i++) pos[i] = new Array(9);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (xxp[i][j] > 0) continue;
      pos[i][j] = [];
      re=[];
      for(let p=1;p<=9;p++){
        re.push(p);
      }
      shuffleArray(re);
      re.forEach(p => {
        if (valid(xxp, i, j, p)) {
          pos[i][j].push(p);
        }
      });
      if (pos[i][j].length === 0) return null;
    }
  }
  return pos;
}

function valid(xxp, i, j, val) {
  let p = i % 3;
  let q = j % 3;
  for (let a = 0; a < 3; a++) {
    for (let b = 0; b < 3; b++) {
      if (a === p && b === q) {
        continue;
      }
      let row = 3 * Math.floor(i / 3) + a;
      let column = 3 * Math.floor(j / 3) + b;
      if (xxp[row][column] === val) return false;
    }
  }
  for (let a = 0; a < 9; a++) {
    if (a !== i) {
      if (xxp[a][j] === val) return false;
    }
  }
  for (let a = 0; a < 9; a++) {
    if (a !== j) {
      if (xxp[i][a] === val) return false;
    }
  }
  return true;
}

function fill() {
  console.time();

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          x[i][j] = -1;
        }
    }
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let xp = document.getElementById(i.toString() + j.toString());
      if (xp) {
        x[i][j] = Number.parseInt(xp.value);
        if(x[i][j]>9||x[i][j]<=0||!valid(x,i,j,x[i][j])){
            alert("please fill value appropriate");
            return;
        }
      }
    }
  }
  ew=magic(x);
  if(!ew){
    alert("NOT POSSIBLE TO SOLVE");
    return
  }
  addnumbers(ew);
console.timeEnd();

}


function addnumbers(ew){
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if(ew[i][j]<=0)continue;
      let xp = document.getElementById(i.toString() + j.toString());
      xp.value=ew[i][j];
    }
  }
}

function clrr() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          x[i][j] = -1;
        }
    }
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let xp = document.getElementById(i.toString() + j.toString());
      xp.value="";
    }
  }
}

function gen() {
  clrr();
  cur=magic(x);
  const minValue = 80;
  const maxValue = 120;
  const rd = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  let count=0;
  while(count<rd){
    count++;
    const p = Math.floor(Math.random() * (9));
    const q = Math.floor(Math.random() * (9));
    cur[p][q]=-1;
  }
  addnumbers(cur);

}
