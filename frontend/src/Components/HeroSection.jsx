import { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';


const HeroSection = ({ onGeneration }) => {
        
        const { user } = useAuth();
    
      const [prompt, setPrompt] = useState('');
      const [image, setImage] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');
      // frontend only
      const [history, setHistory] = useState([]);
    
      // API
      const API_URL = import.meta.env.VITE_BACKEND_URL;
    

    
      // EXAMPLE PROMPT 
      const examplePrompts = [
        'A futuristic city at night, neon lights, cinematic atmosphere, highly detailed',
        'A cute orange cat astronaut exploring Mars, realistic, dramatic lighting',
        'A magical forest with glowing mushrooms and fireflies, fantasy art',
        'A luxury sports car driving through a rainy cyberpunk city, cinematic',
        'create an image of a beautiful house in a village ',     
      ];
    
      // FUNCTION FOR GENERATE IMAGE 
                                                  
    //   const generateImage = async () => {
    //     if (!prompt.trim()) return;
    
    //     try {
    //       setLoading(true);
    //       setImage(null);
    //       setError('');
    //       const response = await fetch('http://localhost:4000/api/generate', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           prompt,
    //         }),
    //       });
    
    //       if (!response.ok) {
    //         throw new Error('Image generation failed');
    //       }
    
    //       const blob = await response.blob();
    
    //       const imageUrl = URL.createObjectURL(blob);
    
    // setImage(imageUrl);
    
    // setHistory((prev) => [
    //   {
    //     id: Date.now(),
    //     prompt,
    //     image: imageUrl,
    //   },
    //   ...prev,
    // ]);
    //     } catch (error) {
    //       console.error(error);
    
    //       setError(
    //         'We could not generate your image right now. Please try again.'
    //       );
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
    const generateImage = async () => {
      if (!prompt.trim()) return;
    
      try {
        setLoading(true);
        setImage(null);
        setError('');
    
        const response = await fetch(`${API_URL}/api/image/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            prompt,
          }),
        });
    
        const data = await response.json();
    
        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Image generation failed');
        }
    
        const imageUrl = data.generation.imageUrl;
    
        setImage(imageUrl);
    
        setHistory((prev) => [
          {
            id: data.generation.id,
            prompt: data.generation.prompt,
            image: data.generation.imageUrl,
          },
          ...prev,
        ]);
        onGeneration((prev) => prev + 1);
      } catch (error) {
        console.error(error);
    
        setError(
          'We could not generate your image right now. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };
    
    // Previously:     (commented function)
    
    // Frontend
    //  ↓
    // /api/generate
    //  ↓
    // Image blob
    //  ↓
    // React history only
    
    // Now:    (new generated imgage function)
    
    // Frontend
    //  ↓
    // /api/image/generate
    //  ↓
    // JWT authentication
    //  ↓
    // Hugging Face
    //  ↓
    // Cloudinary
    //  ↓
    // MongoDB
    //  ↓
    // Cloudinary URL returned
    //  ↓
    // React history
      // CLEAR PROMPT+IMAGE  FUNCTON
      const clearGenerator = () => {
      setPrompt('');
      setImage(null);
      setError('');
    };
    const getDownloadUrl = (url, id = Date.now()) => {
  if (!url || !url.includes('/upload/')) return url;
  return url.replace('/upload/', `/upload/fl_attachment:ai-image-${id}/`);
};
  return (
     <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
            ✨ AI Image Generator
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Turn your ideas into
            <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              stunning images
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            Describe anything you can imagine and let AI transform your words
            into a unique image.
          </p>
        </div>

        {/* Generator */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-7">
            <label className="mb-3 block text-sm font-medium text-gray-300">
              Describe your image
            </label>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A futuristic city floating above the clouds at sunset..."
              rows={5}
              className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-5 text-base text-white outline-none transition placeholder:text-gray-600 focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/10"
            />
            <div className="mt-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                Try an example
              </p>

              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(example)}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-left text-xs text-gray-400 transition hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                Be descriptive for better results
              </p>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
  <button
    onClick={clearGenerator}
    disabled={loading || (!prompt && !image && !error)}
    className="w-full rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 font-medium text-gray-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
  >
    🧹 Clear
  </button>

  <button
    onClick={generateImage}
    disabled={!prompt.trim() || loading}
    className="w-full rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-7 py-3.5 font-semibold text-black transition hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-400/20 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
  >
    {loading ? 'Generating...' : '✨ Generate Image'}
  </button>
</div>
            </div>
            {error && (
  <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
    <span className="mt-0.5">⚠️</span>

    <div>
      <p className="font-medium">Generation failed</p>
      <p className="mt-1 text-red-300/70">
        {error}
      </p>
    </div>
  </div>
)}
          </div>
        </div>

        {/* Image Preview */}
        <div className="mx-auto mt-10 max-w-4xl">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
            {loading ? (
              <div className="flex aspect-video flex-col items-center justify-center px-6 text-center">
                <div className="relative flex h-20 w-20 items-center justify-center">
                  <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20" />

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10 shadow-lg shadow-emerald-400/10">
                    <span className="text-2xl">✨</span>
                  </div>
                </div>

                <h3 className="mt-6 text-lg font-semibold text-white">
                  Creating your image
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Hugging Face is turning your prompt into an image.
                </p>

                <div className="mt-6 flex items-center gap-2">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-400 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-400 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-400" />
                </div>
              </div>
            ) : image ? (
              <div className="relative">
                <img
                  src={image}
                  alt={prompt}
                  className="h-auto w-full object-cover"
                />

                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 sm:bottom-5 sm:left-auto sm:right-5 sm:flex-row sm:gap-3">
                  <button
                    onClick={generateImage}
                    disabled={loading}
                    className="w-full rounded-xl bg-black/70 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-black/90 disabled:opacity-50 sm:w-auto"
                  >
                    🔄 Generate Again
                  </button>
                 <a
  href={getDownloadUrl(image)}
  className="w-full rounded-xl bg-black/70 px-5 py-3 text-center text-sm font-medium text-white backdrop-blur-md transition hover:bg-black/90 sm:w-auto"
>
  🖼️ Download
</a>
                </div>
              </div>
            ) : (
              <div className="flex aspect-video items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-2xl">
                    🖼️
                  </div>

                  <h2 className="font-medium text-gray-300">
                    Your generated image will appear here
                  </h2>

                  <p className="mt-2 text-sm text-gray-600">
                    Enter a prompt above to get started
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
  )
}

export default HeroSection
