import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../../styles/Layout/RollingPaper.module.css';

const colors = ['#FBD46D', '#E5D4F4', '#BCE6FF', '#D4F4DD'];
const images = ['/images/bg1.png', '/images/bg2.png', '/images/bg3.png', '/images/bg4.png'];

const RollingPaperForm = () => {
  const [to, setTo] = useState("");
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("color");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedImage, setSelectedImage] = useState("");

  const navigate = useNavigate();

  const handleBlur = () => {
    if (to.trim() === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (to.trim() === "") {
      setError(true);
      return;
    }
    const background = activeTab === "color" ? selectedColor : selectedImage;
    console.log("선택됨:", { to, background });

    navigate('/post/:id');
  };

  return (
    <form onSubmit={handleSubmit} className={styles['rolling-paper__form']}>
      <label className={styles['rolling-paper__label']}>To.</label>
      <input
        type="text"
        placeholder="받는 사람 이름을 입력해 주세요"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        onBlur={handleBlur}
        className={styles['rolling-paper__input']}
      />
      {error && (<span className={styles['rolling-paper__error']}>값을 입력해 주세요.</span>)}

      <div>
        <p className={styles['rolling-paper__section-title']}>배경화면을 선택해 주세요.</p>
        <p className={styles['rolling-paper__section-desc']}>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</p>

        <div className={styles["rolling-paper__tab-buttons"]}>
          <button
            type="button"
            onClick={() => setActiveTab("color")}
            className={`${styles["rolling-paper__tab-button"]} ${activeTab === "color" ? styles["rolling-paper__active-tab"] : ""
              }`}
          >
            컬러
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("image")}
            className={`${styles["rolling-paper__tab-button"]} ${activeTab === "image" ? styles["rolling-paper__active-tab"] : ""
              }`}
          >
            이미지
          </button>
        </div>

        {activeTab === "color" && (
          <div className={styles["rolling-paper__color-box-container"]}>
            {colors.map((color) => (
              <div
                key={color}
                className={`${styles["rolling-paper__color-box"]} ${selectedColor === color ? styles["rolling-paper__selected"] : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              >
                {selectedColor === color && (
                  <div className={styles["rolling-paper__checkmark"]}>✓</div>
                )}
              </div>
            ))}
          </div>
        )}
        {activeTab === "image" && (
          <div className={styles["rolling-paper__image-box-container"]}>
            {images.map((img) => (
              <div
                key={img}
                className={`${styles["rolling-paper__image-box"]} ${selectedImage === img ? styles["rolling-paper__selected"] : ''}`}
                style={{ backgroundImage: `url(${img})` }}
                onClick={() => setSelectedImage(img)}
              >
                {selectedImage === img && (
                  <div className={styles["rolling-paper__checkmark"]}>✓</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <button type="submit" className={styles["rolling-paper__submit-button"]}>생성하기</button>
    </form>
  );
};

export default RollingPaperForm;
