import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Bed, Bath } from 'lucide-react';

interface ListingCardProps {
  listing: {
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
  };
}

const ListingCard = ({ listing }: ListingCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-64 overflow-hidden">
        <img
          src={listing.image_url}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
          ${listing.price_per_night}/night
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-foreground">{listing.title}</h3>
        
        <div className="flex items-center gap-2 text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{listing.location}</span>
        </div>

        <p className="text-muted-foreground line-clamp-2 mb-4">
          {listing.description}
        </p>

        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{listing.max_guests} guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{listing.bedrooms} beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{listing.bathrooms} baths</span>
          </div>
        </div>
      </CardContent>

      {listing.amenities && listing.amenities.length > 0 && (
        <CardFooter className="pt-0 px-6 pb-6">
          <div className="flex flex-wrap gap-2">
            {listing.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {listing.amenities.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{listing.amenities.length - 3} more
              </Badge>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default ListingCard;
