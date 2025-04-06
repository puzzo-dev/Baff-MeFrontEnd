
'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCartStore } from '@/store/cart'

export function CartMenu({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  const cartItems = [] // TODO: Get from cart store

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-background shadow-xl">
                    <div className="flex items-center justify-between px-4 py-6">
                      <Dialog.Title className="text-lg font-semibold">Shopping Cart</Dialog.Title>
                      <button
                        type="button"
                        className="rounded-md text-foreground hover:text-foreground/80"
                        onClick={() => setIsOpen(false)}
                      >
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto px-4 py-6">
                      {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full">
                          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                          <p className="text-lg font-medium text-muted-foreground">Your cart is empty</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* Cart items will go here */}
                        </div>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
