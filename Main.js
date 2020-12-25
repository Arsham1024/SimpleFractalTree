var tree = [];
var leaves = [];
//number of clicks
var count = 0;
//flag falling in order to prevent leaves stopping mid air.
var falling = false;




//This function will initiate a new tree and set the root to one.
function initiate(){
   //begining
   var a = createVector(width/2, height);
   //end
   var b = createVector(width/2, height-100);

   //root needs to always be there.
   //a = begining
   //b = end
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

   //Every 2 incriments of branches make leaves then drop them.
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


//P5 essential function setUp.
function setup(){
   createCanvas(400,400);
   initiate();
}

//P5 essential function to draw.
function draw(){
   
   background(51);

   //looping through the tree array and showing every branch object.
   for (let i = 0; i < tree.length; i++) {
      tree[i].show();
   }

   //looping through leaves array and showing all the leaves.
   for (let i = 0; i < leaves.length; i++) {
      //Here making each leaf and looping through all the branches to place them.
      fill(255, 100 , 100, 100);
      noStroke();
      ellipse(leaves[i].x, leaves[i].y, 8, 8);

      if(count%3===0 || falling){
         //This is the action of falling. Could later edit to make it more natural.
         leaves[i].y += random(0,2);
         leaves[i].x += random(0,1/2);
         //flag for falling so that when clicked again the leaves don't stop.
         falling = true;
      }
   }
}