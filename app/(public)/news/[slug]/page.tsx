import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import newsData from '@/app/data/news.json'; 

const Icons = {
  ArrowLeft: () => <svg className="wh5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>,
  Calendar: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Clock: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  User: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Share: () => <svg className="wh4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
};

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  
  const { slug } = await params;

  const article = newsData.find((item) => {
    const itemSlug = item.link.split('/').pop(); 
    return itemSlug === slug;
  });

  if (!article) {
    return notFound();
  }

  const { title, category, date, content, images, description } = article;
  
  const authorName = (article as any).author || "Editorial Team";
  const readTime = (article as any).read_time || "5 min read";

  const mainImage = images && images.length > 0 ? images[0] : (article as any).image;
  const sidebarImages = images && images.length > 1 ? images.slice(1) : [];

  return (
    <main className="bg-ivory min-h-screen pb-24 selection:bg-terra selection:text-white">
      
      <div className="bg-forest text-ivory pt-32 pb-16 px-4 sm:px-6 relative overflow-hidden">
     

        <div className="max-w-350 mx-auto relative z-10">
          
          <Link 
            href="/#news" 
            className="inline-flex items-center gap-2 text-ivory/60 hover:text-terra transition-colors mb-12 text-xs font-bold uppercase tracking-widest"
          >
            <Icons.ArrowLeft /> Back to Journal
          </Link>

          <div className="max-w-5xl">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="bg-terra text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-terra/20">
                {category}
              </span>
              <div className="h-px w-8 bg-white/20"></div>
              <span className="flex items-center gap-2 text-ivory/60 text-xs font-bold uppercase tracking-widest">
                 <Icons.Clock /> {readTime}
              </span>
              <span className="flex items-center gap-2 text-ivory/60 text-xs font-bold uppercase tracking-widest">
                 <Icons.Calendar /> {date}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.1] mb-8 text-ivory">
              {title}
            </h1>

            <p className="text-lg md:text-xl text-ivory/70 font-serif italic max-w-3xl leading-relaxed border-l-2 border-terra pl-6">
              {description}
            </p>
          </div>

        </div>
      </div>

      {mainImage && (
        <div className="w-full h-[50vh] md:h-[75vh] relative mb-16 md:mb-24 group">
           <Image
             src={mainImage}
             alt={title}
             fill
             priority
             className="object-cover transition-transform duration-[2s] group-hover:scale-105"
           />
           <div className="absolute inset-0 bg-linear-to-b from-forest/50 via-transparent to-ivory/10 pointer-events-none" />
        </div>
      )}


      <div className="max-w-350 mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          <div className="lg:col-span-8 lg:col-start-1">
             <article className="bg-white rounded-t-3xl p-0 md:p-4">
                {content ? (
                  <div 
                    className="
                      prose prose-lg md:prose-xl max-w-none
                    
                      prose-headings:font-serif prose-headings:font-bold prose-headings:text-forest
                      prose-headings:mt-12 prose-headings:mb-6
                      
                      prose-p:text-forest/80 prose-p:leading-loose prose-p:mb-6 prose-p:font-sans
                      
                      prose-strong:text-forest prose-strong:font-bold
                      
                      prose-a:text-terra prose-a:no-underline prose-a:border-b prose-a:border-terra/30 hover:prose-a:border-terra hover:prose-a:bg-terra/5 prose-a:transition-all
                      
                      prose-blockquote:border-l-4 prose-blockquote:border-terra prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-forest/90 prose-blockquote:bg-ivory/50 prose-blockquote:rounded-r-lg
                      
                      prose-li:text-forest/80 prose-li:marker:text-terra
                      
                    
                      first-letter:text-7xl first-letter:font-serif first-letter:font-bold first-letter:text-terra first-letter:float-left first-letter:mr-3 first-letter:-mt-2
                    "
                    dangerouslySetInnerHTML={{ __html: content }} 
                  />
                ) : (
                  <p className="text-forest/50 italic">Content loading...</p>
                )}
             </article>

             <div className="mt-16 pt-8 border-t border-forest/10 flex items-center justify-between">
                <div className="text-forest/60 text-sm italic font-serif">
                   Published in {category}
                </div>
                <button className="flex items-center gap-2 text-forest/60 hover:text-terra transition-colors text-sm font-bold uppercase tracking-widest">
                   <Icons.Share /> Share Story
                </button>
             </div>
          </div>

          <aside className="lg:col-span-4 hidden lg:block relative">
            <div className="sticky top-32 flex flex-col gap-12">
              
              <div className="bg-white border border-forest/5 p-8 rounded-3xl shadow-lg shadow-forest/5">
                <span className="text-[10px] uppercase tracking-widest text-terra font-bold mb-4 block">Written By</span>
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 rounded-full bg-forest text-ivory flex items-center justify-center text-xl font-serif italic">
                      {authorName.charAt(0)}
                   </div>
                   <div>
                      <h4 className="text-xl font-serif text-forest">{authorName}</h4>
                      <p className="text-forest/50 text-xs uppercase tracking-widest">ThunderVoyage Editor</p>
                   </div>
                </div>
              </div>

              {sidebarImages.length > 0 && (
                <div>
                  <h3 className="font-serif text-2xl text-forest mb-6 italic">Visual Notes</h3>
                  <div className="flex flex-col gap-6">
                    {sidebarImages.map((img, index) => (
                      <div 
                        key={index} 
                        className={`
                          relative rounded-2xl overflow-hidden shadow-md group cursor-zoom-in
                          ${index === 0 ? 'aspect-4/5' : 'aspect-square'} 
                        `}
                      >
                        <Image
                          src={img}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/10 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </aside>

          <div className="lg:hidden col-span-1 border-t border-forest/10 pt-12">
            {sidebarImages.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-bold text-forest">Gallery</h3>
                {sidebarImages.map((img, index) => (
                  <div key={index} className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                    <Image src={img} alt="Gallery" fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-32 text-center">
         <div className="w-px h-16 bg-terra mx-auto mb-8"></div>
         <h4 className="text-forest/40 text-xs font-bold uppercase tracking-[0.2em] mb-6">Continue Reading</h4>
         <Link 
            href="/#news" 
            className="text-4xl md:text-5xl font-serif text-forest hover:text-terra transition-colors inline-block"
         >
            Back to Journal
         </Link>
      </div>

    </main>
  );
}