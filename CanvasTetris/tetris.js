

var tetris = function(){
	var field = [];
	for(var i = 0; i<17; i++){
			field[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		};
	var getRandomElement = function(){
	var number = Math.floor((Math.random()*7)+1);
	switch(number){
		case 1: return new BigCubeObject(8,0,ctx,field,"FF0000");
		case 2: return new Tobject(8,0,ctx,field,"FF0000");
		case 3: return new sObject(8,0,ctx,field,"FF0000");
		case 4: return new ZObject(8,0,ctx,field,"FF0000");
		case 5: return new lObject(8,0,ctx,field,"FF0000");
		case 6: return new Lobject(8,0,ctx,field,"FF0000");
		case 7: return new Iobject(8,0,ctx,field,"FF0000");
	}
}
var BigCubeObject = function(xLock,yLock,ctx,field,color){
	this.cubes = [
				new Cube(xLock-1,yLock,ctx,field,color),
				new Cube(xLock-1,yLock+1,ctx,field,color),
				new Cube(xLock,yLock,ctx,field,color),
				new Cube(xLock,yLock+1,ctx,field,color)
		];
	this.field = field;
	this.isOnTheBottom = false;
	this.color = color;
	this.state = 1;
	this.x =xLock;
	this.y = yLock;
	this.state = 1;
	this.moveEvent = function(movement){
		switch(movement){
			case 39:
				this.moveRight();
				break;
			case 37:
				this.moveLeft();
				break;
			case 40:
				this.moveDown();
				break;
		
		}
	
	}
	this.moveDown = function(){
		if(this.canMoveDown()){
			for(var i = this.cubes.length -1;i>=0;i--){
				this.cubes[i].moveDown();
			
			}
		
			this.y++;
			this.isOnTheBottom = !this.canMoveDown();
		}
	
	}
	this.canMoveDown = function(){
	return this.cubes[1].canMoveDown() && this.cubes[3].canMoveDown();
	
	}
	this.draw = function(){
		for(var i = 0; i<this.cubes.length;i++){
			this.cubes[i].draw();
		}
	
	}
	this.moveLeft = function(){
		if(this.canMoveLeft()){
			for(var i =0;i<this.cubes.length;i++){
				this.cubes[i].moveLeft();
			
			}
			this.x--;
		}
	}
	this.canMoveLeft = function(){
		return this.cubes[0].canMoveLeft() && this.cubes[1].canMoveLeft();
	}
	
	this.moveRight = function(){
		if(this.canMoveRight()){
			for(var i =this.cubes.length -1;i>=0;i--){
				this.cubes[i].moveRight();
			} 
		this.x++;
		}
	
	}
	this.canMoveRight = function(){
		return this.cubes[2].canMoveRight() && this.cubes[3].canMoveRight();
	}
}
var Tobject = function(xLock,yLock,ctx,field,color){
	this.cubes = [
				new Cube(xLock,yLock,ctx,field,color),
				new Cube(xLock-1,yLock+1,ctx,field,color),
				new Cube(xLock,yLock+1,ctx,field,color),
				new Cube(xLock+1,yLock+1,ctx,field,color)
		];
	this.field = field;
	this.isOnTheBottom = false;
	this.color = color;
	this.state = 1;
	this.x =xLock;
	this.y = yLock;
	this.state = 1;
	this.moveEvent = function(movement){
		switch(movement){
			case 38:
				this.invertState();
				break;
			case 37:
				this.moveLeft();
				break;
			case 39:
				this.moveRight();
				break;
			case 40:
				this.moveDown();
				break;
		}

	}
	this.moveDown = function(){
		if(this.canMoveDown()){
			switch(this.state){
				case 1:
				case 2:
				case 4:
					for(var i = this.cubes.length-1;i>=0;i--){
						this.cubes[i].moveDown();
					}
					break;
				case 3:
					for(var i = 0; i<this.cubes.length;i++){
						this.cubes[i].moveDown();
					}
					break;
			
			
			}
		
		
			this.y++;
			this.isOnTheBottom = !this.canMoveDown();
		}

	};
	
	this.canMoveDown = function(){
	if(this.state ==1){
		return this.cubes[1].canMoveDown() && this.cubes[2].canMoveDown() && this.cubes[3].canMoveDown();
	}
	if(this.state ==2 || this.state == 4){
		return this.cubes[0].canMoveDown() && this.cubes[3].canMoveDown();
	}
	if(this.state ==3){
		return this.cubes[0].canMoveDown() && this.cubes[1].canMoveDown() && this.cubes[3].canMoveDown();
	}
	
	}
	this.draw = function(){
		for(var i = 0; i<this.cubes.length;i++){
			this.cubes[i].draw();
		}
	}
	
	this.moveRight = function(){
		if(this.canMoveRight()){
			switch(this.state){
				case 1:
				case 2:
				case 3:
				for(var i = this.cubes.length-1;i>=0;i--){
					this.cubes[i].moveRight();
				
				}
				break;
				case 4:
				for(var i =0;i<this.cubes.length;i++){
					this.cubes[i].moveRight();
				}
				
			
			}
			this.x++;
		}
		
	}
	this.canMoveRight = function(){
	if(this.state ==1 || this.state ==3){
		return this.cubes[0].canMoveRight() && this.cubes[3].canMoveRight();
	}
	if(this.state == 2){
		return this.cubes[1].canMoveRight() && this.cubes[2].canMoveRight() && this.cubes[3].canMoveRight();
	}
	if(this.state ==4){
		return this.cubes[0].canMoveRight() && this.cubes[1].canMoveRight() && this.cubes[3].canMoveRight();
	}
	
	
	}
	this.moveLeft = function(){
	if(this.canMoveLeft()){
		switch(this.state){
			case 1:
			case 2:
			case 3:
				for(var i = 0; i<this.cubes.length;i++){
					this.cubes[i].moveLeft();
				}
			break;
			case 4:
				for(var i = this.cubes.length -1; i>=0;i--){
					this.cubes[i].moveLeft();
				}
		
		
		}
		this.x--;
		}	
	}
	this.canMoveLeft = function(){
		if(this.state == 1 || this.state == 3){
			return this.cubes[0].canMoveLeft() && this.cubes[1].canMoveLeft();
		}
		if(this.state == 2){
			return this.cubes[0].canMoveLeft() && this.cubes[1].canMoveLeft() && this.cubes[3].canMoveLeft();
		}
		if(this.state == 4){
			return this.cubes[1].canMoveLeft() && this.cubes[2].canMoveLeft() && this.cubes[3].canMoveLeft();
		}
	
	}
	this.invertState = function(){
		if(this.state==1){
			if(this.cubes[0].canMove(this.x,this.y+2)){
				this.cubes[0].moveXY(this.x-1,this.y+1);
				this.cubes[1].moveXY(this.x,this.y);
				this.cubes[2].moveXY(this.x,this.y+1);
				this.cubes[3].moveXY(this.x,this.y+2);
				this.draw();
				this.state = 2;
				}
			}else if(this.state==2){
				if(this.cubes[1].canMove(this.x-1,this.y) && this.cubes[3].canMove(this.x+1,this.y)){
					
					this.cubes[0].moveXY(this.x,this.y+1);
					this.cubes[1].moveXY(this.x-1,this.y);
					this.cubes[2].moveXY(this.x,this.y);
					this.cubes[3].moveXY(this.x+1,this.y);
					this.draw();
					this.state = 3;
					
				}
			
			}else if(this.state ==3){
				if(this.cubes[0].canMove(this.x+1,this.y+1) && this.cubes[3].canMove(this.x,this.y+2)){
					
					this.cubes[0].moveXY(this.x+1,this.y+1);
					this.cubes[1].moveXY(this.x,this.y);
					this.cubes[2].moveXY(this.x,this.y+1);
					this.cubes[3].moveXY(this.x,this.y+2);
					this.draw();
					this.state = 4;
				}
			
			}else if(this.state == 4){
				if(this.cubes[1].canMove(this.x-1,this.y+1)){
					this.cubes[0].moveXY(this.x,this.y);
					this.cubes[1].moveXY(this.x-1,this.y+1);
					this.cubes[2].moveXY(this.x,this.y+1);
					this.cubes[3].moveXY(this.x+1,this.y+1);
					this.draw();
					this.state = 1;
				
				}
			
			}

		
	}
}

var sObject  = function(xLock,yLock,ctx,field,color){
	this.cubes = [
				new Cube(xLock+1,yLock,ctx,field,color),
				new Cube(xLock,yLock,ctx,field,color),
				new Cube(xLock,yLock+1,ctx,field,color),
				new Cube(xLock-1,yLock+1,ctx,field,color)
		];
	this.field = field;
	this.isOnTheBottom = false;
	this.color = color;
	this.state = 1;
	this.x =xLock;
	this.y = yLock;
	this,state = 1;
	this.moveEvent = function(movement){
		switch(movement){
			case 38:
				this.invertState();
				break;
			case 37:
				this.moveLeft();
				break;
			case 39:
				this.moveRight();
				break;
			case 40:
				this.moveDown();
		}

	};
	this.moveDown = function(){
		if(this.canMoveDown()){
			switch(this.state){
				case 1:
				for(var i = this.cubes.length-1;i>=0;i--){
					this.cubes[i].moveDown();
				}
				this.draw();
				break;
				case 2:
				for(var i = 0;i < this.cubes.length;i++){
					this.cubes[i].moveDown();
				}
				break;
			}
		this.y++;
		this.isOnTheBottom = !this.canMoveDown();
		};

	};
	this.canMoveDown = function(){
		if(this.state==1){
			return this.cubes[0].canMoveDown() && this.cubes[2].canMoveDown() && this.cubes[3].canMoveDown();
		}else if(this.state==2){
			return this.cubes[0].canMoveDown() && this.cubes[2].canMoveDown();
		}
	}
	this.draw = function(){
		for(var i = 0; i<this.cubes.length;i++){
			this.cubes[i].draw();
		}
	}
	this.moveLeft = function(){
		if(this.canMoveLeft()){
			switch(this.state){
				case 1:
				case 2:
				for(var i = this.cubes.length -1; i>=0;i--){
					this.cubes[i].moveLeft();
				}
			}
		this.x--;
		}

	}
	this.canMoveRight = function(){
		if(this.state==1){
			return this.cubes[0].canMoveRight() && this.cubes[2].canMoveRight();
		}else if(this.state ==2){
			return this.cubes[0].canMoveRight() && this.cubes[1].canMoveRight() && this.cubes[3].canMoveRight();
		}
	};
	this.moveRight = function(){
		if(this.canMoveRight()){
			switch(this.state){
				case 1:
				case 2:
					for(var i =0; i < this.cubes.length;i++){
						this.cubes[i].moveRight();
					}
					this.draw();
					break;


			}
			this.x++;
		}

	}
	this.canMoveLeft = function(){
		if(this.state==1){
			return this.cubes[1].canMoveLeft() && this.cubes[3].canMoveLeft();

		}else if(this.state==2){
			return this.cubes[0].canMoveLeft() && this.cubes[2].canMoveLeft() && this.cubes[3].canMoveLeft();
		}

	};

	this.invertState = function(){
		if(this.state==1){
			if(this.cubes[0].canMove(this.x+1,this.y+2) && this.cubes[1].canMove(this.x+1,this.y+1)){
				this.cubes[0].moveXY(this.x+1,this.y+2);
				this.cubes[1].moveXY(this.x+1,this.y+1);
				this.cubes[2].moveXY(this.x,this.y+1);
				this.cubes[3].moveXY(this.x,this.y);
				this.state = 2;
				this.draw();
			}
		}else if(this.state==2){
			if(this.cubes[0].canMove(this.x+1,this.y) && this.cubes[3].canMove(this.x-1,this.y+1)){
				this.cubes[0].moveXY(this.x+1,this.y);
				this.cubes[1].moveXY(this.x,this.y);
				this.cubes[2].moveXY(this.x,this.y+1);
				this.cubes[3].moveXY(this.x-1,this.y+1);
				this.state = 1;
				this.draw();
			};
		};

	};

};
var ZObject  = function(xLock,yLock,ctx,field,color){
	this.cubes = [
				new Cube(xLock-1,yLock,ctx,field,color),
				new Cube(xLock,yLock,ctx,field,color),
				new Cube(xLock,yLock+1,ctx,field,color),
				new Cube(xLock+1,yLock+1,ctx,field,color)
		];
	this.field = field;
	this.isOnTheBottom = false;
	this.color = color;
	this.state = 1;
	this.x =xLock;
	this.y = yLock;
	this,state = 1;
	this.moveEvent = function(movement){
		switch(movement){
			case 38:
				this.invertState();
				break;
			case 37:
				this.moveLeft();
				break;
			case 39:
				this.moveRight();
				break;
			case 40:
				this.moveDown();
		}

	};
	this.moveDown = function(){
		if(this.canMoveDown()){
			switch(this.state){
				case 1:
				for(var i = this.cubes.length-1;i>=0;i--){
					this.cubes[i].moveDown();
				}
				this.draw();
				break;
				case 2:
				for(var i = 0;i < this.cubes.length;i++){
					this.cubes[i].moveDown();
				}
				break;
			}
		this.y++;
		this.isOnTheBottom = !this.canMoveDown();
		};

	};
	this.canMoveDown = function(){
		if(this.state==1){
			return this.cubes[0].canMoveDown() && this.cubes[2].canMoveDown() && this.cubes[3].canMoveDown();
		}else if(this.state==2){
			return this.cubes[0].canMoveDown() && this.cubes[2].canMoveDown();
		}
	}
	this.draw = function(){
		for(var i = 0; i<this.cubes.length;i++){
			this.cubes[i].draw();
		}
	}
	this.moveRight = function(){
		if(this.canMoveRight()){
			switch(this.state){
				case 1:
				case 2:
				for(var i = this.cubes.length -1; i>=0;i--){
					this.cubes[i].moveRight();
				}
			}
		this.x++;
		}

	}
	this.canMoveRight = function(){
		if(this.state==1){
			return this.cubes[3].canMoveRight() && this.cubes[1].canMoveRight();
		}else if(this.state ==2){
			return this.cubes[0].canMoveRight() && this.cubes[2].canMoveRight() && this.cubes[3].canMoveRight();
		}
	}
	this.moveLeft = function(){
		if(this.canMoveLeft()){
			switch(this.state){
				case 1:
				case 2:
					for(var i =0; i < this.cubes.length;i++){
						this.cubes[i].moveLeft();
					}
					this.draw();
					break;


			}
			this.x--;
		}

	}
	this.canMoveLeft = function(){
		if(this.state==1){
			return this.cubes[0].canMoveLeft() && this.cubes[2].canMoveLeft();

		}else if(this.state==2){
			return this.cubes[0].canMoveLeft() && this.cubes[1].canMoveLeft() && this.cubes[3].canMoveLeft();
		}

	};

	this.invertState = function(){
		if(this.state==1){
			if(this.cubes[0].canMove(this.x-1,this.y+2) && this.cubes[1].canMove(this.x-1,this.y+1)){
				this.cubes[0].moveXY(this.x-1,this.y+2);
				this.cubes[1].moveXY(this.x-1,this.y+1);
				this.cubes[2].moveXY(this.x,this.y+1);
				this.cubes[3].moveXY(this.x,this.y);
				this.state = 2;
				this.draw();
			}
		}else if(this.state==2){
			if(this.cubes[0].canMove(this.x-1,this.y) && this.cubes[3].canMove(this.x+1,this.y+1)){
				this.cubes[0].moveXY(this.x-1,this.y);
				this.cubes[1].moveXY(this.x,this.y);
				this.cubes[2].moveXY(this.x,this.y+1);
				this.cubes[3].moveXY(this.x+1,this.y+1);
				this.state = 1;
				this.draw();
			};
		};

	};

};

var lObject = function(xLock,yLock,ctx,field,color){
	this.cubes = [
				new Cube(xLock,yLock,ctx,field,color),
				new Cube(xLock,yLock+1,ctx,field,color),
				new Cube(xLock,yLock+2,ctx,field,color),
				new Cube(xLock-1,yLock+2,ctx,field,color)
		];
	this.field = field;
	this.isOnTheBottom = false;
	this.color = color;
	this.state = 1;
	this.x =xLock;
	this.y = yLock;
	this,state = 1;
	this.moveEvent = function(movement){
		switch(movement){
			case 37:
				this.moveLeft();
				break;
			case 38:
				this.invertState();
				break;
			case 39:
				this.moveRight();
				break;
			case 40:
				this.moveDown();
				break;
		}

	}
	this.moveDown = function(){
		if(this.canMoveDown()){
			switch(this.state){
				case 1:
				case 2:
				for(var i = this.cubes.length-1;i>=0;i--){
					this.cubes[i].moveDown();
				}
				break;
				case 3:
				for(var i =0; i<this.cubes.length;i++){
					this.cubes[i].moveDown();
				}
				break;

			}
			this.isOnTheBottom = !this.canMoveDown();
			this.y++;
		}

	}
	this.moveRight = function(){
		if(this.canMoveRight()){
			switch(this.state){
				case 1:
				for(var i =0; i<this.cubes.length;i++){
					this.cubes[i].moveRight();

				}
				this.draw();
				break;
				case 2:
				case 3:
				for(var i = this.cubes.length-1;i>=0;i--){
					this.cubes[i].moveRight();
				}
				this.draw();
				break;
			}
			this.x++;
		}
	}
	this.moveLeft = function(){
		if(this.canMoveLeft()){
			switch(this.state){
				case 1:
				for(var i = this.cubes.length-1;i>=0;i--){
					this.cubes[i].moveLeft();
				}
				break;
				case 2:
				case 3:
				for(var i = 0; i<this.cubes.length;i++){
					this.cubes[i].moveLeft();
				}
				break;
			}
		this.x--;
		}
	}
	this.canMoveRight = function(){
		if(this.state == 1){
			for(var i = 0; i<this.cubes.length-1;i++){
				if(!this.cubes[i].canMoveRight())
					return false;
			}
		}
		if(this.state==2){

			return (this.cubes[0].canMoveRight() && this.cubes[3].canMoveRight());
		}
		if(this.state ==3){
			return (this.cubes[0].canMoveRight() && this.cubes[1].canMoveRight() && this.cubes[3].canMoveRight());
		}

		
		return true;
	}
	this.canMoveLeft = function(){
		if(this.state == 1){
			return this.cubes[3].canMoveLeft() && this.cubes[1].canMoveLeft() && this.cubes[0].canMoveLeft();
		}
		if(this.state==2){
			return this.cubes[0].canMoveLeft() && this.cubes[1].canMoveLeft();
		}
		if(this.state==3){
			return this.cubes[0].canMoveLeft() && this.cubes[1].canMoveLeft() && this.cubes[2].canMoveLeft();
		}
	}
	this.draw = function(){
		for(var i = 0; i<this.cubes.length;i++){
			this.cubes[i].draw();
		}
	}
	this.canMoveDown = function(){
		if(this.state == 1 ){
			return this.cubes[3].canMoveDown() && this.cubes[2].canMoveDown();
		}
		if(this.state==2){
			for(var i =1; i<this.cubes.length;i++){
				if(!this.cubes[i].canMoveDown()){
					return false;
				}
			}
		}
		if(this.state == 3){
			return this.cubes[3].canMoveDown() && this.cubes[0].canMoveDown();
		}
		return true;
	}
	this.invertState = function(){
		if(this.state==1){
			if(this.cubes[0].canMove(this.x-1,this.y+1) && this.cubes[3].canMove(this.x+2,this.y+2)){
				this.cubes[0].moveXY(this.x-1,this.y+1);
				this.cubes[1].moveXY(this.x-1,this.y+2);
				this.cubes[2].moveXY(this.x,this.y+2);
				this.cubes[3].moveXY(this.x+1,this.y+2);
				this.draw();
				this.state = 2;
			};
		}else if(this.state==2){
			if(this.cubes[2].canMove(this.x-1,this.y) && this.cubes[3].canMove(this.x,this.y)){
				this.cubes[0].moveXY(this.x-1,this.y+2);
				this.cubes[1].moveXY(this.x-1,this.y+1);
				this.cubes[2].moveXY(this.x-1,this.y);
				this.cubes[3].moveXY(this.x,this.y);
				this.state = 3;
				this.draw();
			}
		}else if(this.state==3){
			if(this.cubes[1].canMove(this.x,this.y+1) && this.cubes[2].canMove(this.x,this.y+2)){
				console.log("Invert to 3");
				this.cubes[0].moveXY(this.x,this.y);
				this.cubes[1].moveXY(this.x,this.y+1);
				this.cubes[2].moveXY(this.x,this.y+2);
				this.cubes[3].moveXY(this.x-1,this.y+2);
				this.state = 1;
				this.draw();
			}

		}
	}

};

var Lobject = function(xLock,yLock,ctx,field,color){
	this.cubes = [
				new Cube(xLock,yLock,ctx,field,color),
				new Cube(xLock,yLock+1,ctx,field,color),
				new Cube(xLock,yLock+2,ctx,field,color),
				new Cube(xLock+1,yLock+2,ctx,field,color)
		];
	this.field = field;
	this.isOnTheBottom = false;
	this.color = color;
	this.state = 1;
	this.x =xLock;
	this.y = yLock;
	this,state = 1;
	this.moveEvent = function(movement){
		switch(movement){
			case 38:
				this.invertState();
				break;
			case 37:
				this.moveLeft();
				break;
			case 39:
				this.moveRight();
				break;
			case 40:
				this.moveDown();
				break;


		};

	};
	this.moveRight = function(){
		if(this.canMoveRight()){
			switch(this.state){
				case 1:
				case 2:
				 for(var i = this.cubes.length-1;i>=0;i--){
				 	this.cubes[i].moveRight();
				 }
				 break;
				 case 3:
				 for(var i =0; i<this.cubes.length;i++){
				 	this.cubes[i].moveRight();
				 };
			};
			this.x++;
		};
		

	};
	this.canMoveRight = function(){
		if(this.state==1){
			for(var i =0; i<this.cubes.length;i++){
				if(i!=2 && !this.cubes[i].canMoveRight()){
					return false;
				};
			}
		}
		if(this.state==2){
			return this.cubes[2].canMoveRight() && this.cubes[3].canMoveRight();
		}
		if(this.state == 3){
			for(var i =0; i<this.cubes.length-1;i++){
				if(!this.cubes[i].canMoveRight()){
					return false;
				};
			};
		};
		return true;
	}
	this.moveDown = function(){
		if(this.canMoveDown(this.x,this.y) && !this.isOnTheBottom){
			switch(this.state){
				case 1:
					for(var i =this.cubes.length -1; i>=0;i--){
						this.cubes[i].moveDown();
						};
				break;

				case 2:
				case 3:
					for(var i= 0; i<this.cubes.length;i++){
						this.cubes[i].moveDown();
						}
				break;
			}
			this.y++;
			this.isOnTheBottom = !this.canMoveDown();
			}
		};
	this.moveLeft = function(){
		if(this.canMoveLeft()){
			switch(this.state){
				case 1:
				case 2:
					for(var i =0 ; i < this.cubes.length;i++){
						this.cubes[i].moveLeft();
						this.draw();
					}
					break;
				case 3:
					for(var i = this.cubes.length-1; i>=0;i--){
						this.cubes[i].moveLeft();
						this.draw();
					}
			}
			this.x--;
		}
		
	}
	this.canMoveLeft = function(x,y){
		if(this.state == 1){
			var len = this.cubes.length -2;
			for(var i =0 ; i<len;i++){
				if(!this.cubes[i].canMoveLeft()){
					return false;
				};
			};
		}else if(this.state==2){
			return this.cubes[0].canMoveLeft() && this.cubes[3].canMoveLeft();
		}else if(this.state == 3){
			for(var i = this.cubes.length-1; i>=0; i--){
				if(i!=2 && !this.cubes[i].canMoveLeft()){
					return false;
				}
			}
		};
		return true;

	}
	this.canMoveDown = function(x,y){
		if(this.state ==1){
			return this.cubes[3].canMoveDown() && this.cubes[2].canMoveDown();
			}
		if(this.state == 2){
			return this.cubes[0].canMoveDown() && this.cubes[1].canMoveDown() && this.cubes[2].canMoveDown();

		}
		if(this.state == 3){
			return this.cubes[0].canMoveDown();
			};
		};
	this.draw = function(){
		for(var i = 0; i<this.cubes.length;i++){
			this.cubes[i].draw();
		};

	};
	this.invertState = function(){
		if(this.state == 1){
			if(this.cubes[0].canMove(this.x-1,this.y+2) && this.cubes[3].canMove(this.x+1,this.y+1)){
				this.cubes[0].moveXY(this.x-1,this.y+2);
				this.cubes[1].moveXY(this.x,this.y+2);
				this.cubes[2].moveXY(this.x+1,this.y+2);
				this.cubes[3].moveXY(this.x+1,this.y+1);
				this.state = 2;
				this.draw();
			};

		}else if(this.state ==2){
			if(this.cubes[0].canMove(this.x,this.y+1) && this.cubes[1].canMove(this.x,this.y) && this.cubes[2].canMove(this.x,this.y-1) &&
				this.cubes[3].canMove(this.x-1,this.y-1)){
				this.cubes[0].moveXY(this.x,this.y+1);
				this.cubes[1].moveXY(this.x,this.y);
				this.cubes[2].moveXY(this.x,this.y-1);
				this.cubes[3].moveXY(this.x-1,this.y-1);
				this.state = 3;
			};
		}else if(this.state == 3){
			if(this.cubes[3].canMove(this.x+1,this.y+2)){
				this.cubes[0].moveXY(this.x,this.y);
				this.cubes[1].moveXY(this.x,this.y+1);
				this.cubes[2].moveXY(this.x,this.y+2)
				this.cubes[3].moveXY(this.x+1,this.y+2);
				this.state = 1;
				this.draw();
			};
		}

	};

};
var Iobject = function(xLock,yLock,ctx,field,color){
	this.cubes = [
				 new Cube(xLock, yLock,ctx,field,color),
				 new Cube(xLock, yLock+1,ctx,field,color),
				 new Cube(xLock, yLock+2,ctx,field,color),
				 new Cube(xLock, yLock+3,ctx,field,color)
				 ];
	this.field = field;
	this.isOnTheBottom = false;
	this.color = color;
	this.state = 1;
	this.x = xLock;
	this.y = yLock+3;

	this.moveDown = function(){
		if(!this.isOnTheBottom && this.canMoveDown(this.x,this.y)){
			var length = this.cubes.length -1;
			for(var i = length; i>=0;i--){
				this.cubes[i].moveDown();
				if(this.cubes[i].isOnTheBottom){	
					this.isOnTheBottom = true;
					break;
					};
				};

			this.y++;
			if(!this.canMoveDown(this.x,this.y)){
				this.isOnTheBottom = true;
				};
			};
	};
	this.moveRight = function(){
		if(!this.isOnTheBottom && this.canMoveRight(this.x,this.y)){
			for(var i = this.cubes.length-1;i>=0;i--){
					this.cubes[i].moveRight();
				};
				this.x++;
			}
		
		for(var i = 0; i< this.field.length; i++){
				console.log(this.field[i]);
			}
	}

	this.canMoveDown = function(x,y){
		if(this.state == 1){
			return this.cubes[3].canMove(x,y+1);
		}else if(this.state == 0){
			var length = this.cubes.length-1;
			for(var i = 0; i<length;i++){
				if(!this.cubes[i].canMove(x,y+1)){
					return false;;
				};
			}
			return true;
		}


	};
	this.moveLeft = function(){
		if(!this.isOnTheBottom && this.canMoveLeft(this.x,this.y)){
			var length = this.cubes.length;
			for(var i = 0; i<length;i++){
				this.cubes[i].moveLeft();
			};
			this.x--;
		};

	};
	this.canMoveRight = function(x,y){
		if(this.state == 1){
			for(var i = this.cubes.length-1; i>=0;i--){
				if(!this.cubes[i].canMove(x+1,y)){
					
					return false;
				};
			};
			return true;
		}else if(this.state == 0){
			if(!this.cubes[3].canMove(x+4,y)){
				return false;
			};
			return true;
		};

	};
	this.canMoveLeft = function(x,y){
		if(this.state == 1){
			for(var i = this.cubes.length -1; i>=0; i--){
				if(!this.cubes[i].canMove(x-1,y)){
					return false;
				};
			};
			return true;
		}else if(this.state == 0){
			if(!this.cubes[0].canMove(x-1,y)){
				return false;
			};
			return true;
		};
	};
	this.moveEvent= function(movement){
		switch(movement){	
			case 40:
					this.moveDown();
					break;
			case 38:
					this.invertState();
					break;
			case 39:
					this.moveRight();
					break;
			case 37:
					this.moveLeft();
					break;
			default:
					break;
			};			
		};
	this.invertState = function(){
		if(this.state == 1){
			var length = this.cubes.length;
			for(var i = 1; i<length;i++){
				if(!this.cubes[i].canMove(this.x+i,this.y-3)){
					return;
				};
			}
			for(var i = 0;i<length;i++){
				this.cubes[i].moveXY(this.x + i,this.y-3);
			}
			this.y = this.y-3;
			this.state = 0;
		}else{
			var length = this.cubes.length;
			for(var i = 1 ; i<length;i++){
				if(!this.cubes[i].canMove(this.x,this.y+i)){
					return;
				};
			}
			for(var i = 1; i<length;i++){
				this.cubes[i].moveXY(this.x,this.y+i);
			}
			this.y = this.y +3;
			this.state = 1;
		}
	}

	this.draw = function(){
		for(var i =0; i<this.cubes.length;i++){
			this.cubes[i].draw();
		}

	}


};
		
var Cube = function(xLock,yLock,ctx,field,color){
	this.color = color;
	this.field = field;
	this.size = 20;
	this.ctx = ctx;
	this.x = xLock;
	this.y = yLock;
	this.width = this.size;field
	this.height = this.size;
	this.isOnTheBottom = false;
	
	this.moveXY = function(x,y){
		this.clear();
		this.x = x;
		this.y=	y;
		this.draw();
	}
	this.moveLeft = function(){
			if(!this.isOnTheBottom && this.x!=0 && this.canMove(this.x -1,this.y)){
							
					this.clear();
					this.x --;
					this.draw();
			};
		};
		
	this.moveRight = function(){
			if(!this.isOnTheBottom && this.x !=16 && this.canMove(this.x +1,this.y)){			
					this.clear();
					this.x ++;
					this.draw();
			};
		};
		
	this.moveDown = function(){
			if(!this.isOnTheBottom && this.y!==19 && this.canMove(this.x,this.y +1)){
				this.clear();
				this.y++;
				this.draw();
				}else{
						this.isOnTheBottom = true;
						return false;					
					}
			};
			
	this.moveUp = function(){
		if(this.canMove(this.x,this.y -1)){			
			this.clear();			
			this.y--;
			this.draw();
			};
		};

	this.canMoveDown = function(){
		return this.canMove(this.x,this.y+1);
	};
	this.canMoveRight = function(){
		return this.canMove(this.x+1,this.y) && this.x!=16;
	};
	this.canMoveLeft = function(){
		return this.canMove(this.x -1,this.y) && this.x!=0;
	};

	this.moveEvent= function(movement){
		switch(movement){
			
			case 37:
							this.moveLeft();
							break;
			case 39:
							this.moveRight();
							break;
			case 40:
							this.moveDown();
							break;
						};			
			};
	
	this.canMove = function(x,y){
		console.log(x + ":" + y);
		return this.field[x][y] === 0;
	};

	this.clear = function(){
			ctx.fillStyle="#FFFFFF";
			ctx.fillRect(this.x * 20,this.y *20,this.width,this.height);
			this.field[this.x][this.y] = 0;		
			};
	this.draw = function(){
			ctx.fillStyle=this.color;
			ctx.fillRect(this.x *20 ,this.y *20,this.width,this.height);
			this.field[this.x][this.y] = 1;
		};	
	}
	
	var c =document.getElementById("tetris");
	

		var ctx=c.getContext("2d");
		

		var cube = getRandomElement();
		cube.draw();Tobject
		

		c.onkeydown = function(env){
			var key = env.keyCode;	
			cube.moveEvent(key);	
		};	
	var myTimer = window.setInterval(function(){
	if(cube.isOnTheBottom){
			cube = getRandomElement();
			c.onkeydown = function(env){
			var key = env.keyCode;	
			cube.moveEvent(key);
			};
			cube.draw();
			if(cube.isOnTheBottom){
				alert("You lost!");
			}
	};
	cube.moveDown();
	},1000);
			

};
	
tetris();

