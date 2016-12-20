class DoublyLinkedList {	
	constructor() {
		this.Node = class Node {
			constructor(data, prev, next) {
				this.data = data
				this.prev = prev
				this.next = next
			}
		}
		
		this.sentinel = new this.Node(-1, null, null)
		this.sentinel.prev = this.sentinel.next = this.sentinel		
		this.length = 0
	}
	
	push(data) {
		let lastNode = this.sentinel.prev
		let newNode = new this.Node(data, lastNode, this.sentinel)
		this.sentinel.prev = lastNode.next = newNode
		++this.length
	}
	
	pop() {
		if(this.length == 0)
			return
		
		let lastNode = this.sentinel.prev
		let prevLastNode = lastNode.prev
		lastNode.prev = lastNode.next = null
		prevLastNode.next = this.sentinel
		this.sentinel.prev = prevLastNode
		--this.length
	}
	
	unshift(data) {
		let firstNode = this.sentinel.next
		let newNode = new this.Node(data, this.sentinel, firstNode)
		this.sentinel.next = firstNode.prev = newNode
		++this.length
	}
	
	shift() {
		if(this.length == 0)
			return
			
		let firstNode = this.sentinel.next
		let secondNode = firstNode.next
		firstNode.prev = firstNode.next = null
		this.sentinel.next = secondNode
		secondNode.prev = this.sentinel
		--this.length
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
		let list = new DoublyLinkedList()
		for(let v of vals)
			list.push(v)
		return list
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
		this.forEach(e => {
			if(pred(e))
				filtered.push(e)
		})
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