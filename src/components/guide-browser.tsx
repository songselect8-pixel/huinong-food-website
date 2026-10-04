"use client";
import { useState } from "react";
import { guideCategories, type GuideSummary } from "@/data/guide-types";
import { GuideCard } from "./guide-card";

export function GuideBrowser({guides}: {guides: GuideSummary[]}) {
  const [query,setQuery]=useState(""); const [category,setCategory]=useState("All Guides");
  const matches=guides.filter(g => (category === "All Guides" || g.category === category) && `${g.title} ${g.summary} ${g.category}`.toLowerCase().includes(query.trim().toLowerCase()));
  function clear(){setQuery("");setCategory("All Guides");}
  if(!guides.length) return <div className="guide-empty"><h2>Buying guides are being reviewed.</h2><p>Explore our products or tell us what your sourcing team needs to discuss.</p></div>;
  return <section className="guide-browser" id="guides" aria-label="Find a buying guide">
    <div className="guide-tools"><label htmlFor="guide-search">Search buying guides<input id="guide-search" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try blueberries, packaging or documents" /></label><div className="guide-chips" aria-label="Guide categories">{["All Guides",...guideCategories].map(c=><button type="button" key={c} aria-pressed={c===category} onClick={()=>setCategory(c)}>{c}</button>)}</div></div>
    <div className="guide-results"><p role="status">{matches.length} {matches.length===1?"guide":"guides"}</p>{(query || category!=="All Guides") && <button type="button" className="text-link" onClick={clear}>Clear filters <span aria-hidden="true">×</span></button>}</div>
    {matches.length ? <div className="guide-grid">{matches.map(g=><GuideCard key={g.slug} guide={g}/>)}</div> : <div className="guide-empty"><h2>No guides match these filters.</h2><p>Try a different ingredient or clear your selection.</p><button className="button button-outline" onClick={clear} type="button">Show all guides</button></div>}
  </section>;
}
