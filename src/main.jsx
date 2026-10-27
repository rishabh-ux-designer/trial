import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const assets = "/assets";
const certificate = `${assets}/ccd05.png`;

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

function FooterButton({ children, disabled, onClick }) {
  return (
    <footer className="footer-action">
      <button type="button" disabled={disabled} onClick={onClick}>
        {children}
      </button>
    </footer>
  );
}

function Field({ label, placeholder, value, onChange, readOnly = false, action }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <span className={`input-shell ${readOnly ? "read-only" : ""}`}>
        <input
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
        />
        {action}
      </span>
    </label>
  );
}

function StatusTag({ children, tone = "green" }) {
  return <span className={`status-tag ${tone}`}>• {children}</span>;
}

function Dashboard({ onOpen }) {
  return (
    <main className="screen dashboard-screen">
      <section className="welcome-row">
        <div>
          <h1>Welcome</h1>
          <p>Rishab Negi</p>
        </div>
        <img src={`${assets}/6123a.svg`} alt="" />
      </section>
      <button className="nbfc-tile" type="button" onClick={onOpen}>
        <img src={`${assets}/88439.svg`} alt="" />
        <span>NBFC</span>
      </button>
    </main>
  );
}

function ApplicationCard({ school, members, creator, status, tone, onClick }) {
  return (
    <button className="application-card" type="button" onClick={onClick}>
      <div className="application-card-top">
        <div>
          <span>#APP-884291-0X</span>
          <strong>{school}</strong>
        </div>
        <StatusTag tone={tone}>{status}</StatusTag>
      </div>
      <div className="application-meta">
        <span>{members}</span>
        <span>Created by: {creator}</span>
      </div>
    </button>
  );
}

function VerificationCard({ school, verified, status, tone, onClick }) {
  const progress = (verified / 4) * 100;
  return (
    <button className="verification-card" type="button" onClick={onClick}>
      <div className="verification-card-top">
        <span>#APP-884291-0X</span>
        {status && <StatusTag tone={tone}>{status}</StatusTag>}
      </div>
      <strong>{school}</strong>
      <div className="document-status">
        <span>Document Status</span>
        <span>{verified}/4 Verified</span>
      </div>
      <div className="progress-track">
        <span style={{ width: `${progress}%` }} />
      </div>
    </button>
  );
}

function NbfcHome({ tab, setTab, onBack, onCreate, onOpenKyc, onOpenVerification }) {
  const [query, setQuery] = useState("");
  const cards = [
    {
      school: "St. Xavier's International School",
      members: "3 members",
      creator: "Ravi Kumar",
      status: "Pending",
      tone: "amber",
    },
    {
      school: "Green Valley Institute",
      members: "1 member",
      creator: "Shivam Jain",
      status: "Reject",
      tone: "red",
    },
  ].filter((card) => card.school.toLowerCase().includes(query.toLowerCase()));
  const verificationCards = [
    { school: "St. Xavier's International School", verified: 0 },
    { school: "Sunrise High School", verified: 4, status: "Approved", tone: "green" },
    { school: "Green Valley Institute", verified: 1, status: "Reject", tone: "red" },
    { school: "Sunrise High School", verified: 4, status: "Approved", tone: "green" },
    { school: "Sunrise High School", verified: 4, status: "Approved", tone: "green" },
  ].filter((card) => card.school.toLowerCase().includes(query.toLowerCase()));
  const visibleCards = tab === "kyc" ? cards : verificationCards;

  return (
    <main className="screen">
      <Header title="NBFC" onBack={onBack} />
      <section className="nbfc-content">
        <label className="search-box">
          <img src={`${assets}/${tab === "verification" ? "8061a.svg" : "9c000.svg"}`} alt="" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search UDISE, ID and school name.."
          />
        </label>
        <div className="tabs" role="tablist">
          <button className={tab === "kyc" ? "active" : ""} type="button" onClick={() => setTab("kyc")}>
            KYC <span className="tab-count">2</span>
          </button>
          <button
            className={tab === "verification" ? "active" : ""}
            type="button"
            onClick={() => setTab("verification")}
          >
            Verification <span className="tab-count">5</span>
          </button>
        </div>
        <div className="application-list">
          {tab === "kyc"
            ? cards.map((card, index) => (
                <ApplicationCard
                  key={card.school}
                  {...card}
                  onClick={() => onOpenKyc(index === 1)}
                />
              ))
            : verificationCards.map((card, index) => (
                <VerificationCard
                  key={`${card.school}-${index}`}
                  {...card}
                  onClick={onOpenVerification}
                />
              ))}
        </div>
      </section>
      {!visibleCards.length && (
        <div className="empty-state">
          <img src={`${assets}/9e412.svg`} alt="" />
          <p>No data available</p>
        </div>
      )}
      <button className="fab" type="button" onClick={onCreate} aria-label="Create application">
        <img src={`${assets}/66e1f.svg`} alt="" />
      </button>
    </main>
  );
}

