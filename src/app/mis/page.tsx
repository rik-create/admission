import { Search, User, ShoppingCart, ChevronRight, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@/components/ui/navbar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

const PlayStationStore = () => {
  // Sample data
  const categories = [
    { name: "PS5 Consoles", count: 12, image: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081" },
    { name: "PS4 Consoles", count: 8, image: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081" },
    { name: "Controllers", count: 24, image: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081" },
    { name: "Games", count: 156, image:"https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081" },
    { name: "Accessories", count: 42, image: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081" },
    { name: "VR", count: 15, image: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081" },
  ];

  const featuredProducts = [
    {
      name: "DualSense Wireless Controller",
      price: 69.99,
      originalPrice: 74.99,
      rating: 4.8,
      image: "/dualsense-controller.jpg",
      isNew: true
    },
    {
      name: "PS5 Marvel's Spider-Man 2 Bundle",
      price: 499.99,
      originalPrice: null,
      rating: 4.9,
      image: "/ps5-spiderman-bundle.jpg",
      isNew: false
    },
    {
      name: "PULSE 3D Wireless Headset",
      price: 99.99,
      originalPrice: 129.99,
      rating: 4.5,
      image: "/pulse-headset.jpg",
      isNew: false
    },
    {
      name: "God of War Ragnarök",
      price: 49.99,
      originalPrice: 69.99,
      rating: 4.9,
      image: "/gow-ragnarok.jpg",
      isNew: false
    },
  ];

  const brands = [
    { name: "PlayStation", logo: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081" },
    { name: "EA", logo: "/ea-logo.png" },
    { name: "Ubisoft", logo: "/ubisoft-logo.png" },
    { name: "Activision", logo: "/activision-logo.png" },
    { name: "Rockstar", logo: "/rockstar-logo.png" },
    { name: "Square Enix", logo: "/square-enix-logo.png" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar className="bg-white shadow-sm sticky top-0 z-50">
        <NavbarBrand>
          <img
            src="/playstation-store-logo.png"
            alt="PlayStation Store"
            className="h-10"
          />
        </NavbarBrand>

        <NavbarContent className="hidden md:flex gap-6">
          <NavbarItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="text-gray-800 hover:text-primary">
                  PS5
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Consoles</DropdownMenuItem>
                <DropdownMenuItem>Games</DropdownMenuItem>
                <DropdownMenuItem>Accessories</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavbarItem>
          <NavbarItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="text-gray-800 hover:text-primary">
                  PS4
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Consoles</DropdownMenuItem>
                <DropdownMenuItem>Games</DropdownMenuItem>
                <DropdownMenuItem>Accessories</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavbarItem>
          <NavbarItem>
            <Button variant="link" className="text-gray-800 hover:text-primary">
              Games
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button variant="link" className="text-gray-800 hover:text-primary">
              Accessories
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button variant="link" className="text-gray-800 hover:text-primary">
              VR
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="gap-4">
          <NavbarItem>
            <div className="relative">
              <Input
                placeholder="Search games, accessories..."
                className="pl-10 pr-4 py-2 w-48 md:w-64"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </NavbarItem>
          <NavbarItem>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                3
              </Badge>
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Play Has No Limits</h1>
            <p className="text-xl mb-6">Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers and 3D Audio.</p>
            <Button className="bg-[rgb(252,186,3)] hover:bg-[rgb(252,186,3)]/90 text-gray-900 font-bold py-6 px-8 text-lg">
              Shop PS5 Consoles
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://i.ibb.co/Z1b4QxGs/ps5-console-jpg.png"
              alt="PS5 Console"
              className="max-h-96 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="p-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <p className="text-gray-500 text-sm">{category.count} items</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.isNew && (
                    <Badge className="absolute top-2 left-2 bg-secondary">New</Badge>
                  )}
                  {product.originalPrice && (
                    <Badge className="absolute top-2 right-2 bg-primary text-gray-900">
                      Sale
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold text-lg">${product.price}</span>
                    {product.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full bg-secondary hover:bg-secondary/90">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">New Arrivals</h2>
          <Button variant="link" className="text-primary">
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.filter(p => p.isNew).map((product, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-secondary">New</Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-lg">${product.price}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Special Offers */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Special Offers</h2>
            <div className="flex items-center text-red-600">
              <Clock className="h-5 w-5 mr-2" />
              <span>Ends in 2 days</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.filter(p => p.originalPrice).map((product, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary text-gray-900">
                    Sale
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold text-lg">${product.price}</span>
                    <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full bg-secondary hover:bg-secondary/90">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Brand</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          {brands.map((brand, index) => (
            <div key={index} className="flex justify-center items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PlayStation Store</h3>
              <p className="text-gray-400">
                Your ultimate destination for PlayStation consoles, games, accessories and more.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Shipping Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Returns Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">My Account</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Order History</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Wishlist</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Profile</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to get updates on new products and special offers.</p>
              <div className="flex">
                <Input
                  placeholder="Your email"
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button className="ml-2 bg-primary hover:bg-primary/90 text-gray-900">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                © 2023 PlayStation Store. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <img src="/visa-logo.png" alt="Visa" className="h-8" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <img src="/mastercard-logo.png" alt="Mastercard" className="h-8" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <img src="/paypal-logo.png" alt="PayPal" className="h-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PlayStationStore;