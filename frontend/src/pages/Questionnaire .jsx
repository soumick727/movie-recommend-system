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
    options: ['2020-2025', '2015-2020', '2010-2015', '2005-2010', '2000-2005', 'Before 2000'],
  },
  {
    question: 'What language are you comfortable watching?',
    options: ['English', 'French', 'Hindi', 'Telugu', 'Bengali', 'Tamil', 'Malayalam', 'Punjabi'],
  },
  {
    question: 'What is your preferred movie duration?',
    options: ['Less than 1 hour', '1-2 hours', '2-3 hours', 'More than 3 hours'],
  },
];

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOptionClick = async (option) => {
    if (currentQuestion === 0) {
      console.log('Selected Genres:', selectedGenres);
      if (selectedGenres.includes(option)) {

        setSelectedGenres(selectedGenres.filter((genre) => genre !== option));
      } else {
        setSelectedGenres([...selectedGenres, option]);
      }
    } else {
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestion - 1] = option;

      if (currentQuestion < questions.length - 1) {
        setAnswers(updatedAnswers);
        setCurrentQuestion(currentQuestion + 1);
      } else {
        try {
          setLoading(true);
          const finalAnswers = [selectedGenres.join(','), ...updatedAnswers];
          console.log('Final Answers:', finalAnswers);
          // Send the answers to the backend for recommendation

          const res = await axios.post('/api/v1/recommendation', { answers: finalAnswers });
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
    setCurrentQuestion(1);
  };

  const handleBackClick = () => {
    if (currentQuestion === 0) return;
    setCurrentQuestion(currentQuestion - 1);
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
              const isSelected =
                currentQuestion === 0
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

          {currentQuestion === 0 ? (
            <button
              onClick={handleNextClick}
              className='mt-4 bg-yellow-500 text-black font-semibold py-2 px-6 rounded-md hover:bg-yellow-400 transition'
              disabled={selectedGenres.length === 0 || loading}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleBackClick}
              className='mt-4 bg-gray-700 text-white font-semibold py-2 px-6 rounded-md hover:bg-gray-600 transition'
              disabled={loading}
            >
              Back
            </button>
          )}

          <p className='text-gray-400 mt-4'>
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-dashed rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg font-medium">Fetching your recommendation...</p>
        </div>
      )}
    </>
  );
};

export default Questionnaire;
