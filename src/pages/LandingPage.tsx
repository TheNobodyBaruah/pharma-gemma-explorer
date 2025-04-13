
import React from 'react';
import { Vortex } from "@/components/ui/vortex";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { Rocket, Target, Lightbulb, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import InteractiveLogo from '@/components/ui/InteractiveLogo';
import { InteractiveSplineSection } from '@/components/sections/InteractiveSplineSection';

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
      {/* Icon animation (morphing/glow) placeholder */}
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
    <Vortex 
      className="min-h-screen"
      backgroundColor="#0a0a1f"
      baseHue={265}
      rangeHue={40}
      particleCount={800}
      rangeY={150}
      rangeSpeed={1.5}
    >
      <div className="min-h-screen">
        {/* Hero Section - Modified to include Spline section */}
        <section className="relative min-h-screen flex flex-col lg:flex-row justify-center items-center px-4 py-16 gap-8 lg:gap-16">
          <div className="lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <InteractiveLogo
                imageUrl="/lovable-uploads/5ac55eb2-8261-4a9f-bbb6-e464e27929d4.png"
                className="w-full max-w-xl mx-auto mb-8 drop-shadow-[0_0_25px_rgba(137,108,219,0.7)]"
                glowColor={0x9333EA} 
                glowIntensity={1.8}
                glowRadius={0.3}
                baseBrightness={1.1}
                style={{ aspectRatio: '1 / 1' }} 
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                Ignite Your Therapeutic Discovery
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Leverage AI to uncover novel drug targets and molecules faster than ever
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
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

          {/* Spline Section with public demo scene */}
          <motion.div 
            className="w-full max-w-md lg:w-1/2 h-[400px] lg:h-[500px] order-1 lg:order-2 flex items-center justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <InteractiveSplineSection
              // Use a different public Spline scene URL
              sceneUrl="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
              spotlightFill='rgba(180, 210, 255, 0.4)'
              spotlightSize={600}
              className="rounded-lg"
            />
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
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

            {/* Card entrance animations (stagger) to be added via GSAP */}
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
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            {/* CTA text/button animations to be added */}
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
        <footer className="py-8 border-t border-gray-800">
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
    </Vortex>
  );
};

export default LandingPage;
