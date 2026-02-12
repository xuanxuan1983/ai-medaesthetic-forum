'use client';

export default function SquirrelMascot() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg 
        viewBox="0 0 500 500" 
        className="w-full h-full max-w-[420px] max-h-[420px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 背景 - 柔和的米色圆形 */}
        <circle cx="250" cy="250" r="200" fill="#F5F0E8" />
        
        {/* 背景装饰 - 小星星 */}
        <path d="M100 150 L105 140 L110 150 L120 155 L110 160 L105 170 L100 160 L90 155 Z" fill="#E8D5C4" />
        <path d="M400 120 L403 113 L406 120 L413 123 L406 126 L403 133 L400 126 L393 123 Z" fill="#E8B8C8" opacity="0.6" />
        <path d="M380 380 L384 372 L388 380 L396 383 L388 386 L384 394 L380 386 L372 383 Z" fill="#A8C5A0" opacity="0.5" />
        
        {/* 背景装饰 - 小云朵 */}
        <ellipse cx="120" cy="350" rx="25" ry="15" fill="#FFFFFF" opacity="0.8" />
        <ellipse cx="135" cy="345" rx="18" ry="12" fill="#FFFFFF" opacity="0.8" />
        <ellipse cx="105" cy="348" rx="15" ry="10" fill="#FFFFFF" opacity="0.8" />
        
        <ellipse cx="380" cy="180" rx="20" ry="12" fill="#FFFFFF" opacity="0.6" />
        <ellipse cx="392" cy="176" rx="14" ry="9" fill="#FFFFFF" opacity="0.6" />
        
        {/* 尾巴 - 蓬松的大尾巴，像云朵一样 */}
        <ellipse cx="320" cy="280" rx="90" ry="110" fill="#E8D5C4" />
        <ellipse cx="300" cy="250" rx="60" ry="70" fill="#F5E6D3" />
        <ellipse cx="340" cy="300" rx="50" ry="60" fill="#F5E6D3" />
        <ellipse cx="290" cy="320" rx="45" ry="55" fill="#F0E0D0" />
        
        {/* 尾巴纹理 - 柔和的曲线 */}
        <path d="M280 200 Q300 220 295 250" stroke="#D4C4B0" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M320 180 Q330 210 325 240" stroke="#D4C4B0" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M360 200 Q350 230 355 260" stroke="#D4C4B0" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M260 250 Q280 280 275 310" stroke="#D4C4B0" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M380 250 Q370 280 375 310" stroke="#D4C4B0" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M270 300 Q290 330 285 360" stroke="#D4C4B0" strokeWidth="3" strokeLinecap="round" fill="none" />
        
        {/* 身体 - 圆滚滚的 */}
        <ellipse cx="220" cy="340" rx="75" ry="90" fill="#E8D5C4" />
        
        {/* 肚子 - 浅色 */}
        <ellipse cx="220" cy="350" rx="50" ry="60" fill="#F5E6D3" />
        
        {/* 肚子上的纹理 */}
        <path d="M195 320 Q220 330 245 320" stroke="#D4C4B0" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M190 350 Q220 360 250 350" stroke="#D4C4B0" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M195 380 Q220 390 245 380" stroke="#D4C4B0" strokeWidth="2" strokeLinecap="round" fill="none" />
        
        {/* 左腿 - 弯曲放松 */}
        <ellipse cx="170" cy="410" rx="22" ry="35" fill="#E8D5C4" transform="rotate(-20 170 410)" />
        <ellipse cx="160" cy="445" rx="18" ry="28" fill="#E8D5C4" />
        {/* 左脚 */}
        <ellipse cx="155" cy="475" rx="16" ry="10" fill="#E8D5C4" />
        {/* 脚趾 */}
        <circle cx="148" cy="472" r="3" fill="#D4C4B0" />
        <circle cx="155" cy="474" r="3" fill="#D4C4B0" />
        <circle cx="162" cy="472" r="3" fill="#D4C4B0" />
        
        {/* 右腿 - 伸直 */}
        <ellipse cx="270" cy="415" rx="25" ry="40" fill="#E8D5C4" />
        <ellipse cx="270" cy="460" rx="20" ry="32" fill="#E8D5C4" />
        {/* 右脚 */}
        <ellipse cx="270" cy="495" rx="16" ry="10" fill="#E8D5C4" />
        {/* 脚趾 */}
        <circle cx="263" cy="492" r="3" fill="#D4C4B0" />
        <circle cx="270" cy="494" r="3" fill="#D4C4B0" />
        <circle cx="277" cy="492" r="3" fill="#D4C4B0" />
        
        {/* 左臂 - 自然下垂 */}
        <ellipse cx="155" cy="330" rx="20" ry="38" fill="#E8D5C4" transform="rotate(15 155 330)" />
        {/* 左手 */}
        <circle cx="150" cy="365" r="14" fill="#E8D5C4" />
        
        {/* 右臂 - 拿着小花 */}
        <ellipse cx="285" cy="325" rx="20" ry="38" fill="#E8D5C4" transform="rotate(-20 285 325)" />
        {/* 右手 */}
        <circle cx="295" cy="360" r="14" fill="#E8D5C4" />
        
        {/* 小花 */}
        <circle cx="305" cy="345" r="12" fill="#E8B8C8" />
        <circle cx="300" cy="340" r="5" fill="#F5E6D3" />
        <circle cx="310" cy="340" r="5" fill="#F5E6D3" />
        <circle cx="305" cy="350" r="5" fill="#F5E6D3" />
        <circle cx="305" cy="345" r="4" fill="#E8B86D" />
        <path d="M305 357 L305 370" stroke="#A8C5A0" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="310" cy="362" rx="6" ry="3" fill="#A8C5A0" />
        
        {/* 头部 - 圆圆的 */}
        <circle cx="220" cy="220" r="70" fill="#E8D5C4" />
        
        {/* 头部毛发纹理 */}
        <path d="M170 180 Q190 190 185 210" stroke="#D4C4B0" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M270 180 Q250 190 255 210" stroke="#D4C4B0" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M160 220 Q180 230 175 250" stroke="#D4C4B0" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M280 220 Q260 230 265 250" stroke="#D4C4B0" strokeWidth="2" strokeLinecap="round" fill="none" />
        
        {/* 耳朵 - 圆润的三角形 */}
        <ellipse cx="165" cy="165" rx="18" ry="25" fill="#E8D5C4" />
        <ellipse cx="165" cy="170" rx="10" ry="15" fill="#F5E6D3" />
        <path d="M158 160 Q165 150 172 160" stroke="#D4C4B0" strokeWidth="2" strokeLinecap="round" fill="none" />
        
        <ellipse cx="275" cy="165" rx="18" ry="25" fill="#E8D5C4" />
        <ellipse cx="275" cy="170" rx="10" ry="15" fill="#F5E6D3" />
        <path d="M268 160 Q275 150 282 160" stroke="#D4C4B0" strokeWidth="2" strokeLinecap="round" fill="none" />
        
        {/* 额头纹理 */}
        <path d="M200 165 Q220 160 240 165" stroke="#D4C4B0" strokeWidth="2" strokeLinecap="round" fill="none" />
        
        {/* 眉毛 - 柔和的弧线 */}
        <path d="M190 195 Q205 188 220 195" stroke="#C9A88A" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M220 195 Q235 188 250 195" stroke="#C9A88A" strokeWidth="3" strokeLinecap="round" fill="none" />
        
        {/* 眼睛 - 闭着享受的弧线 */}
        <path d="M195 215 Q210 222 225 215" stroke="#8B7355" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M215 215 Q220 218 225 215" stroke="#8B7355" strokeWidth="3" strokeLinecap="round" fill="none" />
        
        <path d="M235 215 Q250 222 265 215" stroke="#8B7355" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M255 215 Q260 218 265 215" stroke="#8B7355" strokeWidth="3" strokeLinecap="round" fill="none" />
        
        {/* 眼下腮红 */}
        <ellipse cx="210" cy="228" rx="12" ry="8" fill="#E8B8C8" opacity="0.5" />
        <ellipse cx="250" cy="228" rx="12" ry="8" fill="#E8B8C8" opacity="0.5" />
        
        {/* 鼻子 */}
        <ellipse cx="230" cy="240" rx="8" ry="6" fill="#C9A88A" />
        <ellipse cx="228" cy="238" rx="3" ry="2" fill="#E8D5C4" opacity="0.6" />
        
        {/* 嘴巴 - 微笑 */}
        <path d="M215 255 Q230 268 245 255" stroke="#8B7355" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M230 268 Q230 273 230 273" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" fill="none" />
        
        {/* 门牙 - 松鼠特色 */}
        <rect cx="224" y="268" width="5" height="8" rx="2" fill="#FFFFFF" stroke="#D4C4B0" strokeWidth="1" />
        <rect cx="231" y="268" width="5" height="8" rx="2" fill="#FFFFFF" stroke="#D4C4B0" strokeWidth="1" />
        
        {/* 胡须 - 柔和的曲线 */}
        <path d="M180 235 L155 230" stroke="#D4C4B0" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M180 245 L150 245" stroke="#D4C4B0" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M180 255 L155 260" stroke="#D4C4B0" strokeWidth="1.5" strokeLinecap="round" />
        
        <path d="M280 235 L305 230" stroke="#D4C4B0" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M280 245 L310 245" stroke="#D4C4B0" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M280 255 L305 260" stroke="#D4C4B0" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* 装饰 - 小叶子 */}
        <ellipse cx="130" cy="280" rx="10" ry="6" fill="#A8C5A0" transform="rotate(-30 130 280)" />
        <path d="M130 280 L130 290" stroke="#8A9A7A" strokeWidth="1.5" />
        
        <ellipse cx="340" cy="240" rx="8" ry="5" fill="#A8C5A0" transform="rotate(20 340 240)" />
        <path d="M340 240 L340 248" stroke="#8A9A7A" strokeWidth="1.5" />
        
      </svg>
    </div>
  );
}
