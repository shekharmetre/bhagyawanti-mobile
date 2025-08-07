'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User, Eye, Heart, Share2, BookOpen, TrendingUp, Clock } from "lucide-react";
import { useState } from "react";

interface Story {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  views?: string;
  likes?: number;
  trending?: boolean;
  urgent?: boolean;
}

const stories: Story[] = [
  {
    id: 1,
    title: "Revolutionary AI Shopping Assistant Transforms Retail Experience",
    excerpt: "Our latest AI-powered shopping assistant is changing how customers discover and purchase products, with 300% increase in engagement rates and personalized recommendations.",
    category: "Technology",
    author: "Sarah Chen",
    date: "2 hours ago",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&h=600&fit=crop",
    featured: true,
    views: "12.5k",
    likes: 342,
    trending: true
  },
  {
    id: 2,
    title: "Black Friday Preview: Exclusive Deals Starting Early This Year",
    excerpt: "Get ready for our biggest sale event with early access to premium discounts.",
    category: "Sales",
    author: "Marketing Team",
    date: "4 hours ago",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400&h=300&fit=crop",
    views: "8.2k",
    likes: 156,
    urgent: true
  },
  {
    id: 3,
    title: "New Sustainable Packaging Initiative Launches Globally",
    excerpt: "We're proud to announce our commitment to 100% recyclable packaging by 2025.",
    category: "Sustainability",
    author: "Emma Thompson",
    date: "1 day ago",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
    views: "5.7k",
    likes: 89
  },
  {
    id: 4,
    title: "Customer Success Story: How Local Business Grew 400% with Our Platform",
    excerpt: "Meet Maria's Boutique and discover how our platform helped transform their business.",
    category: "Success Story",
    author: "Alex Rodriguez",
    date: "2 days ago",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    views: "4.1k",
    likes: 67
  },
  {
    id: 5,
    title: "Mobile App Update: Enhanced AR Try-On Features Now Live",
    excerpt: "Experience products like never before with our advanced augmented reality technology.",
    category: "Product Update",
    author: "Tech Team",
    date: "3 days ago",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
    views: "7.3k",
    likes: 198
  },
  {
    id: 6,
    title: "Community Spotlight: Local Artisans Join Our Marketplace",
    excerpt: "Discover unique handcrafted items from talented local creators in your area.",
    category: "Community",
    author: "Community Manager",
    date: "4 days ago",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=300&fit=crop",
    views: "3.9k",
    likes: 124
  }
];

