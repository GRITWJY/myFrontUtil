class BinarySearchTree {
	constructor() {
		this.root = null
	}

	Node(key) {
		return {
			key,
			left: null,
			right: null
		}
	}

	insert(key) {
		// 1、根据key创建节点
		let newNode = this.Node(key)

		// 2、
		if (this.root == null) {
			this.root = newNode
		} else {
			this.insertNode(this.root, newNode)
		}
	}

	insertNode(node, newNode) {
		if (newNode.key < node.key) { // 左
			if (node.left == null) {
				node.left = newNode
			} else {
				// 原来有节点，需要把这个子节点取出来
				this.insertNode(node.left, newNode)
			}
		} else {
			if (node.right == null) {
				node.right = newNode
			} else {
				// 原来有节点，需要把这个子节点取出来
				this.insertNode(node.right, newNode)
			}
		}
	}
}


