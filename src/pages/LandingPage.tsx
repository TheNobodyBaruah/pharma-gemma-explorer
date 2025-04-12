
import React from 'react';
import { Vortex } from "@/components/ui/vortex";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { Rocket, Target, Lightbulb, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string 
}) => {
  return (
    <motion.div 
      className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="rounded-full bg-accent/20 p-4 mb-4">
        <Icon className="h-8 w-8 text-accent" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-300 text-center">{description}</p>
    </motion.div>
  );
};

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Vortex 
        className="relative min-h-screen flex flex-col justify-center items-center px-4"
        backgroundColor="#0a0a1f"
        baseHue={265}
        rangeHue={40}
        particleCount={800}
        rangeY={150}
        rangeSpeed={1.5}
      >
        <div className="container mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              TheraSpark: Ignite Your Therapeutic Discovery
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Leverage AI to uncover novel drug targets and molecules faster than ever
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/app">
              <ButtonColorful label="Get Started" />
            </Link>
            <Link to="#features">
              <ButtonColorful 
                label="Learn More" 
                className="bg-transparent border border-white/30" 
              />
            </Link>
          </motion.div>
        </div>
      </Vortex>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-pharma-900 to-pharma-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Accelerate Your Research
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Discover how TheraSpark transforms therapeutic development with AI-powered insights
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Target} 
              title="AI-Powered Target ID" 
              description="Identify promising therapeutic targets with our advanced AI algorithms trained on comprehensive biomedical data."
            />
            <FeatureCard 
              icon={Rocket} 
              title="Novel Molecule Generation" 
              description="Generate and evaluate innovative molecular structures tailored to your specific research needs."
            />
            <FeatureCard 
              icon={Lightbulb} 
              title="Actionable Insights" 
              description="Receive clear, actionable recommendations supported by evidence-based analysis of complex biological interactions."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-pharma-800 to-accent/90">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Ready to Transform Your Research?
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link to="/app">
              <ButtonColorful 
                label="Start Discovering Now" 
                className="text-lg px-8 py-6"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pharma-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} TheraSpark. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
