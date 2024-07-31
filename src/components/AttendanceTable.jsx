// src/components/AttendanceTable.js
import { useState } from 'react';

const initialNames = [
    "Abinesh N",
    "Akash V",
    "Ashwin Gandhi A",
    "Booja R",
    "Hari Krishna B",
    "Jaya Prasanna E",
    "Jaya Ram S.N",
    "Jobin M.S",
    "Kanishka P.S",
    "Kathirvel M",
    "Krishna Kumar S",
    "Maha Nithra R",
    "Nagalingam I",
    "Naveen Raj S.U",
    "Nisha S",
    "Pavin P.T",
    "Pavithra M.V",
    "Pratheeban S",
    "Sakthi Abirame M",
    "Sakthi Pon Rani R",
    "Sakthi Suthan V",
    "Samuvel A",
    "Saran S",
    "Segi S",
    "Senegadharshini K",
    "Sree Devi M",
    "Sri Varun S",
    "Sujith Lalaso Patil",
    "Vengatesh S",
    "Yowan M"
];
const subjects = ['Entire Day', 'Tamil', 'English', 'PROGRAMMING in C++', 'Practical - PROGRAMMING in C++', 'Introduction to Data Science', 'Practical - PHP PROGRAMMING', 'Environmental Studies'];
const classes = ['2nd B.Sc. Computer Science', '3rd B.Sc. Computer Science', '1st B.Sc. Computer Science']; // Example classes

// Function to get current date and time in a readable format with AM/PM
const getFormattedDateTime = () => {
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const date = new Date();
    return `${date.toLocaleDateString(undefined, dateOptions)} at ${date.toLocaleTimeString(undefined, timeOptions)}`;
};

