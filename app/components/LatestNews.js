import React from 'react';

export default function LatestNews({ drupalPosts }) {
  const posts = drupalPosts || [
    { date: "12 MAJA", title: "Modernizacja linii rozlewniczej w zakładzie spożywczym", img: "/images/news1.jpg" },
    { date: "05 MAJA", title: "Nowe standardy bezpieczeństwa maszynowego LOTO", img: "/images/news2.jpg" },
    { date: "28 KWIETNIA", title: "Wdrożenie systemów IoT w monitoringu energii", img: "/images/news3.jpg" }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12 border-b border-gray-100 pb-8">
          <div>
            <span className="text-red-600 font-mono text-sm uppercase tracking-widest">// NEWSROOM</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-gray-950 mt-2 text-left">Ostatnie Realizacje</h2>
          </div>
          <button className="hidden md:block border-2 border-gray-950 px-6 py-3 font-bold text-xs uppercase tracking-widest text-gray-950 hover:bg-gray-950 hover:text-white transition-all">Zobacz Wszystkie</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative h-64 overflow-hidden mb-6">
                <div className="absolute top-4 left-4 bg-red-600 text-white font-mono text-[10px] px-3 py-1 z-10">{post.date}</div>
                <img src={post.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={post.title} />
              </div>
              <h3 className="text-xl font-black uppercase leading-tight text-gray-950 group-hover:text-red-600 transition-colors mb-4">{post.title}</h3>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-950">Czytaj więcej →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}