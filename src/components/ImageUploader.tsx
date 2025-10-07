import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Plus } from 'lucide-react';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export default function ImageUploader({ images, onChange, maxImages = 5 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (images.length + files.length > maxImages) {
      alert(`Vous pouvez ajouter maximum ${maxImages} images`);
      return;
    }

    setUploading(true);

    const newImages: string[] = [];

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} n'est pas une image`);
        continue;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} est trop volumineux (max 5MB)`);
        continue;
      }

      const reader = new FileReader();
      await new Promise((resolve) => {
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
          }
          resolve(null);
        };
        reader.readAsDataURL(file);
      });
    }

    onChange([...images, ...newImages]);
    setUploading(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-gray-700">
          Images du produit ({images.length}/{maxImages})
        </label>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || images.length >= maxImages}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm"
          title="Ajouter des images"
        >
          <Upload size={16} />
          {uploading ? 'Chargement...' : 'Ajouter Images'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {images.length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center bg-gray-50 hover:border-blue-400 transition-colors cursor-pointer"
             onClick={() => fileInputRef.current?.click()}>
          <ImageIcon size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 font-semibold mb-2">Aucune image</p>
          <p className="text-gray-400 text-sm">Cliquez ou glissez des images ici</p>
          <p className="text-gray-400 text-xs mt-2">PNG, JPG, WEBP (max 5MB)</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-xl overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-all shadow-lg hover:shadow-xl"
            >
              <img
                src={img}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2">
                {index === 0 && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                    Principale
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700 shadow-lg"
                title="Supprimer cette image"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          {images.length < maxImages && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer"
              title="Ajouter plus d'images"
            >
              <Plus size={32} className="text-gray-400" />
              <span className="text-gray-400 text-sm mt-2">Ajouter</span>
            </button>
          )}
        </div>
      )}

      <p className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg border border-blue-200">
        <strong>Astuce :</strong> La première image sera l'image principale du produit.
        Glissez-déposez pour réorganiser (à implémenter).
      </p>
    </div>
  );
}