function DocumentSubmission({ onBack, onEdit }) {
  const sections = [
    ["a0bf4.svg", "KYC Members", "3 Members added"],
    ["129f7.svg", "School Documents", "5 of 10 Uploaded"],
    ["3faa2.svg", "Borrower Documents", "1 of 10 Uploaded"],
    ["bcfe1.svg", "Guarantor Documents", "10 of 10 Uploaded"],
    ["34ca8.svg", "Other", "3 of 10 Uploaded"],
    ["3faa2.svg", "Borrower Refrence", "0 person added"],
    ["250e8.svg", "Fee Collection Record", "0 Uploaded"],
    ["250e8.svg", "Share Location", "Not share yet"],
  ];

  return (
    <main className="screen soft-screen">
      <Header title="Document Submission" onBack={onBack} />
      <section className="submission-content">
        <section className="submission-summary">
          <button type="button" onClick={onEdit}>Edit</button>
          <span>APPLICATION ID</span>
          <h2>#APP-884291-0X</h2>
          <p><img src={`${assets}/17509.svg`} alt="" /> St. Xavier's International School</p>
          <p><img src={`${assets}/5762c.svg`} alt="" /> Borrower: Rajesh kumar</p>
          <p><img src={`${assets}/8a453.svg`} alt="" /> Guarantor: Chetan kaur</p>
        </section>
        <div className="submission-list">
          {sections.map(([icon, title, description]) => (
            <button className="submission-row" type="button" key={title}>
              <span className="submission-icon"><img src={`${assets}/${icon}`} alt="" /></span>
              <span>
                <strong>{title}</strong>
                <small>{description}</small>
              </span>
            </button>
          ))}
        </div>
      </section>
    </main>
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
        <img className={open ? "chevron open" : "chevron"} src={`${assets}/3003f.svg`} alt="" />
      </button>
    </div>
  );
}

function PersonRow({ person, onClick, onDelete, status }) {
  return (
    <div className="person-row">
      <button className="person-main" type="button" onClick={onClick}>
        <img src={`${assets}/fee03.svg`} alt="" />
        <span>
          <strong>{person.name}</strong>
          <small>{person.phone}</small>
        </span>
      </button>
      {status && <StatusTag tone={status.tone}>{status.label}</StatusTag>}
      {onDelete && (
        <button className="delete-button" type="button" onClick={onDelete} aria-label={`Delete ${person.name}`}>
          <img src={`${assets}/624cb.svg`} alt="" />
        </button>
      )}
    </div>
  );
}

