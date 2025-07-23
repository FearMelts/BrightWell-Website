/**
 * SIMPLIFIED ULTIMATE BLOG SECTION
 * Basic working version for production build
 */
'use client';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  User,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

// Simple UI components
const Button = ({ children, onClick, className = '' }: any) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-blue-600 text-white hover:bg-blue-700 ${className}`}
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
  <span className={`px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 ${className}`}>
    {children}
  </span>
);

// Blog article interface
interface BlogArticle {
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
}

// Sample articles
const articles: BlogArticle[] = [
  {
    id: '1',
    title: 'Medical Billing Compliance 2024: Essential Updates',
    excerpt: 'Navigate the latest HIPAA requirements and billing regulations affecting practice revenue.',
    author: 'Dr. Sarah Chen',
    date: '2024-12-15',
    readTime: '8 min read',
    category: 'Compliance',
    tags: ['HIPAA', 'Regulations', 'Billing'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
    featured: true,
  },
  {
    id: '2',
    title: 'Maximizing Revenue with Advanced Coding Strategies',
    excerpt: 'Learn proven techniques to optimize your medical coding for maximum reimbursement.',
    author: 'Michael Rodriguez',
    date: '2024-12-10',
    readTime: '6 min read',
    category: 'Revenue Optimization',
    tags: ['Coding', 'Revenue', 'Strategy'],
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    featured: false,
  },
  {
    id: '3',
    title: 'AI-Powered Medical Billing: The Future is Now',
    excerpt: 'Discover how artificial intelligence is revolutionizing healthcare billing processes.',
    author: 'Dr. Emily Watson',
    date: '2024-12-05',
    readTime: '10 min read',
    category: 'Technology',
    tags: ['AI', 'Innovation', 'Automation'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop',
    featured: true,
  },
];

// Simple animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Article Card component
const ArticleCard = ({ article }: { article: BlogArticle }) => (
  <motion.article
    variants={itemVariants}
    whileHover={{ y: -4 }}
    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
  >
    <div className="relative h-48 overflow-hidden">
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-full object-cover"
      />
      <Badge className="absolute top-3 left-3">
        {article.category}
      </Badge>
    </div>
    
    <div className="p-6">
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 line-clamp-2">
        {article.title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {article.excerpt}
      </p>
      
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(article.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>
    </div>
  </motion.article>
);

// Main component
export function UltimateBlogSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(articles.map(a => a.category))];
    return cats;
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-950/30">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Healthcare Insights
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Stay ahead with expert insights, industry trends, and actionable strategies 
            for optimizing your medical billing operations.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e: any) => setSearchTerm(e.target.value)}
              className="md:max-w-md"
            />
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3">
            View All Articles
            <ArrowRight className="w-5 h-5 ml-2 inline-block" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// Export alias for compatibility
export { UltimateBlogSection as UltimateOptimizedBlogSection };