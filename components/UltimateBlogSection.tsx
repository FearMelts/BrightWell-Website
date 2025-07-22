i; /**
 * ULTIMATE OPTIMIZED BLOG SECTION
 * Production-grade component with maximum performance enhancements
 */
('use client');
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
import { Suspense, lazy, useMemo, useState } from 'react';
import '../styles/ultimate-performance.css';

// Simple UI components to avoid dependency issues
const Button = ({ children, onClick, className = '', variant = 'default' }: any) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
      variant === 'default'
        ? 'bg-blue-600 text-white hover:bg-blue-700'
        : 'border border-gray-300 hover:bg-gray-50'
    } ${className}`}
  >
    {children}
  </button>
);

const Input = ({ className = '', ...props }: any) => (
  <input
    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

const Badge = ({ children, className = '' }: any) => (
  <span
    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ${className}`}
  >
    {children}
  </span>
);

// Lazy load heavy components
const ArticleModal = lazy(() =>
  import('./ArticleModal').catch(() => ({ default: () => <div>Content unavailable</div> }))
);

// Optimized blog article interface
interface OptimizedBlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content?: string; // Lazy loaded
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  imageUrl: string;
  featured: boolean;
  priority: 'high' | 'medium' | 'low';
}

// Performance-optimized article data with priorities
const optimizedBlogArticles: OptimizedBlogArticle[] = [
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

// Optimized category configuration
const optimizedCategories = [
  { name: 'All', icon: BookOpen, count: optimizedBlogArticles.length },
  {
    name: 'Compliance',
    icon: Shield,
    count: optimizedBlogArticles.filter(a => a.category === 'Compliance').length,
  },
  {
    name: 'Revenue',
    icon: DollarSign,
    count: optimizedBlogArticles.filter(a => a.category === 'Revenue').length,
  },
  {
    name: 'Technology',
    icon: TrendingUp,
    count: optimizedBlogArticles.filter(a => a.category === 'Technology').length,
  },
  {
    name: 'Small Practice',
    icon: Stethoscope,
    count: optimizedBlogArticles.filter(a => a.category === 'Small Practice').length,
  },
  {
    name: 'Patient Experience',
    icon: Heart,
    count: optimizedBlogArticles.filter(a => a.category === 'Patient Experience').length,
  },
];

// Memory-optimized animation variants
const blogVariants = {
  container: {
    initial: 'hidden',
    animate: 'visible',
    variants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.1,
        },
      },
    },
  },
  card: {
    variants: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
      },
    },
  },
  featured: {
    variants: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
      },
    },
  },
};

