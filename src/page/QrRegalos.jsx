import { QRCodeSVG } from "qrcode.react";

export default function QrRegalos() {
  const url = "https://www.amazon.com.mx/wedding/guest-view/EUPRTO8FL3YG";

  return (
    <div className="flex justify-center">
      <div className="inline-block p-4">
        <QRCodeSVG
          value={url}
          size={280}
          bgColor="#5f724a"
          fgColor="#ffffff"
          level="H"
          includeMargin={false}
        />
      </div>
    </div>
  );
}