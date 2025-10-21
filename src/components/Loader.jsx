export default function Loader() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="flex space-x-2">
            <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
            <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
        </div>
        <p className="text-gray-700 mt-4 text-lg font-medium">Loading...</p>
        </div>
    );
}