function CreateApplication({ draft, setDraft, onBack, onAddPerson, onDocuments, onCreate }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const selectType = (value) => {
    setDraft((current) => ({ ...current, type: value }));
    setDropdownOpen(false);
  };
  const complete = draft.type && draft.udise && draft.school && draft.people.length;

  return (
    <main className="screen">
      <Header title="Create Application" onBack={onBack} />
      <section className="create-content flow-form">
        <SelectField
          value={draft.type}
          open={dropdownOpen}
          onToggle={() => setDropdownOpen((current) => !current)}
        />
        {draft.type && (
          <>
            <Field
              label={draft.type === "Registration number" ? "Registration Number" : "UDISE Number"}
              placeholder="Enter here"
              value={draft.udise}
              onChange={(udise) => setDraft((current) => ({ ...current, udise }))}
              action={draft.udise.length > 5 ? <StatusTag tone="green">Verified</StatusTag> : null}
            />
            <Field
              label="School Name"
              placeholder="Enter here"
              value={draft.school}
              onChange={(school) => setDraft((current) => ({ ...current, school }))}
            />
            <button className="book-row" type="button" onClick={onDocuments}>
              <span>Last year book set</span>
              <img src={`${assets}/7d707.svg`} alt="" />
            </button>
            <div className="persons">
              <h2>Persons</h2>
              {draft.people.map((person, index) => (
                <PersonRow
                  key={`${person.phone}-${index}`}
                  person={person}
                  onDelete={() =>
                    setDraft((current) => ({
                      ...current,
                      people: current.people.filter((_, personIndex) => personIndex !== index),
                    }))
                  }
                />
              ))}
              <button className="add-person" type="button" onClick={onAddPerson}>
                <span className="small-plus">
                  <img src={`${assets}/65946.svg`} alt="" />
                </span>
                <span>Add Person</span>
              </button>
            </div>
          </>
        )}
      </section>
      {dropdownOpen && (
        <div className="dropdown-panel" role="listbox" aria-label="School identification type">
          <button type="button" onClick={() => selectType("UDISE")}>UDISE number</button>
          <button type="button" onClick={() => selectType("Registration number")}>
            <span>Registration number</span>
            <img src={`${assets}/d2543.svg`} alt="" />
          </button>
        </div>
      )}
      <FooterButton disabled={!complete} onClick={onCreate}>Create</FooterButton>
    </main>
  );
}

function DocumentTile({ removable = true }) {
  return (
    <div className="document-tile">
      <img src={certificate} alt="Certificate document" />
      {removable && <img className="remove-document" src={`${assets}/eea8a.svg`} alt="" />}
    </div>
  );
}

function UploadTile({ onClick }) {
  return (
    <button className="upload-tile" type="button" onClick={onClick}>
      <img src={`${assets}/5011c.svg`} alt="" />
      <span>Upload File</span>
    </button>
  );
}

function UploadSheet({ onClose, onSelect }) {
  return (
    <div className="overlay upload-overlay" role="dialog" aria-modal="true">
      <div className="upload-sheet">
        <div className="sheet-heading">
          <h2>Upload file</h2>
          <p>Select one option</p>
        </div>
        {[
          ["8e992.svg", "Camera"],
          ["0c612.svg", "Upload Images"],
          ["e00e1.svg", "Upload File"],
        ].map(([icon, label]) => (
          <button className="upload-option" type="button" onClick={onSelect} key={label}>
            <span><img src={`${assets}/${icon}`} alt="" /></span>
            {label}
          </button>
        ))}
        <button className="sheet-close" type="button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function AddPerson({ onBack, onAdd }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [documents, setDocuments] = useState(0);
  const [showSheet, setShowSheet] = useState(false);
  const valid = name && phone && documents;

  return (
    <main className="screen">
      <Header title="Add Person" onBack={onBack} />
      <section className="person-form">
        <Field label="Full Name" placeholder="Enter full name" value={name} onChange={setName} />
        <Field label="Phone Number" placeholder="Enter phone number" value={phone} onChange={setPhone} />
        <div className="field">
          <span className="field-label">ID Proof</span>
          {documents ? (
            <div className="document-grid">
              <UploadTile onClick={() => setShowSheet(true)} />
              <DocumentTile />
            </div>
          ) : (
            <button className="dropzone" type="button" onClick={() => setShowSheet(true)}>
              <span><img src={`${assets}/5b34a.svg`} alt="" /></span>
              <strong>Tap to upload ID proof (JPG, PDF)</strong>
            </button>
          )}
        </div>
      </section>
      <FooterButton disabled={!valid} onClick={() => onAdd({ name, phone, documents })}>Add</FooterButton>
      {showSheet && (
        <UploadSheet
          onClose={() => setShowSheet(false)}
          onSelect={() => {
            setDocuments(1);
            setShowSheet(false);
          }}
        />
      )}
    </main>
  );
}

function Documents({ onBack }) {
  const [count, setCount] = useState(3);
  const [showSheet, setShowSheet] = useState(false);
  return (
    <main className="screen">
      <Header title="Last year book set" onBack={onBack} />
      <section className="documents-content">
        <h2>Uploaded Documents</h2>
        <div className="document-grid">
          <UploadTile onClick={() => setShowSheet(true)} />
          {Array.from({ length: count }).map((_, index) => <DocumentTile key={index} />)}
        </div>
      </section>
      {showSheet && (
        <UploadSheet
          onClose={() => setShowSheet(false)}
          onSelect={() => {
            setCount((current) => current + 1);
            setShowSheet(false);
          }}
        />
      )}
    </main>
  );
}

function Processing({ onDone }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 1100);
    return () => window.clearTimeout(timer);
  }, [onDone]);
  return (
    <div className="overlay processing-overlay" role="dialog" aria-modal="true">
      <div className="processing-card">
        <img src={`${assets}/0dcad.png`} alt="" />
        <h2>Do not close the App</h2>
        <p>Please wait while we update your Document files</p>
      </div>
    </div>
  );
}

