import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const assets = "/assets";

function Header({ title, onBack }) {
  return (
    <header className="app-header">
      <button className="header-button" type="button" onClick={onBack} aria-label="Go back">
        <img src={`${assets}/487e5.svg`} alt="" />
        <span>{title}</span>
      </button>
    </header>
  );
}

function Field({ label, placeholder, value, onChange }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function SelectField({ value, open, onToggle }) {
  return (
    <div className="field">
      <span className="field-label">School Identification Type</span>
      <button
        className={`select-control ${value ? "has-value" : ""}`}
        type="button"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span>{value || "Select"}</span>
        <img className={open ? "chevron open" : "chevron"} src={`${assets}/4ef4f.svg`} alt="" />
      </button>
    </div>
  );
}

function CreateApplication({ onBack }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [identificationType, setIdentificationType] = useState("");
  const [udise, setUdise] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [people, setPeople] = useState(0);

  const selectType = (value) => {
    setIdentificationType(value);
    setDropdownOpen(false);
  };

  const complete = identificationType && udise.trim() && schoolName.trim();

  return (
    <main className="screen">
      <Header title="Create Application" onBack={onBack} />

      <section className="create-content">
        <SelectField
          value={identificationType}
          open={dropdownOpen}
          onToggle={() => setDropdownOpen((current) => !current)}
        />

        {identificationType === "UDISE number" && (
          <>
            <Field label="UDISE Number" placeholder="Enter here" value={udise} onChange={setUdise} />
            <Field
              label="School Name"
              placeholder="Enter here"
              value={schoolName}
              onChange={setSchoolName}
            />
            <button className="book-row" type="button">
              <span>Last year book set</span>
              <img src={`${assets}/7d707.svg`} alt="" />
            </button>

            <div className="persons">
              <h2>Persons</h2>
              <button className="add-person" type="button" onClick={() => setPeople((count) => count + 1)}>
                <span className="small-plus">
                  <img src={`${assets}/65946.svg`} alt="" />
                </span>
                <span>{people ? `Add Person (${people})` : "Add Person"}</span>
              </button>
            </div>
          </>
        )}
      </section>

      {dropdownOpen && (
        <div className="dropdown-panel" role="listbox" aria-label="School identification type">
          <button type="button" onClick={() => selectType("UDISE number")}>
            <span>UDISE number</span>
            {identificationType === "UDISE number" && <img src={`${assets}/d2543.svg`} alt="" />}
          </button>
          <button type="button" onClick={() => selectType("Registration number")}>
            <span>Registration number</span>
            {identificationType === "Registration number" && <img src={`${assets}/d2543.svg`} alt="" />}
          </button>
        </div>
      )}

      <footer className="footer-action">
        <button type="button" disabled={!complete}>
          Create
        </button>
      </footer>
    </main>
  );
}

function NbfcHome({ onCreate }) {
  const [tab, setTab] = useState("kyc");
  const [query, setQuery] = useState("");

  return (
    <main className="screen">
      <Header title="NBFC" onBack={() => {}} />

      <section className="nbfc-content">
        <label className="search-box">
          <img src={`${assets}/4fa4b.svg`} alt="" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search UDISE, ID and school name.."
          />
        </label>

        <div className="tabs" role="tablist">
          <button className={tab === "kyc" ? "active" : ""} type="button" onClick={() => setTab("kyc")}>
            KYC
          </button>
          <button
            className={tab === "verification" ? "active" : ""}
            type="button"
            onClick={() => setTab("verification")}
          >
            Verification
          </button>
        </div>
      </section>

      <div className="empty-state">
        <img src={`${assets}/9e412.svg`} alt="" />
        <p>{query ? "No matching data" : "No data available"}</p>
      </div>

      <button className="fab" type="button" onClick={onCreate} aria-label="Create application">
        <img src={`${assets}/66e1f.svg`} alt="" />
      </button>
    </main>
  );
}

function App() {
  const [page, setPage] = useState("nbfc");
  return page === "nbfc" ? (
    <NbfcHome onCreate={() => setPage("create")} />
  ) : (
    <CreateApplication onBack={() => setPage("nbfc")} />
  );
}

createRoot(document.getElementById("root")).render(<App />);
