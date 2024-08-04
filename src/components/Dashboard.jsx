import { useState, useMemo, useCallback } from 'react';
import Selector from './Selector';
import AttendanceRow from './AttendanceRow';
import SummarySection from './SummarySection';
import WhatsAppButton from './WhatsAppButton';
import DocxButton from './DocxButton';

const initialNames = [
    "Abinesh N", "Akash V", "Ashwin Gandhi A", "Booja R", "Hari Krishna B",
    "Jaya Prasanna E", "Jaya Ram S.N", "Jobin M.S", "Kanishka P.S", "Kathirvel M",
    "Krishna Kumar S", "Maha Nithra R", "Nagalingam I", "Naveen Raj S.U", "Nisha S",
    "Pavin P.T", "Pavithra M.V", "Pratheeban S", "Sakthi Abirame M", "Sakthi Pon Rani R",
    "Sakthi Suthan V", "Samuvel A", "Saran S", "Segi S", "Senegadharshini K",
    "Sree Devi M", "Sri Varun S", "Sujith Lalaso Patil", "Vengatesh S", "Yowan M"
];

const subjects = ['Entire Day', 'Tamil', 'English', 'PROGRAMMING in C++', 'Practical - PROGRAMMING in C++', 'Introduction to Data Science', 'Practical - PHP PROGRAMMING', 'Environmental Studies', '30 Days FSD B18 Novitech - 31.07.2024'];

const classes = ['2nd B.Sc. Computer Science', '3rd B.Sc. Computer Science', '1st B.Sc. Computer Science'];

const getFormattedDateTime = () => {
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const date = new Date();
    return `${date.toLocaleDateString(undefined, dateOptions)} at ${date.toLocaleTimeString(undefined, timeOptions)}`;
};

const Dashboard = () => {
    const [selectedClass, setSelectedClass] = useState(classes[0]);
    const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
    const [attendance, setAttendance] = useState(
        initialNames.reduce((acc, name) => ({ ...acc, [name]: 'present' }), {})
    );
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
    const [result, setResult] = useState({ present: [], absent: [] });
    const [showPresent, setShowPresent] = useState(false);
    const [showAbsent, setShowAbsent] = useState(false);

    const handleStatusChange = useCallback((name, status) => {
        setAttendance((prevAttendance) => ({
            ...prevAttendance,
            [name]: status
        }));
    }, []);

    const handleSubmit = useCallback(() => {
        const present = Object.entries(attendance)
            .filter(([, status]) => status === 'present')
            .map(([name]) => name);
        const absent = Object.entries(attendance)
            .filter(([, status]) => status === 'absent')
            .map(([name]) => name);

        setResult({ present, absent });
        setIsSubmitClicked(true);
    }, [attendance]);

    const handleSendWhatsApp = useCallback(() => {
        try {
            const { present, absent } = result;

            // Construct the message with enhanced formatting
            const message = `---  *Attendance Report*  ---\n\n` +
                `*Date and Time:* ${getFormattedDateTime()}\n\n` +
                `*Class:* ${selectedClass}\n\n` +
                `*Hours:* ${selectedSubject}\n\n` +
                `*Summary:*\n` +
                `- Total Present: ${present.length}\n` +
                `- Total Absent: ${absent.length}\n\n` +
                `*--- Absentees List (${absent.length}) ---*\n` +
                `${absent.length > 0 ? absent.map((name, index) => `${index + 1}. ${name}`).join('\n') : 'No students absent.'}`;

            // Encode the message for URL
            const encodedMessage = encodeURIComponent(message);

            // Construct the WhatsApp URL
            const whatsappURL = `https://wa.me/?text=${encodedMessage}`;

            // Open the URL in a new tab
            window.open(whatsappURL, '_blank');

            // Optionally provide user feedback
            console.log('Attendance report sent to WhatsApp.');
        } catch (error) {
            // Handle errors
            console.error('Failed to send attendance report:', error);
            alert('Failed to send the attendance report. Please try again.');
        }
    }, [result, selectedClass, selectedSubject]);

    const memoizedAttendanceRows = useMemo(() => (
        initialNames.map((name, index) => (
            <AttendanceRow
                key={name}
                index={index}
                name={name}
                status={attendance[name]}
                handleStatusChange={handleStatusChange}
            />
        ))
    ), [attendance, handleStatusChange]);

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <header className="bg-blue-700 text-white text-center py-4">
                    <h1 className="text-2xl sm:text-3xl font-bold">Attendance Notifier Via Whatsapp</h1>
                    <p className="text-sm sm:text-lg mt-1">[ 2024-25 ] - PKC</p>
                </header>
                <main className="p-4 sm:p-6 w-full">
                    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4 w-full p-6 rounded-lg border-2">
                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <div className="flex-1">
                                <Selector
                                    selectedClass={selectedClass}
                                    setSelectedClass={setSelectedClass}
                                    classes={classes}
                                    selectedSubject={selectedSubject}
                                    setSelectedSubject={setSelectedSubject}
                                    subjects={subjects}
                                />
                            </div>
                        </div>
                    </div>
                    <table className="w-full divide-y divide-gray-300 mb-6 bg-white shadow-sm rounded-lg">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="px-2 py-1 sm:px-4 sm:py-2 text-center text-xs sm:text-lg font-medium">No.</th>
                                <th className="px-2 py-1 sm:px-4 sm:py-2 text-center text-xs sm:text-lg font-medium">Name</th>
                                <th className="px-2 py-1 sm:px-4 sm:py-2 text-center text-xs sm:text-lg font-medium">Attendance</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {memoizedAttendanceRows}
                        </tbody>
                    </table>
                    <div className="flex flex-col sm:flex-row gap-4 w-full mb-6">
                        <button
                            onClick={handleSubmit}
                            className="flex-1 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg transition-transform transform duration-300 ease-in-out hover:bg-blue-600 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 active:bg-blue-700 active:shadow-md text-sm uppercase"
                            aria-label="Submit form"
                            aria-live="polite"
                        >
                            Submit
                        </button>
                        <div className="flex-1">
                            <WhatsAppButton
                                isSubmitClicked={isSubmitClicked}
                                handleSendWhatsApp={handleSendWhatsApp}
                            />
                        </div>
                    </div>
                    <div className="w-full mb-6">
                        <DocxButton
                            result={result}
                            selectedClass={selectedClass}
                            selectedSubject={selectedSubject}
                        />
                    </div>
                </main>
                <footer className="bg-gray-100 text-gray-600 text-center py-6">
                    <SummarySection
                        result={result}
                        showPresent={showPresent}
                        setShowPresent={setShowPresent}
                        showAbsent={showAbsent}
                        setShowAbsent={setShowAbsent}
                    />
                </footer>
            </div>
        </div>
    );
};

export default Dashboard;