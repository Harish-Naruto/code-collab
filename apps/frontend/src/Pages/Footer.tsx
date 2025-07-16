import React from 'react';
import { Globe, Users, BookOpen } from 'lucide-react'; // Assuming you're using lucide-react for icons

export const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer className="py-16 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="text-2xl font-bold">
                  <span className="text-green-400">Code</span>
                  <span className="text-white">-Collab</span>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Empowering educators to teach computer science with confidence and inspiring students to code their future.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <Globe className="w-5 h-5 text-gray-400" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <Users className="w-5 h-5 text-gray-400" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <BookOpen className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <div className="space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">About</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 CodeHS. All rights reserved. Built with ❤️ for educators and students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