export const LatestStoriesSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [likedStories, setLikedStories] = useState<number[]>([]);
  
  const featuredStory = stories.find(story => story.featured);
  const otherStories = stories.filter(story => !story.featured);
  const trendingStories = stories.filter(story => story.trending);
  const urgentStories = stories.filter(story => story.urgent);
  
  const categories = ["All", "Technology", "Sales", "Sustainability", "Product Update", "Community"];
  
  const filteredStories = activeFilter === "All" 
    ? otherStories 
    : otherStories.filter(story => story.category === activeFilter);

  const toggleLike = (storyId: number) => {
    setLikedStories(prev => 
      prev.includes(storyId) 
        ? prev.filter(id => id !== storyId)
        : [...prev, storyId]
    );
  };

  return (
    <section className="py-8 md:py-16 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 space-y-8">
        {/* Header with Mobile-First Design */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <Badge variant="secondary" className="text-xs font-medium">
                  Latest Updates
                </Badge>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Latest Stories & News
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
                Stay updated with our latest product launches, company news, and insider stories
              </p>
            </div>
            <Button variant="outline" size="sm" className="shrink-0 hover-scale group">
              <span>View All</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Mobile-First Filter Pills */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 sm:pb-0">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(category)}
                className="shrink-0 text-xs transition-all duration-200"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Urgent/Trending Stories Banner - Mobile First */}
        {(urgentStories.length > 0 || trendingStories.length > 0) && (
          <div className="space-y-3">
            {urgentStories.length > 0 && (
              <Card className="border-destructive/20 bg-gradient-to-r from-destructive/5 to-destructive/10 p-3 md:p-4">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-full bg-destructive/20 shrink-0">
                    <TrendingUp className="h-4 w-4 text-destructive" />
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <Badge variant="destructive" className="text-xs font-medium">
                      URGENT
                    </Badge>
                    <h3 className="font-semibold text-sm md:text-base leading-tight">
                      {urgentStories[0].title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                      {urgentStories[0].excerpt}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Main Content Grid - Mobile First */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Featured Story - Mobile First */}
          {featuredStory && (
            <div className="lg:col-span-8 space-y-4">
              <Card className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-card to-card/80">
                <div className="relative">
                  <div className="aspect-[16/9] md:aspect-[16/10] overflow-hidden">
                    <img 
                      src={featuredStory.image} 
                      alt={featuredStory.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground border-0">
                      Featured
                    </Badge>
                    {featuredStory.trending && (
                      <Badge variant="secondary" className="bg-orange-500/90 text-white border-0">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 md:p-6">
                    <Badge variant="outline" className="border-white/30 text-white mb-3">
                      {featuredStory.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4 md:p-6 space-y-4">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {featuredStory.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3">
                    {featuredStory.excerpt}
                  </p>
                  
                  {/* Story Meta - Mobile Optimized */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-2 border-t border-border/50">
                    <div className="flex items-center gap-4 text-xs md:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{featuredStory.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{featuredStory.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        <span>{featuredStory.readTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{featuredStory.views}</span>
                        </div>
                        <button 
                          onClick={() => toggleLike(featuredStory.id)}
                          className="flex items-center gap-1 hover:text-red-500 transition-colors"
                        >
                          <Heart className={`h-3 w-3 ${likedStories.includes(featuredStory.id) ? 'fill-red-500 text-red-500' : ''}`} />
                          <span>{featuredStory.likes}</span>
                        </button>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Sidebar Stories - Mobile Stack */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">More Stories</h3>
              <Button variant="ghost" size="sm" className="text-xs">
                View All
              </Button>
            </div>
            
            <div className="space-y-3">
              {filteredStories.slice(0, 5).map((story, index) => (
                <Card key={story.id} className="group cursor-pointer border-border/50 hover:border-border hover:shadow-md transition-all duration-300 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-3 md:p-4">
                    <div className="flex gap-3">
                      <div className="shrink-0">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-muted">
                          <img 
                            src={story.image} 
                            alt={story.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs px-2 py-0.5">
                            {story.category}
                          </Badge>
                          {story.urgent && (
                            <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                              Urgent
                            </Badge>
                          )}
                        </div>
                        
                        <h4 className="font-semibold text-sm md:text-base text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {story.title}
                        </h4>
                        
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{story.author}</span>
                            <span>•</span>
                            <span>{story.date}</span>
                          </div>
                          
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              <span>{story.views}</span>
                            </div>
                            <button 
                              onClick={() => toggleLike(story.id)}
                              className="flex items-center gap-1 hover:text-red-500 transition-colors"
                            >
                              <Heart className={`h-3 w-3 ${likedStories.includes(story.id) ? 'fill-red-500 text-red-500' : ''}`} />
                              <span>{story.likes}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Story Cards Grid */}
        <div className="block lg:hidden">
          <h3 className="text-lg font-semibold text-foreground mb-4">All Stories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredStories.slice(5).map((story) => (
              <Card key={story.id} className="group cursor-pointer border-border/50 hover:border-border hover:shadow-md transition-all duration-300">
                <div className="aspect-[16/10] overflow-hidden rounded-t-lg">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {story.category}
                    </Badge>
                    {story.urgent && (
                      <Badge variant="destructive" className="text-xs">
                        Urgent
                      </Badge>
                    )}
                  </div>
                  
                  <h4 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {story.title}
                  </h4>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{story.author}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{story.views}</span>
                      </div>
                      <button 
                        onClick={() => toggleLike(story.id)}
                        className="flex items-center gap-1 hover:text-red-500 transition-colors"
                      >
                        <Heart className={`h-3 w-3 ${likedStories.includes(story.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        <span>{story.likes}</span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
