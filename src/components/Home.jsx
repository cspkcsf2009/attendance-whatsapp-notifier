import { useState, useCallback } from 'react';
import ClassAndSubjectSelector from './ClassAndSubjectSelector';
import AttendanceTable from './AttendanceTable'; // Import the modified AttendanceTable component
import SummarySection from './SummarySection';
import WhatsAppButton from './WhatsAppButton';
import DocxButton from './DocxButton';
import MarkAllButtons from './MarkAllButtons'; // Import the new component

const initialNames = [
    "Abinesh N", "Akash V", "Ashwin Gandhi A", "Booja R", "Hari Krishna B", "Jaya Prasanna E", "Jaya Ram S.N", "Jobin M.S", "Kanishka P.S", "Kathirvel M", "Krishna Kumar S", "Maha Nithra R", "Nagalingam I", "Naveen Raj S.U", "Nisha S", "Pavin P.T", "Pavithra M.V", "Pratheeban S", "Sakthi Abirame M", "Sakthi Pon Rani R", "Sakthi Suthan V", "Samuvel A", "Saran S", "Segi S", "Senegadharshini K", "Sree Devi M", "Sri Varun S", "Sujith Lalaso Patil", "Vengatesh S", "Yowan M"
];

const subjects = ['Entire Day', 'Tamil', 'English', 'PROGRAMMING in C++', 'Practical - PROGRAMMING in C++', 'Introduction to Data Science', 'Practical - PHP PROGRAMMING', 'Environmental Studies', 'FSD B18 Novitech'];

// 30 Days FSD B18 Novitech - 31.07.2024

const classes = ['2nd B.Sc. Computer Science', '3rd B.Sc. Computer Science', '1st B.Sc. Computer Science'];

const Home = () => {
    const [selectedClass, setSelectedClass] = useState(classes[0]);
    const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
    const [isManualSubject, setIsManualSubject] = useState(false); // Track if subject is entered manually
    const [attendance, setAttendance] = useState(
        initialNames.reduce((acc, name) => ({ ...acc, [name]: 'Present' }), {})
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
        // Capture the original order of names based on the keys in the attendance object
        const originalOrder = Object.keys(attendance);

        // Create a map to store the index of each name in the originalOrder array
        const indexMap = originalOrder.reduce((map, name, index) => {
            map[name] = index + 1; // Adding 1 to make indices start from 1
            return map;
        }, {});

        // Create arrays for present and absent with the correct index and rollNo
        const presentWithIndex = originalOrder
            .filter(name => attendance[name] === 'Present')
            .map(name => ({ name, index: indexMap[name], rollNo: indexMap[name].toString(), attendanceStatus: 'Present' }));
        const absentWithIndex = originalOrder
            .filter(name => attendance[name] === 'Absent')
            .map(name => ({ name, index: indexMap[name], rollNo: indexMap[name].toString(), attendanceStatus: 'Absent' }));

        // Combine present and absent arrays
        const combinedWithIndex = [...presentWithIndex, ...absentWithIndex];

        // Sort combined array by index
        const sorted = combinedWithIndex.sort((a, b) => a.index - b.index);

        // Set result with sorted names and handle empty arrays
        setResult({
            present: sorted.filter(item => attendance[item.name] === 'Present') || [],
            absent: sorted.filter(item => attendance[item.name] === 'Absent') || [],
        });
        setIsSubmitClicked(true);

        // Log the final combined and sorted array
        // console.log('Sorted Combined Names with Index:', sorted);
    }, [attendance]);

    const handleMarkAllPresent = () => {
        setAttendance((prevAttendance) => {
            const newAttendance = { ...prevAttendance };
            initialNames.forEach(name => {
                newAttendance[name] = 'Present';
            });
            return newAttendance;
        });
    };

    const handleMarkAllAbsent = () => {
        setAttendance((prevAttendance) => {
            const newAttendance = { ...prevAttendance };
            initialNames.forEach(name => {
                newAttendance[name] = 'Absent';
            });
            return newAttendance;
        });
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <header className="bg-blue-700 text-white text-center py-4">
                    <h1 className="text-2xl sm:text-3xl font-bold">Attendance Notifier</h1>
                    <h3 className="text-xl sm:text-2xl font-bold">Whatsapp</h3>
                    <p className="text-sm sm:text-lg mt-1">[ 2024-25 ] - PKC</p>
                </header>
                <main className="px-4 pt-4 pb-0 sm:px-6 sm:pt-6 sm:pb-0 w-full">
                    <ClassAndSubjectSelector
                        selectedClass={selectedClass}
                        setSelectedClass={setSelectedClass}
                        classes={classes}
                        selectedSubject={selectedSubject}
                        setSelectedSubject={(subject) => {
                            setSelectedSubject(subject);
                            setIsManualSubject(!subjects.includes(subject));
                        }}
                        subjects={subjects}
                    />
                    <MarkAllButtons
                        handleMarkAllPresent={handleMarkAllPresent}
                        handleMarkAllAbsent={handleMarkAllAbsent}
                    />
                    <AttendanceTable
                        initialNames={initialNames}
                        attendance={attendance}
                        handleStatusChange={handleStatusChange}
                    />
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
                                result={result}
                                selectedClass={selectedClass}
                                selectedSubject={selectedSubject}
                                isManualSubject={isManualSubject}
                            />
                        </div>
                    </div>
                    <DocxButton
                        result={result}
                        selectedClass={selectedClass}
                        selectedSubject={selectedSubject}
                    />
                </main>
                <footer className=" text-center px-4 pb-6">
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

export default Home;