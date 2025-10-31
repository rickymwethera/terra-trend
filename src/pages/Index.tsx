import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Shield, Heart } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-background py-24 pt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center pl-3">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Discover Your Perfect Stay
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book unique homes and experiences around the world with StayScape
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pr-5">
              <Link to="/listings">
                <Button size="lg" className="text-lg group">
                  Explore Listings
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="text-lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Why Choose StayScape?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Prime Locations</h3>
              <p className="text-muted-foreground">
                Handpicked properties in the most sought-after destinations worldwide
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Secure Booking</h3>
              <p className="text-muted-foreground">
                Book with confidence knowing your reservation is protected and verified
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Curated Experiences</h3>
              <p className="text-muted-foreground">
                Each property is carefully selected to ensure exceptional quality and comfort
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
