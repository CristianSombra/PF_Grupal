import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCategories, getBrands, resetFilters } from "../../redux/actions";
import CardsContainer from "../../components/cardscontainer/cardscontainer";
import Filter from "../../components/filter/filter";
import SearchResultMessage from "../../components/SearchResultMessage/SearchResultMessage";
import Carrusel from "../../components/banner/banner";
import SearchBar from "../../components/searchbar/searchbar";

export default function Home() {
  const [listCategories, setListCategories] = useState([]);
  const [listBrands, setListBrands] = useState([]);
  const dispatch = useDispatch();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  const handleReloadProducts = () => {
    dispatch(resetFilters());
  };

  useEffect(() => {
    const fetchData = async () => {
      const categories = await dispatch(getCategories());
      setTimeout(() => {
        setListCategories(categories);
      }, 1000);
      const brands = await dispatch(getBrands());
      setTimeout(() => {
        setListBrands(brands);
      }, 1000);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        scrollToTopBtn.style.display = "block";
      } else {
        scrollToTopBtn.style.display = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container">
      <Carrusel/>
      <div className="d-flex justify-content-center mb-4">
        <SearchBar />
      </div>
      <div className="d-flex  justify-content-center mb-4">
      <button className="btn btn-dark" onClick={handleReloadProducts}>
        Recargar Productos
      </button>
      </div>
      <div className="row">
        <div className="col-md-3 mb-6">
          <Filter listCategories={listCategories} listBrands={listBrands} />
        </div>
        <div className="col-md-9">
          <div className="mb-4">
            <SearchResultMessage />
          </div>
          <div>
          <CardsContainer />
          </div>
        </div>
      </div>
      <footer className="mt-5" style={{ backgroundColor: "rgb(33,37,41)", color: "white", width:"auto" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p className="text-center">Copyright &copy; 2023 Sr. PC - Think Unlimited</p>
              <img src="https://imgmp.mlstatic.com/org-img/banners/ar/medios/468X60.jpg" 
              title="Mercado Pago - Medios de pago" 
              alt="Mercado Pago - Medios de pago" 
              width="468" height="60" 
              style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} />
            </div>
          </div>
        </div>
      </footer>
      <button
        onClick={handleScrollToTop}
        className="btn btn-lg"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          display: "none",
          border: "1px solid grey",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          animation: "moveUp 1s ease-in-out 2"
        }}
        id="scrollToTopBtn"
        
      >
        <i class="bi bi-arrow-up"></i>
      </button>
    </div>
  );
}
