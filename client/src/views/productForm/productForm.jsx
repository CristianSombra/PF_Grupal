import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/actions/index";
import styles from "./productForm.module.css";

const ProductForm = () => {
  const dispatch = useDispatch();
  const [sku, setSku] = useState("");
  const [numberPart, setNumberPart] = useState("");
  const [titulo, setTitulo] = useState("");
  const [idBrand, setIdBrand] = useState(1);
  const [idCategory, setIdCategory] = useState(84);
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [disponibility, setDisponibility] = useState("");
  const [ram, setRam] = useState("");
  const [pantalla, setPantalla] = useState("");
  const [procesador, setProcesador] = useState("");
  const [almacenamiento, setAlmacenamiento] = useState("");
  const [isProductCreated, setIsProductCreated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar que el stock sea al menos 1
    if (disponibility < 1 || isNaN(parseInt(idCategory))) {
        // Validar que el stock sea al menos 1 y que idCategory sea un número válido
        return;
      }

   const parsedSku = parseInt(sku);
    const parsedIdBrand = parseInt(idBrand);

    if (isNaN(parsedSku) || isNaN(parsedIdBrand)) {
      return;
    }

    const productData = {
      sku: parsedSku,
      number_part: numberPart,
      titulo: titulo,
      id_brand: parsedIdBrand,
      id_category: parseInt(idCategory),
      price: parseFloat(price),
      image: imageUrl,
      disponibility: disponibility,
    };

    // Agregar campos opcionales solo si se han completado
    if (ram) {
      productData.detail = { ...productData.detail, ram };
    }
    if (pantalla) {
      productData.detail = { ...productData.detail, pantalla };
    }
    if (procesador) {
      productData.detail = { ...productData.detail, procesador };
    }
    if (almacenamiento) {
      productData.detail = { ...productData.detail, almacenamiento };
    }

    try {
      // Enviar los datos del producto al servidor y esperar la respuesta
      await dispatch(createProduct(productData));
      // Marcar el producto como creado con éxito
      setIsProductCreated(true);

      // Limpia el formulario después de enviar
      setSku("");
      setNumberPart("");
      setIdBrand(1);
      setIdCategory(84);
      setPrice("");
      setDisponibility(1); // Reinicia a 1
      setRam("");
      setPantalla("");
      setProcesador("");
      setAlmacenamiento("");
      setImageUrl(""); // Reinicia el estado de imageUrl
    } catch (error) {
      // Manejar errores, mostrar un mensaje de error si es necesario
      console.error("Error al crear el producto:", error);
      // Otra lógica de manejo de errores si es necesario
    }
  };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImageUrl(URL.createObjectURL(selectedImage)); // Cambia imageUrl en lugar de setImage
      };

      return (
        <div style={{ marginTop: "100px" }}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Crear Producto</h2>
          {isProductCreated ? (
            <div className={styles.successMessage}>Producto creado con éxito</div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formLeft}>
                <div>
                  <label htmlFor="sku">
                    <span>SKU:</span>
                    <input
                      type="number"
                      id="sku"
                      value={sku}
                      onChange={(e) => {
                        const newValue = e.target.value.replace(/\D/g, ""); // Elimina caracteres que no sean números
                        setSku(newValue); // Actualiza el estado con el valor validado
                      }}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="numberPart">
                    <span>Number Part:</span>
                    <input
                      type="text"
                      id="numberPart"
                      value={numberPart}
                      onChange={(e) => setNumberPart(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="titulo">
                    <span>Título:</span>
                    <input
                      type="text"
                      id="titulo"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="idBrand">
                    <span>Marca:</span>
                    <select
                      id="idBrand"
                      value={idBrand}
                      onChange={(e) => setIdBrand(e.target.value)}
                      required
                    >
                      <option value="1">Apple</option>
                      <option value="12">HP</option>
                      <option value="20">Samsung Electronics</option>
                      <option value="27">Viewsonic</option>
                      <option value="30">Lenovo</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label htmlFor="idCategory">
                    <span>Categoría:</span>
                    <select
                      id="idCategory"
                      value={idCategory}
                      onChange={(e) => setIdCategory(e.target.value)}
                      required
                    >
                      <option value="84">Portátiles</option>
                      <option value="32">Monitores</option>
                      <option value="82">CPU</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label htmlFor="price">
                    <span>Precio:</span>
                    <input
                      type="text"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="stock">
                    <span>Stock:</span>
                    <input
                      type="number"
                      id="stock"
                      value={disponibility}
                      onChange={(e) =>
                        setDisponibility(Math.max(1, parseInt(e.target.value)))
                      }
                      required
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="ram">
                    <span>Ram:</span>
                    <input
                      type="text"
                      id="ram"
                      value={ram}
                      onChange={(e) => setRam(e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="pantalla">
                    <span>Pantalla:</span>
                    <input
                      type="text"
                      id="pantalla"
                      value={pantalla}
                      onChange={(e) => setPantalla(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="procesador">
                    <span>Procesador:</span>
                    <input
                      type="text"
                      id="procesador"
                      value={procesador}
                      onChange={(e) => setProcesador(e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="almacenamiento">
                    <span>Almacenamiento:</span>
                    <input
                      type="text"
                      id="almacenamiento"
                      value={almacenamiento}
                      onChange={(e) => setAlmacenamiento(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className={styles.formRight}>
                  <div>
                    <label htmlFor="image">
                      <div>
                        <span className={styles.imageText}>Tu Imagen</span>
                      </div>
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                      />
                    </label>
                    {imageUrl && (
                      <div className={styles.imageContainer}>
                        <img src={imageUrl} alt="Preview" />
                      </div>
                    )}
                  </div>
                </div>
            </form>
          )}
              <button className={styles.createButton} type="submit" onClick={handleSubmit}>
    Crear Producto
  </button>
        </div>
                </div>
      );
};

export default ProductForm;