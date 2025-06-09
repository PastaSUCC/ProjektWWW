import React, { useState, useRef } from 'react'
import { ArrowLeft, ArrowRight, ShoppingCart, User, MapPin, Search, Inspect, LogIn} from "lucide-react";
import { FaFacebook, FaInstagram, FaDiscord } from "react-icons/fa";
import './index.css'
import './calendar.css'
import './info.css'
import './sponsors.css'
import './contact.css'
import Checkbox from "./Checkbox.jsx";

const galleryData = [
  {
    image: '/photos/artysta1.jpg',
    artist: 'CHIVAS',
    date: '29.05.2025',
    location: 'Łódź, Indeks',
  },
  {
    image: '/photos/artysta2.jpg',
    artist: 'Gimpson',
    date: '30.05.2025',
    location: 'Łódź, Kampus A PŁ',
  },
  {
    image: '/photos/artysta3.jpg',
    artist: 'SNOOP DOGG',
    date: '31.05.2025',
    location: 'Łódź, Akademiki - boisko',
  },
    {
    image: '/photos/guślarz.jpg',
    artist: 'GUŚLARZ',
    date: '28.05.2025',
    location: 'Łódź, Indeks',
  },
      {
    image: '/photos/playboi_carti.jpg',
    artist: 'PLAYBOI CARTI',
    date: '29.05.2025',
    location: 'Łódź, Kampus B PŁ',
  },
  {
    image: '/photos/syn_mlynarza.jpg',
    artist: 'SYN MŁYNARZA',
    date: '31.05.2025',
    location: 'Łódź, Indeks',
  },
        {
    image: '/photos/bibinos.jpg',
    artist: 'BBNO$',
    date: '30.05.2025',
    location: 'Łódź, Kampus B PŁ',
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [allowAutoSlide, setAllowAutoSlide] = useState(true);
  const lastSlide = useRef(0);
  const [showForm, setShowForm] = useState(false);

  const [acceptForm, setAcceptForm] = useState(false);

  const [showContact, setShowContact] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showSponsors, setShowSponsors] = useState(false);

  const [navOpen, setNavOpen] = useState(false);
  

  // Pioter dodaj prosze zeby w formularzo dalo sie wybrac rodzaj biletu. Wystarczy studencli i normaln y a cenu sobie wymysl

  // Zrobione :)
  const [ticketType, setTicketType] = useState("");
  const getTicketPrice = (type) => {
    if (type === "normalny") return 50;
    if (type === "ulgowy") return 30;
    return "";
  };
  const toggleForm = () => setShowForm(prev => !prev);

  const prevSlide = () => {
    setAllowAutoSlide(false);
    setDirection('left');
    lastSlide.current = 1;
    setCurrentIndex(prev => (prev == 0 ? galleryData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setAllowAutoSlide(false);
    setDirection('right');
    lastSlide.current = 0;
    setCurrentIndex(prev => (prev == galleryData.length - 1 ? 0 : prev + 1));
  };

  // Piotrek zrbo prosze aby wyswietlal sie kalendarz z koncertami. Ja sie zajme zeby glowna wygladala dobrze
  // Ogarnalem u mnie dziala

  // Piotrek, to nie dziala, bo kalendarz pobiera aktualny miesiac, a koncerty ustawiles na maj XDDD
  // Poprpaw to blagam

  const concertsByDate = galleryData.reduce((acc, concert) => {
    const [day, month, year] = concert.date.split('.');
    const dateKey = new Date(year, month - 1, day).toDateString();
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(concert);
    return acc;
  }, {});

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  // Poprawilem tu byla fuszerka
  const today = new Date(2025,4,1);
  const year = today.getFullYear();
  const month = today.getMonth();
  const days = getDaysInMonth(year, month);


  const onSelectDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>

      <header className="header">
        <div className="logo" style={{ cursor: "pointer" }} onClick={() => {
          setShowCalendar(false);
          setShowContact(false);
          setShowInfo(false);
          setShowSponsors(false);
          setSelectedDate(null);
        }}>
          <img src="/photos/LOGO.jpg" alt="Logo" />
        </div>
        <div className="icons">
          <a href=""><button><FaFacebook size={30} /></button></a>
          <a href=""><button><FaInstagram size={30} /></button></a>
          <a href=""><button><FaDiscord size={30} /></button></a>
          <a href=""><button><User size={30} /></button></a>
        </div>
      </header>


      <nav className={`navbar${navOpen ? ' open' : ''}`}>
        <button
          className="navbar-toggle"
          onClick={() => setNavOpen(v => !v)}
        >
          <span className="navbar-hamburger"></span>
        </button>
        <a 
        href="#" 
        className={!showInfo && !showContact && !showCalendar && !showSponsors ? "active" : ""}
        onClick={() => {
        setShowCalendar(false);
        setShowContact(false);
        setShowInfo(false);
        setShowSponsors(false);
        setSelectedDate(null);
        }}>GŁÓWNA</a>

        <a 
        href="#" 
        className={showCalendar ? "active" : ""}
        onClick={() => {
        setShowSponsors(false);
        setShowInfo(false);
        setShowContact(false);
        setShowCalendar(true);
        setSelectedDate(null);
        }}>KALENDARZ</a>

        <a 
        href="#" 
        className={showInfo ? "active" : ""}
        onClick={() => {
          setShowInfo(true);
          setShowCalendar(false);
          setShowContact(false);
          setShowSponsors(false);
          setSelectedDate(null);
        }}>INFO</a>

        <a 
        href="#" 
        className={showSponsors ? "active" : ""}
        onClick={() => {
        setShowSponsors(true);
        setShowInfo(false);
        setShowContact(false);
        setShowCalendar(false);
        setSelectedDate(null);
        }}>SPONSORZY</a>

        <a 
        href="#" 
        className={showContact ? "active" : ""}
        onClick={() => {
        setShowSponsors(false);
        setShowInfo(false);
        setShowContact(true);
        setShowCalendar(false);
        setSelectedDate(null);
        }}>KONTAKT</a>
      </nav>

      {showInfo ? (
      <section className={`info-section fade${showInfo ? ' fade-in' : ''} filter`}>
        <h2>Informacje o wydarzeniu</h2>
        <p>JUWENALIA to coroczne święto muzyki, kultury i integracji studenckiej organizowane na terenie Politechniki Łódzkiej.</p>

        <div className="info-content">
          <div className="info-box">
            <h3>🎟️ Bilety</h3>
            <p>Sprzedaż biletów odbywa się online oraz stacjonarnie w budynkach uczelni. Dostępne bilety: normalny i ulgowy (dla studentów).</p>
          </div>
          <div className="info-box">
            <h3>📍 Lokalizacja</h3>
            <p>Wydarzenia będą odbywać się na kilku scenach: Indeks, Kampusy A i B PŁ, oraz boisko przy akademikach.</p>
          </div>
          <div className="info-box">
            <h3>🕒 Harmonogram</h3>
            <p>Koncerty rozpoczynają się każdego dnia o godzinie 18:00. Dokładny harmonogram dostępny w zakładce <em>Kalendarz</em>.</p>
          </div>
        </div>
      </section>
    ) : showContact ? (
        <section className={`contact-section filter fade${showContact ? ' fade-in' : ''}`}>
          <h2>Kontakt</h2>
          <p>Masz pytanie? Skontaktuj się z nami za pomocą formularza lub bezpośrednio:</p>

          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert("Wiadomość wysłana!"); }}>
            <input type="text" placeholder="Imię i nazwisko" required />
            <input type="email" placeholder="Email" required />
            <textarea rows="5" placeholder="Twoja wiadomość..." required ></textarea>
            <button type="submit">Wyślij</button>
          </form>
          <div class="contact-info">
            <h4>Dane kontaktowe:</h4>
            <p><strong>Email:</strong> kontakt@uczelnia.pl</p>
            <p><strong>Telefon:</strong> +48 123 456 789</p>
            <p><strong>Adres:</strong> ul. Studencka 1, 90-001 Łódź</p>
          </div>

        </section>
      ) : showCalendar ? (
        <>
        
        <section className="calendar-section filter" style={{ padding: '20px' }}>
          <h2>Kalendarz - {today.toLocaleString('pl-PL', { month: 'long' })} {year}</h2>
          <div className="calendar-container">
            <div className="calendar-grid">
              {['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'].map((d) => (
                <div key={d} className="days">{d}</div>
              ))}

              {Array(days[0].getDay()==0 ? 6 : days[0].getDay()-1).fill(null).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}

              {days.map((day) => {
                const dateKey = day.toDateString();
                const hasConcert = !!concertsByDate[dateKey];
                const isSelected = selectedDate?.toDateString() === dateKey;

                return (
                  <button
                    key={dateKey}
                    className={`calendar-day ${isSelected ? 'selected' : ''} ${hasConcert ? 'has-concert' : ''}`}
                    onClick={() => onSelectDate(day)}
                    title={hasConcert ? `Koncert(y) tego dnia` : ''}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedDate && (
            <div className="calendar-details">
              <h3>Wydarzenia dnia {selectedDate.toLocaleDateString('pl-PL')}:</h3>
              {concertsByDate[selectedDate.toDateString()] ? (
                concertsByDate[selectedDate.toDateString()].map((concert, i) => (
                  <div key={i} className="calendar-item">
                    <img src={concert.image} alt={concert.artist} className='calendar-artist' />
                    <div>
                      <h4>{concert.artist}</h4>
                      <p><strong>Lokalizacja:</strong> {concert.location}</p>
                      <p><strong>Data:</strong> {concert.date}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>Brak wydarzeń tego dnia</p>
              )}
            </div>
          )}
        </section>
                <section className="gallery-section">
            <div className="gallery-left">
              <button onClick={prevSlide} className="arrow-btn left"><ArrowLeft size={24} /></button>
              <div className="gallery-image-container">
                <img
                  key={`${galleryData[currentIndex].image}-${direction}`}
                  src={galleryData[currentIndex].image}
                  alt={`Galeria - ${galleryData[currentIndex].artist}`}
                  className={`gallery-image slide-${direction}`}
                />
              </div>
              <button onClick={nextSlide} className="arrow-btn right"><ArrowRight size={24} /></button>
            </div>
            <div key={`text-${currentIndex}`} className="gallery-right">
              <h2>{galleryData[currentIndex].artist}</h2>
              <p><strong>Termin:</strong> {galleryData[currentIndex].date}</p>
              <p><strong>Lokalizacja:</strong> {galleryData[currentIndex].location}</p>
            </div>
        </section>
        </>
        
      ) : showSponsors ? (
      <section className="sponsors-section filter">
          <h2>Nasi Sponsorzy</h2>
          <p>Wydarzenie wspierają wspaniałe marki, które umożliwiają jego organizację.</p>
          <div className="sponsor-logos">
            <div className="sponsor">
              <img src="/photos/sponsor1.jpg" alt="Sponsor 1" />
              <p>Przykład</p>
            </div>
            <div className="sponsor">
              <img src="/photos/sponsor2.jpg" alt="Sponsor 2" />
              <p>POPIS</p>
            </div>
            <div className="sponsor">
              <img src="/photos/sponsor3.jpg" alt="Sponsor 3" />
              <p>CHIPSY</p>
            </div>
          </div>
            {/* <div className="sponsor">
              <img src="/photos/sponsor2.jpg" alt="Sponsor 3" />
              <p>Przykładowy sponsor</p>
            </div> */}
        </section>
      ) : (
        <>
          <section className="hero filter">
            <h1 className="hero-title">JUWENALIA PŁ 2025</h1>
            <div className={`hero-box${showForm ? ' expanded' : ' collapsed'}`}>
              <div className="hero-form">
                <div className={`hero-content ${!showForm ? 'visible' : 'hidden'}`}>
                  <h1>Ogarnij sobie bilet</h1>
                  <p>Nie przegap najważniejszych wydarzeń naszej uczelni!</p>
                </div>
                <form className={`ticket-form ${showForm ? 'visible' : 'hidden'}`}>
                                  <h1>KUB BILET</h1>
                  <div className="form-group">
                    <input type="text" placeholder="imie" required />
                    <input type="text" placeholder="nazwisko" required />
                  </div>
                  <input type="tel" placeholder="tel" required />
                  <input type="email" placeholder="email" required />
                  <select
                    required
                    value={ticketType}
                    onChange={e => setTicketType(e.target.value)}
                  >
                    <option value="">WYBIERZ TYP BILETU</option>
                    <option value="normalny">NORMALNY 50ZŁ</option>
                    <option value="ulgowy">STUDENT 30ZŁ</option>
                  </select>
                  <div className="ticket-form-accept-cont">
                    <Checkbox
                      id="acceptForm"
                      label="Akceptuje warunki umowy"
                      checked={acceptForm}
                      onChange={e => setAcceptForm(e.target.checked)}
                    />
                  </div>
                  <div className="form-footer">
                    <button type="submit" className="submit-btn"><strong>ZAMAWIAM I PŁACĘ</strong></button>
                    <span className="price">
                      Cena biletów: <strong>{getTicketPrice(ticketType) ? `${getTicketPrice(ticketType)} zł` : "[ ]"}</strong>
                    </span>
                  </div>
                </form>

              </div>
              <div className={`hero-info ${showForm ? 'visible' : 'hidden'}`}>
                <h2>Informacje o biletach</h2>
                <ul>
                  <li>Bilety dostępne online i stacjonarnie</li>
                  <li>Normalny: 50 zł</li>
                  <li>Ulgowy (dla studentów): 30 zł</li>
                  <li>Bilet w formie elektronicznej otrzymasz na swoim emailu po transakcji</li>
                  <li>Odbiór biletów stacjonarnych w dniu wydarzenia</li>
                  <li>Więcej info: kontakt@uczelnia.pl</li>
                </ul>
              </div>
            </div>
            <button className="cta-button" onClick={toggleForm}>{showForm ? "Wróć" : "Zapisz się"}</button>
          </section>

          <section className="gallery-section">
            <div className="gallery-left">
              <button onClick={prevSlide} className="arrow-btn left"><ArrowLeft size={24} /></button>
              <div className="gallery-image-container">
                <img
                  key={`${galleryData[currentIndex].image}-${direction}`}
                  src={galleryData[currentIndex].image}
                  alt={`Galeria - ${galleryData[currentIndex].artist}`}
                  className={`gallery-image slide-${direction}`}
                />
              </div>
              <button onClick={nextSlide} className="arrow-btn right"><ArrowRight size={24} /></button>
            </div>
            <div key={`text-${currentIndex}`} className="gallery-right">
              <h2>{galleryData[currentIndex].artist}</h2>
              <p><strong>Termin:</strong> {galleryData[currentIndex].date}</p>
              <p><strong>Lokalizacja:</strong> {galleryData[currentIndex].location}</p>
            </div>
          </section>
        </>
      )}

    <footer className="footer">
      <p>&copy; 2025 JUWENALIA Wszelkie prawa zastrzeżone.</p>
      <p>Organizatorzy: Samorząd Studencki PŁ, Jakub Pastusiak i Piotr Garbarczyk</p>
      <p>Email: kontakt@uczelnia.pl | Telefon: +48 123 456 789</p>
    </footer>
  
    </div>
  );
}

export default App;
