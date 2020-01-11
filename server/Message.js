module.exports = class Message{
    constructor(message, userId, date){
        this.message = message;
        this.userId = userId;
        this.date = date;
    }

    get message(){
        return this.message;
    }

    get userId(){
        return this.userId;
    }

    get date(){
        return this.date;
    }
};