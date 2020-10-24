import DesignTile from "./DesignTile";
import QuestionCard from "./QuestionCard";
import TravelCard from "./TravelCard";

export default class Dice {

    static elements = 12;
    static cards = 3;
    
    constructor() {

    }

    static roll() {
        let r1 = Math.ceil(Math.random() * Dice.elements);
        let r2 = Math.ceil(Math.random() * Dice.elements);
        return r1 + r2;
    }

    static initialCard() {
        return DesignTile;
    }

    static designCard() {

    }

    static questionCard() {

    }

    static decideCard(card_types) {
        let dice = Dice.roll();
        let part = parseInt((dice / (Dice.elements / Dice.cards)).toFixed(0));
        switch(part) {
            case 0:
            case 3:
                if(card_types.indexOf(DesignTile.CARD_TYPE) !== -1 && card_types.indexOf(QuestionCard.CARD_TYPE) !== -1) {
                    return TravelCard;
                } else if(card_types.indexOf(DesignTile.CARD_TYPE) !== -1) {
                    return QuestionCard;
                }
                return DesignTile;
            case 1:
                if(card_types.indexOf(DesignTile.CARD_TYPE) !== -1 && card_types.indexOf(QuestionCard.CARD_TYPE) !== -1) {
                    return TravelCard;
                } else if(card_types.indexOf(QuestionCard.CARD_TYPE) !== -1) {
                    return DesignTile;
                }
                return QuestionCard;
            case 2:
                return TravelCard;
            default:
                return null;
        }
    }

}