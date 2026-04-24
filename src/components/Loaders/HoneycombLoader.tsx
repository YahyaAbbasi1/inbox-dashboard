import React, { useEffect } from "react";
import "./HoneycombLoader.css";

import {
  Mail,
  Users,
  Bot,
  Zap,
  Megaphone
} from "lucide-react";

interface Props {
  onComplete: () => void;
}

const HoneycombLoader: React.FC<Props> = ({ onComplete }) => {
  useEffect(() => {
    const t = setTimeout(onComplete, 4000);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="honeycomb-loader">
      {/* background lights */}
      <div className="light light-1" />
      <div className="light light-2" />

      {/* floating hexes with icons */}
      <div className="hex h1"><Mail size={18} /></div>
      <div className="hex h2"><Users size={18} /></div>
      <div className="hex h3"><Bot size={18} /></div>
      <div className="hex h4"><Zap size={18} /></div>
      <div className="hex h5"><Megaphone size={18} /></div>

      {/* center ring */}
      <div className="ring" />

      {/* text */}
      <div className="content">
        <h2>Extracting Information...</h2>
        <p>
          We are extracting information from the above honey combs to your system
        </p>
      </div>
    </div>
  );
};

export default HoneycombLoader;