// Video utility for Google Drive links
// Converts Google Drive share links to embeddable/playable links

/**
 * Convert Google Drive share link to direct video URL
 * Format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * Or: https://drive.google.com/open?id=FILE_ID
 * Returns: https://drive.google.com/uc?export=download&id=FILE_ID (for download)
 * Or: https://drive.google.com/uc?export=view&id=FILE_ID (for streaming)
 */
export function convertGoogleDriveLink(shareLink: string): string {
  if (!shareLink) return '';

  // Extract file ID from various Google Drive link formats
  let fileId = '';

  // Format 1: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  const match1 = shareLink.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match1) {
    fileId = match1[1];
  } else {
    // Format 2: https://drive.google.com/open?id=FILE_ID
    const match2 = shareLink.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match2) {
      fileId = match2[1];
    } else {
      // Format 3: Direct ID
      fileId = shareLink;
    }
  }

  if (!fileId) return shareLink;

  // Return streaming link (better for video playback)
  // This allows the video to stream without downloading
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

/**
 * Alternative: Use iframe embed method
 * This is better for Google Drive videos
 */
export function getGoogleDriveEmbedUrl(shareLink: string): string {
  if (!shareLink) return '';

  let fileId = '';

  // Extract file ID from various Google Drive link formats
  const match1 = shareLink.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match1) {
    fileId = match1[1];
  } else {
    const match2 = shareLink.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match2) {
      fileId = match2[1];
    } else {
      fileId = shareLink;
    }
  }

  if (!fileId) return '';

  // Google Drive embed URL
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

/**
 * Get video URL - tries multiple methods
 * For Google Drive: Converts to direct streaming URL
 */
export function getVideoUrl(googleDriveLink: string): { url: string; type: 'embed' | 'direct' } {
  if (!googleDriveLink) return { url: '', type: 'direct' };

  // If it's already a direct video URL (mp4, webm, etc.)
  if (googleDriveLink.match(/\.(mp4|webm|ogg|mov|avi|mkv)(\?|$)/i)) {
    return { url: googleDriveLink, type: 'direct' };
  }

  // If it's a Google Drive link, convert it
  if (googleDriveLink.includes('drive.google.com')) {
    // Extract file ID
    let fileId = '';
    const match1 = googleDriveLink.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match1) {
      fileId = match1[1];
    } else {
      const match2 = googleDriveLink.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (match2) {
        fileId = match2[1];
      } else {
        fileId = googleDriveLink;
      }
    }

    if (fileId) {
      // Try embed URL first (works if sharing permissions allow)
      const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
      
      // For now, return embed URL - if it doesn't work, user can change videoUrl to direct URL
      return { url: embedUrl, type: 'embed' };
    }
  }

  // Return as is (might be YouTube, Vimeo, etc.)
  return { url: googleDriveLink, type: 'direct' };
}
