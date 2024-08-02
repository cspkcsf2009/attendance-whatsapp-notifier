import { useState } from 'react';
import PropTypes from 'prop-types';
import { generateDocx } from './generateDocx'; // Ensure this path is correct
import { saveAs } from 'file-saver';

const DocxButton = ({ result, selectedClass, selectedSubject }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const formatDate = (dateString) => {
        const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, dateOptions).replace(/\//g, '-');
    };

    // Set a default date, e.g., current date
    const date = formatDate(new Date().toISOString());

    const handleDownload = async () => {
        setLoading(true);
        setError(null);

        try {
            // console.log("Result:", result); // Log the result to understand its structure

            const presentCount = result.present.length;
            const absentCount = result.absent.length;
            const counts = { presentCount, absentCount };

            const newDataWithStatus = [
                ...result.present.map(name => [name, 'Present']),
                ...result.absent.map(name => [name, 'Absent']),
            ];

            const blob = await generateDocx(newDataWithStatus, selectedClass, selectedSubject, date, counts);
            const fileName = `${selectedSubject}_${date}.docx`;
            saveAs(blob, fileName);
        } catch (err) {
            setError('Failed to generate document. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-center">
            <button
                onClick={handleDownload}
                className="w-full px-4 py-2 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={loading}
            >
                {loading ? 'Generating...' : 'Download as a Word Document'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

DocxButton.propTypes = {
    result: PropTypes.shape({
        present: PropTypes.arrayOf(PropTypes.string).isRequired,
        absent: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    selectedClass: PropTypes.string.isRequired,
    selectedSubject: PropTypes.string.isRequired,
};

export default DocxButton;