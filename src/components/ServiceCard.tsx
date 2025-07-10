
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  delay?: number;
}

export const ServiceCard = ({ icon: Icon, title, description, gradient, delay = 0 }: ServiceCardProps) => {
  return (
    <Card className="group relative overflow-hidden bg-white/70 backdrop-blur-sm border border-gray-200/50 hover:border-gray-300/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-gray-200/30">
      <CardContent className="p-8 relative z-10">
        {/* Animated background gradient on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
        
        {/* Icon */}
        <div className="relative mb-6">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          {/* Glow effect */}
          <div className={`absolute inset-0 w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>

        {/* Animated border */}
        <div className="absolute inset-0 rounded-lg">
          <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm`}></div>
        </div>

        {/* Floating particles effect on hover */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex space-x-1">
            <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${gradient} animate-bounce`} style={{ animationDelay: '0ms' }}></div>
            <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${gradient} animate-bounce`} style={{ animationDelay: '150ms' }}></div>
            <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${gradient} animate-bounce`} style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