// Performance-optimized article card component
const OptimizedArticleCard = ({
  article,
  onClick,
  priority,
}: {
  article: OptimizedBlogArticle;
  onClick: () => void;
  priority: 'high' | 'medium' | 'low';
}) => {
  const gestureConfig = useOptimizedGestures();

  return (
    <MotionErrorBoundary fallback={<div className="h-64 bg-gray-100 rounded-xl animate-pulse" />}>
      <UltimateMotion
        variants={priority === 'high' ? blogVariants.featured.variants : blogVariants.card.variants}
        whileHover={gestureConfig.enableHover ? { y: -4, scale: 1.02 } : undefined}
        onTap={gestureConfig.enableComplexAnimations ? onClick : undefined}
        onClick={!gestureConfig.enableComplexAnimations ? onClick : undefined}
        className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group border border-slate-200 dark:border-slate-700 ultimate-contain-layout"
        enableGPU={true}
        enableDebouncing={true}
        layoutOptimize={true}
      >
        {/* Optimized image with lazy loading */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading={priority === 'high' ? 'eager' : 'lazy'}
            decoding="async"
            style={layoutOptimizations.gpuLayer}
          />
          <Badge
            className={`absolute top-3 left-3 ${
              priority === 'high'
                ? 'bg-red-500'
                : priority === 'medium'
                  ? 'bg-blue-500'
                  : 'bg-green-500'
            } text-white text-xs`}
          >
            {article.category}
          </Badge>
        </div>

        <div className="p-6" style={layoutOptimizations.containLayout}>
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
      </UltimateMotion>
    </MotionErrorBoundary>
  );
};

// High-performance featured article component
const OptimizedFeaturedCard = ({
  article,
  onClick,
}: {
  article: OptimizedBlogArticle;
  onClick: () => void;
}) => {
  const gestureConfig = useOptimizedGestures();

  return (
    <MotionErrorBoundary>
      <UltimateMotion
        variants={blogVariants.featured.variants}
        whileHover={gestureConfig.enableHover ? { y: -6, scale: 1.01 } : undefined}
        onTap={gestureConfig.enableComplexAnimations ? onClick : undefined}
        onClick={!gestureConfig.enableComplexAnimations ? onClick : undefined}
        className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group border border-slate-200 dark:border-slate-700"
        enableGPU={true}
        layoutOptimize={true}
      >
        <div className="relative h-64 overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="eager"
            decoding="async"
            style={layoutOptimizations.animationLayer}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <Badge className="absolute top-4 left-4 bg-cyan-500 text-white">Featured</Badge>
        </div>

        <div className="p-6" style={layoutOptimizations.containLayout}>
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

            <Button
              variant="ghost"
              size="sm"
              className="group-hover:text-cyan-600 dark:group-hover:text-cyan-400"
            >
              Read More <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </UltimateMotion>
    </MotionErrorBoundary>
  );
};

/**
 * ULTIMATE OPTIMIZED BLOG SECTION
 * Maximum performance with progressive enhancement
 */
export function UltimateBlogSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<OptimizedBlogArticle | null>(null);

  const { ref, isInView, shouldAnimate } = useOptimizedScrollAnimation({ threshold: 0.1 });

  // Performance-optimized filtering with memoization
  const filteredArticles = useMemo(() => {
    return optimizedBlogArticles
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
        // Priority sorting for performance
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
    <ProgressiveMotion
      fallback={
        <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-blue-950/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Healthcare Insights</h2>
              <p className="text-xl text-gray-600">Loading latest articles...</p>
            </div>
          </div>
        </section>
      }
    >
      <section
        ref={ref}
        className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-blue-950/30 transition-colors duration-700"
        style={layoutOptimizations.containLayout}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Optimized Section Header */}
          <UltimateMotion
            {...(shouldAnimate ? ultimateVariants.quickFade : {})}
            className="text-center mb-16"
            enableGPU={true}
          >
            <UltimateMotion
              {...(shouldAnimate ? ultimateVariants.slideUp : {})}
              className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Lightbulb className="w-8 h-8 text-white" />
            </UltimateMotion>

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
          </UltimateMotion>

          {/* Performance-optimized Search and Filter */}
          <UltimateMotion
            {...(shouldAnimate ? { ...ultimateVariants.slideUp, transition: { delay: 0.2 } } : {})}
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
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 rounded-xl"
                  style={layoutOptimizations.textOptimized}
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {optimizedCategories.map(category => {
                  const IconComponent = category.icon;
                  return (
                    <Button
                      key={category.name}
                      variant={selectedCategory === category.name ? 'default' : 'outline'}
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
          </UltimateMotion>

          {/* Featured Articles with Priority Loading */}
          {featuredArticles.length > 0 && (
            <UltimateMotion {...blogVariants.container} className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-cyan-600" />
                Featured Articles
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredArticles.map(article => (
                  <OptimizedFeaturedCard
                    key={article.id}
                    article={article}
                    onClick={() => setSelectedArticle(article)}
                  />
                ))}
              </div>
            </UltimateMotion>
          )}

          {/* Regular Articles Grid with Performance Optimization */}
          <UltimateMotion
            {...blogVariants.container}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {regularArticles.map(article => (
              <OptimizedArticleCard
                key={article.id}
                article={article}
                priority={article.priority}
                onClick={() => setSelectedArticle(article)}
              />
            ))}
          </UltimateMotion>

          {/* No Results with Optimized Animation */}
          {filteredArticles.length === 0 && (
            <UltimateMotion {...ultimateVariants.quickFade} className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No articles found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                Try adjusting your search terms or selecting a different category.
              </p>
            </UltimateMotion>
          )}

          {/* Optimized Newsletter Signup */}
          <UltimateMotion
            {...(shouldAnimate ? ultimateVariants.slideUp : {})}
            className="mt-24 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white"
            enableGPU={true}
          >
            <h3 className="text-3xl font-bold mb-4">Stay Updated with Healthcare Insights</h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Get the latest medical billing tips, industry news, and expert insights delivered
              weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white text-gray-900 border-0 rounded-xl"
                style={layoutOptimizations.textOptimized}
              />
              <Button className="bg-white text-cyan-600 hover:bg-gray-100 rounded-xl px-6">
                Subscribe
              </Button>
            </div>
          </UltimateMotion>
        </div>

        {/* Lazy-loaded Article Modal */}
        {selectedArticle && (
          <Suspense
            fallback={
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-white rounded-xl p-8">Loading article...</div>
              </div>
            }
          >
            <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
          </Suspense>
        )}
      </section>
    </ProgressiveMotion>
  );
}
