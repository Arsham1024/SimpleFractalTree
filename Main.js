var tree = [];
var leaves = [];
var count = 0;

var falling = false;

function setup(){
   createCanvas(400,400);
   initiate();
}


//This function will initiate a new tree and set the root to one.
function initiate(){
   var a = createVector(width/2, height);
   var b = createVector(width/2, height-100);
   var root = new Branch(a, b);
   
   tree[0] = root;
}

//Capturing the click event. P5 built in function.
function mousePressed(){
   for (let i = tree.length-1; i>=0; i--) {
      if (!tree[i].finished){
         tree.push(tree[i].branchL());
         tree.push(tree[i].branchR());
         tree[i].finished = true; 
      }
   }

   //Keep track of the clicks
   count++;

   //Every 2 incriments of branches drop make leaves then drop them.
   if(count%2===0){
      for(var i = 0 ; i < tree.length; i++){
         var leaf = tree[i].end.copy();
         leaves.push(leaf);
      }
   }

   //This condition will reset the tree again to initial state.
   if(count >= 10){
      //reset the tree.
      tree.splice(1,tree.length);
      tree.length = 1;
      count = 0;
      initiate();
   }
}



function draw(){
   background(51);
   for (let i = 0; i < tree.length; i++) {
      tree[i].show();
   }

   //
   for (let i = 0; i < leaves.length; i++) {
      makeLeaves(i);
      if(count%3===0 || falling){
         //This is the action of falling. Could later edit to make it more natural.
         leaves[i].y += random(0,2);
         leaves[i].x += random(0,1/2);
         //flag for falling so that when clicked again the leaves don't stop.
         falling = true;
      }
   }
}

function makeLeaves(index){
   fill(255, 100 , 100, 100);
   noStroke();
   ellipse(leaves[index].x, leaves[index].y, 8, 8);
}