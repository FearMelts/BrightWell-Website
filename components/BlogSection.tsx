/**
 * Healthcare insights blog section with interactive articles
 * Features medical billing tips, industry news, and expert insights
 */
'use client';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Heart,
  Lightbulb,
  Search,
  Shield,
  Stethoscope,
  TrendingUp,
  User,
} from 'lucide-react';
import { useState } from 'react';

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
    excerpt:
      'Navigate the latest HIPAA requirements and billing regulations that affect your practice revenue.',
    content: 'Full article content would be loaded here...',
    author: 'Dr. Sarah Mitchell, CPC',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Compliance',
    tags: ['HIPAA', 'Regulations', 'Compliance', 'Revenue Cycle'],
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
    featured: true,
  },
  {
    id: '2',
    title: 'AI in Medical Billing: Reducing Claim Denials by 85%',
    excerpt:
      'Discover how artificial intelligence is revolutionizing medical billing accuracy and efficiency.',
    content: 'Explore the latest AI technologies transforming healthcare billing...',
    author: 'Michael Chen, MBA',
    date: '2024-01-12',
    readTime: '6 min read',
    category: 'Technology',
    tags: ['AI', 'Technology', 'Claims Processing', 'Automation'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
    featured: true,
  },
  {
    id: '3',
    title: 'Maximizing Revenue: 15 Billing Optimization Strategies',
    excerpt:
      'Proven strategies to increase your practice revenue and reduce administrative overhead.',
    content: 'Learn the most effective billing optimization techniques...',
    author: 'Jennifer Rodriguez, RN, CCS',
    date: '2024-01-10',
    readTime: '12 min read',
    category: 'Strategy',
    tags: ['Revenue Optimization', 'Best Practices', 'Efficiency'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    featured: false,
  },
  {
    id: '4',
    title: 'Telehealth Billing: Essential Guidelines for 2024',
    excerpt:
      'Complete guide to telehealth billing codes, reimbursement rates, and compliance requirements.',
    content: 'Everything you need to know about telehealth billing...',
    author: 'Dr. Robert Kim, MD, MBA',
    date: '2024-01-08',
    readTime: '10 min read',
    category: 'Telehealth',
    tags: ['Telehealth', 'Billing Codes', 'Remote Care', 'Reimbursement'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
    featured: false,
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
    imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop',
    featured: false,
  },
  {
    id: '6',
    title: 'ICD-11 Transition: What Healthcare Providers Need to Know',
    excerpt:
      'Prepare your practice for the upcoming ICD-11 implementation with our comprehensive guide.',
    content: 'Detailed preparation guide for ICD-11 transition...',
    author: 'Dr. Amanda Foster, RHIA',
    date: '2024-01-03',
    readTime: '15 min read',
    category: 'Coding',
    tags: ['ICD-11', 'Medical Coding', 'Transition', 'Preparation'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
    featured: false,
  },
];

/**
 * Blog categories with icons
 */
const categories = [
  { name: 'All', icon: BookOpen, count: blogArticles.length },
  {
    name: 'Compliance',
    icon: Shield,
    count: blogArticles.filter(a => a.category === 'Compliance').length,
  },
  {
    name: 'Technology',
    icon: TrendingUp,
    count: blogArticles.filter(a => a.category === 'Technology').length,
  },
  {
    name: 'Strategy',
    icon: DollarSign,
    count: blogArticles.filter(a => a.category === 'Strategy').length,
  },
  {
    name: 'Telehealth',
    icon: Heart,
    count: blogArticles.filter(a => a.category === 'Telehealth').length,
  },
  {
    name: 'Small Practice',
    icon: Stethoscope,
    count: blogArticles.filter(a => a.category === 'Small Practice').length,
  },
  {
    name: 'Coding',
    icon: FileText,
    count: blogArticles.filter(a => a.category === 'Coding').length,
  },
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
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <section className="py-32 bg-gradient-to-br from-royal-600 via-electric-600 to-neon-600 dark:from-royal-800 dark:via-electric-800 dark:to-neon-800 relative overflow-hidden animate-gradient-x">
      {/* Glassy Overlay */}
      <div className="absolute inset-0 bg-glass dark:bg-glass-dark backdrop-blur-2xl z-0" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
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
            className="w-16 h-16 bg-gradient-to-r from-magenta-500 to-royal-500 rounded-glass flex items-center justify-center mx-auto mb-6 shadow-neon-purple animate-float"
          >
            <Lightbulb className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 via-royal-400 to-neon-400 mb-6 animate-gradient-x drop-shadow-[0_4px_32px_rgba(139,92,246,0.45)]">
            Healthcare <span className="text-white">Insights</span>
          </h2>
          <p className="text-2xl text-white/90 max-w-4xl mx-auto font-semibold drop-shadow-[0_2px_16px_rgba(139,92,246,0.25)]">
            Stay informed with the latest medical billing trends, compliance updates, and industry
            best practices from our experts.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-4 w-5 h-5 text-white/60" />
              <input
                type="text"
                placeholder="Search articles, topics, or tags..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-card-glass dark:bg-card-glass backdrop-blur-2xl border-2 border-electric-400 dark:border-electric-500 rounded-glass text-white placeholder-white/60 focus:outline-none focus:border-magenta-400 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map(category => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-glass text-sm font-semibold transition-all duration-300 backdrop-blur-2xl ${
                      selectedCategory === category.name
                        ? 'bg-gradient-to-r from-magenta-500 to-royal-500 text-white shadow-neon-purple border-2 border-magenta-400 animate-gradient-x'
                        : 'bg-card-glass text-white/80 hover:bg-white/20 border-2 border-electric-400 hover:border-neon-400'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.name}
                    <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                      {category.count}
                    </span>
                  </button>
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
            className="mb-20"
          >
            <h3 className="text-3xl font-extrabold text-white mb-10 flex items-center">
              <TrendingUp className="w-8 h-8 mr-4 text-neon-400" />
              Featured Articles
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {featuredArticles.map(article => (
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
          {regularArticles.map(article => (
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
            className="text-center py-16"
          >
            <BookOpen className="w-20 h-20 text-white/40 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">No articles found</h3>
            <p className="text-white/70 text-lg">
              Try adjusting your search terms or selecting a different category.
            </p>
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-32 bg-card-glass dark:bg-card-glass backdrop-blur-2xl rounded-glass p-12 text-center border-2 border-electric-400 dark:border-electric-500 shadow-neon-purple"
        >
          <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-neon-400 mb-6 animate-gradient-x">
            Stay Updated with Healthcare Insights
          </h3>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto font-semibold">
            Get the latest medical billing tips, industry news, and expert insights delivered to
            your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-2xl border-2 border-electric-400 rounded-glass text-white placeholder-white/60 focus:outline-none focus:border-magenta-400 transition-colors"
            />
            <button className="bg-gradient-to-r from-magenta-500 to-royal-500 text-white px-8 py-4 rounded-glass font-extrabold shadow-neon-purple hover:shadow-neon-cyan transition-all duration-300 animate-gradient-x">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
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
      className="bg-card-glass dark:bg-card-glass backdrop-blur-2xl rounded-glass overflow-hidden shadow-neon-purple hover:shadow-neon-cyan transition-all duration-500 cursor-pointer group border-2 border-electric-400 dark:border-electric-500 animate-float"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-magenta-500 to-royal-500 text-white text-sm font-bold rounded-full shadow-neon-purple animate-gradient-x">
          Featured
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center gap-6 text-sm text-white/70 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date(article.date).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {article.readTime}
          </div>
        </div>

        <h3 className="text-2xl font-extrabold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-magenta-400 group-hover:to-neon-400 transition-all duration-300">
          {article.title}
        </h3>

        <p className="text-white/80 mb-6 line-clamp-3 text-lg leading-relaxed">{article.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-white/60" />
            <span className="text-sm text-white/70 font-medium">{article.author}</span>
          </div>

          <div className="flex items-center gap-2 text-white/80 group-hover:text-neon-400 transition-colors">
            <span className="font-semibold">Read More</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
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
      className="bg-card-glass dark:bg-card-glass backdrop-blur-2xl rounded-glass overflow-hidden shadow-lg hover:shadow-neon-purple transition-all duration-300 cursor-pointer group border-2 border-electric-400/50 dark:border-electric-500/50 hover:border-magenta-400 animate-float"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 px-3 py-1 bg-royal-500 text-white text-xs font-bold rounded-full">
          {article.category}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
          <span>{new Date(article.date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>

        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-electric-400 group-hover:to-neon-400 transition-all duration-300 line-clamp-2">
          {article.title}
        </h3>

        <p className="text-white/70 mb-4 line-clamp-3 text-sm leading-relaxed">{article.excerpt}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-white/60 font-medium">{article.author}</span>

          <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-neon-400 group-hover:translate-x-1 transition-all" />
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
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card-glass dark:bg-card-glass backdrop-blur-2xl rounded-glass max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-electric-400 dark:border-electric-500"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="px-4 py-2 bg-royal-500 text-white rounded-full font-bold">
              {article.category}
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>

          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-64 object-cover rounded-glass mb-6"
          />

          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-neon-400 mb-6 animate-gradient-x">
            {article.title}
          </h1>

          <div className="flex items-center gap-8 text-sm text-white/70 mb-8">
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

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-xl text-white/90 mb-8 leading-relaxed font-medium">
              {article.excerpt}
            </p>
            <p className="text-white/80 leading-relaxed">{article.content}</p>
          </div>

          <div className="mt-10 pt-8 border-t border-white/20">
            <div className="flex flex-wrap gap-3">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-white/70 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
