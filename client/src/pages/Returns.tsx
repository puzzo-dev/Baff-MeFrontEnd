
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

export default function Returns() {
  return (
    <div className="bg-white dark:bg-[#111111] py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 text-[#111111] dark:text-white">
            Returns & Exchanges
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Easy returns within 30 days of delivery.
          </p>
        </motion.div>

        <Accordion type="single" collapsible>
          <AccordionItem value="policy">
            <AccordionTrigger>Return Policy</AccordionTrigger>
            <AccordionContent>
              Items must be unworn with original tags attached. Returns are accepted within 30 days of delivery.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="process">
            <AccordionTrigger>Return Process</AccordionTrigger>
            <AccordionContent>
              1. Initiate return from your account<br/>
              2. Print return label<br/>
              3. Pack items securely<br/>
              4. Drop off at shipping location
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="exchanges">
            <AccordionTrigger>Exchanges</AccordionTrigger>
            <AccordionContent>
              For exchanges, please return the original item and place a new order for the desired item.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
