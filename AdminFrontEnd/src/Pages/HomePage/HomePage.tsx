// Homepage.tsx
import React, { useState, useEffect, useRef} from 'react';
import { Layout } from "antd";
import "./homepage.css";
import { getAllBooks } from "../../services/BookService";
import { getAllUsers } from "../../services/UserService";
const { Content, Footer } = Layout;
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { Chart } from 'chart.js/auto';

// const lastrecentusers = [
//     {
//         "Name": "quang vu",
//         "id": 1222,
//         "Book": "Calculus",
//         "Time": "12:30pm"
//     },
//     {
//         "Name": "Alice Smith",
//         "id": 3456,
//         "Book": "Physics",
//         "Time": "10:45am"
//     },
//     {
//         "Name": "John Doe",
//         "id": 7890,
//         "Book": "Chemistry",
//         "Time": "3:15pm"
//     },
//     {
//         "Name": "Emily Johnson",
//         "id": 5432,
//         "Book": "Biology",
//         "Time": "2:00pm"
//     }
// ];

const chartData: ChartData<'line', number[], string> = {
    labels: Array.from({ length: 20 }, (_, i) => `Day ${i + 1}`), // Creates an array of labels from 'Day 1' to 'Day 20'
    datasets: [
        {
            label: 'Number of Users',
            data: [10, 20, 15, 25, 30, 18, 22, 28, 35, 40, 38, 42, 37, 45, 50, 48, 52, 58, 55, 60], // Replace with your actual data (number of users)
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
        },
    ],
};

const chartOptions: ChartOptions<'line'> = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

interface MyChartProps {
    data: ChartData<'line', number[], string>;
    options: ChartOptions;
}

const MyChart: React.FC<MyChartProps> = ({ data, options }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
  
    useEffect(() => {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
        if (ctx) {
          new Chart(ctx, {
            type: 'line',
            data,
            options,
          });
        }
      }
    }, [data, options]);
  
    return <canvas ref={chartRef}></canvas>;
  };

const Homepage: React.FC = () => {
    const [totalBooks, setTotalBooks] = useState<number>(0);
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [booksReturnedToday, setBooksReturnedToday] = useState<number>(0);
    const [booksBorrowedToday, setBooksBorrowedToday] = useState<number>(0);

    const [topBooks, setTopBooks] = useState<any[]>([]);
    //fetch books, users, and recent users
    useEffect(() => {
        async function fetchBooks() {
            try {
                const fetchedBooks = await getAllBooks();
                const fetchedUsers = await getAllUsers();
                // fetchedBooks.sort((a, b) => a.bookID - b.bookID);
                const topFiveBooks = fetchedBooks.slice(0, 5);
                setTopBooks(topFiveBooks);

                // Calculate total number of books
                setTotalBooks(fetchedBooks.length);
            
                // Calculate total number of users (assuming lastrecentusers contains all users)
                setTotalUsers(fetchedUsers.length);
                // Calculate books returned today
                setBooksReturnedToday(123);
                // Calculate books borrowed today
                setBooksBorrowedToday(342);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        }
    
        fetchBooks(); // Call the function here
    }, []);

    // Similar search handling functions and filtered results logic as before

    return (
        <Layout>
            <Content>
                <div className="homepage">
                    <h1>Welcome to the homepage of our LIBRARY.</h1>

                    <div className="statistics-container">
                        <div className="statistic-box totalBooks">
                            <div>
                                <h3>Total Books</h3>
                                <p>{totalBooks}</p>
                            </div>
                            <i className="bx bx-book icon"></i> {/* Icon for total books */}
                        </div>
                        <div className="statistic-box totalUsers">
                            <div>
                                <h3>Total Users</h3>
                                <p>{totalUsers}</p>
                            </div>
                            <i className="bx bx-user icon"></i> {/* Icon for total users */}
                        </div>
                        <div className="statistic-box return">
                            <div>
                                <h3>Books Returned Today</h3>
                                <p>{booksReturnedToday}</p>
                            </div>
                            <i className="bx bx-calendar-check icon"></i> {/* Icon for books returned today */}
                        </div>
                        <div className="statistic-box borrow">
                            <div>
                                <h3>Books Borrowed Today</h3>
                                <p>{booksBorrowedToday}</p>
                            </div>
                            <i className="bx bx-calendar-plus icon"></i> {/* Icon for books borrowed today */}
                        </div>
                    </div>


                    <div className="TopBooks">
                        <h2>Top 5 Books</h2>
                        <div className="topbookContainer">
                        {topBooks.map((book) => (
                            <div key={book.bookID} className="bookContainer">
                                <img
                                    src={`data:image/jpeg;base64,${book.image}`} // Assuming imageUrl is the property containing the image URL
                                    alt={book.title}
                                />
                            <p className='bookTitle'>{book.title}</p>
                            </div>
                        ))}
                        </div>
                    </div>

                    <div style={{ height: '700px', width: "100%"}}>
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>
                </Content>

            <Footer style={{ textAlign: "center" }} className="footer">
                Copy Right: ©{new Date().getFullYear()} Created by Hailu
            </Footer>
        </Layout>
    );
};

export default Homepage;
