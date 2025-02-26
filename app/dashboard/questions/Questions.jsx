// Questions.js

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'; // Assuming you have a custom button component
import { Input, Textarea } from '@/components/ui/input'; // Assuming you have custom input components
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'; // Assuming you have collapsible components
import { ChevronsUpDown } from 'lucide-react'; // Icon for collapsible trigger

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // Fetch or hard-code questions data here
    const fetchedQuestions = [
      { id: 1, question: 'What is React?', category: 'Frontend', difficulty: 'Easy', answer: 'React is a JavaScript library...', correctAnswer: 'React is a JavaScript library for building user interfaces.' },
      { id: 2, question: 'Explain a REST API.', category: 'Backend', difficulty: 'Medium', answer: 'A REST API is...', correctAnswer: 'A REST API is an architectural style for designing networked applications.' },
      // Add more questions here
    ];
    setQuestions(fetchedQuestions);
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredQuestions = questions.filter((question) => {
    return (selectedCategory === 'all' || question.category === selectedCategory) &&
      (question.question.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div className='p-10'>
      <h1 className='text-3xl font-bold text-center'>Interview Questions</h1>

      <div className="mt-6 mb-8">
        <label htmlFor="category" className="mr-2">Filter by Category: </label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange} className="p-2 border rounded-lg">
          <option value="all">All</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Full Stack">Full Stack</option>
          <option value="Product">Product</option>
          {/* Add other categories */}
        </select>

        <Input
          type="text"
          placeholder="Search questions"
          className="mt-4 p-2 border rounded-lg"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {filteredQuestions.length === 0 ? (
        <p className="text-gray-500">No questions found for this filter.</p>
      ) : (
        <div>
          {filteredQuestions.map((item) => (
            <Collapsible key={item.id} className="mt-4">
              <CollapsibleTrigger className="p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full">
                {item.question} <ChevronsUpDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-lg">Difficulty: {item.difficulty}</h3>
                  <h4 className="p-2 border rounded-lg bg-yellow-50 text-sm text-yellow-900">
                    <strong>Your Answer:</strong> {item.answer}
                  </h4>
                  <h4 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                    <strong>Correct Answer:</strong> {item.correctAnswer}
                  </h4>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      )}

      <Button className="mt-6 bg-purple-600 text-white hover:bg-purple-700">
        Start Mock Interview
      </Button>
    </div>
  );
}

export default Questions;
