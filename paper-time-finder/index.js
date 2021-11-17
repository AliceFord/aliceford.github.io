const EDEXCEL_DATA = [
    {"date": "17/05/2022","qualification": "IGCSE","examCode": "4AC1 01","subject": "Accounting","title": "Paper 1: Introduction to Bookkeeping and Accounting","amPM": "PM","duration": "2h 00m"},
{"date": "14/06/2022","qualification": "IGCSE","examCode": "4AC1 02","subject": "Accounting","title": "Paper 2: Financial Statements","amPM": "AM","duration": "1h 15m"},
{"date": "31/05/2022","qualification": "IGCSE","examCode": "4AA1 01","subject": "Arabic ","title": "Paper 1: Reading, Summary and Grammar","amPM": "AM","duration": "2h 15m"},    
{"date": "16/06/2022","qualification": "IGCSE","examCode": "4AA1 02","subject": "Arabic ","title": "Paper 2: Writing","amPM": "AM","duration": "1h 30m"},
{"date": "30/05/2022","qualification": "IGCSE","examCode": "4BA0 01","subject": "Bangla","title": "Paper 1: Reading, Writing and Translation","amPM": "PM","duration": "2h 30m"}, 
{"date": "19/05/2022","qualification": "IGCSE","examCode": "4BN1 01","subject": "Bangladesh Studies","title": "Paper 1: History and culture of Bangladesh","amPM": "PM","duration": "1h 30m"},
{"date": "31/05/2022","qualification": "IGCSE","examCode": "4BN1 02","subject": "Bangladesh Studies","title": "Paper 2: The landscape, people and economy of Bangladesh","amPM": "PM","duration": "1h 30m"},
{"date": "17/05/2022","qualification": "IGCSE","examCode": "4BI1 1B","subject": "Biology","title": "Paper: 1B","amPM": "AM","duration": "2h 00m"},
{"date": "15/06/2022","qualification": "IGCSE","examCode": "4BI1 2B","subject": "Biology","title": "Paper: 2B","amPM": "AM","duration": "1h 15m"},
{"date": "19/05/2022","qualification": "IGCSE","examCode": "4BS1 01","subject": "Business ","title": "Paper 1: Investigating small businesses","amPM": "PM","duration": "1h 30m"},{"date": "13/06/2022","qualification": "IGCSE","examCode": "4BS1 02","subject": "Business ","title": "Paper 2: Investigating large businesses","amPM": "AM","duration": "1h 30m"},{"date": "27/05/2022","qualification": "IGCSE","examCode": "4CH1 1C","subject": "Chemistry","title": "Paper: 1C","amPM": "AM","duration": "2h 00m"},
{"date": "20/06/2022","qualification": "IGCSE","examCode": "4CH1 2C","subject": "Chemistry","title": "Paper: 2C","amPM": "AM","duration": "1h 15m"},
{"date": "25/05/2022","qualification": "IGCSE","examCode": "4CN1 01","subject": "Chinese","title": "Paper 1: Listening","amPM": "PM","duration": "0h 35m"},
{"date": "25/05/2022","qualification": "IGCSE","examCode": "4CN1 02","subject": "Chinese","title": "Paper 2: Reading and Writing ","amPM": "PM","duration": "1h 45m"},
{"date": "01/06/2022","qualification": "IGCSE","examCode": "4CM1 01","subject": "Commerce","title": "Paper 1: Commercial operations and associated risks","amPM": "AM","duration": "1h 30m"},
{"date": "16/06/2022","qualification": "IGCSE","examCode": "4CM1 02","subject": "Commerce","title": "Paper 2: Facilitating commerical operations","amPM": "PM","duration": "1h 30m"},
{"date": "20/05/2022","qualification": "IGCSE","examCode": "4CP0 01","subject": "Computer Science","title": "Paper 1: Principles of Computer Science","amPM": "PM","duration": "2h 00m"},
{"date": "06/06/2022","qualification": "IGCSE","examCode": "4CP0 02","subject": "Computer Science","title": "Paper 2: Application of Computational Thinking","amPM": "N/A","duration": "3h 00m"},
{"date": "07/06/2022","qualification": "IGCSE","examCode": "4CP0 02","subject": "Computer Science","title": "Paper 2: Application of Computational Thinking","amPM": "N/A","duration": "3h 00m"},
{"date": "08/06/2022","qualification": "IGCSE","examCode": "4CP0 02","subject": "Computer Science","title": "Paper 2: Application of Computational Thinking","amPM": "N/A","duration": "3h 00m"},
{"date": "24/05/2022","qualification": "IGCSE","examCode": "4EC1 01","subject": "Economics","title": "Paper 1: Microeconomics and Business Economics","amPM": "PM","duration": "1h 30m"},
{"date": "14/06/2022","qualification": "IGCSE","examCode": "4EC1 02","subject": "Economics","title": "Paper 2: Macroeconomics and the Global Economy","amPM": "PM","duration": "1h 30m"},
{"date": "16/05/2022","qualification": "IGCSE","examCode": "4ES1 01","subject": "English as a Second Language","title": "Paper 1: Reading and Writing","amPM": "PM","duration": "2h 00m"},
{"date": "06/06/2022","qualification": "IGCSE","examCode": "4ES1 02","subject": "English as a Second Language","title": "Paper 2: Listening","amPM": "AM","duration": "0h 55m"},  
{"date": "18/05/2022","qualification": "IGCSE","examCode": "4EA1 01","subject": "English Language A","title": "Paper 1: Non-fiction Texts and Transactional Writing","amPM": "AM","duration": "2h 15m"},
{"date": "10/06/2022","qualification": "IGCSE","examCode": "4EA1 02","subject": "English Language A","title": "Paper 2: Poetry and Prose Texts and Imaginative Writing","amPM": "AM","duration": "1h 30m"},
{"date": "18/05/2022","qualification": "IGCSE","examCode": "4EB1 01","subject": "English Language B","title": "Paper 1","amPM": "AM","duration": "3h 00m"},
{"date": "25/05/2022","qualification": "IGCSE","examCode": "4ET1 01","subject": "English Literature","title": "Paper 1: Poetry and Modern Prose","amPM": "AM","duration": "1h 20m"},
{"date": "08/06/2022","qualification": "IGCSE","examCode": "4ET1 02","subject": "English Literature","title": "Paper 2: Modern Drama and Literary Heritage Texts","amPM": "AM","duration": "1h 30m"},
{"date": "24/05/2022","qualification": "IGCSE","examCode": "4FR1 01","subject": "French","title": "Paper 1: Listening ","amPM": "AM","duration": "0h 35m"},
{"date": "24/05/2022","qualification": "IGCSE","examCode": "4FR1 02","subject": "French","title": "Paper 2: Reading and Writing ","amPM": "AM","duration": "1h 45m"},
{"date": "26/05/2022","qualification": "IGCSE","examCode": "4PM1 01","subject": "Further Pure Mathematics","title": "Paper 1","amPM": "PM","duration": "2h 00m"},
{"date": "17/06/2022","qualification": "IGCSE","examCode": "4PM1 02","subject": "Further Pure Mathematics","title": "Paper 2","amPM": "AM","duration": "2h 00m"},
{"date": "23/05/2022","qualification": "IGCSE","examCode": "4GE1 01","subject": "Geography","title": "Paper 1: Physical geography","amPM": "AM","duration": "1h 10m"},
{"date": "07/06/2022","qualification": "IGCSE","examCode": "4GE1 02","subject": "Geography","title": "Paper 2: Human geography","amPM": "PM","duration": "1h 45m"},
{"date": "18/05/2022","qualification": "IGCSE","examCode": "4GN1 01","subject": "German","title": "Paper 1: Listening ","amPM": "PM","duration": "0h 35m"},
{"date": "18/05/2022","qualification": "IGCSE","examCode": "4GN1 02","subject": "German","title": "Paper 2: Reading and Writing ","amPM": "PM","duration": "1h 45m"},
{"date": "23/05/2022","qualification": "IGCSE","examCode": "4GL1 01","subject": "Global Citizenship","title": "Paper 1","amPM": "PM","duration": "2h 30m"},
{"date": "01/06/2022","qualification": "IGCSE","examCode": "4GK1 01","subject": "Greek (First Language)","title": "Paper 1: Reading, Summary and Grammar ","amPM": "PM","duration": "2h 15m"},
{"date": "15/06/2022","qualification": "IGCSE","examCode": "4GK1 02","subject": "Greek (First Language)","title": "Paper 2: Writing ","amPM": "PM","duration": "1h 30m"},
{"date": "19/05/2022","qualification": "IGCSE","examCode": "4HI1 1A","subject": "History","title": "Paper 1: Depth Studies A","amPM": "AM","duration": "1h 30m"},
{"date": "19/05/2022","qualification": "IGCSE","examCode": "4HI1 1B","subject": "History","title": "Paper 1: Depth Studies B","amPM": "AM","duration": "0h 45m"},
{"date": "09/06/2022","qualification": "IGCSE","examCode": "4HI1 2A","subject": "History","title": "Paper 2: Investigation ","amPM": "AM","duration": "0h 45m"},
{"date": "09/06/2022","qualification": "IGCSE","examCode": "4HI1 2B","subject": "History","title": "Paper 2: Investigation and Breadth Studies","amPM": "AM","duration": "1h 30m"},
{"date": "17/05/2022","qualification": "IGCSE","examCode": "4HB1 01","subject": "Human Biology","title": "Paper 01","amPM": "PM","duration": "1h 45m"},
{"date": "06/06/2022","qualification": "IGCSE","examCode": "4HB1 02","subject": "Human Biology","title": "Paper 02","amPM": "PM","duration": "1h 45m"},
{"date": "16/05/2022","qualification": "IGCSE","examCode": "4IT1 01","subject": "Information And Communication Technology (ICT)","title": "Paper 1: Written Paper","amPM": "PM","duration": "1h 30m"},
{"date": "23/05/2022","qualification": "IGCSE","examCode": "4IT1 02","subject": "Information And Communication Technology (ICT)","title": "Paper 2: Practical Exam","amPM": "N/A","duration": "3h 00m"},
{"date": "24/05/2022","qualification": "IGCSE","examCode": "4IT1 02","subject": "Information And Communication Technology (ICT)","title": "Paper 2: Practical Exam","amPM": "N/A","duration": "3h 00m"},
{"date": "25/05/2022","qualification": "IGCSE","examCode": "4IT1 02","subject": "Information And Communication Technology (ICT)","title": "Paper 2: Practical Exam","amPM": "N/A","duration": "3h 00m"},
{"date": "26/05/2022","qualification": "IGCSE","examCode": "4IT1 02","subject": "Information And Communication Technology (ICT)","title": "Paper 2: Practical Exam","amPM": "N/A","duration": "3h 00m"},
{"date": "27/05/2022","qualification": "IGCSE","examCode": "4IT1 02","subject": "Information And Communication Technology (ICT)","title": "Paper 2: Practical Exam","amPM": "N/A","duration": "3h 00m"},
{"date": "30/05/2022","qualification": "IGCSE","examCode": "4IS1 01","subject": "Islamic Studies","title": "Paper 1: Islamic Studies","amPM": "AM","duration": "2h 30m"},
{"date": "20/05/2022","qualification": "IGCSE","examCode": "4MA1 1F","subject": "Mathematics A","title": "Paper 1F Foundation Tier","amPM": "AM","duration": "2h 00m"},
{"date": "20/05/2022","qualification": "IGCSE","examCode": "4MA1 1H","subject": "Mathematics A","title": "Paper 1H Higher Tier","amPM": "AM","duration": "2h 00m"},
{"date": "07/06/2022","qualification": "IGCSE","examCode": "4MA1 2F","subject": "Mathematics A","title": "Paper 2F Foundation Tier","amPM": "AM","duration": "2h 00m"},
{"date": "07/06/2022","qualification": "IGCSE","examCode": "4MA1 2H","subject": "Mathematics A","title": "Paper 2H Higher Tier","amPM": "AM","duration": "2h 00m"},
{"date": "20/05/2022","qualification": "IGCSE","examCode": "4MB1 01","subject": "Mathematics B","title": "Paper 1","amPM": "AM","duration": "1h 30m"},
{"date": "07/06/2022","qualification": "IGCSE","examCode": "4MB1 02","subject": "Mathematics B","title": "Paper 2","amPM": "AM","duration": "2h 30m"},
{"date": "01/06/2022","qualification": "IGCSE","examCode": "4PA1 01","subject": "Pakistan Studies","title": "Paper 1: History and culture of Pakistan","amPM": "AM","duration": "1h 30m"},
{"date": "13/06/2022","qualification": "IGCSE","examCode": "4PA1 02","subject": "Pakistan Studies","title": "Paper 2: The landscape, people and economy of Pakistan","amPM": "PM","duration": "1h 30m"},
{"date": "09/06/2022","qualification": "IGCSE","examCode": "4PH1 1P","subject": "Physics","title": "Paper: 1P","amPM": "PM","duration": "2h 00m"},
{"date": "23/06/2022","qualification": "IGCSE","examCode": "4PH1 2P","subject": "Physics","title": "Paper: 2P","amPM": "AM","duration": "1h 15m"},
{"date": "16/05/2022","qualification": "IGCSE","examCode": "4RS1 01","subject": "Religious Studies","title": "Paper 1: Beliefs and Values","amPM": "AM","duration": "1h 45m"},    
{"date": "08/06/2022","qualification": "IGCSE","examCode": "4RS1 02","subject": "Religious Studies","title": "Paper 2: The Religious Community","amPM": "PM","duration": "1h 30m"},
{"date": "17/05/2022","qualification": "IGCSE","examCode": "4SD0 1B","subject": "Science (Double Award)","title": "Paper: 1B","amPM": "AM","duration": "2h 00m"},
{"date": "09/06/2022","qualification": "IGCSE","examCode": "4SD0 1P","subject": "Science (Double Award)","title": "Paper: 1P","amPM": "PM","duration": "2h 00m"},
{"date": "27/05/2022","qualification": "IGCSE","examCode": "4SD0 1C","subject": "Science (Double Award)","title": "Paper: 1C","amPM": "AM","duration": "2h 00m"},
{"date": "23/06/2022","qualification": "IGCSE","examCode": "4SS0 1P","subject": "Science (Single Award)","title": "Paper: 1P","amPM": "AM","duration": "1h 10m"},
{"date": "15/06/2022","qualification": "IGCSE","examCode": "4SS0 1B","subject": "Science (Single Award)","title": "Paper: 1B","amPM": "AM","duration": "1h 10m"},
{"date": "20/06/2022","qualification": "IGCSE","examCode": "4SS0 1C","subject": "Science (Single Award)","title": "Paper: 1C","amPM": "AM","duration": "1h 10m"},
{"date": "17/06/2022","qualification": "IGCSE","examCode": "4SI1 01","subject": "Sinhala","title": "Paper 1: Reading, Writing and Translation","amPM": "PM","duration": "2h 30m"},{"date": "26/05/2022","qualification": "IGCSE","examCode": "4SP1 01","subject": "Spanish","title": "Paper 1: Listening ","amPM": "AM","duration": "0h 35m"},
{"date": "26/05/2022","qualification": "IGCSE","examCode": "4SP1 02","subject": "Spanish","title": "Paper 2: Reading and Writing ","amPM": "AM","duration": "1h 45m"},
{"date": "01/06/2022","qualification": "IGCSE","examCode": "4SW1 01","subject": "Swahili","title": "Paper 1: Reading, Writing and Translation","amPM": "PM","duration": "2h 15m"},{"date": "01/06/2022","qualification": "IGCSE","examCode": "4SW1 02","subject": "Swahili","title": "Paper 2: Listening","amPM": "PM","duration": "0h 35m"},
{"date": "10/06/2022","qualification": "IGCSE","examCode": "4TA1 01","subject": "Tamil","title": "Paper 1: Reading, Writing and Translation","amPM": "PM","duration": "2h 30m"}
];

const mainTable = document.getElementById("main-table");

updateTable("");

function updateTable(query) {
    mainTable.innerHTML = "";
    EDEXCEL_DATA.forEach(function(item, index) {
        if (query == "" || item.subject.toLowerCase().includes(query)) {
            let currentRow = mainTable.insertRow(-1);
            currentRow.insertCell(0).innerHTML = item.subject;
            currentRow.insertCell(1).innerHTML = item.date;
            currentRow.insertCell(2).innerHTML = item.amPM;
            currentRow.insertCell(3).innerHTML = "Edexcel";
            currentRow.insertCell(4).innerHTML = item.qualification;
            currentRow.insertCell(5).innerHTML = item.examCode;
            currentRow.insertCell(6).innerHTML = item.title;
            currentRow.insertCell(7).innerHTML = item.duration;
        }
    });
    }

function updateSearch() {
    const searchInputValue = document.getElementById("subject-input").value.toLowerCase();
    updateTable(searchInputValue);
}
