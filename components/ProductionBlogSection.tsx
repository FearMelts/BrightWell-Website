/**
 * PRODUCTION-READY OPTIMIZED BLOG SECTION
 * Maximum performance with minimal dependencies
 */
'use client';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  DollarSign,
  Heart,
  Lightbulb,
  Search,
  Shield,
  Stethoscope,
  TrendingUp,
  User,
} from 'lucide-react';
import { memo, useMemo, useRef, useState } from 'react';

// Performance-optimized article interface
interface OptimizedBlogArticle {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  imageUrl: string;
  featured: boolean;
  priority: 'high' | 'medium' | 'low';
}

// High-performance article data
const articles: OptimizedBlogArticle[] = [
  {
    id: '1',
    title: 'Medical Billing Compliance 2024: Essential Updates',
    excerpt:
      'Navigate the latest HIPAA requirements and billing regulations affecting practice revenue.',
    author: 'Dr. Sarah Chen, CCS',
    date: '2024-12-15',
    readTime: '8 min read',
    category: 'Compliance',
    tags: ['HIPAA', 'Regulations', 'Billing'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
    featured: true,
    priority: 'high',
  },
  {
    id: '2',
    title: 'Revenue Cycle Optimization: Proven Strategies',
    excerpt:
      'Boost your practice revenue by 40% with these advanced billing optimization techniques.',
    author: 'Michael Rodriguez, MBA',
    date: '2024-12-12',
    readTime: '6 min read',
    category: 'Revenue',
    tags: ['RCM', 'Optimization', 'Revenue'],
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    featured: true,
    priority: 'high',
  },
  {
    id: '3',
    title: 'AI in Medical Coding: Future is Here',
    excerpt:
      'How artificial intelligence is revolutionizing medical coding accuracy and efficiency.',
    author: 'Dr. Emily Watson, RHIA',
    date: '2024-12-10',
    readTime: '10 min read',
    category: 'Technology',
    tags: ['AI', 'Coding', 'Innovation'],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    featured: false,
    priority: 'medium',
  },
  {
    id: '4',
    title: 'Small Practice Success: Billing Best Practices',
    excerpt: 'Essential billing strategies for small healthcare practices to maximize efficiency.',
    author: 'Jennifer Kim, CPC',
    date: '2024-12-08',
    readTime: '7 min read',
    category: 'Small Practice',
    tags: ['Small Practice', 'Efficiency', 'Best Practices'],
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    featured: false,
    priority: 'medium',
  },
  {
    id: '5',
    title: 'Denial Management: Turn Rejections into Revenue',
    excerpt: 'Advanced strategies to reduce claim denials and accelerate reimbursements.',
    author: 'Robert Thompson, CCS-P',
    date: '2024-12-05',
    readTime: '9 min read',
    category: 'Revenue',
    tags: ['Denials', 'Claims', 'Revenue Recovery'],
    imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=400&fit=crop',
    featured: false,
    priority: 'low',
  },
  {
    id: '6',
    title: 'Patient Financial Experience: Modern Approaches',
    excerpt:
      'Transform patient billing experience with transparent, user-friendly payment solutions.',
    author: 'Lisa Anderson, MBA',
    date: '2024-12-03',
    readTime: '5 min read',
    category: 'Patient Experience',
    tags: ['Patient Experience', 'Payments', 'Transparency'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop',
    featured: false,
    priority: 'low',
  },
];

// Category configuration
const categories = [
  { name: 'All', icon: BookOpen, count: articles.length },
  {
    name: 'Compliance',
    icon: Shield,
    count: articles.filter(a => a.category === 'Compliance').length,
  },
  {
    name: 'Revenue',
    icon: DollarSign,
    count: articles.filter(a => a.category === 'Revenue').length,
  },
  {
    name: 'Technology',
    icon: TrendingUp,
    count: articles.filter(a => a.category === 'Technology').length,
  },
  {
    name: 'Small Practice',
    icon: Stethoscope,
    count: articles.filter(a => a.category === 'Small Practice').length,
  },
  {
    name: 'Patient Experience',
    icon: Heart,
    count: articles.filter(a => a.category === 'Patient Experience').length,
  },
];

// Optimized animation variants
const variants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },
  featured: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  },
};

