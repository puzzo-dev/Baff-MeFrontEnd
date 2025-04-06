import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useCartStore } from '@/store/cart';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    // Payment info
    cardName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  });
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'paypal'>('credit_card');
  const [processing, setProcessing] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNextStep = () => {
    if (step === 1) {
      // Validate shipping info
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.address1 || !formData.city || !formData.state || !formData.postalCode) {
        toast({
          title: "Missing information",
          description: "Please fill out all required fields",
          variant: "destructive"
        });
        return;
      }
    }
    
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };
  
  const handlePrevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'credit_card') {
      // Validate payment info
      if (!formData.cardName || !formData.cardNumber || !formData.expMonth || !formData.expYear || !formData.cvv) {
        toast({
          title: "Missing payment information",
          description: "Please fill out all required payment fields",
          variant: "destructive"
        });
        return;
      }
    }
    
    try {
      setProcessing(true);
      
      // This would be replaced with an actual API call in production
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Order successfully placed
      clearCart();
      
      // Redirect to confirmation
      setLocation('/checkout/success?order=BM-10043');
    } catch (error) {
      console.error('Error placing order', error);
      toast({
        title: "Order failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };
  
  // If no items in cart, redirect to cart page
  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Checkout | Baff-Me</title>
        </Helmet>
        
        <div className="py-16 md:py-24 bg-white dark:bg-[#111111]">
          <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <i className="bx bx-shopping-bag text-5xl text-gray-300 mb-4"></i>
            <h1 className="text-2xl font-orbitron font-bold mb-4 text-[#111111] dark:text-white">
              Your bag is empty
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Add some items to your bag before proceeding to checkout.
            </p>
            <Link href="/products">
              <a className="bg-primary hover:bg-opacity-90 text-white px-8 py-3 rounded-md font-medium transition duration-200">
                CONTINUE SHOPPING
              </a>
            </Link>
          </div>
        </div>
      </>
    );
  }
  
  // Order success view (would normally be a separate route)
  if (useLocation()[0].includes('/checkout/success')) {
    const params = new URLSearchParams(useLocation()[0].split('?')[1]);
    const orderNumber = params.get('order') || 'BM-10043';
    
    return (
      <>
        <Helmet>
          <title>Order Confirmed | Baff-Me</title>
        </Helmet>
        
        <div className="py-16 md:py-24 bg-white dark:bg-[#111111]">
          <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <i className="bx bx-check text-3xl"></i>
            </div>
            <h1 className="text-2xl font-orbitron font-bold mb-4 text-[#111111] dark:text-white">
              Order Confirmed
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Thank you for your purchase!
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Your order number is <span className="font-medium text-[#111111] dark:text-white">{orderNumber}</span>
            </p>
            <div className="bg-gray-50 dark:bg-[#222222] p-6 rounded-lg mb-8 text-left">
              <h2 className="font-medium mb-4 text-[#111111] dark:text-white">What happens next?</h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <i className="bx bx-envelope text-primary mt-1 mr-2"></i>
                  <span>You'll receive an order confirmation email shortly</span>
                </li>
                <li className="flex items-start">
                  <i className="bx bx-package text-primary mt-1 mr-2"></i>
                  <span>We'll notify you when your items have shipped</span>
                </li>
                <li className="flex items-start">
                  <i className="bx bx-user text-primary mt-1 mr-2"></i>
                  <span>Track your order anytime in your account dashboard</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <a className="bg-primary hover:bg-opacity-90 text-white px-6 py-3 rounded-md font-medium transition duration-200">
                  CONTINUE SHOPPING
                </a>
              </Link>
              <Link href="/account?tab=orders">
                <a className="border border-[#111111] dark:border-white text-[#111111] dark:text-white px-6 py-3 rounded-md font-medium hover:bg-gray-50 dark:hover:bg-[#222222] transition duration-200">
                  VIEW ORDER
                </a>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Checkout | Baff-Me</title>
      </Helmet>
      
      <div className="py-16 md:py-24 bg-white dark:bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-orbitron font-bold mb-8 text-[#111111] dark:text-white">
            CHECKOUT
          </h1>
          
          {/* Checkout Steps */}
          <div className="mb-10">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'} flex items-center justify-center text-white font-medium text-sm`}>
                1
              </div>
              <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
              <div className={`w-8 h-8 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'} flex items-center justify-center text-white font-medium text-sm`}>
                2
              </div>
              <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
              <div className={`w-8 h-8 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'} flex items-center justify-center text-white font-medium text-sm`}>
                3
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400 px-1">
              <span>Shipping</span>
              <span>Payment</span>
              <span>Review</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Checkout Form */}
            <div className="lg:col-span-2">
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step 1: Shipping Information */}
                {step === 1 && (
                  <div className="bg-white dark:bg-[#222222] p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-medium mb-6 text-[#111111] dark:text-white">
                      Shipping Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#333333] px-3 py-2 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#333333] px-3 py-2 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#333333] px-3 py-2 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#333333] px-3 py-2 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="address1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address Line 1 *
                      </label>
                      <input
                        type="text"
                        id="address1"
                        name="address1"
                        value={formData.address1}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#333333] px-3 py-2 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="address2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        id="address2"
                        name="address2"
                        value={formData.address2}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#333333] px-3 py-2 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#333333] px-3 py-2 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          State/Province *
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#333333] px-3 py-2 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#333333] px-3 py-2 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Country *
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#333333] px-3 py-2 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                          <option value="Japan">Japan</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <input
                        type="checkbox"
                        id="sameAsBilling"
                        checked={sameAsBilling}
                        onChange={() => setSameAsBilling(!sameAsBilling)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="sameAsBilling" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Billing address same as shipping
                      </label>
                    </div>
                    
                    <div className="flex justify-between">
                      <Link href="/cart">
                        <a className="text-[#111111] dark:text-white hover:text-primary dark:hover:text-primary transition duration-150 flex items-center">
                          <i className="bx bx-arrow-back mr-1"></i> Back to cart
                        </a>
                      </Link>
                      <Button onClick={handleNextStep}>
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Payment Information */}
                {step === 2 && (
                  <div className="bg-white dark:bg-[#222222] p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-medium mb-6 text-[#111111] dark:text-white">
                      Payment Method
                    </h2>
                    
                    <div className="mb-6">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div 
                          className={`border rounded-lg p-4 flex items-center cursor-pointer ${paymentMethod === 'credit_card' ? 'border-primary' : 'border-gray-300 dark:border-gray-600'}`}
                          onClick={() => setPaymentMethod('credit_card')}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'credit_card' ? 'border-primary' : 'border-gray-400'}`}>
                            {paymentMethod === 'credit_card' && (
                              <div className="w-3 h-3 rounded-full bg-primary"></div>
                            )}
                          </div>
                          <div className="ml-3">
                            <span className="block font-medium text-[#111111] dark:text-white">Credit Card</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">All major cards accepted</span>
                          </div>
                          <div className="ml-auto flex items-center space-x-2">
                            <i className="bx bxl-visa text-blue-600 text-2xl"></i>
                            <i className="bx bxl-mastercard text-red-600 text-2xl"></i>
                            <i className="bx bxl-paypal text-blue-500 text-2xl"></i>
                          </div>
                        </div>
                        
                        <div 
                          className={`border rounded-lg p-4 flex items-center cursor-pointer ${paymentMethod === 'paypal' ? 'border-primary' : 'border-gray-300 dark:border-gray-600'}`}
                          onClick={() => setPaymentMethod('paypal')}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'paypal' ? 'border-primary' : 'border-gray-400'}`}>
                            {paymentMethod === 'paypal' && (
                              <div className="w-3 h-3 rounded-full bg-primary"></div>
                            )}
                          </div>
                          <div className="ml-3">
                            <span className="block font-medium text-[#111111] dark:text-white">PayPal</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Pay with your PayPal account</span>
                          </div>
                          <div className="ml-auto">
                            <i className="bx bxl-paypal text-blue-500 text-3xl"></i>
                          </div>
                        </div>
                      </div>
                      
                      {paymentMethod === 'credit_card' && (
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Name on Card *
                            </label>
                            <input
                              type="text"
                              id="cardName"
                              name="cardName"
                              value={formData.cardName}
                              onChange={handleInputChange}
                              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#333333] px-3 py-2 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                              placeholder="John Doe"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Card Number *
                            </label>
                            <input
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#333333] px-3 py-2 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label htmlFor="expMonth" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Exp. Month *
                              </label>
                              <select
                                id="expMonth"
                                name="expMonth"
                                value={formData.expMonth}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#333333] px-3 py-2 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                              >
                                <option value="">Month</option>
                                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                  <option key={month} value={month.toString().padStart(2, '0')}>
                                    {month.toString().padStart(2, '0')}
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label htmlFor="expYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Exp. Year *
                              </label>
                              <select
                                id="expYear"
                                name="expYear"
                                value={formData.expYear}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#333333] px-3 py-2 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                              >
                                <option value="">Year</option>
                                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                CVV *
                              </label>
                              <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#333333] px-3 py-2 text-[#111111] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="123"
                                maxLength={4}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {paymentMethod === 'paypal' && (
                        <div className="mt-4 text-center">
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            You will be redirected to PayPal to complete your payment securely.
                          </p>
                          <div className="flex justify-center">
                            <i className="bx bxl-paypal text-blue-500 text-6xl"></i>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={handlePrevStep}>
                        Back
                      </Button>
                      <Button onClick={handleNextStep}>
                        Review Order
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Order Review */}
                {step === 3 && (
                  <div className="bg-white dark:bg-[#222222] p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-medium mb-6 text-[#111111] dark:text-white">
                      Review Order
                    </h2>
                    
                    <div className="mb-6">
                      <h3 className="font-medium text-[#111111] dark:text-white mb-2">Shipping Information</h3>
                      <div className="bg-gray-50 dark:bg-[#333333] p-4 rounded-lg mb-4">
                        <p className="text-[#111111] dark:text-white">
                          {formData.firstName} {formData.lastName}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">{formData.address1}</p>
                        {formData.address2 && <p className="text-gray-600 dark:text-gray-300">{formData.address2}</p>}
                        <p className="text-gray-600 dark:text-gray-300">
                          {formData.city}, {formData.state} {formData.postalCode}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">{formData.country}</p>
                        <p className="text-gray-600 dark:text-gray-300">{formData.phone}</p>
                        <p className="text-gray-600 dark:text-gray-300">{formData.email}</p>
                      </div>
                      
                      <h3 className="font-medium text-[#111111] dark:text-white mb-2">Payment Method</h3>
                      <div className="bg-gray-50 dark:bg-[#333333] p-4 rounded-lg mb-4">
                        {paymentMethod === 'credit_card' ? (
                          <div className="flex items-center">
                            <i className="bx bxs-credit-card text-primary mr-2"></i>
                            <div>
                              <p className="text-[#111111] dark:text-white">Credit Card</p>
                              <p className="text-gray-600 dark:text-gray-300">
                                **** **** **** {formData.cardNumber.slice(-4)}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <i className="bx bxl-paypal text-blue-500 text-xl mr-2"></i>
                            <p className="text-[#111111] dark:text-white">PayPal</p>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="font-medium text-[#111111] dark:text-white mb-2">Order Items</h3>
                      <div className="bg-gray-50 dark:bg-[#333333] p-4 rounded-lg">
                        {items.map((item) => (
                          <div key={item.id} className="flex py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-4 flex flex-1 flex-col">
                              <div className="flex justify-between text-base font-medium text-[#111111] dark:text-white">
                                <h3>{item.name}</h3>
                                <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Size: {item.size} | {item.color}
                              </p>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500 dark:text-gray-400">Qty {item.quantity}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between mb-8">
                      <Button variant="outline" onClick={handlePrevStep}>
                        Back to Payment
                      </Button>
                      <Button 
                        onClick={handleSubmitOrder} 
                        disabled={processing}
                      >
                        {processing ? 'Processing...' : 'Place Order'}
                      </Button>
                    </div>
                    
                    <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                      By placing your order, you agree to Baff-Me's Terms of Service and Privacy Policy.
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-[#222222] p-6 rounded-lg shadow-sm sticky top-24">
                <h2 className="text-xl font-medium mb-6 text-[#111111] dark:text-white">
                  Order Summary
                </h2>
                
                <div className="max-h-80 overflow-y-auto mb-6 pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div className="flex justify-between text-base font-medium text-[#111111] dark:text-white">
                          <h3 className="text-sm">{item.name}</h3>
                          <p className="ml-1 text-sm">${item.price.toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Size: {item.size} | {item.color}
                        </p>
                        <div className="flex flex-1 items-end justify-between text-xs">
                          <p className="text-gray-500 dark:text-gray-400">Qty {item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between text-[#111111] dark:text-white">
                    <span>Subtotal</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#111111] dark:text-white">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-[#111111] dark:text-white">
                    <span>Tax</span>
                    <span>${(getTotalPrice() * 0.07).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-[#111111] dark:text-white border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                    <span>Total</span>
                    <span>${(getTotalPrice() + getTotalPrice() * 0.07).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white dark:bg-[#222222] px-2 text-sm text-gray-500 dark:text-gray-400">
                        Or
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link href="/products">
                      <a className="flex items-center justify-center text-sm font-medium text-primary hover:text-primary/80">
                        <i className="bx bx-arrow-back mr-2"></i>
                        Continue Shopping
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
