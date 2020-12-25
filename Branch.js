function Branch(begin, end){
   this.begin = begin;
   this.end = end;
   this.finished = false;


   this.show = function(){
      stroke(255);
      line (this.begin.x , this.begin.y , this.end.x, this.end.y);
   }


   //Right branch set up.
   this.branchR = function(){
      var dir = p5.Vector.sub(this.end, this.begin);
      dir.rotate(PI/6);
      dir.mult(2/3);
      var newEnd = p5.Vector.add(this.end, dir);
      var right = new Branch(this.end, newEnd);
      return right;
   }

   //left branch set up.
   this.branchL = function(){
      var dir = p5.Vector.sub(this.end, this.begin);
      dir.rotate(-PI/4);
      dir.mult(2/3);
      var newEnd = p5.Vector.add(this.end, dir);
      var left = new Branch(this.end, newEnd);
      return left;
   }
}