class DoublyLinkedList {
    constructor() {
        this.Node = class Node {
            constructor(data, prev, next) {
                this.data = data
                this.prev = prev
                this.next = next
            }
        }
    
        this.sentinel = new this.Node()
        this.sentinel.prev = this.sentinel.next = this.sentinel    
        this.length = 0
    }

    _getNode(index) {
        let node = this.sentinel.next
        for(let i=0; i<index; ++i)
            node = node.next
        return node
    }

    _insert(target, data) {
        let newNode = new this.Node(data, target.prev, target)
        target.prev.next = target.prev = newNode
        ++this.length
    }

    _remove(target) {
        let prevNode = target.prev
        let nextNode = target.next
        target.prev = target.next = null
        nextNode.prev = prevNode
        prevNode.next = nextNode
        --this.length
        return target.data
    }
    
    _checkIndex(index) {
        if(index < 0 || index >= this.length)
            throw "out of index"
    }
    
    _checkIndexAllowedEnd(index) {
        if(index < 0 || index > this.length)
            throw "out of index"
    }

    set(index, data) {
        this._checkIndex(index)
        this._getNode(index).data = data
    }
    
    get(index) {
        this._checkIndex(index)
        return this._getNode(index).data
    }

    push(data) {
        this._insert(this.sentinel, data)
    }

    pop() {
        if(this.length == 0)
            return undefined
    
        return this._remove(this.sentinel.prev)
    }

    unshift(data) {
        this._insert(this.sentinel.next, data)
    }

    shift() {
        if(this.length == 0)
            return undefined
    
        return this._remove(this.sentinel.next)
    }

    insert(index, data) {
        this._checkIndexAllowedEnd(index)
        let target = this._getNode(index)
        this._insert(target, data)
    }

    remove(index) {
        this._checkIndex(index)
        let target = this._getNode(index)
        this._remove(target)
    }

    forEach(func) {
        for(let travel = this.sentinel.next; travel != this.sentinel; travel = travel.next)
            func(travel.data)
    }

    join(separator = ',') {
        let str = ''
        this.forEach(e => str += e + separator)
        return str.substr(0, str.length - separator.length)
    }

    toString() {
        return this.join()
    }

    toArray() {
        let arr = new Array(this.length)
        let i = 0
        this.forEach(e => arr[i++] = e)
        return arr
    }

    static of(...vals) {
        return DoublyLinkedList.from(vals)
    }

    static from(iterable) {
        let list = new DoublyLinkedList()
        for(let e of iterable)
            list.push(e)
        return list
    }

    sort(compFunc) {
        let sorted = DoublyLinkedList.from(this.toArray().sort(compFunc))
        this.sentinel = sorted.sentinel
    }

    map(func) {
        let mapped = new DoublyLinkedList()
        this.forEach(e => mapped.push(func(e)))
        return mapped
    }

    reduce(func, acc) {
        this.forEach(e => acc = func(acc, e))
        return acc
    }

    filter(pred) {
        let filtered = new DoublyLinkedList()
        this.forEach(e => pred(e) && filtered.push(e))
        return filtered
    }

    indexOf(searchData, fromIndex = 0) {
        let travel = this._getNode(fromIndex)
        for(let i=fromIndex; travel != this.sentinel; travel = travel.next, ++i)
            if(travel.data == searchData)
                return i
        return -1
    }
    
    slice(begin, end) {
		this._checkIndex(begin)
		this._checkIndexAllowedEnd(end)		
		if(begin >= end)
			throw "beginIndex must less than endIndex"
		
		let sliced = new DoublyLinkedList()
		let travel = this._getNode(begin)
		for(let i=begin; i < end; travel = travel.next, ++i)
			sliced.push(travel.data)
		return sliced
	}

    [Symbol.iterator]() {    
        return {
            travel: this.sentinel.next,        
            end: this.sentinel,
        
            next: function() {
                if(this.travel == this.end)
                    return { done: true }
            
                let data = this.travel.data
                this.travel = this.travel.next
                return { value: data, done: false }
            }
        }
    }
}
