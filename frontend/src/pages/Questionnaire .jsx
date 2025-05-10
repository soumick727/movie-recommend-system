import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import NavbarHomeScreen from '../components/NavbarHomeScreen';

const questions = [
  {
    question: 'What genres do you prefer?',
    options: ['Action', 'Comedy', 'Drama', 'Horror', 'SciFi', 'Romance', 'Mystery', 'Thriller', 'Family', 'Documentary', 'Crime'],
  },
  {
    question: 'Which year movie do you prefer?',
    options: ['2025', '2024', '2023', '2022', '2021', '2020'],
  },
  {
    question: 'What language are you comfortable watching?',
    options: ['English', 'French','Hindi', 'Telugu'],
  },
];

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOptionClick = async (option) => {
    console.log(`Question: ${questions[currentQuestion].question}`);
    console.log(`Selected: ${option}`);

    if (currentQuestion === 0) {
      // Toggle multi-select for genres
      if (selectedGenres.includes(option)) {
        setSelectedGenres(selectedGenres.filter((genre) => genre !== option));
      } else {
        setSelectedGenres([...selectedGenres, option]);
      }
    } else {
      const updatedAnswers = [...answers, option];

      if (currentQuestion < questions.length - 1) {
        setAnswers(updatedAnswers);
        setCurrentQuestion(currentQuestion + 1);
      } else {
        try {
          setLoading(true);
          const finalAnswers = [selectedGenres.join(','), ...updatedAnswers];
          console.log("Final Answers Submitted:", finalAnswers);
          const res = await axios.post('/api/v1/recommendation', { answers: finalAnswers });
          console.log("Backend Response:", res);
          const recommendedMovie = res.data.content;
          navigate('/recommendation', { state: { movie: recommendedMovie } });
        } catch (err) {
          toast.error('Failed to fetch recommendation');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleNextClick = () => {
    if (selectedGenres.length === 0) {
      toast.error('Please select at least one genre');
      return;
    }

    console.log(`Question: ${questions[currentQuestion].question}`);
    console.log(`Selected: ${selectedGenres.join(', ')}`);

    setAnswers([]);
    setCurrentQuestion(1);
  };

  return (
    <>
      <NavbarHomeScreen />
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4'>
        <div className='max-w-xl w-full text-center space-y-6'>
          <h2 className='text-2xl md:text-3xl font-bold'>
            {questions[currentQuestion].question}
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {questions[currentQuestion].options.map((option, index) => {
              const isSelected = currentQuestion === 0
                ? selectedGenres.includes(option)
                : answers[currentQuestion - 1] === option;

              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-md font-semibold border transition duration-200 ${
                    isSelected
                      ? 'bg-yellow-500 text-black border-yellow-400'
                      : 'bg-gray-800 hover:bg-yellow-600 hover:text-black'
                  }`}
                  disabled={loading}
                >
                  {option}
                  {isSelected && <span>✅</span>}
                </button>
              );
            })}
          </div>

          {currentQuestion === 0 && (
            <button
              onClick={handleNextClick}
              className='mt-4 bg-yellow-500 text-black font-semibold py-2 px-6 rounded-md hover:bg-yellow-400 transition'
              disabled={selectedGenres.length === 0 || loading}
            >
              Next
            </button>
          )}

          <p className='text-gray-400 mt-4'>
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
      </div>
    </>
  );
};

export default Questionnaire;
