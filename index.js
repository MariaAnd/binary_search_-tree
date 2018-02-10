function Node(key, value) {
    this.key = key;
    this.value = value;

    this.left = null;
    this.right = null;
}

function BinarySearchTree() {
    this._root = new Node();
}

module.exports = {
    BinarySearchTree,

    //WARNING!!!
    //PROVIDE BST STRUCTURE FOR TESTS {STRING}
    root: '_root',
    left: 'left',
    right: 'right',
    //NAME FOR REPORTS
    student: 'ANDREYEVA MARIA'
};

BinarySearchTree.prototype.insert = function (key, value) {
    var node = new Node(key, value);
    if (!this._root.key) {
        this._root = node;
    } else {
        var current = this._root;
        while (current) {
            if (node.key < current.key) {
                if (!current.left) {
                    current.left = node;
                    break;
                }
                current = current.left;
            } else if (node.key > current.key) {
                if (!current.right) {
                    current.right = node;
                    break;
                }
                current = current.right;
            } else {
                break;
            }
        }
    }

    return this;
};

BinarySearchTree.prototype.root = function () {
    return this._root.value;
};

BinarySearchTree.prototype.contains = function (parameter) {
    var current = this._root;
    var key;
    if (typeof parameter === 'string') {
        key = parseInt(parameter.replace('elem', ''), 10);
    } else {
        key = parameter;
    }
    while (current) {
        if (key === current.key) {
            return true;
        }
        if (key < current.key) {
            current = current.left;
        } else {
            current = current.right;
        }
    }
    return false;
};

BinarySearchTree.prototype.search = function (key) {
    var current = this._root;
    while (current) {
        if (key === current.key) {
            return current.value;
        }
        if (key < current.key) {
            current = current.left;
        } else {
            current = current.right;
        }
    }
};

BinarySearchTree.prototype.traverse = function (fn) {
    var current = this._root;
    this.inOrder(current, fn);
};

BinarySearchTree.prototype.inOrder = function (node, fn) {
    if (node) {
        this.inOrder(node.left, fn);
        if (fn) {
            fn(node);
        }
        this.inOrder(node.right, fn);
    }
};

BinarySearchTree.prototype.delete = function (key) {
    var that = this;
    var removeNode = function (node, key) {
        if (!node) {
            return null;
        }
        if (key === node.key) {
            if (!node.left && !node.right) {
                return null;
            }
            if (!node.left) {
                return node.right;
            }
            if (!node.right) {
                return node.left;
            }

            var temp = that.getMin(node.right);
            node.key = temp.key;
            node.value = temp.value;
            node.right = removeNode(node.right, temp.key);
            return node;
        } else if (key < node.key) {
            node.left = removeNode(node.left, key);
            return node;

        } else {
            node.right = removeNode(node.right, key);
            return node;
        }
    };
    this._root = removeNode(this._root, key);


    return that;
};

BinarySearchTree.prototype.getMin = function (node) {
    if (!node) {
        node = this._root;
    }
    while (node.left) {
        node = node.left;

    }
    return node;
};

BinarySearchTree.prototype.traverse = function (sort) {
    var result = [];
    function order(root) {
        if (root.left) {
            order(root.left);
        }
        result.push(root.value);

        if (root.right) {
            order(root.right);
        }
    }
    order(this._root);
    return sort ? result : result.reverse();
};

BinarySearchTree.prototype.verify = function () {
    function isValid(node) {
        if (!node) {
            return true;
        }
        return !(node.right !== null && node.right.key < node.key
            || node.left !== null && node.left.key > node.key
            || !isValid(node.left) || !isValid(node.right));
    }

    return isValid(this._root);
};