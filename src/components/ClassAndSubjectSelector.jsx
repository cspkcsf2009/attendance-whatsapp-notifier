import PropTypes from 'prop-types';

const ClassAndSubjectSelector = ({ selectedClass, setSelectedClass, classes, selectedSubject, setSelectedSubject, subjects }) => (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4 w-full p-6 rounded-lg border-2">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full bg-white rounded-lg">
                    <div className="flex-1 mb-1 sm:mb-0">
                        <label htmlFor="class" className="block text-sm sm:text-lg font-medium text-gray-700 mb-2">
                            Select Class:
                        </label>
                        <select
                            id="class"
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="block w-full p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out bg-white text-gray-900 text-sm sm:text-base"
                        >
                            {classes.map((cls) => (
                                <option key={cls} value={cls} className="text-sm sm:text-base">
                                    {cls}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label htmlFor="subject" className="block text-sm sm:text-lg font-medium text-gray-700 mb-2">
                            Select Hour:
                        </label>
                        <select
                            id="subject"
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            className="block w-full p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out bg-white text-gray-900 text-sm sm:text-base"
                        >
                            {subjects.map((subject) => (
                                <option key={subject} value={subject} className="text-sm sm:text-base">
                                    {subject}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

ClassAndSubjectSelector.propTypes = {
    selectedClass: PropTypes.string.isRequired,
    setSelectedClass: PropTypes.func.isRequired,
    classes: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedSubject: PropTypes.string.isRequired,
    setSelectedSubject: PropTypes.func.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ClassAndSubjectSelector;