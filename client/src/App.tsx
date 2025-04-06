import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Account from "@/pages/Account";
import Journal from "@/pages/Journal";
import Checkout from "@/pages/Checkout";
import { useTheme } from "./store/theme";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/cart" component={Cart} />
      <Route path="/account" component={Account} />
      <Route path="/journal" component={Journal} />
      <Route path="/checkout" component={Checkout} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { theme, updateTimeBasedTheme, enableAutoTheme } = useTheme();

  // Initialize and set up time-based theme
  useEffect(() => {
    // Check if we should enable auto theme by default
    const savedAutoTheme = localStorage.getItem('autoTheme');
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // If no preference is saved yet, enable auto theme and consider system preference
    if (savedAutoTheme === null) {
      enableAutoTheme(true);
    }
    
    // Update theme based on time immediately
    updateTimeBasedTheme();
    
    // Set up interval to check time every minute
    const timeInterval = setInterval(() => {
      updateTimeBasedTheme();
    }, 60000); // Check every minute
    
    return () => clearInterval(timeInterval);
  }, [updateTimeBasedTheme, enableAutoTheme]);

  // Apply theme to document
  useEffect(() => {
    // Apply theme class to root HTML element
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router />
      </Layout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
