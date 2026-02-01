import React, { useState } from 'react';

// IMPORT local images
import photo1 from '../assets/photo1.jpeg';
import photo2 from '../assets/photo2.jpeg';
import photo3 from '../assets/photo3.jpeg';
import photo4 from '../assets/photo4.jpeg';
import photo5 from '../assets/photo5.jpeg';
import photo6 from '../assets/photo6.jpeg';
import photo7 from '../assets/photo7.jpeg';
import photo8 from '../assets/photo8.jpeg';
import photo9 from '../assets/photo9.jpeg';

const FolderIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </svg>
);

const Gallery = () => {
  const [activeFolder, setActiveFolder] = useState(null);
  const [selectedFullImg, setSelectedFullImg] = useState(null);

  const folders = [
    {
      id: "leadership",
      title: "UNIVERSITY",
      coverImage: photo1,
      images: [
        { id: 101, url: photo1, label: "ACM XIM CORE TEAM" },
        { id: 102, url: photo4, label: "SYNCHRONIZE 3.0" },
        { id: 103, url: photo5, label: "Team Briefing" },
      ]
    },
    {
      id: "Sports",
      title: "UNIVERSITY SPORTS",
      coverImage: photo3,
      images: [
        { id: 201, url: photo2, label: "Xuhotsav 2025" },
        { id: 202, url: photo3, label: "Xuhotsav 2025" },
        { id: 204, url: photo6, label: "Xuhotsav 2025" },
        { id: 205, url: photo7, label: "Xuhotsav 2025" },
        { id: 206, url: photo8, label: "Xuhotsav 2025" },
        { id: 207, url: photo9, label: "Xest 2024" },
      ]
    }
  ];

  return (
    <section id="gallery" className="section-container">
      <h2 className="section-title">Professional Archives</h2>
      
      {/* Grid of Folder Covers */}
      <div className="gallery-grid">
        {folders.map((folder) => (
          <div 
            key={folder.id} 
            className={`gallery-item ${activeFolder === folder.id ? 'folder-open' : ''}`}
            onClick={() => setActiveFolder(activeFolder === folder.id ? null : folder.id)}
            style={{ 
              cursor: 'pointer', 
              transition: 'transform 0.3s ease',
              border: activeFolder === folder.id ? '2px solid var(--accent)' : '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <img src={folder.coverImage} alt={folder.title} style={{ opacity: activeFolder === folder.id ? 0.3 : 1 }} />
            
            <div className="gallery-overlay" style={{ opacity: 1, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <FolderIcon />
                <span className="gallery-title">{folder.title}</span>
              </div>
              <span className="tag-pill">{folder.images.length} Items</span>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Folder Content */}
      {activeFolder && (
        <div className="folder-content fade-in" style={{ 
          marginTop: '30px', 
          padding: '30px', 
          background: 'var(--card-bg)', 
          borderRadius: '20px',
          border: '1px solid var(--border)' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: 'var(--accent)', margin: 0 }}>Viewing: {folders.find(f => f.id === activeFolder).title}</h3>
            <button onClick={() => setActiveFolder(null)} className="secondary-btn">Close Archive</button>
          </div>
          
          <div className="gallery-grid">
            {folders.find(f => f.id === activeFolder).images.map((img) => (
              <div 
                key={img.id} 
                className="gallery-item" 
                style={{ cursor: 'zoom-in' }}
                onClick={(e) => {
                   e.stopPropagation();
                   setSelectedFullImg(img.url);
                }}
              >
                <img src={img.url} alt={img.label} />
                <div className="gallery-overlay">
                   <span style={{ fontSize: '0.8rem' }}>{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- FULL PHOTO MODAL (LIGHTBOX) --- */}
      {selectedFullImg && (
        <div 
          className="modal-overlay" 
          style={{ display: 'flex' }} 
          onClick={() => setSelectedFullImg(null)}
        >
          <div 
            className="modal-content full-photo-view" 
            onClick={(e) => e.stopPropagation()}
            style={{ background: 'transparent', border: 'none', boxShadow: 'none', position: 'relative' }}
          >
            {/* Modal Action Bar */}
            <div style={{ 
              position: 'absolute', 
              top: '-60px', 
              right: '0', 
              display: 'flex', 
              gap: '12px', 
              alignItems: 'center' 
            }}>
              {/* Download Button */}
              <a 
                href={selectedFullImg} 
                download={`Soumya_Archive_${Date.now()}.jpeg`} 
                className="download-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(157, 124, 255, 0.2)',
                  border: '1px solid rgba(157, 124, 255, 0.4)',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: '100px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  backdropFilter: 'blur(10px)',
                  transition: '0.3s'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download
              </a>

              {/* Close Button */}
              <button 
                className="close-modal" 
                onClick={() => setSelectedFullImg(null)}
                style={{ 
                  position: 'static', 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  borderRadius: '50%', 
                  width: '40px', 
                  height: '40px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '24px',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                &times;
              </button>
            </div>

            <img 
              src={selectedFullImg} 
              alt="Full view" 
              style={{ 
                maxWidth: '90vw', 
                maxHeight: '80vh', 
                borderRadius: '12px', 
                objectFit: 'contain',
                boxShadow: '0 0 50px rgba(0,0,0,0.8)'
              }} 
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;