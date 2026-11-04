const useFiles = () => {
  const formatSize = (bytes) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(0)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatModified = (date) => {
    const diff = Date.now() - new Date(date).getTime();

    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
    return new Date(date).toLocaleDateString();
  };

  const formatDate = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    if (diff < 60000) return "Just now";
    if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)}h ago`;
    }
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getFileColor = (type) => {
    const colors = {
      png: { color: "#ff9b26", bg: "#fff9e9" },
      jpg: { color: "#ff9b26", bg: "#fff9e9" },
      jpeg: { color: "#ff9b26", bg: "#fff9e9" },
      pdf: { color: "#ff4b55", bg: "#fff0f1" },
      doc: { color: "#3185f6", bg: "#edf5ff" },
      docx: { color: "#3185f6", bg: "#edf5ff" },
      xlsx: { color: "#00bd83", bg: "#e9fbf4" },
      fig: { color: "#b44cff", bg: "#f8f0ff" },
      tar: { color: "#64748b", bg: "#f1f5f9" },
      zip: { color: "#64748b", bg: "#f1f5f9" },
      html: { color: "#8B5CF6", bg: "#F3EFFF" },
      mp3: { color: "#0D9488", bg: "#E6FAF6" },
      mp4: { color: "#1dc7e1ff", bg: "#f0feffff" },
    };

    return colors[type] || { color: "#64748b", bg: "#f1f5f9" };
  };

  return { formatSize, formatModified, formatDate, getFileColor };
};

export default useFiles;
