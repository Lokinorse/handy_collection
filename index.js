class GroupIterator {
    constructor(groupThis){
        this.group = groupThis.group
        this.index = 0
        this.last =  groupThis.group.length-1
    }
    next () {
        if(this.index > this.last) return {done: true}
        this.index = this.index + 1
        return {value: this.group[this.index - 1], done: false}
    }
}

class HandyCollection {
    constructor (unique = false){
        this.group = []
        this.unique = unique
    }
    push(value){
        if(this.unique) {
            if(!this.group.includes(value)) this.group.push(value)
        } else {
            this.group.push(value)
        }
    }
    delete(value){
        this.group = this.group.filter((item) => item !==value)
    }
    has(value){
        return this.group.includes(value)
    }
    static create (arr) {
        const newGroup = new HandyCollection()
        for (let item of arr) newGroup.push(item)
        return newGroup
    }

    map(callback){
        this.group.map((item)=> callback(item))
    }

    [Symbol.iterator] () {
        return new GroupIterator(this)
    };
}



const myArr = new HandyCollection()
myArr.push(1)
myArr.push(1)
console.log(myArr)

myArr.map(item => console.log(item))
