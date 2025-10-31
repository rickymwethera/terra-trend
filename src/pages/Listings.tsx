import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import ListingCard from '@/components/ListingCard';
import { Loader2 } from 'lucide-react';

interface Listing {
  id: string;
  title: string;
  description: string;
  price_per_night: number;
  location: string;
  image_url: string;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  amenities?: string[];
}

const Listings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setListings(data);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Discover Amazing Places
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse through our curated collection of beautiful properties
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No listings available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;
