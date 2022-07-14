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
    constructor (options){
        this.group = []
        this.unique = options.unique
        this.isArray = options.isArray
        this.options = options
    }
    push(value){
        if(this.unique) {
            if(!this.group.includes(value)) this.group.push(value)
        } else {
            this.group.push(value)
        }
    }
    setGroup(arr){
        this.group = arr
    }
    delete(value){
        this.group = this.group.filter((item) => item !==value)
    }
    has(value){
        return this.group.includes(value)
    }
    get size(){
        return this.group.length
    }

    filter(callbackOrPredicate) {
        const isCallback = typeof callbackOrPredicate === 'function'
        const copyCollection = new HandyCollection(this.options)
        if(this.isArray){
            const filteredCollection = this.group.filter(isCallback ? callbackOrPredicate : (item) => item !== callbackOrPredicate)
            copyCollection.setGroup(filteredCollection)
        } else {
            const filteredCollection = []
            this.group.forEach((obj) => {
                if((Object.keys(obj)[0] === Object.keys(callbackOrPredicate)[0]) &&  obj[Object.keys(obj)[0]] == callbackOrPredicate[Object.keys(callbackOrPredicate)[0]]){
                    return
                } else {
                    filteredCollection.push(obj)
                    copyCollection.setGroup(filteredCollection)
                }
            })
        }
        return copyCollection
    }

    static create (collection, options={unique:false}) {
        const isArray = Array.isArray(collection)
        const newGroup = new HandyCollection({...options, isArray})
        if(isArray){
            for (let item of collection) newGroup.push(item)
        } else {
            Object.keys(collection).map(key => {
                newGroup.push({[key]: collection[key]})
            })
        }
        return newGroup
    }

    map(callback){
        this.group.map((item)=> callback(item))
    }

    [Symbol.iterator] () {
        return new GroupIterator(this)
    };
}

const newArr = HandyCollection.create({a: 1, b:2})
const test = newArr.filter()
console.log('test', test)