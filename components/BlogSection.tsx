/**
 * Healthcare insights blog section with interactive articles
 * Features medical billing tips, industry news, and expert insights
 */
'use client';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Search,
  Filter,
  BookOpen,
  TrendingUp,
  Shield,
  DollarSign,
  FileText,
  Lightbulb,
  Heart,
  Stethoscope
} from 'lucide-react';

/**
 * Blog article data structure
 */
interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  imageUrl: string;
  featured: boolean;
}

/**
 * Sample blog articles data
 */
const blogArticles: BlogArticle[] = [
  {
    id: '1',
    title: 'Understanding Medical Billing Compliance in 2024',
    excerpt: 'Navigate the latest HIPAA requirements and billing regulations that affect your practice revenue.',
    content: 'Full article content would be loaded here...',
    author: 'Dr. Sarah Mitchell, CPC',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Compliance',
    tags: ['HIPAA', 'Regulations', 'Compliance', 'Revenue Cycle'],
    imageUrl: 'https://pub-cdn.sider.ai/u/U05XH919WYG/web-coder/687b5cca00bcf77ebb7774ef/resource/a10d3f9e-82fd-41bc-8053-56d18a323204.jpg',
    featured: true
  },
  {
    id: '2', 
    title: 'AI in Medical Billing: Reducing Claim Denials by 85%',
    excerpt: 'Discover how artificial intelligence is revolutionizing medical billing accuracy and efficiency.',
    content: 'Explore the latest AI technologies transforming healthcare billing...',
    author: 'Michael Chen, MBA',
    date: '2024-01-12',
    readTime: '6 min read',
    category: 'Technology',
    tags: ['AI', 'Technology', 'Claims Processing', 'Automation'],
    imageUrl: 'https://pub-cdn.sider.ai/u/U05XH919WYG/web-coder/687b5cca00bcf77ebb7774ef/resource/48eae65a-5b44-4b91-adf8-4a7aa93a89a4.jpg',
    featured: true
  },
  {
    id: '3',
    title: 'Maximizing Revenue: 15 Billing Optimization Strategies',
    excerpt: 'Proven strategies to increase your practice revenue and reduce administrative overhead.',
    content: 'Learn the most effective billing optimization techniques...',
    author: 'Jennifer Rodriguez, RN, CCS',
    date: '2024-01-10',
    readTime: '12 min read',
    category: 'Strategy',
    tags: ['Revenue Optimization', 'Best Practices', 'Efficiency'],
    imageUrl: 'https://pub-cdn.sider.ai/u/U05XH919WYG/web-coder/687b5cca00bcf77ebb7774ef/resource/2616e26e-721f-4ff6-8235-e72d337afaa2.jpg',
    featured: false
  },
  {
    id: '4',
    title: 'Telehealth Billing: Essential Guidelines for 2024',
    excerpt: 'Complete guide to telehealth billing codes, reimbursement rates, and compliance requirements.',
    content: 'Everything you need to know about telehealth billing...',
    author: 'Dr. Robert Kim, MD, MBA',
    date: '2024-01-08',
    readTime: '10 min read', 
    category: 'Telehealth',
    tags: ['Telehealth', 'Billing Codes', 'Remote Care', 'Reimbursement'],
    imageUrl: 'https://pub-cdn.sider.ai/u/U05XH919WYG/web-coder/687b5cca00bcf77ebb7774ef/resource/d4a703f7-5661-4c6b-a193-9a12faa69a10.jpg',
    featured: false
  },
  {
    id: '5',
    title: 'Small Practice Success: Billing Tips for Independent Providers',
    excerpt: 'Practical advice for small practices to streamline billing and improve cash flow.',
    content: 'Tailored strategies for independent healthcare providers...',
    author: 'Lisa Thompson, CPA',
    date: '2024-01-05',
    readTime: '7 min read',
    category: 'Small Practice',
    tags: ['Small Practice', 'Cash Flow', 'Independent Providers'],
    imageUrl: 'https://pub-cdn.sider.ai/u/U05XH919WYG/web-coder/687b5cca00bcf77ebb7774ef/resource/19b2c82b-44f4-4a79-b01b-77c5a1f49cc9.jpg',
    featured: false
  },
  {
    id: '6',
    title: 'ICD-11 Transition: What Healthcare Providers Need to Know',
    excerpt: 'Prepare your practice for the upcoming ICD-11 implementation with our comprehensive guide.',
    content: 'Detailed preparation guide for ICD-11 transition...',
    author: 'Dr. Amanda Foster, RHIA',
    date: '2024-01-03',
    readTime: '15 min read',
    category: 'Coding',
    tags: ['ICD-11', 'Medical Coding', 'Transition', 'Preparation'],
    imageUrl: 'https://pub-cdn.sider.ai/u/U05XH919WYG/web-coder/687b5cca00bcf77ebb7774ef/resource/ad1e897d-bc25-4d00-bde4-65181ea4f685.jpg',
    featured: false
  }
];