// Performance-optimized Article Card
const ArticleCard = memo(
  ({ article, onClick }: { article: OptimizedBlogArticle; onClick: () => void }) => (
    <motion.article
      variants={variants.item}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-slate-200 dark:border-slate-700"
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform',
        contain: 'layout style paint',
      }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ultimate-gpu-acceleration"
        />
        <span
          className={`absolute top-3 left-3 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${
            article.priority === 'high'
              ? 'bg-red-500'
              : article.priority === 'medium'
                ? 'bg-blue-500'
                : 'bg-green-500'
          }`}
        >
          {article.category}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <Calendar className="w-4 h-4" />
          <span>{new Date(article.date).toLocaleDateString()}</span>
          <span>•</span>
          <Clock className="w-4 h-4" />
          <span>{article.readTime}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          {article.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">{article.author}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </motion.article>
  )
);

ArticleCard.displayName = 'ArticleCard';

// Featured Article Card
const FeaturedCard = memo(
  ({ article, onClick }: { article: OptimizedBlogArticle; onClick: () => void }) => (
    <motion.article
      variants={variants.featured}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer group border border-slate-200 dark:border-slate-700"
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform',
        contain: 'layout style paint',
      }}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ultimate-gpu-acceleration"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-500 text-white">
          Featured
        </span>
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

        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{article.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{article.author}</span>
          </div>

          <button className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium flex items-center gap-2">
            Read More <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.article>
  )
);

FeaturedCard.displayName = 'FeaturedCard';

// Simple Modal Component
const Modal = ({
  article,
  onClose,
}: {
  article: OptimizedBlogArticle | null;
  onClose: () => void;
}) => {
  if (!article) return null;

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
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white">
              {article.category}
            </span>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
              ✕
            </button>
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
            <p className="text-gray-700 dark:text-gray-300">
              This is where the full article content would appear. The article covers comprehensive
              information about {article.title.toLowerCase()}, providing valuable insights for
              healthcare professionals and medical billing specialists.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
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
};

/**
 * ULTIMATE OPTIMIZED BLOG SECTION
 */
export function UltimateBlogSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<OptimizedBlogArticle | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Performance-optimized filtering with memoization
  const filteredArticles = useMemo(() => {
    return articles
      .filter(article => {
        const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
        const matchesSearch =
          searchTerm === '' ||
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  }, [selectedCategory, searchTerm]);

  const featuredArticles = useMemo(
    () => filteredArticles.filter(article => article.featured),
    [filteredArticles]
  );

  const regularArticles = useMemo(
    () => filteredArticles.filter(article => !article.featured),
    [filteredArticles]
  );

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-blue-950/30 transition-colors duration-700 ultimate-contain-layout"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <Lightbulb className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Healthcare{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600">
              Insights
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Stay informed with the latest medical billing trends, compliance updates, and industry
            best practices.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, topics, or tags..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ultimate-text-optimized"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category.name
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                        : 'bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-600'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.name}
                    <span className="ml-2 px-2 py-1 bg-black/10 rounded-full text-xs">
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
          <motion.section
            variants={variants.container}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-cyan-600" />
              Featured Articles
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map(article => (
                <FeaturedCard
                  key={article.id}
                  article={article}
                  onClick={() => setSelectedArticle(article)}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* Regular Articles Grid */}
        <motion.section
          variants={variants.container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {regularArticles.map(article => (
            <ArticleCard
              key={article.id}
              article={article}
              onClick={() => setSelectedArticle(article)}
            />
          ))}
        </motion.section>

        {/* No Results */}
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
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white"
          style={{
            transform: 'translateZ(0)',
            willChange: 'transform',
          }}
        >
          <h3 className="text-3xl font-bold mb-4">Stay Updated with Healthcare Insights</h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Get the latest medical billing tips, industry news, and expert insights delivered
            weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 bg-white text-gray-900 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 ultimate-text-optimized"
            />
            <button className="px-6 py-3 bg-white text-cyan-600 hover:bg-gray-100 rounded-xl font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>

      {/* Article Modal */}
      <Modal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </section>
  );
}
export { UltimateBlogSection as UltimateOptimizedBlogSection };
