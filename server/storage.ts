import { users, type User, type InsertUser, products, type Product, type InsertProduct, blogPosts, type BlogPost, type InsertBlogPost, orders, type Order, type InsertOrder, addresses, type Address, type InsertAddress, orderItems, type OrderItem, type InsertOrderItem, reviews, type Review, type InsertReview } from "@shared/schema";

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
  
  // Review operations
  getReview(id: number): Promise<Review | undefined>;
  getProductReviews(productId: number): Promise<Review[]>;
  getUserReviews(userId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  updateReview(id: number, data: Partial<InsertReview>): Promise<Review | undefined>;
  deleteReview(id: number): Promise<boolean>;
  markReviewHelpful(id: number): Promise<Review | undefined>;
  
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
  private reviews: Map<number, Review>;
  
  private userId: number;
  private productId: number;
  private blogPostId: number;
  private orderId: number;
  private orderItemId: number;
  private addressId: number;
  private reviewId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.blogPosts = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.addresses = new Map();
    this.reviews = new Map();
    
    this.userId = 1;
    this.productId = 1;
    this.blogPostId = 1;
    this.orderId = 1;
    this.orderItemId = 1;
    this.addressId = 1;
    this.reviewId = 1;
    
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
  
  // Review operations
  async getReview(id: number): Promise<Review | undefined> {
    return this.reviews.get(id);
  }
  
  async getProductReviews(productId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.productId === productId
    );
  }
  
  async getUserReviews(userId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.userId === userId
    );
  }
  
  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.reviewId++;
    const review: Review = {
      ...insertReview,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.reviews.set(id, review);
    
    // Update product rating and review count
    const product = this.products.get(insertReview.productId);
    if (product) {
      // Get all reviews for this product (including the new one)
      const reviews = await this.getProductReviews(insertReview.productId);
      
      // Calculate average rating
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = Math.round((totalRating / reviews.length) * 10) / 10; // Round to 1 decimal
      
      // Update product
      await this.updateProduct(insertReview.productId, {
        rating: averageRating,
        reviewCount: reviews.length
      });
    }
    
    return review;
  }
  
  async updateReview(id: number, data: Partial<InsertReview>): Promise<Review | undefined> {
    const review = this.reviews.get(id);
    if (!review) return undefined;
    
    const updatedReview = {
      ...review,
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    this.reviews.set(id, updatedReview);
    
    // If rating changed, update product rating
    if (data.rating !== undefined) {
      const product = this.products.get(review.productId);
      if (product) {
        const reviews = await this.getProductReviews(review.productId);
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = Math.round((totalRating / reviews.length) * 10) / 10;
        
        await this.updateProduct(review.productId, {
          rating: averageRating
        });
      }
    }
    
    return updatedReview;
  }
  
  async deleteReview(id: number): Promise<boolean> {
    const review = this.reviews.get(id);
    if (!review) return false;
    
    // Remove review
    const result = this.reviews.delete(id);
    
    // Update product rating and review count
    if (result) {
      const product = this.products.get(review.productId);
      if (product) {
        const reviews = await this.getProductReviews(review.productId);
        
        if (reviews.length === 0) {
          // No reviews left
          await this.updateProduct(review.productId, {
            rating: 0,
            reviewCount: 0
          });
        } else {
          // Recalculate average rating
          const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
          const averageRating = Math.round((totalRating / reviews.length) * 10) / 10;
          
          await this.updateProduct(review.productId, {
            rating: averageRating,
            reviewCount: reviews.length
          });
        }
      }
    }
    
    return result;
  }
  
  async markReviewHelpful(id: number): Promise<Review | undefined> {
    const review = this.reviews.get(id);
    if (!review) return undefined;
    
    const updatedReview = {
      ...review,
      helpfulCount: (review.helpfulCount || 0) + 1,
      updatedAt: new Date().toISOString()
    };
    
    this.reviews.set(id, updatedReview);
    return updatedReview;
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

// Database implementation of the IStorage interface
import { desc, eq, and, gte, lte, like, or, sql } from "drizzle-orm";
import { db } from "./db";

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  async updateUser(id: number, data: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }
  
  async deleteUser(id: number): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id));
    return result.rowCount > 0;
  }
  
  // Product operations
  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }
  
  async getProducts(filters?: { category?: string, collection?: string, minPrice?: number, maxPrice?: number }): Promise<Product[]> {
    let query = db.select().from(products);
    
    if (filters) {
      const conditions = [];
      
      if (filters.category) {
        conditions.push(eq(products.category, filters.category));
      }
      
      if (filters.collection) {
        conditions.push(eq(products.collection, filters.collection));
      }
      
      if (filters.minPrice !== undefined) {
        conditions.push(gte(products.price, filters.minPrice));
      }
      
      if (filters.maxPrice !== undefined) {
        conditions.push(lte(products.price, filters.maxPrice));
      }
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }
    
    return await query;
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(or(eq(products.isNew, true), eq(products.isTrending, true)));
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }
  
  async updateProduct(id: number, data: Partial<InsertProduct>): Promise<Product | undefined> {
    const [product] = await db
      .update(products)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return product || undefined;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return result.rowCount > 0;
  }
  
  // Review operations
  async getReview(id: number): Promise<Review | undefined> {
    const [review] = await db.select().from(reviews).where(eq(reviews.id, id));
    return review || undefined;
  }
  
  async getProductReviews(productId: number): Promise<Review[]> {
    return await db
      .select()
      .from(reviews)
      .where(eq(reviews.productId, productId))
      .orderBy(desc(reviews.createdAt));
  }
  
  async getUserReviews(userId: number): Promise<Review[]> {
    return await db
      .select()
      .from(reviews)
      .where(eq(reviews.userId, userId))
      .orderBy(desc(reviews.createdAt));
  }
  
  async createReview(insertReview: InsertReview): Promise<Review> {
    const [review] = await db.insert(reviews).values(insertReview).returning();
    
    // Update product rating and review count
    await this.updateProductRatingAndCount(insertReview.productId);
    
    return review;
  }
  
  async updateReview(id: number, data: Partial<InsertReview>): Promise<Review | undefined> {
    const [review] = await db
      .update(reviews)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(reviews.id, id))
      .returning();
      
    if (review && data.rating !== undefined) {
      // If rating changed, update product rating
      await this.updateProductRatingAndCount(review.productId);
    }
    
    return review || undefined;
  }
  
  async deleteReview(id: number): Promise<boolean> {
    // Get review first to find the productId
    const [review] = await db.select().from(reviews).where(eq(reviews.id, id));
    if (!review) return false;
    
    const result = await db.delete(reviews).where(eq(reviews.id, id));
    const success = result.rowCount > 0;
    
    if (success) {
      // Update product rating and count
      await this.updateProductRatingAndCount(review.productId);
    }
    
    return success;
  }
  
  async markReviewHelpful(id: number): Promise<Review | undefined> {
    const [review] = await db
      .update(reviews)
      .set({ 
        helpfulCount: sql`${reviews.helpfulCount} + 1`,
        updatedAt: new Date() 
      })
      .where(eq(reviews.id, id))
      .returning();
    
    return review || undefined;
  }
  
  // Helper method to update product rating and count
  private async updateProductRatingAndCount(productId: number): Promise<void> {
    // Get all reviews for the product
    const productReviews = await this.getProductReviews(productId);
    
    if (productReviews.length === 0) {
      // No reviews, reset rating and count
      await db
        .update(products)
        .set({ 
          rating: 0,
          reviewCount: 0,
          updatedAt: new Date()
        })
        .where(eq(products.id, productId));
    } else {
      // Calculate average rating
      const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = Math.round((totalRating / productReviews.length) * 10) / 10;
      
      // Update product
      await db
        .update(products)
        .set({ 
          rating: averageRating,
          reviewCount: productReviews.length,
          updatedAt: new Date()
        })
        .where(eq(products.id, productId));
    }
  }
  
  // Blog post operations
  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }
  
  async getBlogPosts(category?: string): Promise<BlogPost[]> {
    let query = db.select().from(blogPosts);
    
    if (category) {
      query = query.where(eq(blogPosts.category, category));
    }
    
    return await query;
  }
  
  async getFeaturedBlogPosts(limit: number): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.publishDate))
      .limit(limit);
  }
  
  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values(insertPost).returning();
    return post;
  }
  
  async updateBlogPost(id: number, data: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [post] = await db
      .update(blogPosts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
      
    return post || undefined;
  }
  
  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return result.rowCount > 0;
  }
  
  // Order operations
  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || undefined;
  }
  
  async getUserOrders(userId: number): Promise<Order[]> {
    return await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt));
  }
  
  async createOrder(insertOrder: InsertOrder, items: InsertOrderItem[]): Promise<Order> {
    const [order] = await db.insert(orders).values(insertOrder).returning();
    
    // Insert order items
    for (const item of items) {
      await db.insert(orderItems).values({
        ...item,
        orderId: order.id
      });
    }
    
    return order;
  }
  
  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const [order] = await db
      .update(orders)
      .set({ 
        status: status as Order["status"],
        updatedAt: new Date() 
      })
      .where(eq(orders.id, id))
      .returning();
      
    return order || undefined;
  }
  
  // Address operations
  async getUserAddresses(userId: number): Promise<Address[]> {
    return await db
      .select()
      .from(addresses)
      .where(eq(addresses.userId, userId));
  }
  
  async createAddress(insertAddress: InsertAddress): Promise<Address> {
    const [address] = await db.insert(addresses).values(insertAddress).returning();
    return address;
  }
  
  async updateAddress(id: number, data: Partial<InsertAddress>): Promise<Address | undefined> {
    const [address] = await db
      .update(addresses)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(addresses.id, id))
      .returning();
      
    return address || undefined;
  }
  
  async deleteAddress(id: number): Promise<boolean> {
    const result = await db.delete(addresses).where(eq(addresses.id, id));
    return result.rowCount > 0;
  }
}

// Use the database implementation
export const storage = new DatabaseStorage();
