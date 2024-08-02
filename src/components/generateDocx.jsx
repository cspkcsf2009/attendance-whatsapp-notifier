import { Document, Packer, Paragraph, Table, TableCell, TableRow, HeadingLevel, TextRun, WidthType, PageSize, BorderStyle } from 'docx';

// Function to create a table with data and headers
const createTable = (data, header) => {
    return new Table({
        rows: [
            // Header Row
            new TableRow({
                children: header.map(text => new TableCell({
                    children: [new Paragraph({
                        children: [new TextRun({ text, bold: true, size: 50, color: 'FFFFFF' })], // Header font size and color
                        alignment: 'center',
                        spacing: { before: 200, after: 200 },
                    })],
                    shading: { fill: '4F81BD' }, // Dark blue background for header
                    borders: {
                        top: { style: BorderStyle.SINGLE, size: 4, space: 0 },
                        bottom: { style: BorderStyle.SINGLE, size: 4, space: 0 },
                    },
                })),
                tableHeader: true,
            }),
            // Data Rows
            ...data.map(row => {
                const isAbsent = row[2] === 'Absent'; // Check if the status is 'Absent'

                return new TableRow({
                    children: row.map(cell => new TableCell({
                        children: [new Paragraph({
                            children: [new TextRun({ text: cell, size: 36 })], // Cell font size
                            alignment: 'center',
                            spacing: { before: 100, after: 100 },
                        })],
                        borders: {
                            top: { style: BorderStyle.SINGLE, size: 2, space: 0 },
                            bottom: { style: BorderStyle.SINGLE, size: 2, space: 0 },
                        },
                        shading: isAbsent ? { fill: 'FF0000' } : { fill: 'F9F9F9' }, // Red background for absent rows
                    })),
                });
            }),
        ],
        width: {
            size: 100, // Table width in percentage
            type: WidthType.PERCENTAGE,
        },
    });
};

// Function to generate the .docx file
export const generateDocx = async (newData, selectedClass, selectedSubject, date, counts) => {
    const docSections = [];

    // Extract counts with default values to avoid destructuring errors
    const { presentCount = 0, absentCount = 0 } = counts || {};

    // Create header paragraphs with date, class, subject, and counts
    const header = [
        `Class: ${selectedClass}`,
        `${selectedSubject}`,
        `Date: ${date}`,
        `Present Count: ${presentCount}`,
        `Absent Count: ${absentCount}`,
    ];

    // Add the main title for the document
    docSections.push(new Paragraph({
        heading: HeadingLevel.HEADING_1, // Set the heading level for the title
        alignment: 'center', // Center align the title
        spacing: { after: 350 }, // Adjust spacing after the heading
        children: [new TextRun({
            text: 'Attendance Report',
            bold: true, // Make the title bold
            size: 100, // Title font size
            color: '4F81BD', // Dark blue color for the title
        })],
    }));

    // Add header information paragraphs
    docSections.push(...header.map(text => new Paragraph({
        children: [new TextRun({ text, size: 60, color: '333333' })], // Font size and color for header information
        alignment: 'center', // Center align header information
        spacing: { before: 250, after: 250 }, // Reduced spacing before and after each header line
    })));

    // Prepare data rows for the table
    const newRows = newData.map(([name, status], index) => [
        (index + 1).toString(), // Serial number
        name,
        status,
    ]);
    // console.log("Prepared rows:", newRows);

    // Add the table to the document sections
    docSections.push(createTable(newRows, ['No.', 'Name', 'Status']));

    // Create the document with sections and page properties
    const doc = new Document({
        sections: [
            {
                children: docSections,
                properties: {
                    page: {
                        size: PageSize.A4, // Set page size to A4
                        margins: {
                            top: 1134,   // 2 cm margin at the top
                            right: 1134, // 2 cm margin on the right
                            bottom: 1134, // 2 cm margin at the bottom
                            left: 1134,  // 2 cm margin on the left
                        },
                    },
                },
            },
        ],
    });

    try {
        // Convert the document to a Blob and return it
        const blob = await Packer.toBlob(doc);
        return blob;
    } catch (error) {
        // Log and throw an error if document generation fails
        console.error('Error generating .docx file:', error);
        throw new Error('Error generating .docx file.');
    }
};