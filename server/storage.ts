import { users, type User, type InsertUser, products, type Product, type InsertProduct, blogPosts, type BlogPost, type InsertBlogPost, orders, type Order, type InsertOrder, addresses, type Address, type InsertAddress, orderItems, type OrderItem, type InsertOrderItem } from "@shared/schema";

// Storage interface with CRUD operations for all entities
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, data: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;
  
  // Product operations
  getProduct(id: number): Promise<Product | undefined>;
  getProducts(filters?: { category?: string, collection?: string, minPrice?: number, maxPrice?: number }): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, data: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Blog post operations
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPosts(category?: string): Promise<BlogPost[]>;
  getFeaturedBlogPosts(limit: number): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, data: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  
  // Order operations
  getOrder(id: number): Promise<Order | undefined>;
  getUserOrders(userId: number): Promise<Order[]>;
  createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  
  // Address operations
  getUserAddresses(userId: number): Promise<Address[]>;
  createAddress(address: InsertAddress): Promise<Address>;
  updateAddress(id: number, data: Partial<InsertAddress>): Promise<Address | undefined>;
  deleteAddress(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private blogPosts: Map<number, BlogPost>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem[]>;
  private addresses: Map<number, Address>;
  
  private userId: number;
  private productId: number;
  private blogPostId: number;
  private orderId: number;
  private orderItemId: number;
  private addressId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.blogPosts = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.addresses = new Map();
    
    this.userId = 1;
    this.productId = 1;
    this.blogPostId = 1;
    this.orderId = 1;
    this.orderItemId = 1;
    this.addressId = 1;
    
    // Initialize with sample user
    this.createUser({
      username: "demo",
      password: "password123", // In real app, this would be hashed
      email: "demo@example.com"
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, data: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { 
      ...user, 
      ...data, 
      updatedAt: new Date().toISOString() 
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async deleteUser(id: number): Promise<boolean> {
    return this.users.delete(id);
  }
  
  // Product operations
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProducts(filters?: { category?: string, collection?: string, minPrice?: number, maxPrice?: number }): Promise<Product[]> {
    let result = Array.from(this.products.values());
    
    if (filters) {
      if (filters.category) {
        result = result.filter(product => product.category === filters.category);
      }
      
      if (filters.collection) {
        result = result.filter(product => product.collection === filters.collection);
      }
      
      if (filters.minPrice !== undefined) {
        result = result.filter(product => product.price >= filters.minPrice!);
      }
      
      if (filters.maxPrice !== undefined) {
        result = result.filter(product => product.price <= filters.maxPrice!);
      }
    }
    
    return result;
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => 
      product.isNew || product.isTrending
    );
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const product: Product = { 
      ...insertProduct, 
      id, 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString() 
    };
    
    this.products.set(id, product);
    return product;
  }
  
  async updateProduct(id: number, data: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updatedProduct = { 
      ...product, 
      ...data, 
      updatedAt: new Date().toISOString() 
    };
    
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }
  
  // Blog post operations
  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug,
    );
  }
  
  async getBlogPosts(category?: string): Promise<BlogPost[]> {
    let posts = Array.from(this.blogPosts.values());
    
    if (category) {
      posts = posts.filter(post => post.category === category);
    }
    
    return posts;
  }
  
  async getFeaturedBlogPosts(limit: number): Promise<BlogPost[]> {
    const posts = Array.from(this.blogPosts.values());
    // Sort by publish date to get the most recent
    posts.sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
    
    return posts.slice(0, limit);
  }
  
  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogPostId++;
    const post: BlogPost = { 
      ...insertPost, 
      id, 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString() 
    };
    
    this.blogPosts.set(id, post);
    return post;
  }
  
  async updateBlogPost(id: number, data: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const post = this.blogPosts.get(id);
    if (!post) return undefined;
    
    const updatedPost = { 
      ...post, 
      ...data, 
      updatedAt: new Date().toISOString() 
    };
    
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }
  
  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }
  
  // Order operations
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async getUserOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId,
    );
  }
  
  async createOrder(insertOrder: InsertOrder, items: InsertOrderItem[]): Promise<Order> {
    const id = this.orderId++;
    const order: Order = { 
      ...insertOrder, 
      id, 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString() 
    };
    
    this.orders.set(id, order);
    
    // Store order items
    const orderItems: OrderItem[] = items.map((item) => ({
      ...item,
      id: this.orderItemId++,
      orderId: id,
    }));
    
    this.orderItems.set(id, orderItems);
    return order;
  }
  
  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder = { 
      ...order, 
      status: status as Order["status"], 
      updatedAt: new Date().toISOString() 
    };
    
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }
  
  // Address operations
  async getUserAddresses(userId: number): Promise<Address[]> {
    return Array.from(this.addresses.values()).filter(
      (address) => address.userId === userId,
    );
  }
  
  async createAddress(insertAddress: InsertAddress): Promise<Address> {
    const id = this.addressId++;
    const address: Address = { 
      ...insertAddress, 
      id, 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString() 
    };
    
    this.addresses.set(id, address);
    return address;
  }
  
  async updateAddress(id: number, data: Partial<InsertAddress>): Promise<Address | undefined> {
    const address = this.addresses.get(id);
    if (!address) return undefined;
    
    const updatedAddress = { 
      ...address, 
      ...data, 
      updatedAt: new Date().toISOString() 
    };
    
    this.addresses.set(id, updatedAddress);
    return updatedAddress;
  }
  
  async deleteAddress(id: number): Promise<boolean> {
    return this.addresses.delete(id);
  }
}

export const storage = new MemStorage();
