class Food{
    constructor(){
       this.foodStock = database.ref('Food');
       this.lastFed = hour()
       this.image = loadImage(images/Milk.png);
    }

    display(){

        var x=80, y = 100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock!=0){
            for(var i=0; i<this.foodStock; i++){
                if(i%10===0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50)
                x=x+30
            }
        }

    }

    getFoodStock(){
        var foodStock = database.ref('foodStock');
        foodStockRef.on("value",(data)=>{
        foodStock = data.val();
    })

    }

    updateFoodStock(foodStock){
   
            this.foodStock = foodStock

    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
           }

    }

}