import axios from "axios";
import { useEffect, useState } from "react";
import NavbarHomeScreen from "../components/NavbarHomeScreen";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Trash2, Film, Tv } from "lucide-react";
import toast from "react-hot-toast";

function formatDate(dateString) {
	const date = new Date(dateString);
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const month = monthNames[date.getUTCMonth()];
	const day = date.getUTCDate();
	const year = date.getUTCFullYear();
	return `${month} ${day}, ${year}`;
}

const SearchHistory = () => {
	const [searchHistory, setSearchHistory] = useState([]);

	useEffect(() => {
		const getSearchHistory = async () => {
			try {
				const res = await axios.get(`/api/v1/search/history`);
				setSearchHistory(res.data.content);
			} catch (error) {
				console.log(error.message);
				setSearchHistory([]);
			}
		};
		getSearchHistory();
	}, []);

	const handleDelete = async (entry) => {
		try {
			await axios.delete(`/api/v1/search/history/${entry.id}`);
			setSearchHistory(searchHistory.filter((item) => item.id !== entry.id));
			toast.success("Search entry deleted");
		} catch (error) {
			toast.error("Failed to delete search item");
		}
	};

	if (searchHistory?.length === 0) {
		return (
			<div className='bg-black min-h-screen text-white'>
				<NavbarHomeScreen />
				<div className='max-w-6xl mx-auto px-4 py-8'>
					<h1 className='text-3xl font-bold mb-8'>Search History</h1>
					<div className='flex justify-center items-center h-96'>
						<p className='text-xl text-gray-400'>No search history found</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-black text-white min-h-screen'>
			<NavbarHomeScreen />

			<div className='max-w-6xl mx-auto px-4 py-8'>
				<h1 className='text-3xl font-bold mb-8'>Search History</h1>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{searchHistory?.map((entry) => (
						<div key={entry.id} className='bg-zinc-900 hover:bg-zinc-800 transition p-4 rounded-xl flex items-center gap-4 shadow-md'>
							<img
								src={SMALL_IMG_BASE_URL + entry.image}
								alt='History image'
								onError={(e) => (e.target.src = "/default-poster.jpg")}
								className='w-16 h-16 rounded-lg object-cover border border-zinc-700'
							/>

							<div className='flex-1'>
								<h2 className='text-lg font-semibold text-white'>{entry.title}</h2>
								<p className='text-sm text-gray-400'>{formatDate(entry.searchDate)}</p>
								<div className='mt-2'>
									<span
										className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
											entry.searchType === "movie"
												? "bg-red-600 text-white"
												: entry.searchType === "tv"
												? "bg-blue-600 text-white"
												: "bg-green-600 text-white"
										}`}
									>
										{entry.searchType === "movie" ? <Film className='w-4 h-4' /> : <Tv className='w-4 h-4' />}
										{entry.searchType.charAt(0).toUpperCase() + entry.searchType.slice(1)}
									</span>
								</div>
							</div>

							<button
								onClick={() => handleDelete(entry)}
								className='p-2 rounded-full hover:bg-red-600/20 transition'
								title='Delete'
							>
								<Trash2 className='w-5 h-5 text-gray-400 hover:text-red-500 transition' />
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SearchHistory;
