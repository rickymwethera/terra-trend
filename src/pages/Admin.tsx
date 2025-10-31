import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Plus, Loader2 } from 'lucide-react';

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
  amenities: string[];
}

const Admin = () => {
  const { isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price_per_night: '',
    location: '',
    image_url: '',
    bedrooms: '1',
    bathrooms: '1',
    max_guests: '2',
    amenities: '',
  });

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/');
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchListings();
    }
  }, [isAdmin]);

  const fetchListings = async () => {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setListings(data);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const amenitiesArray = formData.amenities
      .split(',')
      .map((a) => a.trim())
      .filter((a) => a.length > 0);

    const { error } = await supabase.from('listings').insert([
      {
        title: formData.title,
        description: formData.description,
        price_per_night: parseFloat(formData.price_per_night),
        location: formData.location,
        image_url: formData.image_url,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        max_guests: parseInt(formData.max_guests),
        amenities: amenitiesArray,
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to create listing',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Listing created successfully',
      });
      setFormData({
        title: '',
        description: '',
        price_per_night: '',
        location: '',
        image_url: '',
        bedrooms: '1',
        bathrooms: '1',
        max_guests: '2',
        amenities: '',
      });
      fetchListings();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('listings').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete listing',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Listing deleted successfully',
      });
      fetchListings();
    }
  };

  if (authLoading || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Admin Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Listing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per Night ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price_per_night}
                      onChange={(e) => setFormData({ ...formData, price_per_night: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      min="1"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      min="1"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max_guests">Max Guests</Label>
                    <Input
                      id="max_guests"
                      type="number"
                      min="1"
                      value={formData.max_guests}
                      onChange={(e) => setFormData({ ...formData, max_guests: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amenities">Amenities (comma-separated)</Label>
                  <Input
                    id="amenities"
                    value={formData.amenities}
                    onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                    placeholder="WiFi, Pool, Parking"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Listing
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Listings</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : listings.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No listings yet</p>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {listings.map((listing) => (
                    <div
                      key={listing.id}
                      className="flex items-center gap-4 p-4 border border-border rounded-lg"
                    >
                      <img
                        src={listing.image_url}
                        alt={listing.title}
                        className="h-16 w-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{listing.title}</h3>
                        <p className="text-sm text-muted-foreground">{listing.location}</p>
                        <p className="text-sm font-medium text-primary">
                          ${listing.price_per_night}/night
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(listing.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
