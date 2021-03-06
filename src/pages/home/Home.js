import "../../styles.css";
import "./home.css";

export default function Home() {
  // const dotenv = require('dotenv');
  // dotenv.config();
  // console.log(process.env.ABC);
  // const IMG_URL=process.env['IMAGE_URL'];

  return (
    <div class="home-container">
    
      <img
        src={`https://res.cloudinary.com/dvrti07sl/image/upload/v1631718611/homedecor_img_thg6ct.jpg`}
        alt="not available"
        width="100%"
      />

      <h2>Best Sellers »</h2>
      <div class="card-container">
        <div class="card">
          <img
            src={`https://res.cloudinary.com/dvrti07sl/image/upload/v1631718611/lights_bp7nbx.jpg`}
            alt="not available"
            width="100%"
          />
          <div>
            <h3 class="card-title">Hanging Lanterns</h3>
            <p>Lanterns</p>
          </div>
        </div>
        <div class="card">
          <img
            src="https://res.cloudinary.com/dvrti07sl/image/upload/v1631718611/solarlight_nalxmn.webp"
            alt="not available"
            width="100%"
          />
          <div>
            <h3 class="card-title">Solar string Lights</h3>
            <p>Lights</p>
          </div>
        </div>
        <div class="card">
          <img
            src="https://res.cloudinary.com/dvrti07sl/image/upload/v1631718616/vase_ahl2br.png"
            alt="not available"
            width="100%"
          />
          <div>
            <h3 class="card-title">Glass Vase</h3>
            <p>Lanterns</p>
          </div>
        </div>
      </div>
      <h2>Deals of the day »</h2>
      <div class="card-container">
        <div class="card">
          <img
            src="https://res.cloudinary.com/dvrti07sl/image/upload/v1631718611/lights_bp7nbx.jpg"
            alt="not available"
            width="100%"
          />
          <div>
            <h3 class="card-title">Hanging Lanterns</h3>
            <p>Lanterns</p>
          </div>
        </div>
        <div class="card">
          <img
            src="https://res.cloudinary.com/dvrti07sl/image/upload/v1631718611/solarlight_nalxmn.webp"
            alt="not available"
            width="100%"
          />
          <div>
            <h3 class="card-title">Solar string Lights</h3>
            <p>Lights</p>
          </div>
        </div>
        <div class="card">
          <img
            src="https://res.cloudinary.com/dvrti07sl/image/upload/v1631718616/vase_ahl2br.png"
            alt="not available"
            width="100%"
          />
          <div>
            <h3 class="card-title">Glass Vase</h3>
            <p>Lanterns</p>
          </div>
        </div>
      </div>
      {/* <button class="floating-btn">
      </button> */}
      <footer>
        <p>copyright@2021</p>
      </footer>
    </div>
  );
}
