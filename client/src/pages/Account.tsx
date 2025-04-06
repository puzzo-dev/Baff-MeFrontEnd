import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <>
      <Helmet>
        <title>My Account | Baff-Me</title>
        <meta name="description" content="Manage your Baff-Me account, view orders, saved items, and profile information." />
      </Helmet>
      
      <div className="py-12 md:py-16 bg-white dark:bg-[#111111]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            className="text-2xl md:text-3xl font-orbitron font-bold mb-8 text-[#111111] dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            MY ACCOUNT
          </motion.h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar (mobile: tabs, desktop: sidebar) */}
            <div className="col-span-1">
              <div className="lg:hidden">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full grid grid-cols-4">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="saved">Saved</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="hidden lg:block space-y-2">
                <Button 
                  variant={activeTab === 'profile' ? 'default' : 'outline'} 
                  onClick={() => setActiveTab('profile')}
                  className="w-full justify-start"
                >
                  <i className="bx bx-user mr-2"></i> Profile
                </Button>
                <Button 
                  variant={activeTab === 'orders' ? 'default' : 'outline'} 
                  onClick={() => setActiveTab('orders')}
                  className="w-full justify-start"
                >
                  <i className="bx bx-package mr-2"></i> Orders
                </Button>
                <Button 
                  variant={activeTab === 'saved' ? 'default' : 'outline'} 
                  onClick={() => setActiveTab('saved')}
                  className="w-full justify-start"
                >
                  <i className="bx bx-heart mr-2"></i> Saved Items
                </Button>
                <Button 
                  variant={activeTab === 'settings' ? 'default' : 'outline'} 
                  onClick={() => setActiveTab('settings')}
                  className="w-full justify-start"
                >
                  <i className="bx bx-cog mr-2"></i> Settings
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-500 hover:text-red-600 mt-8"
                >
                  <i className="bx bx-log-out mr-2"></i> Sign Out
                </Button>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="col-span-1 lg:col-span-3">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-8">
                          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-300 overflow-hidden">
                            <i className="bx bx-user text-4xl"></i>
                          </div>
                          <div>
                            <h2 className="text-xl font-medium text-[#111111] dark:text-white">Alex Morgan</h2>
                            <p className="text-gray-500 dark:text-gray-400">alex.morgan@example.com</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Member since January 2024</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              <i className="bx bx-edit text-xs mr-1"></i> Edit Profile
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium mb-3 text-[#111111] dark:text-white">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">First Name</label>
                                <p className="text-[#111111] dark:text-white">Alex</p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Last Name</label>
                                <p className="text-[#111111] dark:text-white">Morgan</p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</label>
                                <p className="text-[#111111] dark:text-white">alex.morgan@example.com</p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone</label>
                                <p className="text-[#111111] dark:text-white">+1 (555) 123-4567</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium mb-3 text-[#111111] dark:text-white">Addresses</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                <div className="flex justify-between mb-2">
                                  <span className="text-sm font-medium text-[#111111] dark:text-white">Default Shipping</span>
                                  <Button variant="ghost" size="sm" className="h-6 text-xs">Edit</Button>
                                </div>
                                <p className="text-[#111111] dark:text-white">Alex Morgan</p>
                                <p className="text-gray-600 dark:text-gray-300">123 Urban Street</p>
                                <p className="text-gray-600 dark:text-gray-300">Apt 4B</p>
                                <p className="text-gray-600 dark:text-gray-300">New York, NY 10001</p>
                                <p className="text-gray-600 dark:text-gray-300">United States</p>
                                <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                              </div>
                              
                              <div className="border border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center justify-center">
                                <Button variant="ghost">
                                  <i className="bx bx-plus mr-2"></i> Add New Address
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <div>
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-xl font-medium mb-6 text-[#111111] dark:text-white">Order History</h2>
                        
                        <div className="space-y-6">
                          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <div className="flex flex-col sm:flex-row justify-between mb-4">
                              <div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Order #</span>
                                <span className="ml-2 font-medium text-[#111111] dark:text-white">BM-10042</span>
                              </div>
                              <div className="mt-2 sm:mt-0">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Placed on</span>
                                <span className="ml-2 text-[#111111] dark:text-white">March 15, 2024</span>
                              </div>
                              <div className="mt-2 sm:mt-0">
                                <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs py-1 px-2 rounded">
                                  Delivered
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0 w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                                <img 
                                  src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" 
                                  alt="Tech Windbreaker" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-[#111111] dark:text-white">Tech Windbreaker + 2 more items</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total: $289.97</p>
                              </div>
                            </div>
                            
                            <div className="flex justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                              <Button variant="outline" size="sm">
                                View Order
                              </Button>
                              <Button variant="outline" size="sm">
                                Track Package
                              </Button>
                            </div>
                          </div>
                          
                          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <div className="flex flex-col sm:flex-row justify-between mb-4">
                              <div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Order #</span>
                                <span className="ml-2 font-medium text-[#111111] dark:text-white">BM-9874</span>
                              </div>
                              <div className="mt-2 sm:mt-0">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Placed on</span>
                                <span className="ml-2 text-[#111111] dark:text-white">February 28, 2024</span>
                              </div>
                              <div className="mt-2 sm:mt-0">
                                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs py-1 px-2 rounded">
                                  Shipped
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0 w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                                <img 
                                  src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" 
                                  alt="Urban Tech Backpack" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-[#111111] dark:text-white">Urban Tech Backpack</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total: $89.99</p>
                              </div>
                            </div>
                            
                            <div className="flex justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                              <Button variant="outline" size="sm">
                                View Order
                              </Button>
                              <Button variant="outline" size="sm">
                                Track Package
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {/* Saved Items Tab */}
                {activeTab === 'saved' && (
                  <div>
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-xl font-medium mb-6 text-[#111111] dark:text-white">Saved Items</h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="aspect-square relative">
                              <img 
                                src="https://images.unsplash.com/photo-1617952236644-3e3a57884ad5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500" 
                                alt="Quantum Tech Jacket" 
                                className="w-full h-full object-cover"
                              />
                              <button className="absolute top-2 right-2 w-8 h-8 bg-white dark:bg-[#111111] rounded-full flex items-center justify-center text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                                <i className="bx bx-trash"></i>
                              </button>
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium text-[#111111] dark:text-white">Quantum Tech Jacket</h3>
                              <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">$189.99</p>
                              <Button className="w-full">Add to Bag</Button>
                            </div>
                          </div>
                          
                          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="aspect-square relative">
                              <img 
                                src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500" 
                                alt="Tactical Urban Vest" 
                                className="w-full h-full object-cover"
                              />
                              <button className="absolute top-2 right-2 w-8 h-8 bg-white dark:bg-[#111111] rounded-full flex items-center justify-center text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                                <i className="bx bx-trash"></i>
                              </button>
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium text-[#111111] dark:text-white">Tactical Urban Vest</h3>
                              <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">$119.99</p>
                              <Button className="w-full">Add to Bag</Button>
                            </div>
                          </div>
                          
                          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="aspect-square relative">
                              <img 
                                src="https://images.unsplash.com/photo-1597033130343-925cb110d0be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=500" 
                                alt="Neon Accent Sneakers" 
                                className="w-full h-full object-cover"
                              />
                              <button className="absolute top-2 right-2 w-8 h-8 bg-white dark:bg-[#111111] rounded-full flex items-center justify-center text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                                <i className="bx bx-trash"></i>
                              </button>
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium text-[#111111] dark:text-white">Neon Accent Sneakers</h3>
                              <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">$149.99</p>
                              <Button className="w-full">Add to Bag</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div>
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-xl font-medium mb-6 text-[#111111] dark:text-white">Account Settings</h2>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium mb-4 text-[#111111] dark:text-white">Email Preferences</h3>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-[#111111] dark:text-white">New product drops</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about new product releases</p>
                                </div>
                                <div className="form-switch inline-block align-middle">
                                  <input type="checkbox" id="new-products" className="form-check-input" defaultChecked />
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-[#111111] dark:text-white">Exclusive offers</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive special discounts and promotions</p>
                                </div>
                                <div className="form-switch inline-block align-middle">
                                  <input type="checkbox" id="offers" className="form-check-input" defaultChecked />
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-[#111111] dark:text-white">Order updates</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Status notifications for your orders</p>
                                </div>
                                <div className="form-switch inline-block align-middle">
                                  <input type="checkbox" id="order-updates" className="form-check-input" defaultChecked />
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-[#111111] dark:text-white">Style Journal updates</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">New articles and style guides</p>
                                </div>
                                <div className="form-switch inline-block align-middle">
                                  <input type="checkbox" id="journal-updates" className="form-check-input" />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium mb-4 text-[#111111] dark:text-white">Password</h3>
                            <Button variant="outline">
                              Change Password
                            </Button>
                          </div>
                          
                          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium mb-4 text-[#111111] dark:text-white">Danger Zone</h3>
                            <Button variant="destructive">
                              Delete Account
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
