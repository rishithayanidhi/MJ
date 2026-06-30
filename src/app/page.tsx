"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Section1Sky from "@/components/Section1Sky";
import Section2Welcome from "@/components/Section2Welcome";
import Section3HangingPhotos from "@/components/Section3HangingPhotos";
import Section4Polaroids from "@/components/Section4Polaroids";
import Section5Counter from "@/components/Section5Counter";
import Section6Map from "@/components/Section6Map";
import Section7Letter from "@/components/Section7Letter";
import Section8Poems from "@/components/Section8Poems";
import Section9Music from "@/components/Section9Music";
import Section11Gift from "@/components/Section11Gift";
import Section12Balloons from "@/components/Section12Balloons";
import Section14Reasons from "@/components/Section14Reasons";
import Section15Scrapbook from "@/components/Section15Scrapbook";
import Section18Finale from "@/components/Section18Finale";
import QuoteSection from "@/components/QuoteSection";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [entered, setEntered] = useState(false);

  return (
    <main className="w-full flex flex-col items-center justify-center overflow-x-hidden bg-[#FFF9EB]">
      {loading && <LoadingScreen onLoaded={() => setLoading(false)} />}
      
      {!loading && (
        <>
          {/* Section 1 is sticky/fixed until entered, or just scrollable. For cinematic effect, we show it first, then reveal the rest */}
          {!entered && (
            <div className="w-full h-screen relative">
              <Section1Sky onEnter={() => setEntered(true)} />
            </div>
          )}

          {/* Subsequent sections will be rendered below when 'entered' is true */}
          {entered && (
            <div className="w-full flex flex-col bg-[#FFF9EB]">
              <Section2Welcome />
              <Section3HangingPhotos />
              <Section4Polaroids />
              <Section5Counter />
              <Section6Map />
              <Section7Letter />
              <Section8Poems />
              <Section9Music />
              <Section11Gift />
              <Section12Balloons />
              
              <QuoteSection 
                text="Every night, I end my world with you in my heart, every morning, I begin my universe with you in my soul" 
                icon="💋❣️🌹" 
              />
              
              <Section14Reasons />
              <Section15Scrapbook />
              <Section18Finale />
            </div>
          )}
        </>
      )}
    </main>
  );
}
