import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, Tag, ArrowRight } from "lucide-react"

export default function Blog() {
  const featuredPost = {
    id: 1,
    title: "The Ultimate Guide to Choosing the Perfect Blouse Design for Your Body Type",
    excerpt:
      "Discover how to select the most flattering blouse designs that enhance your natural beauty and boost your confidence. Our expert tips will help you make the right choice every time.",
    image: "/c2.png",
    author: "Sushma Devi",
    date: "2024-01-15",
    category: "Style Guide",
    readTime: "8 min read",
  }

  const blogPosts = [
    {
      id: 2,
      title: "Traditional vs Modern: Blending Styles in Contemporary Indian Wear",
      excerpt:
        "Learn how to seamlessly combine traditional Indian elements with modern design sensibilities for a unique and stylish look.",
      image: "/c7.png",
      author: "Priya Sharma",
      date: "2024-01-12",
      category: "Fashion Trends",
      readTime: "6 min read",
    },
    {
      id: 3,
      title: "Fabric Care 101: How to Maintain Your Silk and Cotton Garments",
      excerpt: "Essential tips for keeping your precious silk and cotton garments looking new for years to come.",
      image: "/c5.png",
      author: "Anita Gupta",
      date: "2024-01-10",
      category: "Care Tips",
      readTime: "5 min read",
    },
    {
      id: 4,
      title: "Bridal Wear Trends 2024: What Every Bride Should Know",
      excerpt: "Stay ahead of the curve with the latest bridal wear trends that are defining weddings in 2024.",
      image: "/c1.png",
      author: "Meera Patel",
      date: "2024-01-08",
      category: "Bridal Fashion",
      readTime: "7 min read",
    },
    {
      id: 5,
      title: "The Art of Perfect Measurements: A Professional Guide",
      excerpt: "Master the technique of taking accurate measurements for the perfect fit every time.",
      image: "/c4.png",
      author: "Sushma Devi",
      date: "2024-01-05",
      category: "Tutorials",
      readTime: "10 min read",
    },
    {
      id: 6,
      title: "Color Psychology in Indian Fashion: Choosing the Right Hues",
      excerpt:
        "Understand how colors affect your appearance and mood, and learn to choose the perfect palette for every occasion.",
      image: "/c3.png",
      author: "Kavya Singh",
      date: "2024-01-03",
      category: "Style Guide",
      readTime: "6 min read",
    },
    {
      id: 7,
      title: "Sustainable Fashion: Eco-Friendly Practices in Tailoring",
      excerpt:
        "Discover how we incorporate sustainable practices in our tailoring process and how you can make eco-conscious fashion choices.",
      image: "/c13.png",
      author: "Sunita Devi",
      date: "2024-01-01",
      category: "Sustainability",
      readTime: "8 min read",
    },
  ]

  const categories = [
    { name: "All Posts", count: 25 },
    { name: "Style Guide", count: 8 },
    { name: "Fashion Trends", count: 6 },
    { name: "Care Tips", count: 4 },
    { name: "Bridal Fashion", count: 3 },
    { name: "Tutorials", count: 2 },
    { name: "Sustainability", count: 2 },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Fashion & Style Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest fashion trends, styling tips, and expert advice from our master tailors.
            Discover the art of perfect tailoring and timeless style.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">Featured Article</h2>
          </div>

          <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative aspect-[4/3] lg:aspect-auto">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                </div>
              </div>

              <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Tag className="w-4 h-4" />
                    <span>{featuredPost.category}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(featuredPost.date).toLocaleDateString("en-IN")}</span>
                  </div>
                  <span>{featuredPost.readTime}</span>
                </div>

                <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h3>

                <p className="text-gray-600 text-lg leading-relaxed mb-6">{featuredPost.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">By {featuredPost.author}</span>
                  </div>

                  <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 flex items-center space-x-2">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Categories */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-playfair text-xl font-bold text-gray-900 mb-6">Categories</h3>
                    <ul className="space-y-3">
                      {categories.map((category, index) => (
                        <li key={index}>
                          <Link
                            href="#"
                            className="flex items-center justify-between text-gray-600 hover:text-rose-600 transition-colors"
                          >
                            <span>{category.name}</span>
                            <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">{category.count}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Newsletter Signup */}
                <Card className="bg-gradient-to-br from-rose-500 to-pink-600 text-white">
                  <CardContent className="p-6">
                    <h3 className="font-playfair text-xl font-bold mb-4">Stay Updated</h3>
                    <p className="text-rose-100 mb-4 text-sm">
                      Get the latest fashion tips and style guides delivered to your inbox.
                    </p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-3 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                      />
                      <Button className="w-full bg-white text-rose-600 hover:bg-gray-100">Subscribe</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Blog Posts */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
                <p className="text-gray-600">Discover expert insights and styling tips from our master tailors</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(post.date).toLocaleDateString("en-IN")}</span>
                        </div>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-rose-600 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{post.author}</span>
                        </div>

                        <Link
                          href="#"
                          className="text-rose-600 hover:text-rose-700 text-sm font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform"
                        >
                          <span>Read More</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 border-2 border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white transition-all duration-300"
                >
                  Load More Articles
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Style?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Put our expert advice into practice. Book a consultation with our master tailors and create the perfect
            outfit that reflects your unique style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 px-8"
            >
              Book Consultation
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              View Our Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
