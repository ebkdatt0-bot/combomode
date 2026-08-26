* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background: #050505;
  color: #fff;
  overflow-x: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
select {
  font: inherit;
}

.navbar {
  min-height: 72px;
  width: 100%;
  padding: 0 7%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(5,5,5,.94);
  border-bottom: 1px solid #222;
  backdrop-filter: blur(14px);
}

.logo {
  font-size: 25px;
  font-weight: 900;
  letter-spacing: -1.5px;
}

.logo span {
  color: #a8ff00;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-links a {
  color: #888;
  font-size: 14px;
  transition: .2s;
}

.nav-links a:hover,
.nav-links a.active {
  color: #a8ff00;
}

main {
  min-height: calc(100vh - 72px);
}

.section {
  padding: 100px 7%;
  background: #080808;
}

.dark-section {
  background: #050505;
}

.section-header {
  max-width: 760px;
  margin: 0 auto 45px;
  text-align: center;
}

.eyebrow {
  color: #a8ff00;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 3px;
  margin-bottom: 18px;
}

h1 {
  font-size: clamp(60px,9vw,115px);
  line-height: .85;
  letter-spacing: -6px;
}

h1 span,
h2 span {
  color: #a8ff00;
}

h2 {
  font-size: clamp(40px,6vw,65px);
  line-height: .95;
  letter-spacing: -3px;
  margin-bottom: 18px;
}

h3 {
  font-size: 20px;
  margin-bottom: 12px;
}

p {
  color: #999;
  line-height: 1.65;
}

.hero {
  min-height: 720px;
  display: flex;
  align-items: center;
  padding: 80px 7%;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 15% 30%,rgba(168,255,0,.2),transparent 25%),
    radial-gradient(circle at 85% 20%,rgba(255,40,150,.17),transparent 25%),
    radial-gradient(circle at 70% 85%,rgba(0,150,255,.17),transparent 30%),
    #050505;
}

.hero-content {
  max-width: 700px;
  position: relative;
  z-index: 2;
}

.hero-text {
  max-width: 600px;
  font-size: 18px;
  margin-top: 28px;
}

.hero-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 30px;
}

.btn {
  display: inline-block;
  padding: 15px 22px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 900;
  transition: .2s;
  border: none;
  cursor: pointer;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn.primary {
  background: #a8ff00;
  color: #050505;
}

.btn.secondary {
  background: #151515;
  color: #fff;
  border: 1px solid #292929;
}

.feature-grid {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 15px;
}

.feature-card {
  min-height: 300px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  background: #0e0e0e;
  border: 1px solid #292929;
  border-radius: 18px;
  transition: .2s;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: #444;
}

.feature-number {
  color: #a8ff00;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 2px;
  margin-bottom: 45px;
}

.feature-card p {
  margin-bottom: 25px;
}

.feature-card a {
  margin-top: auto;
  color: #a8ff00;
  font-size: 12px;
  font-weight: 900;
}

.card-grid {
  max-width: 1100px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 18px;
}

.card {
  background: #0d0d0d;
  border: 1px solid #292929;
  border-radius: 18px;
  padding: 25px;
}

.page {
  max-width: 1100px;
  margin: auto;
  padding: 90px 7%;
}

.panel {
  margin-top: 40px;
  padding: 30px;
  background: #0d0d0d;
  border: 1px solid #292929;
  border-radius: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field.full {
  grid-column: 1/-1;
}

.field label {
  color: #888;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1.5px;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 15px;
  background: #050505;
  color: #fff;
  border: 1px solid #292929;
  border-radius: 9px;
  outline: none;
}

.field textarea {
  min-height: 120px;
  resize: vertical;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: #a8ff00;
}

.result {
  margin-top: 30px;
  padding: 25px;
  background: #050505;
  border: 1px solid #292929;
  border-radius: 15px;
}

.result-item {
  margin: 12px 0;
  padding: 16px;
  background: #0d0d0d;
  border: 1px solid #222;
  border-radius: 10px;
}

.result-item strong {
  color: #a8ff00;
  font-size: 11px;
  letter-spacing: 1px;
}

.result-item p {
  margin-top: 7px;
  color: #ccc;
}

.success {
  color: #a8ff00;
}

.error {
  color: #ff5555;
}

.muted {
  color: #777;
}

.hidden {
  display: none !important;
}

.footer {
  background: #050505;
  border-top: 1px solid #222;
  padding: 60px 7% 20px;
}

.footer-grid {
  max-width: 1250px;
  margin: auto;
  display: grid;
  grid-template-columns: 2fr repeat(5,1fr);
  gap: 30px;
}

.footer-brand p {
  max-width: 300px;
  margin-top: 14px;
  color: #666;
  font-size: 13px;
}

.footer-column h4 {
  color: #fff;
  font-size: 10px;
  letter-spacing: 1.7px;
  margin-bottom: 16px;
}

.footer-column a {
  display: block;
  margin: 9px 0;
  color: #666;
  font-size: 13px;
}

.footer-column a:hover {
  color: #a8ff00;
}

.footer-bottom {
  max-width: 1250px;
  margin: 40px auto 0;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #222;
  color: #555;
  font-size: 11px;
}

.price {
  font-size: 40px;
  font-weight: 900;
  color: #a8ff00;
  margin: 15px 0;
}

.product-grid {
  max-width: 1100px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 18px;
}

.product {
  background: #0d0d0d;
  border: 1px solid #292929;
  border-radius: 18px;
  overflow: hidden;
}

.product-image {
  height: 230px;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    linear-gradient(135deg,#111,#222);
  font-size: 50px;
}

.product-body {
  padding: 20px;
}

.tag {
  display: inline-block;
  padding: 6px 9px;
  border-radius: 99px;
  background: #a8ff00;
  color: #050505;
  font-size: 9px;
  font-weight: 900;
}

@media(max-width:950px) {
  .nav-links {
    gap: 14px;
  }

  .nav-links a {
    font-size: 12px;
  }

  .feature-grid,
  .product-grid {
    grid-template-columns: repeat(2,1fr);
  }

  .card-grid {
    grid-template-columns: 1fr 1fr;
  }

  .footer-grid {
    grid-template-columns: repeat(3,1fr);
  }
}

@media(max-width:650px) {
  .navbar {
    padding: 14px 5%;
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }

  .nav-links {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 4px;
    gap: 18px;
  }

  .nav-links a {
    white-space: nowrap;
  }

  .hero {
    min-height: 650px;
    padding: 70px 5%;
  }

  h1 {
    font-size: 65px;
    letter-spacing: -4px;
  }

  h2 {
    font-size: 42px;
  }

  .section,
  .page {
    padding: 70px 5%;
  }

  .feature-grid,
  .product-grid,
  .card-grid,
  .form-grid {
    grid-template-columns: 1fr;
  }

  .field.full {
    grid-column: auto;
  }

  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }

  .footer-brand {
    grid-column: 1/-1;
  }

  .footer-bottom {
    display: block;
  }

  .footer-bottom span {
    display: block;
    margin-top: 8px;
  }
}

@media(max-width:420px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .btn {
    text-align: center;
  }
}