/**
 * Blog categories with icons
 */
const categories = [
  { name: 'All', icon: BookOpen, count: blogArticles.length },
  { name: 'Compliance', icon: Shield, count: blogArticles.filter(a => a.category === 'Compliance').length },
  { name: 'Technology', icon: TrendingUp, count: blogArticles.filter(a => a.category === 'Technology').length },
  { name: 'Strategy', icon: DollarSign, count: blogArticles.filter(a => a.category === 'Strategy').length },
  { name: 'Telehealth', icon: Heart, count: blogArticles.filter(a => a.category === 'Telehealth').length },
  { name: 'Small Practice', icon: Stethoscope, count: blogArticles.filter(a => a.category === 'Small Practice').length },
  { name: 'Coding', icon: FileText, count: blogArticles.filter(a => a.category === 'Coding').length },
];

/**
 * Animation variants
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.3 },
  },
};

/**
 * Main blog section component
 */
export function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  // Filter articles based on category and search term
  const filteredArticles = blogArticles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-blue-950/30 transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <Lightbulb className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Healthcare <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600">Insights</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Stay informed with the latest medical billing trends, compliance updates, and industry best practices from our experts.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 rounded-xl"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.name)}
                    className={`rounded-full px-4 py-2 transition-all duration-300 ${
                      selectedCategory === category.name
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                        : 'bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {category.name}
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-cyan-600" />
              Featured Articles
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <FeaturedArticleCard 
                  key={article.id} 
                  article={article} 
                  onClick={() => setSelectedArticle(article)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular Articles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {regularArticles.map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onClick={() => setSelectedArticle(article)}
            />
          ))}
        </motion.div>

        {/* No Results Message */}
        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No articles found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Try adjusting your search terms or selecting a different category.
            </p>
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-24 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Stay Updated with Healthcare Insights</h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Get the latest medical billing tips, industry news, and expert insights delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="bg-white text-gray-900 border-0 rounded-xl"
            />
            <Button className="bg-white text-cyan-600 hover:bg-gray-100 rounded-xl px-6">
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Article Modal/Overlay would go here */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </section>
  );
}

/**
 * Featured article card component
 */
function FeaturedArticleCard({ article, onClick }: { article: BlogArticle; onClick: () => void }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      onClick={onClick}
      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group border border-slate-200 dark:border-slate-700"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <Badge className="absolute top-4 left-4 bg-cyan-500 text-white">
          Featured
        </Badge>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(article.date).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {article.readTime}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
          {article.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{article.author}</span>
          </div>
          
          <Button variant="ghost" size="sm" className="group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
            Read More <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Regular article card component
 */
function ArticleCard({ article, onClick }: { article: BlogArticle; onClick: () => void }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      onClick={onClick}
      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-slate-200 dark:border-slate-700"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3 bg-blue-500 text-white text-xs">
          {article.category}
        </Badge>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span>{new Date(article.date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-500">{article.author}</span>
          
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Article modal component
 */
function ArticleModal({ article, onClose }: { article: BlogArticle; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <Badge className="bg-blue-500 text-white">{article.category}</Badge>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
          
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {article.title}
          </h1>
          
          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {article.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(article.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </div>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{article.excerpt}</p>
            <p className="text-gray-700 dark:text-gray-300">{article.content}</p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}