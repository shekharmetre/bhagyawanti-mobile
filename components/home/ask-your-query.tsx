'use client'

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  Camera, 
  Paperclip, 
  X, 
  CheckCircle, 
  AlertCircle,
  Smartphone,
  Clock,
  DollarSign,
  MapPin,
  User,
  Phone,
  Mail,
  Calendar,
  Upload,
  Image as ImageIcon,
  FileText,
  Zap,
  Star,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Tag
} from 'lucide-react';

interface QueryFormData {
  deviceType: string;
  issueCategory: string;
  description: string;
  urgency: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  preferredDate: string;
  preferredTime: string;
  budget: string;
  attachments: File[];
}

const AskQueryComponent: React.FC = () => {
  const [formData, setFormData] = useState<QueryFormData>({
    deviceType: '',
    issueCategory: '',
    description: '',
    urgency: 'normal',
    name: '',
    phone: '',
    email: '',
    address: '',
    preferredDate: '',
    preferredTime: '',
    budget: '',
    attachments: []
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const deviceTypes = [
    { id: 'iphone', name: 'iPhone', icon: '📱', popular: true },
    { id: 'android', name: 'Android', icon: '🤖', popular: true },
    { id: 'ipad', name: 'iPad', icon: '📱', popular: false },
    { id: 'tablet', name: 'Tablet', icon: '📱', popular: false },
    { id: 'smartwatch', name: 'Smart Watch', icon: '⌚', popular: false },
    { id: 'laptop', name: 'Laptop', icon: '💻', popular: false }
  ];

  const issueCategories = [
    { 
      id: 'screen', 
      name: 'Screen Issues', 
      icon: '🖥️', 
      description: 'Cracked, black, or unresponsive screen',
      estimatedTime: '30-60 mins',
      priceRange: 'Rs.49-Rs.199'
    },
    { 
      id: 'battery', 
      name: 'Battery Problems', 
      icon: '🔋', 
      description: 'Poor battery life or charging issues',
      estimatedTime: '20-45 mins',
      priceRange: 'Rs.39-Rs.89'
    },
    { 
      id: 'water', 
      name: 'Water Damage', 
      icon: '💧', 
      description: 'Device exposed to liquid',
      estimatedTime: '2-4 hours',
      priceRange: 'Rs.79-Rs.299'
    },
    { 
      id: 'speaker', 
      name: 'Audio Issues', 
      icon: '🔊', 
      description: 'Speaker, microphone, or headphone problems',
      estimatedTime: '15-30 mins',
      priceRange: 'Rs.29-Rs.79'
    },
    { 
      id: 'camera', 
      name: 'Camera Problems', 
      icon: '📷', 
      description: 'Camera not working or poor quality',
      estimatedTime: '30-90 mins',
      priceRange: 'Rs.59-Rs.149'
    },
    { 
      id: 'software', 
      name: 'Software Issues', 
      icon: '⚙️', 
      description: 'OS problems, apps crashing, or performance',
      estimatedTime: '30-120 mins',
      priceRange: 'Rs.39-Rs.99'
    }
  ];

  const urgencyLevels = [
    { id: 'low', name: 'Not Urgent', color: 'bg-green-500', description: '3-5 days' },
    { id: 'normal', name: 'Normal', color: 'bg-blue-500', description: '1-2 days' },
    { id: 'high', name: 'Urgent', color: 'bg-orange-500', description: 'Same day' },
    { id: 'critical', name: 'Emergency', color: 'bg-red-500', description: 'Within hours' }
  ];

  const steps = [
    { id: 'device', title: 'Device Type', icon: Smartphone },
    { id: 'issue', title: 'Issue Category', icon: AlertCircle },
    { id: 'details', title: 'Description', icon: MessageCircle },
    { id: 'contact', title: 'Contact Info', icon: User },
    { id: 'schedule', title: 'Schedule', icon: Calendar },
    { id: 'review', title: 'Review', icon: CheckCircle }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.02,
      y: -5,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const handleInputChange = (field: keyof QueryFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles].slice(0, 5)
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0:
        if (!formData.deviceType) newErrors.deviceType = 'Please select a device type';
        break;
      case 1:
        if (!formData.issueCategory) newErrors.issueCategory = 'Please select an issue category';
        break;
      case 2:
        if (!formData.description.trim()) newErrors.description = 'Please describe your issue';
        if (formData.description.length < 10) newErrors.description = 'Please provide more details (at least 10 characters)';
        break;
      case 3:
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email';
        }
        break;
      case 4:
        if (!formData.preferredDate) newErrors.preferredDate = 'Please select a preferred date';
        if (!formData.preferredTime) newErrors.preferredTime = 'Please select a preferred time';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      setCurrentStep(0);
      setFormData({
        deviceType: '',
        issueCategory: '',
        description: '',
        urgency: 'normal',
        name: '',
        phone: '',
        email: '',
        address: '',
        preferredDate: '',
        preferredTime: '',
        budget: '',
        attachments: []
      });
    }, 3000);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const filteredCategories = issueCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8 px-2">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <motion.div
            className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
              index <= currentStep
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-blue-500 text-white'
                : 'border-gray-300 text-gray-400 bg-white'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <step.icon className="w-5 h-5" />
            {index < currentStep && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <CheckCircle className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </motion.div>
          {index < steps.length - 1 && (
            <div className={`w-8 h-0.5 mx-2 transition-colors duration-300 ${
              index < currentStep ? 'bg-blue-500' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderDeviceSelection = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <motion.h2 
          variants={itemVariants}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
        >
          What device needs repair?
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className="text-gray-600"
        >
          Select your device type to get started
        </motion.p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {deviceTypes.map((device, index) => (
          <motion.div
            key={device.id}
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
            className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
              formData.deviceType === device.id
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
            }`}
            onClick={() => handleInputChange('deviceType', device.id)}
            {...cardHoverVariants}
          >
            {device.popular && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                Popular
              </div>
            )}
            <div className="text-center">
              <div className="text-3xl mb-3">{device.icon}</div>
              <h3 className="font-semibold text-gray-800">{device.name}</h3>
            </div>
            {formData.deviceType === device.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2"
              >
                <CheckCircle className="w-5 h-5 text-blue-500" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {errors.deviceType && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2 flex items-center"
        >
          <AlertCircle className="w-4 h-4 mr-1" />
          {errors.deviceType}
        </motion.p>
      )}
    </motion.div>
  );

  const renderIssueSelection = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <motion.h2 
          variants={itemVariants}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
        >
          What's the issue?
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className="text-gray-600"
        >
          Select the category that best describes your problem
        </motion.p>
      </div>

      {/* Search and Filter */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search issues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Filter className="w-4 h-4 mr-1" />
          Filters
          {showFilters ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
        </button>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 rounded-xl p-4 space-y-2"
            >
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Quick Fix
                </button>
                <button className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  Under Rs.50
                </button>
                <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  Same Day
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="grid gap-4">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
              formData.issueCategory === category.id
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
            }`}
            onClick={() => handleInputChange('issueCategory', category.id)}
            {...cardHoverVariants}
          >
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{category.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 text-lg">{category.name}</h3>
                  {formData.issueCategory === category.id && (
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {category.estimatedTime}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-3 h-3 mr-1" />
                    {category.priceRange}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {errors.issueCategory && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2 flex items-center"
        >
          <AlertCircle className="w-4 h-4 mr-1" />
          {errors.issueCategory}
        </motion.p>
      )}
    </motion.div>
  );

  const renderDetailsForm = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <motion.h2 
          variants={itemVariants}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
        >
          Describe the issue
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className="text-gray-600"
        >
          Provide details to help us understand the problem better
        </motion.p>
      </div>

      <motion.div variants={itemVariants} className="space-y-6">
        {/* Description */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Issue Description *
          </label>
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Please describe what happened, when it started, and any other relevant details..."
              rows={4}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {formData.description.length}/500
            </div>
          </div>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.description}
            </p>
          )}
        </div>

        {/* Urgency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How urgent is this repair?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {urgencyLevels.map((level) => (
              <motion.button
                key={level.id}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleInputChange('urgency', level.id)}
                className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                  formData.urgency === level.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${level.color} mx-auto mb-2`} />
                <div className="font-medium text-sm text-gray-800">{level.name}</div>
                <div className="text-xs text-gray-500">{level.description}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Attach Photos (Optional)
          </label>
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
            >
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-1">Click to upload photos</p>
              <p className="text-xs text-gray-400">PNG, JPG up to 10MB each (max 5 files)</p>
            </motion.div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
            />

            {formData.attachments.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {formData.attachments.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative bg-gray-100 rounded-lg p-3"
                  >
                    <div className="flex items-center space-x-2">
                      <ImageIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-600 truncate flex-1">
                        {file.name}
                      </span>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Voice Recording */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Voice Message (Optional)
          </label>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsRecording(!isRecording)}
            className={`flex items-center justify-center space-x-2 w-full p-4 rounded-xl border-2 transition-all duration-200 ${
              isRecording
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
            }`}
          >
            {isRecording ? (
              <>
                <MicOff className="w-5 h-5" />
                <span>Stop Recording</span>
              </>
            ) : (
              <>
                <Mic className="w-5 h-5" />
                <span>Start Voice Recording</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderContactForm = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <motion.h2 
          variants={itemVariants}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
        >
          Contact Information
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className="text-gray-600"
        >
          We'll use this information to contact you about your repair
        </motion.p>
      </div>

      <motion.div variants={itemVariants} className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your.email@example.com"
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address (For pickup/delivery)
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <textarea
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter your complete address for pickup and delivery"
              rows={3}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget Range (Optional)
          </label>
          <select
            value={formData.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select budget range</option>
            <option value="under-50">Under Rs.50</option>
            <option value="50-100">Rs.50 - Rs.100</option>
            <option value="100-200">Rs.100 - Rs.200</option>
            <option value="200-300">Rs.200 - Rs.300</option>
            <option value="over-300">Over Rs.300</option>
          </select>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderScheduleForm = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <motion.h2 
          variants={itemVariants}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
        >
          Schedule Your Repair
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className="text-gray-600"
        >
          Choose your preferred date and time for pickup or service
        </motion.p>
      </div>

      <motion.div variants={itemVariants} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Date *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.preferredDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.preferredDate && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.preferredDate}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Time *
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={formData.preferredTime}
                onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.preferredTime ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select time slot</option>
                <option value="9-11">9:00 AM - 11:00 AM</option>
                <option value="11-13">11:00 AM - 1:00 PM</option>
                <option value="13-15">1:00 PM - 3:00 PM</option>
                <option value="15-17">3:00 PM - 5:00 PM</option>
                <option value="17-19">5:00 PM - 7:00 PM</option>
              </select>
            </div>
            {errors.preferredTime && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.preferredTime}
              </p>
            )}
          </div>
        </div>

        {/* Service Options */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-blue-600" />
            Available Service Options
          </h3>
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Free Pickup & Delivery</h4>
                  <p className="text-sm text-gray-600">We come to you</p>
                </div>
              </div>
              <div className="text-green-600 font-semibold">FREE</div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-purple-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Prime Member Benefits</h4>
                  <p className="text-sm text-gray-600">30% off + priority service</p>
                </div>
              </div>
              <div className="text-purple-600 font-semibold">Rs.9.99/mo</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderReview = () => {
    const selectedDevice = deviceTypes.find(d => d.id === formData.deviceType);
    const selectedIssue = issueCategories.find(i => i.id === formData.issueCategory);
    const selectedUrgency = urgencyLevels.find(u => u.id === formData.urgency);

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <div className="text-center mb-8">
          <motion.h2 
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
          >
            Review Your Request
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600"
          >
            Please review your information before submitting
          </motion.p>
        </div>

        <motion.div variants={itemVariants} className="space-y-6">
          {/* Device & Issue Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Repair Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{selectedDevice?.icon}</div>
                <div>
                  <p className="font-medium text-gray-800">{selectedDevice?.name}</p>
                  <p className="text-sm text-gray-600">Device Type</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{selectedIssue?.icon}</div>
                <div>
                  <p className="font-medium text-gray-800">{selectedIssue?.name}</p>
                  <p className="text-sm text-gray-600">{selectedIssue?.priceRange}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Contact Information</h3>
              <button
                onClick={() => setCurrentStep(3)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Edit
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Name</p>
                <p className="font-medium text-gray-800">{formData.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone</p>
                <p className="font-medium text-gray-800">{formData.phone}</p>
              </div>
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-medium text-gray-800">{formData.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Urgency</p>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${selectedUrgency?.color}`} />
                  <p className="font-medium text-gray-800">{selectedUrgency?.name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Schedule</h3>
              <button
                onClick={() => setCurrentStep(4)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Edit
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Preferred Date</p>
                <p className="font-medium text-gray-800">
                  {new Date(formData.preferredDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Preferred Time</p>
                <p className="font-medium text-gray-800">{formData.preferredTime}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          {formData.description && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-800 mb-3">Issue Description</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{formData.description}</p>
            </div>
          )}

          {/* Attachments */}
          {formData.attachments.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-800 mb-3">Attachments</h3>
              <div className="flex flex-wrap gap-2">
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                    <ImageIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{file.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderDeviceSelection();
      case 1: return renderIssueSelection();
      case 2: return renderDetailsForm();
      case 3: return renderContactForm();
      case 4: return renderScheduleForm();
      case 5: return renderReview();
      default: return renderDeviceSelection();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ask Your Query
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Get expert help for your mobile device repair needs
          </p>
        </motion.div>

        {/* Main Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          {/* Step Indicator */}
          <div className="px-6 py-8 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100">
            {renderStepIndicator()}
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {steps[currentStep].title}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="px-6 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderCurrentStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="px-6 py-6 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  currentStep === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous
              </motion.button>

              <div className="flex items-center space-x-3">
                {currentStep < steps.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={nextStep}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                  >
                    Next Step
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Query</span>
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Query Submitted Successfully!
                </h3>
                <p className="text-gray-600 mb-6">
                  Thank you for your query. Our team will contact you within 2 hours to discuss your repair needs.
                </p>
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>Reference ID:</strong> RQ-{Date.now().toString().slice(-6)}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSuccess(false)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AskQueryComponent;