import { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";

function App() {
  const [images, SetImages] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);
  const [term, SetTerm] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${
        import.meta.env.VITE_PIXABAY_API_KEY
      }&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        SetImages(data.hits);
        SetIsLoading(false);
      });
  }, [term]);

  return (
    <div className="container max-auto">
      <ImageSearch searchText={(text) => SetTerm(text)} />
      {!isLoading && images.length === 0 && (
        <h1 className="tex-5xl text-center mx-auto mt-32">No Images Found</h1>
      )}
      {isLoading ? (
        <h1 className="tex-6xl text-center mx-auto mt-32">Loading...</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
