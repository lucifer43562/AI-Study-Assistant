
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search } from "lucide-react";

interface StudyMaterial {
  id: number;
  title: string;
  description: string;
  class: string;
  subject: string;
  type: "notes" | "guide" | "practice" | "video";
  difficulty: "beginner" | "intermediate" | "advanced";
}

const StudyMaterials = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");

  // Sample study materials data
  const materials: StudyMaterial[] = [
    {
      id: 1,
      title: "Algebra Basics",
      description: "Fundamental algebra concepts including variables, equations, and inequalities",
      class: "Grade 9",
      subject: "Mathematics",
      type: "notes",
      difficulty: "beginner"
    },
    {
      id: 2,
      title: "Cell Structure and Function",
      description: "Comprehensive guide to cell biology covering prokaryotes and eukaryotes",
      class: "Grade 10",
      subject: "Biology",
      type: "guide",
      difficulty: "intermediate"
    },
    {
      id: 3,
      title: "World War II Timeline",
      description: "Detailed timeline of major events during World War II",
      class: "Grade 11",
      subject: "History",
      type: "notes",
      difficulty: "intermediate"
    },
    {
      id: 4,
      title: "Chemical Bonding Practice",
      description: "Practice problems for ionic, covalent, and metallic bonding",
      class: "Grade 12",
      subject: "Chemistry",
      type: "practice",
      difficulty: "advanced"
    },
    {
      id: 5,
      title: "Shakespeare's Hamlet Analysis",
      description: "Character analysis and themes in Hamlet",
      class: "Grade 11",
      subject: "English",
      type: "guide",
      difficulty: "intermediate"
    },
    {
      id: 6,
      title: "Quadratic Functions",
      description: "Understanding parabolas, vertex form, and applications",
      class: "Grade 10",
      subject: "Mathematics",
      type: "video",
      difficulty: "intermediate"
    },
    {
      id: 7,
      title: "Photosynthesis Process",
      description: "Step-by-step breakdown of photosynthesis reactions",
      class: "Grade 9",
      subject: "Biology",
      type: "notes",
      difficulty: "beginner"
    },
    {
      id: 8,
      title: "Ancient Greek Civilization",
      description: "Overview of Greek culture, politics, and philosophy",
      class: "Grade 9",
      subject: "History",
      type: "guide",
      difficulty: "beginner"
    }
  ];

  const classes = ["all", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "all" || material.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "notes": return "bg-blue-100 text-blue-800";
      case "guide": return "bg-green-100 text-green-800";
      case "practice": return "bg-yellow-100 text-yellow-800";
      case "video": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">StudyBuddy AI</h1>
            </Link>
            <nav className="flex space-x-4">
              <Link to="/">
                <Button variant="ghost">Home</Button>
              </Link>
              <Link to="/chat">
                <Button variant="ghost">AI Assistant</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Study Materials</h2>
          <p className="text-gray-600">Browse and search study materials organized by class and subject</p>
        </div>

        {/* Search and Filter Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search materials, subjects, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {classes.map((className) => (
                  <Button
                    key={className}
                    variant={selectedClass === className ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedClass(className)}
                    className="capitalize"
                  >
                    {className === "all" ? "All Classes" : className}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredMaterials.length} materials
            {selectedClass !== "all" && ` for ${selectedClass}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Materials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <Card key={material.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-xs">
                    {material.class}
                  </Badge>
                  <div className="flex gap-1">
                    <Badge className={`text-xs ${getTypeColor(material.type)}`}>
                      {material.type}
                    </Badge>
                    <Badge className={`text-xs ${getDifficultyColor(material.difficulty)}`}>
                      {material.difficulty}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg">{material.title}</CardTitle>
                <CardDescription className="text-sm font-medium text-blue-600">
                  {material.subject}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{material.description}</p>
                <Button className="w-full mt-4" variant="outline">
                  View Material
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredMaterials.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No materials found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or selecting a different class
            </p>
            <Button onClick={() => { setSearchTerm(""); setSelectedClass("all"); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyMaterials;
