export default function Loader() {
    return (
        // <div className="flex flex-col items-center justify-center h-screen bg-white">
        // <div className="flex space-x-2">
        //     <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce"></div>
        //     <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
        //     <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
        // </div>
        // <p className="text-gray-700 mt-4 text-lg font-medium">Loading...</p>
        // </div>
        <div id="wifi-loader">
            <svg className="circle-outer" viewBox="0 0 86 86">
                <circle className="back" cx="43" cy="43" r="40"></circle>
                <circle className="front" cx="43" cy="43" r="40"></circle>
                <circle className="new" cx="43" cy="43" r="40"></circle>
            </svg>
            <svg className="circle-middle" viewBox="0 0 60 60">
                <circle className="back" cx="30" cy="30" r="27"></circle>
                <circle className="front" cx="30" cy="30" r="27"></circle>
            </svg>
            <svg className="circle-inner" viewBox="0 0 34 34">
                <circle className="back" cx="17" cy="17" r="14"></circle>
                <circle className="front" cx="17" cy="17" r="14"></circle>
            </svg>
            <div className="text" data-text="Loading..."></div>
        </div>
    );
}
