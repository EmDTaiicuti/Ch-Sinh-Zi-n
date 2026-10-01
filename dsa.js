// --- DSA 1: SINGLY LINKED LIST (Quản lý giỏ hàng) ---
class CartNode {
    constructor(item) {
        this.item = item;
        this.quantity = 1;
        this.next = null;
    }
}

class LinkedListCart {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    add(item) {
        let current = this.head;
        // Kiểm tra trùng lặp
        while (current != null) {
            if (current.item.id === item.id) {
                current.quantity++;
                return;
            }
            current = current.next;
        }
        
        // Thêm vào đầu danh sách (O(1))
        let newNode = new CartNode(item);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }

    getTotal() {
        let total = 0;
        let current = this.head;
        while (current != null) {
            total += current.item.price * current.quantity;
            current = current.next;
        }
        return total;
    }

    getHTML() {
        let html = '';
        let current = this.head;
        if (!current) return '<p>Giỏ hàng đang trống.</p>';

        while (current != null) {
            html += `
                <div class="cart-item">
                    <span>${current.item.title} <b>(x${current.quantity})</b></span>
                    <span style="color: red;">${(current.item.price * current.quantity).toLocaleString()}đ</span>
                </div>
            `;
            current = current.next;
        }
        return html;
    }
}

// --- DSA 2: QUICK SORT (Sắp xếp sản phẩm theo giá) ---
function quickSort(arr, ascending = true) {
    if (arr.length <= 1) return arr;
    
    let pivot = arr[arr.length - 1];
    let left = [];
    let right = [];
    
    for (let i = 0; i < arr.length - 1; i++) {
        let condition = ascending ? (arr[i].price < pivot.price) : (arr[i].price > pivot.price);
        if (condition) left.push(arr[i]);
        else right.push(arr[i]);
    }
    
    return [...quickSort(left, ascending), pivot, ...quickSort(right, ascending)];
}
