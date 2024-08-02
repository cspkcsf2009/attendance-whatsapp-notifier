import PropTypes from 'prop-types'; // Import PropTypes

const AttendanceRow = ({ index, name, status, handleStatusChange }) => (
    <tr
        className={`transition-colors duration-300 ease-in-out hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
    >
        <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-base text-gray-900 font-medium text-center">{index + 1}</td>
        <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-base text-gray-900 font-medium text-center">{name}</td>
        <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-base text-gray-600">
            <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <label className="inline-flex items-center space-x-2">
                    <input
                        type="radio"
                        name={name}
                        value="present"
                        checked={status === 'present'}
                        onChange={() => handleStatusChange(name, 'present')}
                        className="form-radio text-blue-500 ring-blue-400 focus:ring-2"
                    />
                    <span className="text-gray-700 font-medium">Present</span>
                </label>
                <label className="inline-flex items-center space-x-2">
                    <input
                        type="radio"
                        name={name}
                        value="absent"
                        checked={status === 'absent'}
                        onChange={() => handleStatusChange(name, 'absent')}
                        className="form-radio text-red-500 ring-red-400 focus:ring-2"
                    />
                    <span className="text-gray-700 font-medium">Absent</span>
                </label>
            </div>
        </td>
    </tr>
);

// Add prop types validation
AttendanceRow.propTypes = {
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    handleStatusChange: PropTypes.func.isRequired,
};

export default AttendanceRow;