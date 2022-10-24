module.exports = class Repository {
    constructor() {
        this.index = 0;
        this.data = [];
    }

    create(item) {
        this.index++;
        item.id = this.index;
        this.data.push(item);
        return item;
    }

    read(id = null) {
        if (id === null) {
            return this.data;
        }

        return this.data.find(item => item.id === id);
    }

    update(item){
        const index = this.data.findIndex(i => i.id === item.id);
        this.data[index] = item;
        return item;
    }

    delete(id){
        this.data = this.data.filter(i => i.id !== id);
    }
};