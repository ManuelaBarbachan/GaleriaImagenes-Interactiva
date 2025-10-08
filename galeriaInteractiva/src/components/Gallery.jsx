import ImageCard from "./ImageCard.jsx";

const INITIAL_IMAGES = [
  {
    id: 1,
    title: "Paris",
    url: "https://www.royalcaribbean.com/media-assets/pmc/content/dam/shore-x/paris-le-havre-leh/lh17-paris-sightseeing-without-lunch/stock-photo-skyline-of-paris-with-eiffel-tower-at-sunset-in-paris-france-eiffel-tower-is-one-of-the-most-752725282.jpg?w=1920",
  },
  {
    id: 2,
    title: "Madrid",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwlKE6eS9GcNUQPkNpM7hlKrx53wM6lMsqOQ&s",
  },
  {
    id: 3,
    title: "San Pablo",
    url: "https://static.nationalgeographicla.com/files/styles/image_3200/public/nationalgeographic2755922.jpg?w=1600&h=1068",
  },
  {
    id: 4,
    title: "Montevideo",
    url: "https://content.r9cdn.net/rimg/dimg/81/f4/7748535a-city-5518-1680f3fff41.jpg?width=1200&height=630&xhint=1744&yhint=1296&crop=true",
  },
];

export default function Gallery() {
  return (
    <div>
      <h2>Galería de Imágenes</h2>

      <div>
        {INITIAL_IMAGES.map((img) => (
          <ImageCard key={img.id} image={img} />
        ))}
      </div>
    </div>
  );
}