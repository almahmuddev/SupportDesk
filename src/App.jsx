import './App.css'
import ticketsData from './data/ticketsData'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// react icon using

// import { FaxTwitter, FaLinkedIn, FaFacebookF, FaEnvelope } from 'react-icons/fa6'

function App() {
  const [customerTickets, setCustomerTickets] = useState([]);

  useEffect(() => {
    setCustomerTickets(ticketsData);

  },
    []);

  // live counters from state
  const inProgressCount = customerTickets?.filter(ticket => ticket.status === "In Progress").length;
  const resolvedCount = customerTickets?.filter(ticket => ticket.status === "Resolved").length;

  function handleInProgress(id) {
    setCustomerTickets(prevTickets =>
      prevTickets.map(ticket =>
        ticket.id === id
          ? { ...ticket, status: "In Progress" }
          : ticket
      )
    );

    const ticket = customerTickets.find(t => t.id === id);
    toast.success(`${ticket.title} moved to In Progress!`);
  }
  // const handleComplete = (id) => {
  //   const ticket = customerTickets.find(t => t.id === id);
  //   ticket.status = "Resolved";
  //   setCustomerTickets([ ...customerTickets, ticket ]);
  //    setInProgressTickets([...inProgressTickets, ticket]);
  //   toast.success(`${ticket.title} moved to In Progress!`);

  // }

  const handleComplete = (id) => {

    setCustomerTickets(prevTickets =>
      prevTickets.map(ticket =>
        ticket.id === id
          ? { ...ticket, status: "Resolved" }
          : ticket
      )
    );

    const ticket = customerTickets.find(t => t.id === id);
    toast.success(`${ticket.title} marked as Resolved!`);
  }

  const statusClasses = {
    "Open": "badge-open",
    "In Progress": "badge-progress",
    "Resolved": "badge-resolved"
  };

  return (
    <>
      {/* Navbar */}
      <header className="navbar">
        <h2>CS — Ticket System</h2>
        <ul className='nav-container'>
          <li><a href="#">Home</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Changelog</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Download</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <a href="#">+ New Ticket</a>
      </header>

      {/* banner section */}
      <section className="status">
        <div className="status-box">
          <h2>In Progress</h2>
          <p>{inProgressCount}</p>
        </div>
        <div className="status-box">
          <h2>Resolved</h2>
          <p>{resolvedCount}</p>
        </div>
      </section>

      {/* main dashboard */}
      <section className="dashboard">

        {/* customer Ticket side */}
        <div className="customer-tickets">
          <h3>Customer Tickets </h3>
          <div className="ticket-grid">

            {customerTickets?.filter((ticket) => ticket.status !== "Resolved").map((ticket) => (
              <div key={ticket.id} className="ticket-card" onClick={() => {
                if (ticket.status === "Open") {
                  handleInProgress(ticket.id)
                }
              }}>
                <div className="ticket-header">
                  <h4>{ticket.title}</h4>
                  <span className={`badge ${statusClasses[ticket.status] || 'badge-default'}`}>
                    {ticket.status}
                  </span>
                </div>
                <p className="ticket-desc">{ticket.description}</p>
                <div className="ticket-footer">
                  <div className='ticket-footer-left'>
                    <span className='ticket-id'>#{ticket.id}</span>
                    <span className={`priority ${ticket.priority.toLowerCase()}`}>
                      {ticket.priority} PRIORITY
                    </span>
                  </div>
                  <div className='ticket-footer-right'>
                    <span className='assignee-name'>{ticket.assignee}</span>
                    <span className='ticket-date'>
                      <span>📅 {ticket.createdAt}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='place-together'>
          {/* Task Status (In Progress) */}
          <div className="task-status">
            <h3>Task Status</h3>
            {/* Task Status (In Progress) */}

            {customerTickets?.filter((ticket) => ticket.status === 'In Progress').map((ticket) => (
              <div key={ticket.id} className="task-card">
                <div className='task-card-title'>{ticket.title}</div>
                <button onClick={() => handleComplete(ticket.id)}>Complete</button>
              </div>
            ))}

          </div>

          {/* resolved section */}
          <div className="resolved-tasks">
            <h3>Resolved</h3>
            {customerTickets?.filter((ticket) => ticket.status === 'Resolved').map((ticket) => (
              <div key={ticket.id} className="task-card">
                <div className='task-card-title'>{ticket.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* {footer section} */}
      <footer className='footer-container'>
        <div className="footer-content">
          {/* about section  */}
          <div className="footer-section brand-info">
            <h2 className="footer-logo">CS — Ticket System</h2>
            <p className="footer-description">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
          {/* Links Sections */}
          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#mission">Our Mission</a></li>
              <li><a href="#contact">Contact Sales</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              <li><a href="#products">Products & Services</a></li>
              <li><a href="#stories">Customer Stories</a></li>
              <li><a href="#apps">Download Apps</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Information</h3>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
              <li><a href="#join">Join Us</a></li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="footer-section social-links">
            <h3>Social Links</h3>
            <ul>
              <li><span className="icon">𝕏</span> @CS — Ticket System</li>
              <li><span className="icon">in</span> @CS — Ticket System</li>
              <li><span className="icon">f</span> @CS — Ticket System</li>
              <li><span className="icon">✉</span> support@cst.com</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 CS — Ticket System. All rights reserved.</p>
        </div>
      </footer>

      <ToastContainer />
    </>
  );
}

export default App;
