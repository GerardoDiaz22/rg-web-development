import './style.css';
import { setupCounter } from './counter.ts';
import fantasyBooks from '../json/fantasy-books.json';

// Ya que estamos. Agregamos la interfaz TS para el libro con los campos de interés
interface Book {
  title: string;
  authors: { name: string }[];
  formats: { [key: string]: string };
}

// Extraemos los resultados por comodidad y minimizar cambios de configuración del proyecto (import vs require)
const { results: bookResults } = fantasyBooks;

// Function to create a card for each book
function createBookCard(book: Book) {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card', 'mb-3');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const title = document.createElement('h5');
  title.classList.add('card-title');
  title.textContent = book.title;

  const author = document.createElement('p');
  author.classList.add('card-text');
  author.textContent = `Author: ${book.authors[0].name}`;

  // Add other book properties as needed (e.g., subjects, formats, etc.)

  /* Cambios realizados para la segunda asignación */

  // Creamos un contenedor para la imagen
  const cardImage = document.createElement('div');

  // Agregamos la clase para manejar la colocación de la imagen desde el contenedor
  cardImage.classList.add('card-img');

  // Creamos el elemento HTML para la imagen
  const image = document.createElement('img');

  // Agregamos el atributo src con la URL de la imagen
  image.src = book.formats['image/jpeg'];

  /*
    Agregamos la imagen (dentro del card-image) al card-div y no al card-body
    para evitar manejar más sub-contenedores.
  */
  cardImage.appendChild(image);
  cardDiv.appendChild(cardImage);

  cardBody.appendChild(title);
  cardBody.appendChild(author);
  cardDiv.appendChild(cardBody);

  return cardDiv;
}

// Get the container where cards will be added
const container = document.getElementById('bookContainer');

// Loop through the books and create cards dynamically

/*
  Por facilidad, creamos una función para la inicialización de los libros.
  Vamos a llamarla para renderizar cada ordenamiento.
*/
function setupBooks(books: Book[]) {
  // Limpiamos el contenedor de los libros para mostrar siempre los resultados esperados
  container.innerHTML = '';

  books.forEach((book) => {
    const bookCard = createBookCard(book);
    container.appendChild(bookCard);
  });
}

/*
  Creamos la función para agregar la función de ordenamiento al botón.
*/
function setSorting(books: Book[], element: HTMLButtonElement) {
  // Declaramos la variable para llevar el estado del ordenamiento
  let isAscending = true;

  const sortBooks = () => {
    // Invertimos el valor del ordenamiento
    isAscending = !isAscending;

    // Realizamos el ordenamiento
    const sortedBooks = books.sort((a, b) => {
      return isAscending
        ? // Orden ascendente
          a.title.localeCompare(b.title)
        : // Orden descendente
          b.title.localeCompare(a.title);
    });

    // Cambiamos el texto del botón
    element.innerText = isAscending ? 'Ordenar descendentemente' : 'Ordenar ascendentemente';

    // Llamamos al render de la lista con el nuevo orden
    setupBooks(sortedBooks);
  };

  // Agregamos el evento click para detonar el ordenamiento
  element.addEventListener('click', sortBooks);

  // Llamada inicial para el ordenamiento
  sortBooks();
}

setSorting(bookResults, document.querySelector<HTMLButtonElement>('#counter')!);
