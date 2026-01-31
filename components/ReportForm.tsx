'use client';

import { useState } from 'react';

export default function ReportForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pageUrl: '',
    email: '',
    priority: 'medium',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          title: '',
          description: '',
          pageUrl: '',
          email: '',
          priority: 'medium',
        });

        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        alert('Gagal mengirim report. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-netflix-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Report Bug/Issue</h1>
          <p className="text-gray-400 mb-8">
            Bantu kami memperbaiki aplikasi dengan melaporkan bug atau masalah yang Anda temukan.
          </p>

          {isSubmitted && (
            <div className="mb-8 p-4 bg-green-900 border border-green-700 rounded-lg">
              <p className="text-green-200">
                ✓ Terima kasih! Report Anda telah dikirim. Kami akan segera meninjau.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
                Judul Bug/Issue *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Contoh: Tombol play tidak berfungsi"
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
                Deskripsi Detail *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Jelaskan detail bug yang Anda temukan, langkah untuk mereproduksi, dan harapan Anda..."
                required
                rows={5}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label htmlFor="pageUrl" className="block text-sm font-medium text-white mb-2">
                URL Halaman (Opsional)
              </label>
              <input
                type="url"
                id="pageUrl"
                name="pageUrl"
                value={formData.pageUrl}
                onChange={handleChange}
                placeholder="Contoh: https://movieflix.com/watch/..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-white mb-2">
                Prioritas *
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600"
              >
                <option value="low">Rendah (Kosmetik/Minor)</option>
                <option value="medium">Sedang (Fitur tidak sempurna)</option>
                <option value="high">Tinggi (Fitur tidak bekerja)</option>
                <option value="critical">Kritis (Aplikasi crash/tidak bisa diakses)</option>
              </select>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Anda *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Contoh: user@example.com"
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
              />
              <p className="text-xs text-gray-400 mt-2">
                Email Anda hanya digunakan untuk follow up report ini.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              {isLoading ? 'Mengirim...' : 'Kirim Report'}
            </button>
          </form>

          <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-white font-semibold mb-2">💡 Tips untuk Report yang Baik:</h3>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Jelaskan langkah-langkah untuk mereproduksi bug</li>
              <li>• Sebutkan browser/device yang Anda gunakan</li>
              <li>• Sertakan screenshot jika memungkinkan</li>
              <li>• Cantumkan email valid untuk follow up</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
