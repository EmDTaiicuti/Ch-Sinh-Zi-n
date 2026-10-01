// Lớp cơ sở (Base Class)
class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

// Lớp Sinh viên đóng vai trò Người mua/Người bán
class Student extends User {
    constructor(id, name, email, studentId) {
        super(id, name, email);
        this.studentId = studentId;
        this.listedItems = [];
    }
    
    postItem(item) {
        this.listedItems.push(item);
    }
}

// Lớp cơ sở cho các mặt hàng
class Item {
    constructor(id, title, price, sellerId) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.sellerId = sellerId;
    }
    renderHTML() { throw new Error("Method renderHTML() must be implemented"); }
}

// Kế thừa cho Sản phẩm vật lý
class Product extends Item {
    constructor(id, title, price, category, imageUrl, sellerId) {
        super(id, title, price, sellerId);
        this.category = category;
        this.imageUrl = imageUrl;
    }

    renderHTML() {
        return `
            <div class="card">
                <img src="${this.imageUrl}" alt="${this.title}">
                <div class="card-info">
                    <h4>${this.title}</h4>
                    <span style="font-size: 0.8rem; color: #666;">${this.category}</span>
                    <p class="price">${this.price.toLocaleString()} đ</p>
                    <button class="add-to-cart" onclick="app.addToCart(${this.id})">Thêm vào giỏ</button>
                </div>
            </div>
        `;
    }
}

// Kế thừa cho Phòng trọ (giao diện khác biệt một chút)
class RoomRental extends Item {
    constructor(id, title, price, address, imageUrl, sellerId) {
        super(id, title, price, sellerId);
        this.address = address;
        this.imageUrl = imageUrl;
    }

    renderHTML() {
        return `
            <div class="card" style="border: 2px solid #0056A3;">
                <img src="${this.imageUrl}" alt="${this.title}">
                <div class="card-info">
                    <h4>[Phòng trọ] ${this.title}</h4>
                    <span style="font-size: 0.8rem; color: #666;">📍 ${this.address}</span>
                    <p class="price">${this.price.toLocaleString()} đ/tháng</p>
                    <button class="add-to-cart" onclick="alert('Đã gửi yêu cầu liên hệ chủ trọ!')">Liên hệ ngay</button>
                </div>
            </div>
        `;
    }
}
