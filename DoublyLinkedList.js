    
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
    
    indexOf(searchE, fromIndex = 0) {
        let travel = this.sentinel.next
        for(let i=0; i<fromIndex; ++i)
            travel = travel.next
        for(let i=fromIndex; travel != this.sentinel; travel = travel.next, ++i)
            if(travel.data == searchE)
                return i
        return -1
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
