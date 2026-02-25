import jsPDF from 'jspdf';

export const generateCertificate = (userName, moduleName, score, date) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Set background
  doc.setFillColor(245, 247, 250);
  doc.rect(0, 0, 297, 210, 'F');

  // Add border
  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(2);
  doc.rect(10, 10, 277, 190);

  // Add inner border
  doc.setLineWidth(0.5);
  doc.rect(15, 15, 267, 180);

  // Title
  doc.setFontSize(40);
  doc.setTextColor(37, 99, 235);
  doc.text('Certificate of Completion', 148.5, 45, { align: 'center' });

  // Subtitle
  doc.setFontSize(16);
  doc.setTextColor(100, 100, 100);
  doc.text('This is to certify that', 148.5, 70, { align: 'center' });

  // Name
  doc.setFontSize(28);
  doc.setTextColor(0, 0, 0);
  doc.setFont(undefined, 'bold');
  doc.text(userName, 148.5, 90, { align: 'center' });

  // Body text
  doc.setFontSize(16);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('has successfully completed the module', 148.5, 110, { align: 'center' });

  // Module name
  doc.setFontSize(22);
  doc.setTextColor(37, 99, 235);
  doc.setFont(undefined, 'bold');
  doc.text(moduleName, 148.5, 130, { align: 'center' });

  // Score
  doc.setFontSize(16);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(`with a score of ${score}%`, 148.5, 145, { align: 'center' });

  // Date
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Date: ${date}`, 148.5, 165, { align: 'center' });

  // Footer
  doc.setFontSize(14);
  doc.setTextColor(37, 99, 235);
  doc.text('FinLearn - Financial Literacy Platform', 148.5, 185, { align: 'center' });

  // Save PDF
  doc.save(`${userName}_${moduleName}_Certificate.pdf`);
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * Converts various video URL formats to embeddable iframe URLs
 * Supports: YouTube, Vimeo, and general video URLs
 */
export const getVideoEmbedUrl = (url) => {
  if (!url || typeof url !== 'string') {
    console.warn('Invalid URL provided:', url);
    return null;
  }

  url = url.trim();
  console.log('Processing video URL:', url);

  // YouTube formats
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = null;

    // Format: https://www.youtube.com/watch?v=VIDEO_ID
    if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1]?.split('&')[0];
    }
    // Format: https://youtu.be/VIDEO_ID
    else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    }
    // Format: https://www.youtube.com/embed/VIDEO_ID
    else if (url.includes('embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0];
    }

    if (videoId) {
      console.log('Extracted YouTube video ID:', videoId);
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
    }
  }

  // Vimeo formats
  if (url.includes('vimeo.com')) {
    const videoId = url.split('/').pop()?.split('?')[0];
    if (videoId && !isNaN(videoId)) {
      console.log('Extracted Vimeo video ID:', videoId);
      return `https://player.vimeo.com/video/${videoId}`;
    }
  }

  // Direct video file (MP4, WebM, etc.)
  if (url.match(/\.(mp4|webm|ogg)$/i)) {
    console.log('Direct video file:', url);
    return { type: 'video', src: url };
  }

  console.warn('Could not process video URL:', url);
  return null;
};
