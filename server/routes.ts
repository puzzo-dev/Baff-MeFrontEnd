import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { featuredProducts, products, getFilteredProducts, getRelatedProducts, getFeaturedJournalPosts, journalPosts, getJournalPostBySlug } from "../client/src/lib/data";
import { z } from "zod";
import { insertProductSchema, insertBlogPostSchema, insertOrderSchema, insertUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Product routes
  app.get("/api/products", (req, res) => {
    try {
      const { category, collection, minPrice, maxPrice, sortBy } = req.query;
      
      // Apply filters
      const filteredProducts = getFilteredProducts(
        category as string || undefined,
        collection as string || undefined,
        minPrice && maxPrice ? [Number(minPrice), Number(maxPrice)] : undefined,
        sortBy as string || undefined
      );
      
      res.json(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/featured", (req, res) => {
    try {
      res.json(featuredProducts);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });

  app.get("/api/products/featured/spotlight", (req, res) => {
    try {
      // Return the first featured product as spotlight product
      res.json(featuredProducts[3]); // Quantum Tech Jacket
    } catch (error) {
      console.error("Error fetching spotlight product:", error);
      res.status(500).json({ message: "Failed to fetch spotlight product" });
    }
  });

  app.get("/api/products/:id", (req, res) => {
    try {
      const { id } = req.params;
      const product = products.find(p => p.id === id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      console.error("Error fetching product details:", error);
      res.status(500).json({ message: "Failed to fetch product details" });
    }
  });

  app.get("/api/products/related/:id", (req, res) => {
    try {
      const { id } = req.params;
      const relatedProducts = getRelatedProducts(id);
      res.json(relatedProducts);
    } catch (error) {
      console.error("Error fetching related products:", error);
      res.status(500).json({ message: "Failed to fetch related products" });
    }
  });

  // Journal routes
  app.get("/api/journal/featured", (req, res) => {
    try {
      const featuredPosts = getFeaturedJournalPosts();
      res.json(featuredPosts);
    } catch (error) {
      console.error("Error fetching featured journal posts:", error);
      res.status(500).json({ message: "Failed to fetch featured journal posts" });
    }
  });

  app.get("/api/journal", (req, res) => {
    try {
      const { category } = req.query;
      
      let posts = journalPosts;
      if (category && category !== 'all') {
        posts = posts.filter(post => post.category === category);
      }
      
      res.json(posts);
    } catch (error) {
      console.error("Error fetching journal posts:", error);
      res.status(500).json({ message: "Failed to fetch journal posts" });
    }
  });

  app.get("/api/journal/:slug", (req, res) => {
    try {
      const { slug } = req.params;
      const post = getJournalPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Journal post not found" });
      }
      
      res.json(post);
    } catch (error) {
      console.error("Error fetching journal post:", error);
      res.status(500).json({ message: "Failed to fetch journal post" });
    }
  });

  // User routes
  app.post("/api/users/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(validatedData);
      res.status(201).json({ id: user.id, username: user.username });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  app.post("/api/users/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) { // In production, use proper password hashing!
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({ id: user.id, username: user.username });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Newsletter subscription route
  app.post("/api/newsletter/subscribe", (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      
      // In a real implementation, store email in database
      // For now, just acknowledge receipt
      res.status(200).json({ message: "Subscription successful" });
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // Order routes
  app.post("/api/orders", (req, res) => {
    try {
      // Validate order data using the schema
      const validatedData = insertOrderSchema.parse(req.body);
      
      // In a real implementation, store the order in the database
      // For now, just generate a mock order ID and return it
      res.status(201).json({ 
        id: "BM-" + Math.floor(10000 + Math.random() * 90000), 
        status: "pending",
        message: "Order placed successfully"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