function SummaryCard({ onEdit }) {
  return (
    <section className="summary-card">
      <button type="button" onClick={onEdit}>Edit</button>
      <span>APPLICATION ID</span>
      <h2>#APP-884291-0X</h2>
      <p>⌂ St. Xavier's International School</p>
      <p>♙ Borrower: --------</p>
      <p>♧ Guarantor: --------</p>
    </section>
  );
}

function KycDetail({ rejected, onBack, onEdit, onPerson, onDocuments, onAddPerson }) {
  const people = [
    { name: "Mohit kumar", phone: "98675643565" },
    { name: "Shubham", phone: "96575643565" },
  ];
  return (
    <main className="screen soft-screen">
      <Header title="Under KYC" onBack={onBack} />
      {rejected && <div className="rejection-banner">Document is unclear. Please upload correct docs</div>}
      <section className={`kyc-content ${rejected ? "with-banner" : ""}`}>
        <SummaryCard onEdit={onEdit} />
        <button className="book-row status-book" type="button" onClick={onDocuments}>
          <span>Last year book set</span>
          {rejected && <StatusTag tone="red">Reject</StatusTag>}
          <img src={`${assets}/7d707.svg`} alt="" />
        </button>
        <div className="kyc-people">
          <PersonRow
            person={people[0]}
            onClick={() => onPerson(true)}
            onDelete={() => {}}
            status={{ label: rejected ? "Upload Failed" : "Reject", tone: "red" }}
          />
          <PersonRow
            person={people[1]}
            onClick={() => onPerson(false)}
            onDelete={() => {}}
            status={{ label: "Approved", tone: "green" }}
          />
          <button className="add-person" type="button" onClick={onAddPerson}>
            <span className="small-plus"><img src={`${assets}/65946.svg`} alt="" /></span>
            <span>Add Person</span>
          </button>
        </div>
      </section>
    </main>
  );
}

