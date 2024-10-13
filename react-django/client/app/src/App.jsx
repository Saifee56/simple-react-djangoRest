import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [newTitle, setNewTitle] = useState('');

  // Title callback
  function handleTitle(e) {
    setTitle(e.target.value);
  }

  // Release Year Callback
  function handleReleaseYear(e) {
    setReleaseYear(e.target.value);
  }

  function handleNewTitle(e) {
    setNewTitle(e.target.value);
  }

  const updateTitle = async (pk, release_year) => {
    const bookData = {
      book_title: newTitle,
      release_year,
    };
    try {
      const response = await fetch(`http://127.0.0.1:8000/books/${pk}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error('Failed to update book');
      }

      const data = await response.json();
      console.log('Book updated:', data);

      // Update the books list after successful update
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === pk ? { ...book, book_title: newTitle } : book
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/');
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Adding books from frontend (POST request)
  const addBook = async () => {
    const bookData = {
      book_title: title,
      release_year: releaseYear,
    };
    try {
      const response = await fetch('http://127.0.0.1:8000/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error('Failed to add book');
      }

      const data = await response.json();
      setBooks((prev) => [...prev, data]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBook=async(pk)=>{
    try {
      const response = await fetch(`http://127.0.0.1:8000/books/${pk}`, {
        method: 'DELETE',
      
      });

      setBooks((prev) => prev.filter((book) => book.id !== pk));
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <h1>Book Website</h1>
      <div>
        <input type="text" placeholder="Book Title..." onChange={handleTitle} />
        <input type="text" placeholder="Release Date" onChange={handleReleaseYear} />
        <button onClick={addBook}>Add Book</button>
        {books.map((book) => (
          <div key={book.id}>
            <p>Title: {book.book_title}</p>
            <p>Release year: {book.release_year}</p>
            <input type="text" placeholder="New Title" onChange={handleNewTitle} />
            <button onClick={() => updateTitle(book.id, book.release_year)}>
              Change Title
            </button>
            <button onClick={() => deleteBook(book.id)}>
              Delete Book
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
