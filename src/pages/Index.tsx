
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, User, Search } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">StudyBuddy AI</h1>
            </div>
            <nav className="flex space-x-4">
              <Link to="/chat">
                <Button variant="ghost">AI Assistant</Button>
              </Link>
              <Link to="/materials">
                <Button variant="ghost">Study Materials</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your Personal AI Study Assistant
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get instant help with your studies, upload photos of problems, and access organized study materials for all classes.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/chat">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">AI Chat Assistant</CardTitle>
                <CardDescription className="text-lg">
                  Ask questions, upload photos of problems, and get instant help with your studies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Upload photos of homework problems</li>
                  <li>• Ask questions in natural language</li>
                  <li>• Get step-by-step explanations</li>
                  <li>• Available 24/7 for instant help</li>
                </ul>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/materials">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Study Materials</CardTitle>
                <CardDescription className="text-lg">
                  Browse organized study materials by class and grade level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Materials organized by class</li>
                  <li>• Easy search and filtering</li>
                  <li>• Notes, guides, and resources</li>
                  <li>• Regularly updated content</li>
                </ul>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Ready to boost your learning?
          </h3>
          <div className="space-x-4">
            <Link to="/chat">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Chatting
              </Button>
            </Link>
            <Link to="/materials">
              <Button size="lg" variant="outline">
                Browse Materials
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
