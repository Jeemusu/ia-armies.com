let helpers =  {

    getCardById : function(cards, id) {

        let arr = Object.keys(cards).map(function (key) {
            return cards[key]
        });

        let filtered = arr.filter(function (card) {
            if( parseInt(card.id) == parseInt(id)) {
                return true;
            }
        });

        return filtered[0];
    },

    rando : function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },


}

export default helpers;