function PersonReview({ failed, onBack, onSave }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(failed ? "Mohit" : "Mohit Kumar");
  return (
    <main className="screen">
      <Header title="#APP-1000054" onBack={onBack} />
      <section className="person-form review-form">
        <Field
          label="Full Name"
          value={name}
          onChange={setName}
          readOnly={!editing}
          action={
            !editing ? (
              <button className="edit-field" type="button" onClick={() => setEditing(true)}>
                <img src={`${assets}/f6b68.svg`} alt="Edit" />
              </button>
            ) : null
          }
        />
        <Field label="Phone Number" value="932525523255" readOnly />
        <div className="field">
          <span className="field-label">ID Proof</span>
          <div className="document-grid compact">
            {failed && <UploadTile onClick={() => {}} />}
            <DocumentTile removable={failed} />
            <DocumentTile removable={failed} />
          </div>
        </div>
      </section>
      {failed && <div className="error-snackbar"><span>ⓘ</span><strong>2 files not uploaded</strong><button>Retry</button></div>}
      <FooterButton onClick={onSave}>{editing ? "Save" : failed ? "Submit for Verification" : "Save"}</FooterButton>
    </main>
  );
}

const initialDraft = {
  type: "",
  udise: "",
  school: "",
  people: [],
};

function App() {
  const [page, setPage] = useState("dashboard");
  const [draft, setDraft] = useState(initialDraft);
  const [rejected, setRejected] = useState(false);
  const [reviewFailed, setReviewFailed] = useState(false);
  const [processingNext, setProcessingNext] = useState(null);
  const [returnPage, setReturnPage] = useState("create");
  const [nbfcTab, setNbfcTab] = useState("kyc");

  const go = (next) => setPage(next);
  const startProcessing = (next) => setProcessingNext(next);
  const finishProcessing = () => {
    setPage(processingNext);
    setProcessingNext(null);
  };

  return (
    <>
      {page === "dashboard" && <Dashboard onOpen={() => go("nbfc")} />}
      {page === "nbfc" && (
        <NbfcHome
          tab={nbfcTab}
          setTab={setNbfcTab}
          onBack={() => go("dashboard")}
          onCreate={() => {
            setDraft(initialDraft);
            go("create");
          }}
          onOpenKyc={(isRejected) => {
            setRejected(isRejected);
            go("kyc");
          }}
          onOpenVerification={() => go("verification-detail")}
        />
      )}
      {page === "verification-detail" && (
        <DocumentSubmission
          onBack={() => go("nbfc")}
          onEdit={() => {
            setDraft({
              type: "UDISE",
              udise: "68574635242",
              school: "St. Xavier's International School",
              people: [
                { name: "Rajesh kumar", phone: "98675643565", documents: 1 },
                { name: "Chetan kaur", phone: "96575643565", documents: 1 },
              ],
            });
            go("create");
          }}
        />
      )}
      {page === "create" && (
        <CreateApplication
          draft={draft}
          setDraft={setDraft}
          onBack={() => go("nbfc")}
          onAddPerson={() => {
            setReturnPage("create");
            go("add-person");
          }}
          onDocuments={() => {
            setReturnPage("create");
            go("documents");
          }}
          onCreate={() => startProcessing("nbfc")}
        />
      )}
      {page === "add-person" && (
        <AddPerson
          onBack={() => go(returnPage)}
          onAdd={(person) => {
            setDraft((current) => ({ ...current, people: [...current.people, person] }));
            go(returnPage);
          }}
        />
      )}
      {page === "documents" && <Documents onBack={() => go(returnPage)} />}
      {page === "kyc" && (
        <KycDetail
          rejected={rejected}
          onBack={() => go("nbfc")}
          onEdit={() => {
            setDraft({
              type: "UDISE",
              udise: "68574635242",
              school: "St. Xavier's International School",
              people: [
                { name: "Mohit kumar", phone: "98675643565", documents: 1 },
                { name: "Shubham", phone: "96575643565", documents: 1 },
              ],
            });
            go("create");
          }}
          onPerson={(failed) => {
            setReviewFailed(failed);
            go("review");
          }}
          onDocuments={() => {
            setReturnPage("kyc");
            go("documents");
          }}
          onAddPerson={() => {
            setReturnPage("kyc");
            go("add-person");
          }}
        />
      )}
      {page === "review" && (
        <PersonReview
          failed={reviewFailed}
          onBack={() => go("kyc")}
          onSave={() => startProcessing("kyc")}
        />
      )}
      {processingNext && <Processing onDone={finishProcessing} />}
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
