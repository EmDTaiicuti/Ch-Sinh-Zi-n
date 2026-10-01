class MainApp {
    constructor() {
        this.cart = new LinkedListCart();
        
        // Khởi tạo Mock Data 
        this.database = [
            new Product(1, "Áo thể dục UTC2 Size L", 120000, "Đồng phục", "https://via.placeholder.com/300x200?text=Ao+The+Duc", 101),
            new Product(2, "Giáo trình C/C++ Cơ bản", 45000, "Tài liệu học tập", "https://via.placeholder.com/300x200?text=Giao+Trinh+C", 102),
            new Product(3, "Balo chống nước siêu bền", 180000, "Đồ dùng cá nhân", "https://via.placeholder.com/300x200?text=Balo", 103),
            new RoomRental(4, "Phòng trọ hẻm 449 Lê Văn Việt", 1500000, "Q9, TP.HCM", "https://via.placeholder.com/300x200?text=Phong+Tro", 104),
            new Product(5, "Bàn phím cơ cũ (Blue Switch)", 250000, "Điện tử", "https://via.placeholder.com/300x200?text=Ban+Phim", 105)
        ];

        this.currentView = [...this.database];
        this.init();
    }

    init() {
        this.renderProducts(this.currentView);
    }

    renderProducts(items) {
        const container = document.getElementById('product-container');
        container.innerHTML = '';
        items.forEach(item => {
            container.innerHTML += item.renderHTML();
        });
    }

    sortProducts() {
        const option = document.getElementById('sortOption').value;
        if (option === 'priceAsc') {
            this.currentView = quickSort([...this.database], true);
        } else if (option === 'priceDesc') {
            this.currentView = quickSort([...this.database], false);
        } else {
            this.currentView = [...this.database];
        }
        this.renderProducts(this.currentView);
    }

    search() {
        const keyword = document.getElementById('searchInput').value.toLowerCase();
        // Thuật toán tìm kiếm tuyến tính cơ bản
        this.currentView = this.database.filter(item => 
            item.title.toLowerCase().includes(keyword) || 
            (item.category && item.category.toLowerCase().includes(keyword))
        );
        this.renderProducts(this.currentView);
    }

    addToCart(id) {
        const item = this.database.find(p => p.id === id);
        if (item) {
            this.cart.add(item);
            this.updateCartUI();
        }
    }

    updateCartUI() {
        document.getElementById('cart-count').innerText = this.cart.size;
        document.getElementById('cart-items').innerHTML = this.cart.getHTML();
        document.getElementById('cart-total').innerText = this.cart.getTotal().toLocaleString();
    }

    toggleCart() {
        const modal = document.getElementById('cart-modal');
        modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
        this.updateCartUI();
    }

    checkout() {
        if(this.cart.size === 0) {
            alert('Giỏ hàng trống!');
            return;
        }
        alert(`Thanh toán thành công tổng cộng: ${this.cart.getTotal().toLocaleString()}đ`);
        this.cart = new LinkedListCart(); // Reset giỏ hàng
        this.toggleCart();
        this.updateCartUI();
    }
}

// Khởi chạy ứng dụng
const app = new MainApp();