const AttendanceTable = () => {
    const [attendance, setAttendance] = useState(
        initialNames.reduce((acc, name) => ({ ...acc, [name]: 'present' }), {})
    );
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
    const [result, setResult] = useState({ present: [], absent: [] });
    const [showPresent, setShowPresent] = useState(false);
    const [showAbsent, setShowAbsent] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
    const [selectedClass, setSelectedClass] = useState(classes[0]);

    const handleStatusChange = (name, status) => {
        setAttendance(prev => ({ ...prev, [name]: status }));
    };

    const handleSubmit = () => {
        const present = [];
        const absent = [];
        Object.entries(attendance).forEach(([name, status]) => {
            if (status === 'present') present.push(name);
            else absent.push(name);
        });
        setResult({ present, absent });
        setIsSubmitClicked(true); // Enable the WhatsApp button after submit
        setShowPresent(false); // Show present list by default
        setShowAbsent(true);  // Show absent list by default
    };

    const handleSendWhatsApp = () => {
        const present = result.present;
        const absent = result.absent;

        // Generate the message
        const message = `--- 📅  *Attendance Report*  📅 ---\n\n` +
            `*Date and Time:* ${getFormattedDateTime()}\n\n` +
            `*Class:* ${selectedClass}\n\n` +
            `*Hours:* ${selectedSubject}\n\n` +
            `*Summary:*\n` +
            `- Total Present: ${present.length}\n` +
            `- Total Absent: ${absent.length}\n\n` +
            // `*--- Present (${present.length}) ---*\n` +
            // `${present.length > 0 ? present.map((name, index) => `${index + 1}. ${name}`).join('\n') : 'No students present.'}\n\n` +
            `*--- Absentees List (${absent.length}) ---*\n` +
            `${absent.length > 0 ? absent.map((name, index) => `${index + 1}. ${name}`).join('\n') : 'No students absent.'}`

        // Output the message
        console.log(message);

        // Encode the message for the URL
        const encodedMessage = encodeURIComponent(message);

        // WhatsApp URL
        const whatsappURL = `https://wa.me/?text=${encodedMessage}`;

        // Open WhatsApp in a new tab
        window.open(whatsappURL, '_blank');
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-full mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-6 sm:mb-8 bg-gray-800 px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
                Attendance Whatsapp Notifier [ 2024-25 ] - PKC
            </h1>

            <div className="mb-4 sm:mb-6">
                <label htmlFor="class" className="block text-base sm:text-lg font-semibold text-gray-800 mb-2">Select Class:</label>
                <select
                    id="class"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="block w-full p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                    {classes.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4 sm:mb-6">
                <label htmlFor="subject" className="block text-base sm:text-lg font-semibold text-gray-800 mb-2">Select Hour:</label>
                <select
                    id="subject"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="block w-full p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                    {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                    ))}
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white divide-y divide-gray-300 rounded-lg shadow-md border border-gray-200">
                    <thead className="bg-gray-200 text-gray-800">
                        <tr className="text-xs font-semibold uppercase tracking-wider">
                            <th className="px-4 py-2 sm:px-6 sm:py-3 text-center">#</th>
                            <th className="px-4 py-2 sm:px-6 sm:py-3 text-center">Name</th>
                            <th className="px-4 py-2 sm:px-6 sm:py-3 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                        {initialNames.map((name, index) => (
                            <tr
                                key={name}
                                className={`transition-colors duration-300 ease-in-out hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                            >
                                <td className="px-2 py-3 sm:px-6 sm:py-4 text-sm text-gray-900 font-medium text-center">{index + 1}</td>
                                <td className="px-2 py-3 sm:px-6 sm:py-4 text-sm text-gray-900 font-medium text-center">{name}</td>
                                <td className="px-2 py-3 sm:px-6 sm:py-4 text-sm text-gray-600">
                                    <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                        <label className="inline-flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name={name}
                                                value="present"
                                                checked={attendance[name] === 'present'}
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
                                                checked={attendance[name] === 'absent'}
                                                onChange={() => handleStatusChange(name, 'absent')}
                                                className="form-radio text-red-500 ring-red-400 focus:ring-2"
                                            />
                                            <span className="text-gray-700 font-medium">Absent</span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
                <button
                    onClick={handleSubmit}
                    className="w-full sm:w-1/2 px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105 duration-300 ease-in-out"
                >
                    Submit
                </button>
                <div className={`relative w-full sm:w-1/2 ${!isSubmitClicked ? 'group' : ''}`}>
                    <button
                        onClick={handleSendWhatsApp}
                        className={`w-full px-5 py-3 font-semibold rounded-lg shadow-lg transition-transform transform duration-300 ease-in-out ${isSubmitClicked ? 'bg-green-700 text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 hover:scale-105' : 'bg-green-400 text-gray-300 cursor-not-allowed'}`}
                        disabled={!isSubmitClicked || (result.present.length === 0 && result.absent.length === 0)}
                    >
                        Send to WhatsApp
                    </button>
                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-max p-2 rounded-lg bg-black text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${!isSubmitClicked ? 'group-hover:opacity-100' : ''}`}>
                        <span className="block">
                            Please click Submit to view the result first
                        </span>
                    </div>
                </div>
            </div>

            {result.present.length > 0 || result.absent.length > 0 ? (
                <div className="mt-6 sm:mt-8 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:space-x-4">
                        <div className="bg-blue-50 border border-blue-200 p-4 sm:p-6 rounded-lg shadow-sm w-full sm:w-1/2">
                            <h3 className="text-base sm:text-lg font-semibold text-blue-800 mb-4">
                                Total Present Students: {result.present.length}
                            </h3>
                            {showPresent && result.present.length > 0 && (
                                <div>
                                    <ol className="list-decimal pl-5 text-gray-800">
                                        {result.present.map((name) => (
                                            <li key={name} className="mb-1">{name}</li>
                                        ))}
                                    </ol>
                                </div>
                            )}
                            <button
                                onClick={() => setShowPresent(!showPresent)}
                                className={`mt-4 w-full px-4 py-2 ${showPresent ? 'bg-gray-300' : 'bg-blue-500'} text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300`}
                            >
                                {showPresent ? 'Hide Present List' : 'View Present List'}
                            </button>
                        </div>
                        <div className="bg-red-50 border border-red-200 p-4 sm:p-6 rounded-lg shadow-sm w-full sm:w-1/2">
                            <h3 className="text-base sm:text-lg font-semibold text-red-800 mb-4">
                                Total Absent Students: {result.absent.length}
                            </h3>
                            {
                                showAbsent && result.absent.length > 0 && (
                                    <div>
                                        <ol className="list-decimal pl-5 text-gray-800">
                                            {result.absent.map((name) => (
                                                <li key={name} className="mb-1">{name}</li>
                                            ))}
                                        </ol>
                                    </div>
                                )
                            }
                            <button
                                onClick={() => setShowAbsent(!showAbsent)}
                                className={`mt-4 w-full px-4 py-2 ${showAbsent ? 'bg-gray-300' : 'bg-red-500'} text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300`}
                            >
                                {showAbsent ? 'Hide Absent List' : 'View Absent List'}
                            </button>
                        </div >
                    </div >
                </div >
            ) : null}
        </div >
    );
};

export default AttendanceTable;