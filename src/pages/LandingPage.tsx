
import React from 'react';
import { Vortex } from "@/components/ui/vortex";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { Button } from "@/components/ui/button";
import { Rocket, Target, Lightbulb, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FlipCard, FlipCardFront, FlipCardBack } from "@/components/ui/flip-card";
import InteractiveLogo from '@/components/ui/InteractiveLogo';
import { GlareCard } from "@/components/ui/glare-card";

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
    <div className="flex flex-col items-center p-6 h-full">
      <div className="rounded-full bg-accent/20 p-4 mb-4">
        <Icon className="h-8 w-8 text-accent" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-blue-500">{title}</h3>
      <p className="text-gray-300 text-center">{description}</p>
    </div>
  );
};

const LandingPage: React.FC = () => {
  const featureData = [
    {
      icon: Target,
      title: "AI-Powered Target ID",
      description: "Identify promising therapeutic targets with our advanced AI algorithms trained on comprehensive biomedical data.",
      image: "/lovable-uploads/2c766d4e-1d71-4a73-aff2-9bc911deb7d1.png",
      alt: "AI Target Identification Visualization"
    },
    {
      icon: Rocket,
      title: "Novel Molecule Generation",
      description: "Generate and evaluate innovative molecular structures tailored to your specific research needs.",
      image: "/lovable-uploads/403afd8e-7dd8-4ef8-ac9c-c15eac858616.png",
      alt: "Novel Molecule Generation"
    },
    {
      icon: Lightbulb,
      title: "Actionable Insights",
      description: "Receive clear, actionable recommendations supported by evidence-based analysis of complex biological interactions.",
      image: "/lovable-uploads/32dfc21e-69eb-472f-9e8c-daf7ee99cc90.png",
      alt: "Actionable Insights Visualization"
    }
  ];

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
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center items-center px-4">
          {/* Placeholder for full-screen WebGL background component */}
          <div className="container mx-auto text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              {/* Logo animation (fade/scale) to be added via GSAP */}
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
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-blue-200 to-blue-500">
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
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              {/* Button animations (fade/slide + hover) to be added */}
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

            {/* Workflow Cards Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16 px-4"
            >
              <div className="flex flex-wrap justify-center gap-6">
                <div className="w-[320px]">
                  <GlareCard className="flex flex-col items-center justify-center">
                    <img
                      className="h-full w-full absolute inset-0 object-cover"
                      src="/lovable-uploads/d2e4a739-893b-40db-af15-1bc820b91dac.png"
                      alt="Select Disease"
                    />
                  </GlareCard>
                </div>
                <div className="w-[320px]">
                  <GlareCard className="flex flex-col items-center justify-center">
                    <img
                      className="h-full w-full absolute inset-0 object-cover"
                      src="/lovable-uploads/b3800e59-e7f0-43fa-bb62-9f0ef93f50ea.png"
                      alt="Obtain Protein Targets"
                    />
                  </GlareCard>
                </div>
                <div className="w-[320px]">
                  <GlareCard className="flex flex-col items-center justify-center">
                    <img
                      className="h-full w-full absolute inset-0 object-cover"
                      src="/lovable-uploads/faca3d4b-8243-4807-90ff-013bec9139de.png"
                      alt="Potential Therapeutic Molecules"
                    />
                  </GlareCard>
                </div>
                <div className="w-[320px]">
                  <GlareCard className="flex flex-col items-center justify-center">
                    <img
                      className="h-full w-full absolute inset-0 object-cover"
                      src="/lovable-uploads/d805f723-e535-4807-a0fa-5c6a172d34b7.png"
                      alt="Chat with AI Chemist"
                    />
                  </GlareCard>
                </div>
              </div>
            </motion.div>
          </div>
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
                className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-blue-200 to-blue-500"
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
              {featureData.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <FlipCard 
                    className="h-96 rounded-xl shadow-xl bg-white/10 backdrop-blur-lg"
                    flipDirection={index % 2 === 0 ? "horizontal" : "vertical"}
                  >
                    <FlipCardFront className="rounded-xl overflow-hidden bg-black">
                      <img
                        src={feature.image}
                        alt={feature.alt}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                        <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-blue-200 to-blue-500">{feature.title}</h3>
                        <Button 
                          variant="ghost" 
                          className="bg-white/10 hover:bg-white/20 text-white mt-2 w-fit"
                        >
                          Hover to learn more
                        </Button>
                      </div>
                    </FlipCardFront>
                    <FlipCardBack className="rounded-xl p-6 bg-white/5 backdrop-blur-lg">
                      <FeatureCard
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                      />
                    </FlipCardBack>
                  </FlipCard>
                </motion.div>
              ))}
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
              className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-blue-200 to-blue-500"
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
