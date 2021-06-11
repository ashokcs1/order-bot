const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    ITEM:   Symbol("item"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sItem = "";
        this.sSize = "";
        this.sToppings = "";
        this.sOthers = "";
        this.sPrice = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.ITEM;
                aReturn.push("Welcome to Richard's Shawarma.");
                aReturn.push("What would you like to order?");
                aReturn.push("1. Pizza");
                aReturn.push("2. Shawarma");
                aReturn.push("3. Sandwich");
                break;
            case OrderState.ITEM:
                this.stateCur = OrderState.SIZE;
                sInput = sInput.toLowerCase();
                switch(sInput){
                    case '1':
                    case 'pizza':
                        this.sItem = 'Pizza';
                        this.sPrice = 20;
                        break;
                    case '2':
                    case 'shawarma':
                        this.sItem = 'Shawarma';
                        this.sPrice = 18;
                        break;
                    case '3':
                    case 'sandwich':
                        this.sItem = 'Sandwich';
                        this.sPrice = 16;
                        break;
                }
                aReturn.push("What size would you like?");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                aReturn.push("What toppings would you like?");
                this.sPrice = this.sPrice * ((sInput.toLowerCase() == 'large') ? 3 :
                                ((sInput.toLowerCase() == 'medium') ? 2 : 1));
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.DRINKS
                this.sToppings = sInput;
                aReturn.push("Would you like with that?");
                aReturn.push("1. Drinks ");
                aReturn.push("2. Beverages");
                aReturn.push("3. Desserts");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    switch(sInput){
                        case '1':
                        case sInput.toLowerCase() == 'drinks':
                            this.sOthers = 'Drinks';
                            this.sPrice = this.sPrice + 4;
                            break;
                        case '2':
                        case sInput.toLowerCase() == 'beverages':
                            this.sOthers = 'Beverages';
                            this.sPrice = this.sPrice + 7;
                            break;
                        case '3':
                        case sInput.toLowerCase() == 'desserts':
                            this.sOthers = 'Desserts';
                            this.sPrice = this.sPrice + 9;
                            break;
                    }
                }

                aReturn.push(`***********************`);
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} size ${this.sItem} with ${this.sToppings}`);
                if(this.sOthers){
                    aReturn.push(`and ${this.sOthers}`);
                }

                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Your order will be ready by: ${d.toTimeString()}`);
                aReturn.push(`Total Order Price: $ ${this.sPrice}`);
                aReturn.push(`***********************`);
                break;
        }

        return aReturn;
    }
}