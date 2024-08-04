// src/components/MarkAllButtons.jsx
import PropTypes from 'prop-types';

const MarkAllButtons = ({ handleMarkAllPresent, handleMarkAllAbsent }) => (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
            onClick={handleMarkAllPresent}
            className="flex-1 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-lg transition-transform transform duration-300 ease-in-out hover:bg-green-600 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300 active:bg-green-700 active:shadow-md text-sm uppercase"
            aria-label="Mark all as present"
            aria-live="polite"
        >
            Mark All Present
        </button>
        <button
            onClick={handleMarkAllAbsent}
            className="flex-1 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-lg transition-transform transform duration-300 ease-in-out hover:bg-red-600 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-300 active:bg-red-700 active:shadow-md text-sm uppercase"
            aria-label="Mark all as absent"
            aria-live="polite"
        >
            Mark All Absent
        </button>
    </div>
);

MarkAllButtons.propTypes = {
    handleMarkAllPresent: PropTypes.func.isRequired,
    handleMarkAllAbsent: PropTypes.func.isRequired,
};

export default MarkAllButtons;