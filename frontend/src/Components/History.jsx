import { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';


const History = ({ refreshTrigger }) => {
        
        const { user } = useAuth();

    
      // frontend only
      const [history, setHistory] = useState([]);
    
      // API
      const API_URL = import.meta.env.VITE_BACKEND_URL;
    
    useEffect(() => {
      const fetchHistory = async () => {
        try {
          const response = await fetch(`${API_URL}/api/image/history`, {
            method: 'GET',
            credentials: 'include',
          });
    
          const data = await response.json();
    
          if (data.success) {
            setHistory(
              data.generations.map((generation) => ({
                id: generation._id,
                prompt: generation.prompt,
                image: generation.imageUrl,
              }))
            );
          }
        } catch (error) {
          console.error('History fetch error:', error);
        }
      };
    
      if (user) {
        fetchHistory();
      }
  }, [user, refreshTrigger]);


const getDownloadUrl = (url, id) => {
  if (!url || !url.includes('/upload/')) return url;
  return url.replace('/upload/', `/upload/fl_attachment:ai-image-${id}/`);
};
   
  
  return (
    <div>
      {history.length > 0 && (
  <section className="mx-auto mt-16 max-w-6xl">
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Generation History
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Your recently generated images
        </p>
      </div>

      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
        {history.length} {history.length === 1 ? 'image' : 'images'}
      </span>
    </div>

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {history.map((item) => (
        <div
          key={item.id}
          className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
        >
          <div className="aspect-square overflow-hidden">
            <img
              src={item.image}
              alt={item.prompt}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>

          <div className="p-4">
            <p className="line-clamp-2 text-sm leading-6 text-gray-400">
              {item.prompt}
            </p>

        
      <a
  href={getDownloadUrl(item.image, item.id)}
  className="mt-4 block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-center text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
>
  🖼️ Download
</a>
          </div>
        </div>
      ))}
    </div>
  </section>
)}
    </div>
  )
}

export default History
