/*
 * FILENAME list.js
 * PURPOSE  code to allow a user to add the searched for game to their wishlist or cart using discord bot
 * AUTHOR   Cameron Jones, s3551610
 * DATE     April 2017
 * VERSION  1.0
 */
 
// declaration of an object to represent an item in the list
function listItem(uId, uName, wishGame, cartGame)
{
    this.uId = uId;             // Discord user ID
    this.uName = uName;         // Discored user name
    this.wishGame = wishGame;   // boolean - is item a wishlist item?
    this.cartGame = cartGame;   // boolean - is item a cart item?
}
    
    var index = 0;              // pointer to current index of master list
    var list = new Array();     // array of listItems - master list of all objects added to carts/wishlists
 
exports.addToList = function(userMessage, isWish)
{
    var userId = userMessage.author.id;     // Discord user ID
    var userName = userMessage.author.name; // Discord user name
    var gameName = userMessage.search;      // game name to be added to list
    
    // if the item is to be added to a wish list (ie !wish command used)
    if(isWish == true)
    {
        list[index] = new listItem(userId, userName, gameName, null);   // append the listItem to the array
        index++;    // increment index pointer
        
        var wReturnList = "";   // initialise return string
        
        // build list of games for this user that have already been added to wish list
        for(var i = 0; i < list.length; i++)
        {
            if(list[i].uId == userId && list[i].wishGame != null)
            {
                wReturnList = wReturnList + list[i].wishGame + "\n";
            }
        }
        
        // return message
        return gameName + " has been successfully added to your wish list. Your current wish list consists of:" + "\n" + 
            wReturnList;
    }
    
    // item is to be added to cart (ie !cart command used)
    else
    {
        list[index] = new listItem(userId, userName, null, gameName);   // append the listItem to the array
        index++;    // increment index pointer
        
        var gReturnList = "";   // initialise return string
        
        // build list of games for this user that have already been added to cart
        for(var j = 0; j < list.length; j++)
        {
            if(list[j].uId == userId && list[j].cartGame != null)
            {
                gReturnList = gReturnList + list[j].cartGame + "\n";
            }
        }
        
        // return message
        return gameName + " has been successfully added to your cart. Your current cart consists of:" + "\n" + 
            gReturnList;
    }
};